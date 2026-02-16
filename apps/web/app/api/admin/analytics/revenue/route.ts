import { NextResponse } from "next/server";
import { analyticsService } from "@/lib/analytics-service";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
    try {
        await requireAdmin();
        const data = await analyticsService.getRevenueData();
        return NextResponse.json(data);
    } catch (error) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}
