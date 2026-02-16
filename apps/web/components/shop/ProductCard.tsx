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
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative border rounded-lg overflow-hidden bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-xl"
        >
            <Link href={`/products/${product.slug}`} className="block">
                <div className="aspect-square relative overflow-hidden bg-muted">
                    {product.images[0] ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            No Image
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
            </Link>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{product.category?.name}</p>
                        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                            <Link href={`/products/${product.slug}`}>{product.name}</Link>
                        </h3>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-lg text-primary">
                        {formatPrice(Number(product.price))}
                    </span>
                    <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Add to Cart</Button>
                </div>
            </div>
        </motion.div>
    );
}
