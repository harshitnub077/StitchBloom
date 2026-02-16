import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    try {
        await requireAdmin();
    } catch (error) {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen flex-col">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <Link href="/dashboard" className="text-lg font-bold mr-6">
                        Admin Dashboard
                    </Link>
                    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Overview
                        </Link>
                        <Link
                            href="/dashboard/orders"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Orders
                        </Link>
                        <Link
                            href="/dashboard/products"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Products
                        </Link>
                    </nav>
                    <div className="ml-auto flex items-center space-x-4">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                {children}
            </div>
        </div>
    );
}
