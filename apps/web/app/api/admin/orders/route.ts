import { NextRequest, NextResponse } from "next/server";
import { db, requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        await requireAdmin();

        // Simple pagination / filtering could be added via searchParams
        const orders = await db.order.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { name: true, email: true } },
                _count: { select: { orderItems: true } }
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        return new NextResponse("Unauthorized or Error", { status: 500 });
    }
}
