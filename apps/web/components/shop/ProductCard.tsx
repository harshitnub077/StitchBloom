"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@crochetverse/shared";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Placeholder type until we share it from Prisma or API Types
interface Product {
    id: string;
    name: string;
    slug: string;
    price: string | number;
    images: string[];
    category?: { name: string };
}

export function ProductCard({ product }: { product: Product }) {
    const imageUrl = Array.isArray(product.images)
        ? product.images[0]
        : typeof product.images === "string"
        ? product.images
        : null;

    return (
        <div className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-700 border border-primary/8 hover:border-[#C9A96E]/40">
            <Link
                href={`/products/${product.slug}`}
                className="block relative aspect-[4/5] overflow-hidden bg-[#F5F0E8]"
            >
                <Image
                    src={
                        imageUrl ||
                        "https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1080&auto=format&fit=crop"
                    }
                    alt={product.name || "Product Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain p-4 transition-all duration-[1500ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A4D3E]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Category Badge */}
                {product.category && (
                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md border border-primary/10 px-3 py-1.5 rounded-full shadow-sm">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-primary/70 font-bold">
                            {product.category.name}
                        </span>
                    </div>
                )}
            </Link>

            <div className="p-5 flex flex-col gap-3">
                <h3 className="font-heading text-lg tracking-wide text-primary group-hover:text-[#1A4D3E] transition-colors duration-500 line-clamp-1">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </h3>

                <div className="flex items-center justify-between border-t border-primary/8 pt-4">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-primary/40 uppercase tracking-[0.3em] mb-1">Price</span>
                        <span className="font-bold text-lg text-[#1A4D3E] tracking-wide">
                            {formatPrice(Number(product.price))}
                        </span>
                    </div>

                    <Link href={`/products/${product.slug}`}>
                        <Button
                            variant="outline"
                            className="h-9 px-5 rounded-full border-[#C9A96E]/40 bg-[#C9A96E]/5 text-[#1A4D3E] hover:bg-[#1A4D3E] hover:text-white hover:border-[#1A4D3E] transition-all duration-300 font-bold tracking-widest text-[9px] uppercase"
                        >
                            View <ArrowRight className="h-3 w-3 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
