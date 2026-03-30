"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { formatPrice } from "@crochetverse/shared";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

interface CartItemProps {
    item: any; // Type from Cart/Prisma
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCart();
    const product = item.product;
    const imageUrl = Array.isArray(product.images) ? product.images[0] : typeof product.images === 'string' ? product.images : null;
    const normalizedImageUrl = imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/') ? `/${imageUrl}` : imageUrl;

    return (
        <div className="flex flex-col sm:flex-row gap-8 group py-10 border-b border-white/5 bg-zinc-950/30 px-8 rounded-[2rem] mb-6 transition-all duration-700 hover:bg-zinc-950/50 hover:border-accent-gold/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <Link href={`/products/${product.slug}`} className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl group-hover:border-accent-gold/30 transition-all duration-700">
                {normalizedImageUrl && (
                    <img
                        src={normalizedImageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain p-2 transition-transform duration-[2000ms] group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                    />
                )}
                {!normalizedImageUrl && (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                        <ShoppingBag className="w-10 h-10 text-white/10" />
                    </div>
                )}
            </Link>

            <div className="flex flex-1 flex-col justify-between py-2">
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2">
                        <Link href={`/products/${product.slug}`} className="font-bold font-heading text-2xl text-white hover:text-accent-gold transition-colors duration-500 line-clamp-2 uppercase tracking-widest">
                            {product.name}
                        </Link>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] italic">Valuation</span>
                            <p className="text-xl text-accent-gold font-bold tracking-widest">
                                {formatPrice(Number(product.price))}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white/20 hover:bg-destructive/20 hover:text-red-500 rounded-full transition-all duration-500 h-12 w-12 flex-shrink-0 border border-white/5"
                        onClick={() => removeItem(item.id)}
                    >
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex items-center justify-between mt-10">
                    <div className="flex items-center border border-white/10 rounded-full bg-black/60 p-1.5 shadow-inner">
                        <button
                            className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 disabled:opacity-20 text-white/60 hover:text-white"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-bold text-white text-lg tracking-widest">{item.quantity}</span>
                        <button
                            className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 disabled:opacity-20 text-white/60 hover:text-white"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= (product.stock || 99)}
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="text-xl font-bold font-heading text-white bg-accent-gold/10 px-6 py-2.5 rounded-full border border-accent-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                        <span className="text-[10px] text-accent-gold/60 uppercase tracking-[0.2em] mr-4 font-bold">Total Artifacts Value</span>
                        {formatPrice(Number(product.price) * item.quantity)}
                    </div>
                </div>
            </div>
        </div>
    );
}
