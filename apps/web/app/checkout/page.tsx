"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { formatPrice } from "@crochetverse/shared";
import { RazorpayCheckout } from "@/components/checkout/RazorpayCheckout";

export default function CheckoutPage() {
    const { items, isLoading: cartLoading } = useCart();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const total = items.reduce((acc, item) => {
        return acc + Number(item.product.price) * item.quantity;
    }, 0);

    const onCheckout = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/checkout/create-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // We don't strictly need body if we fetch cart server-side for user, 
                // but passing metadata or cartId can be helpful if implementing guest checkout later.
                body: JSON.stringify({}),
            });

            if (!response.ok) {
                throw new Error("Failed to create session");
            }

            const { url } = await response.json();
            window.location.href = url;
        } catch (error) {
            console.error(error);
            alert("Something went wrong with checkout.");
        } finally {
            setLoading(false);
        }
    };

    if (cartLoading) { // Prevent hydration mismatch or flash
        return <div className="container py-20 text-center">Loading...</div>;
    }

    if (items.length === 0) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <Button onClick={() => router.push("/products")} className="mt-4">
                    Continue Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4 mb-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <span>{item.product.name} x {item.quantity}</span>
                            <span>{formatPrice(Number(item.product.price) * item.quantity)}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-4 flex justify-between font-bold text-lg mb-8">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                </div>

                <div className="space-y-4">
                    <Button
                        className="w-full"
                        size="lg"
                        onClick={onCheckout}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Pay with Stripe (International)"}
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                    </div>

                    <RazorpayCheckout />
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                    Secure payments processed by Stripe and Razorpay.
                </p>
            </div>
        </div>
    );
}
