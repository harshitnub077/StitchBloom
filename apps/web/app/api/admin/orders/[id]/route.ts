import { NextRequest, NextResponse } from "next/server";
import { db, requireAdmin } from "@/lib/auth";

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

        return NextResponse.json(order);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
