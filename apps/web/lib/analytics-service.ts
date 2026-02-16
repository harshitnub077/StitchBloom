import { db } from "@/lib/auth";

export const analyticsService = {
    async getDashboardStats() {
        const totalRevenue = await db.order.aggregate({
            where: { status: "DELIVERED" },
            _sum: { total: true },
        });

        const totalOrders = await db.order.count();
        const totalCustomers = await db.user.count();
        const totalProducts = await db.product.count();

        // Calculate growth (simple comparison with previous period could be added here)

        return {
            totalRevenue: totalRevenue._sum.total || 0,
            totalOrders,
            totalCustomers,
            totalProducts,
        };
    },

    async getRevenueData() {
        // Group by date (simplified for this example, usually requires raw query for strict formatting)
        // For now, let's fetch last 30 days orders and aggregate in JS or use groupBy if supported by provider
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const orders = await db.order.findMany({
            where: {
                createdAt: { gte: thirtyDaysAgo },
                status: "DELIVERED",
            },
            select: {
                createdAt: true,
                total: true,
            },
            orderBy: { createdAt: "asc" },
        });

        const grouped = orders.reduce((acc, order) => {
            const date = order.createdAt.toISOString().split("T")[0];
            acc[date] = (Number(acc[date]) || 0) + Number(order.total);
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(grouped).map(([name, value]) => ({ name, value }));
    },

    async getRecentOrders() {
        return await db.order.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { name: true, email: true } },
            },
        });
    },

    async getLowStockProducts(threshold = 5) {
        return await db.product.findMany({
            where: {
                stock: { lte: threshold },
            },
            select: {
                id: true,
                name: true,
                stock: true,
                price: true,
            },
            take: 5,
        });
    }
};
