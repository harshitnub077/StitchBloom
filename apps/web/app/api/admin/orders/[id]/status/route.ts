import { NextRequest, NextResponse } from "next/server";
import { db, requireAdmin } from "@/lib/auth";
import { resend, EMAIL_SENDER } from "@/lib/email";
import { ShippingNotificationEmail } from "@/components/emails/ShippingNotification";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await requireAdmin();
        const { status } = await req.json();

        const order = await db.order.update({
            where: { id: params.id },
            data: { status },
            include: { user: true }
        });

        if (status === "SHIPPED") {
            try {
                await resend.emails.send({
                    from: EMAIL_SENDER,
                    to: order.user.email,
                    subject: `Your order #${order.id.slice(0, 8)} has shipped!`,
                    react: ShippingNotificationEmail({
                        orderId: order.id,
                        customerName: order.user.name || "Customer",
                        // trackingNumber: "..." // Grab from body if implemented
                    })
                });
            } catch (emailError) {
                console.error("Failed to send shipping email:", emailError);
            }
        }

        return NextResponse.json(order);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
