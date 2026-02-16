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
        <div className="flex gap-4 py-4 border-b">
            <Link href={`/products/${product.slug}`} className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                {product.images?.[0] && (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                )}
            </Link>

            <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                    <div>
                        <Link href={`/products/${product.slug}`} className="font-medium hover:underline">
                            {product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                            {formatPrice(Number(product.price))}
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border rounded-md">
                        <button
                            className="p-1 hover:bg-muted"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                            className="p-1 hover:bg-muted"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= product.stock}
                        >
                            <Plus className="h-3 w-3" />
                        </button>
                    </div>
                    <div className="ml-auto font-medium">
                        {formatPrice(Number(product.price) * item.quantity)}
                    </div>
                </div>
            </div>
        </div>
    );
}
