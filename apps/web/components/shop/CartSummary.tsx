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
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl sticky top-24">
            <h2 className="text-2xl font-bold font-heading mb-6 tracking-tight text-white">Order Summary</h2>

            <div className="space-y-4 text-base">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-light">Subtotal</span>
                    <span className="font-medium text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-light">Shipping</span>
                    <span className="font-medium text-white">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-light">Tax</span>
                    <span className="font-medium text-white">{formatPrice(tax)}</span>
                </div>
            </div>

            <div className="border-t border-white/10 my-6 pt-6 flex justify-between items-end">
                <span className="font-bold text-lg text-white">Total</span>
                <span className="font-black text-3xl font-heading bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    {formatPrice(total)}
                </span>
            </div>

            <Button className="w-full h-14 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all mt-4" size="lg">
                Proceed to Checkout
            </Button>
        </div>
    );
}
