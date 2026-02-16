"use client";

import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@crochetverse/shared";
import { Button } from "@/components/ui/button";

export function CartSummary() {
    const { items } = useCart();

    const subtotal = items.reduce((acc, item) => {
        return acc + Number(item.product.price) * item.quantity;
    }, 0);

    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08; // Example tax
    const total = subtotal + shipping + tax;

    return (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(tax)}</span>
                </div>
            </div>

            <div className="border-t my-4 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
            </div>

            <Button className="w-full" size="lg">Checkout</Button>
        </div>
    );
}
