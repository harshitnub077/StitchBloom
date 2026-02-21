"use client";

import { useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/components/shop/CartItem";
import { CartSummary } from "@/components/shop/CartSummary";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CartPage() {
    const { items, isLoading, fetchCart } = useCart();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    if (isLoading && items.length === 0) {
        return <div className="container py-20 text-center">Loading cart...</div>;
    }

    if (items.length === 0) {
        return (
            <div className="container min-h-[60vh] flex flex-col items-center justify-center py-20 text-center relative z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                <h1 className="text-5xl font-black font-heading mb-6 tracking-tight text-white drop-shadow-sm">Your Cart is Empty</h1>
                <p className="text-xl text-muted-foreground mb-10 max-w-md mx-auto font-light leading-relaxed">
                    Looks like you haven&apos;t added anything to your cart yet. Let&apos;s change that.
                </p>
                <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg hover:-translate-y-1 transition-transform group">
                    <Link href="/products">Explore Collection</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 relative">
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            <h1 className="text-5xl font-black font-heading tracking-tight mb-12 text-white relative z-10">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="space-y-0 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/5 px-4 sm:px-8 backdrop-blur-md shadow-2xl">
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                <div>
                    <CartSummary />
                </div>
            </div>
        </div>
    );
}
