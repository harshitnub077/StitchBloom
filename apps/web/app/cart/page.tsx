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
            <div className="container py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">
                    Looks like you haven't added anything yet.
                </p>
                <Button asChild>
                    <Link href="/products">Start Shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="space-y-0 divide-y rounded-lg border bg-card px-4 sm:px-6">
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
