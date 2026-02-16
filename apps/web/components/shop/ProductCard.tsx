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
    return (
        <div className="group relative border rounded-lg overflow-hidden bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
            <Link href={`/products/${product.slug}`} className="block">
                <div className="aspect-square relative overflow-hidden bg-muted">
                    {product.images[0] ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            No Image
                        </div>
                    )}
                </div>
            </Link>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-sm text-muted-foreground">{product.category?.name}</p>
                        <h3 className="font-semibold text-lg leading-tight group-hover:underline">
                            <Link href={`/products/${product.slug}`}>{product.name}</Link>
                        </h3>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-lg">
                        {formatPrice(Number(product.price))}
                    </span>
                    <Button size="sm">Add to Cart</Button>
                </div>
            </div>
        </div>
    );
}
