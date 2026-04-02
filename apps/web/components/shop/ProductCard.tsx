"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@crochetverse/shared";
import { Button } from "@/components/ui/button";

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
        <div className="group relative bg-background rounded-none overflow-hidden transition-all duration-700 border border-white/5 hover:border-accent shadow-2xl">
            <Link
                href={`/products/${product.slug}`}
                className="block relative aspect-[4/5] bg-[#0A0A0A] overflow-hidden"
            >
                <Image
                    src={
                        imageUrl ||
                        "https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1080&auto=format&fit=crop"
                    }
                    alt={product.name || "Product Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-all duration-[1500ms] group-hover:scale-105 filter grayscale-[0.8] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

                {/* Category Badge */}
                {product.category && (
                    <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md border border-white/20 px-4 py-2 shadow-sm">
                        <span className="text-[9px] uppercase tracking-[0.4em] text-white font-light">
                            {product.category.name}
                        </span>
                    </div>
                )}
            </Link>

            <div className="p-6 flex flex-col gap-6 bg-background relative z-10">
                <h3 className="font-heading text-xl tracking-[0.1em] text-foreground group-hover:text-accent transition-colors duration-500 line-clamp-1 font-light">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </h3>

                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-white/40 uppercase tracking-[0.5em] mb-1.5 font-medium">Acquire</span>
                        <span className="font-light text-lg text-foreground tracking-widest group-hover:text-white transition-colors">
                            {formatPrice(Number(product.price))}
                        </span>
                    </div>

                    <Link href={`/products/${product.slug}`}>
                        <Button
                            variant="outline"
                            className="h-10 px-6 rounded-none border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-all duration-500 font-semibold tracking-[0.3em] text-[9px] uppercase"
                        >
                            View
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
