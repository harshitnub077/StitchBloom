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
        return <div className="container min-h-[60vh] flex items-center justify-center pt-40 pb-20 text-center uppercase tracking-widest text-xs text-primary/60">Curating your cart...</div>;
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 min-h-[60vh] flex flex-col items-center justify-center pt-40 pb-20 text-center relative z-10 max-w-7xl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#E5C17C]/5 blur-[100px] rounded-full pointer-events-none" />
                <h1 className="text-4xl md:text-5xl font-heading mb-6 tracking-wide text-primary drop-shadow-sm">Your Cart is Pristine</h1>
                <p className="text-lg text-primary/60 mb-10 max-w-md mx-auto font-light leading-relaxed">
                    It looks like you haven&apos;t selected any of our crafted masterpieces yet. Let&apos;s fix that.
                </p>
                <Button asChild size="lg" className="rounded-full h-14 px-10 text-sm font-bold tracking-[0.1em] uppercase hover:-translate-y-1 transition-transform group bg-primary text-white hover:bg-[#E5C17C]">
                    <Link href="/products">Explore Collection</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 pt-40 pb-20 relative max-w-7xl">
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#E5C17C]/5 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />
            
            <div className="mb-12 text-center md:text-left">
                <span className="inline-block uppercase tracking-[0.4em] text-[10px] text-[#E5C17C] mb-4 font-bold">Curated Selections</span>
                <h1 className="text-4xl md:text-5xl font-heading tracking-wide text-primary relative z-10">Shopping Cart</h1>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <div className="space-y-0 divide-y divide-primary/10 rounded-3xl border border-primary/10 bg-white/50 px-4 sm:px-8 backdrop-blur-xl shadow-xl">
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
