import { NextResponse } from "next/server";
import { analyticsService } from "@/lib/analytics-service";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
    try {
        // await requireAdmin(); // Ensure only admins can access
        // Commented out strict check for rapid dev/demo if auth cookies missing in API context, 
        // but typically you MUST enable this.
        // Assuming middleware protects /api/admin/* or we use requireAdmin() here.

        // For purpose of this specific user request flow "Protected routes (admin role only)",
        // We should enable it.
        await requireAdmin();

        const stats = await analyticsService.getDashboardStats();
        return NextResponse.json(stats);
    } catch (error) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
}
