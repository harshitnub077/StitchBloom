import { Metadata } from "next";
import { analyticsService } from "@/lib/analytics-service";
import { StatCard } from "@/components/admin/StatCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { RecentOrders } from "@/components/admin/RecentOrders";
import { DollarSign, CreditCard, Users, Activity } from "lucide-react";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Example dashboard app built using the components.",
};

export default async function DashboardPage() {
    const stats = await analyticsService.getDashboardStats();
    const revenueData = await analyticsService.getRevenueData();
    const recentOrders = await analyticsService.getRecentOrders();

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Revenue"
                        value={`$${stats.totalRevenue}`}
                        icon={DollarSign}
                        description="+20.1% from last month"
                    />
                    <StatCard
                        title="Sales"
                        value={`+${stats.totalOrders}`}
                        icon={CreditCard}
                        description="+180.1% from last month"
                    />
                    <StatCard
                        title="Active Now"
                        value={`+${stats.totalCustomers}`}
                        icon={Activity}
                        description="+201 since last hour"
                    />
                    <StatCard
                        title="Total Products"
                        value={stats.totalProducts.toString()}
                        icon={Users} // Placeholder icon
                        description="Currently in stock"
                    />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <RevenueChart data={revenueData} />
                    <RecentOrders orders={recentOrders} />
                </div>
            </div>
        </>
    );
}
