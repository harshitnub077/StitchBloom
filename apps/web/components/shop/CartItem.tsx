"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@crochetverse/shared";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

interface CartItemProps {
    item: any; // Type from Cart/Prisma
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCart();
    const product = item.product;

    return (
        <div className="flex gap-6 py-8 group">
            <Link href={`/products/${product.slug}`} className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-md">
                {product.images?.[0] && (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                )}
            </Link>

            <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <Link href={`/products/${product.slug}`} className="font-bold font-heading text-xl text-white hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                        </Link>
                        <p className="text-base text-primary/80 mt-2 font-medium">
                            {formatPrice(Number(product.price))}
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:bg-destructive/20 hover:text-red-400 rounded-full transition-colors h-10 w-10 flex-shrink-0"
                        onClick={() => removeItem(item.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center border border-white/10 rounded-full bg-black/40 p-1">
                        <button
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-10 text-center font-medium text-white">{item.quantity}</span>
                        <button
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= product.stock}
                        >
                            <Plus className="h-3.5 w-3.5" />
                        </button>
                    </div>
                    <div className="text-lg font-bold font-heading text-white bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                        Total: {formatPrice(Number(product.price) * item.quantity)}
                    </div>
                </div>
            </div>
        </div>
    );
}
