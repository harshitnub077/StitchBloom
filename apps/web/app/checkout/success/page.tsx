import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: { session_id?: string };
}) {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Thank you for your purchase. We have received your order and sent a confirmation email.
                {searchParams.session_id && (
                    <span className="block text-xs mt-2 text-gray-400">Transaction ID: {searchParams.session_id}</span>
                )}
            </p>
            <div className="flex justify-center gap-4">
                <Button asChild>
                    <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/orders">View Orders</Link>
                </Button>
            </div>
        </div>
    );
}
