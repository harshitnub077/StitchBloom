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
        return <div className="container min-h-[60vh] flex items-center justify-center pt-40 pb-20 text-center uppercase tracking-widest text-xs text-primary/60">Loading...</div>;
    }

    if (items.length === 0) {
        return (
            <div className="container min-h-[60vh] flex flex-col items-center justify-center pt-40 pb-20 text-center max-w-7xl">
                <h1 className="text-4xl md:text-5xl font-heading mb-6 tracking-wide text-primary">Your cart is empty</h1>
                <Button onClick={() => router.push("/products")} className="mt-4 rounded-full px-8 py-6 font-bold tracking-widest uppercase text-xs">
                    Continue Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 pt-40 pb-24 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-heading tracking-wide mb-12 text-center text-primary">Checkout</h1>

            <div className="bg-white border border-primary/10 rounded-[2rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-[#E5C17C]/5 blur-[80px] rounded-full pointer-events-none" />
                <h2 className="text-[12px] uppercase tracking-[0.4em] font-bold text-primary/60 border-b border-primary/10 pb-4 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-8">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <span className="font-medium text-primary/80">{item.product.name} <span className="text-primary/40 mx-2">x</span> {item.quantity}</span>
                            <span className="font-semibold text-primary">{formatPrice(Number(item.product.price) * item.quantity)}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-primary/10 pt-6 flex justify-between font-heading text-2xl mb-12 text-primary">
                    <span>Investment</span>
                    <span>{formatPrice(total)}</span>
                </div>

                <div className="space-y-6 relative z-10">
                    <Button
                        className="w-full h-14 rounded-xl text-sm font-bold tracking-[0.1em] uppercase hover:-translate-y-1 transition-transform bg-primary text-white hover:bg-[#E5C17C]"
                        size="lg"
                        onClick={onCheckout}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Pay with Stripe (International)"}
                    </Button>

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-primary/10" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.3em]">
                            <span className="bg-white px-4 text-primary/40">Or</span>
                        </div>
                    </div>

                    <RazorpayCheckout
                        amount={total}
                        onSuccess={(paymentId) => {
                            alert(`Payment Successful! ID: ${paymentId}`);
                            router.push("/orders"); // Or success page
                        }}
                        onError={(err) => {
                            alert("Payment failed");
                            console.error(err);
                        }}
                    />
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                    Secure payments processed by Stripe and Razorpay.
                </p>
            </div>
        </div>
    );
}
