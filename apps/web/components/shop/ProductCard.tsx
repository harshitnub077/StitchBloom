"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@crochetverse/shared";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:border-primary/50"
        >
            <Link href={`/products/${product.slug}`} className="block">
                <div className="aspect-[4/5] relative overflow-hidden bg-muted/20">
                    {product.images[0] ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            No Image
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </Link>
            <div className="p-5 flex flex-col gap-4">
                <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">{product.category?.name || "Uncategorized"}</p>
                    <h3 className="font-semibold text-lg font-heading leading-tight text-white group-hover:text-primary transition-colors line-clamp-1">
                        <Link href={`/products/${product.slug}`}>{product.name}</Link>
                    </h3>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-xl text-white">
                        {formatPrice(Number(product.price))}
                    </span>
                    <Button size="icon" className="rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 bg-white text-black hover:bg-white/90">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
