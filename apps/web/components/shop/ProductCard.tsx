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
    const imageUrl = Array.isArray(product.images) ? product.images[0] : typeof product.images === 'string' ? product.images : null;

    return (
        <div className="group relative bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
            <Link href={`/products/${product.slug}`} className="block">
                <div className="aspect-[4/5] relative overflow-hidden bg-gray-50">
                    <Image
                        src={imageUrl || "https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1080&auto=format&fit=crop"}
                        alt={product.name || "Product Image"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            </Link>
            <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-1">(12)</span>
                </div>

                <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </h3>

                <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold text-foreground">
                        {formatPrice(Number(product.price))}
                    </span>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-gray-50 text-foreground hover:bg-primary hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <path d="M3 6h18" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
}
