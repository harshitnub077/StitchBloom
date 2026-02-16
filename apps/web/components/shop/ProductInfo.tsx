"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@crochetverse/shared";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

interface ProductInfoProps {
    product: any; // Types should be imported
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useAuth();
    const router = useRouter();

    const handleAddToCart = async () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            alert("Added to cart! (Simulation)");
        }, 500);
    };

    const handleWishlist = () => {
        if (!userId) {
            router.push("/sign-in");
            return;
        }
        alert("Toggled wishlist! (Simulation)");
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-2xl font-bold">{formatPrice(Number(product.price))}</span>
                    {product.stock > 0 ? (
                        <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">In Stock</span>
                    ) : (
                        <span className="text-sm text-red-600 font-medium bg-red-50 px-2 py-1 rounded">Out of Stock</span>
                    )}
                </div>
            </div>

            <div className="prose prose-sm text-muted-foreground">
                <p>{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity</label>
                <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    {[...Array(Math.min(10, product.stock)).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                    className="flex-1"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={isLoading || product.stock === 0}
                >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {isLoading ? "Adding..." : "Add to Cart"}
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    onClick={handleWishlist}
                    title="Add to Wishlist"
                >
                    <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="lg" title="Share">
                    <Share2 className="h-5 w-5" />
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground pt-6 border-t">
                <div>
                    <span className="font-semibold block text-foreground">SKU</span>
                    {product.sku}
                </div>
                <div>
                    <span className="font-semibold block text-foreground">Category</span>
                    {product.category?.name}
                </div>
                <div className="col-span-2">
                    <span className="font-semibold block text-foreground">Tags</span>
                    {product.tags.join(", ")}
                </div>
            </div>
        </div>
    );
}
