import { NextRequest, NextResponse } from "next/server";
import { db, requireAdmin } from "@/lib/auth";
import { generateInvoice } from "@/lib/invoice-generator";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await requireAdmin();

        const order = await db.order.findUnique({
            where: { id: params.id },
            include: {
                user: true,
                orderItems: { include: { product: true } }
            }
        });

        if (!order) return new NextResponse("Not Found", { status: 404 });

        const pdfBuffer = await generateInvoice({
            orderId: order.id,
            date: order.createdAt,
            customerName: order.user?.name || "Guest",
            customerEmail: order.user?.email || "N/A",
            items: order.orderItems.map(item => ({
                description: item.product.name,
                quantity: item.quantity,
                amount: Number(item.price) // using snapshot price from orderItem
            })),
            total: Number(order.total)
        });

        return new NextResponse(pdfBuffer as unknown as BodyInit, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="invoice-${order.id}.pdf"`,
            },
        });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
