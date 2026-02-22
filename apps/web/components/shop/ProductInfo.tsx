"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@crochetverse/shared";
import { Heart, Share2, ShoppingCart, Star } from "lucide-react";
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
                <div className="mt-4 p-3 bg-orange-50/50 border border-orange-100 rounded-md">
                    <p className="text-secondary-foreground font-medium text-xs tracking-wide uppercase flex items-center gap-2">
                        <Star className="h-3 w-3 text-orange-400 fill-orange-400" />
                        Authentic Indian Handicraft
                    </p>
                    <p className="text-xs mt-1">
                        Skillfully crafted by local artisans in India. This product supports traditional weaving techniques and sustainable livelihoods.
                    </p>
                </div>
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
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                    size="lg"
                    onClick={() => {
                        handleAddToCart().then(() => router.push("/cart"));
                    }}
                    disabled={isLoading || product.stock === 0}
                >
                    Buy Now
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    onClick={handleWishlist}
                    title="Add to Wishlist"
                    className="sm:px-3"
                >
                    <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="lg" title="Share" className="sm:px-3">
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
                    {typeof product.tags === 'string' ? product.tags : product.tags?.join(", ") || "No tags"}
                </div>
            </div>

            {/* Fake Indian Reviews Section */}
            <div className="pt-8 mt-4 border-t border-gray-100">
                <h3 className="text-lg font-bold font-heading mb-6 tracking-wide text-foreground">Customer Reviews</h3>
                <div className="space-y-6">
                    {/* Review 1 */}
                    <div className="border-b border-gray-50 pb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex text-orange-400">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                            </div>
                            <span className="text-sm font-medium text-foreground">Priya Sharma</span>
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full ml-2">Verified Purchase</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">&quot;Beautiful craftsmanship!&quot;</p>
                        <p className="text-sm text-muted-foreground">
                            I ordered this for a family function and it exceeded my expectations. You can really see the authentic Indian touch in every detail. Delivery to Mumbai was surprisingly fast!
                        </p>
                    </div>
                    {/* Review 2 */}
                    <div className="border-b border-gray-50 pb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex text-orange-400">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                            </div>
                            <span className="text-sm font-medium text-foreground">Rahul Desai</span>
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full ml-2">Verified Purchase</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">&quot;Excellent quality and finishing&quot;</p>
                        <p className="text-sm text-muted-foreground">
                            Gifted this to my mother, she absolutely loved it. The material feels premium and exactly as described. Buying handcrafted from local artisans always feels great. Highly recommended!
                        </p>
                    </div>
                    {/* Review 3 */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex text-orange-400">
                                {[...Array(4)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                                <Star className="h-4 w-4 text-gray-300" />
                            </div>
                            <span className="text-sm font-medium text-foreground">Ananya Patel</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium mb-1">&quot;Lovely, but took a bit long&quot;</p>
                        <p className="text-sm text-muted-foreground">
                            The product itself is absolutely stunning with a pure ethnic charm. Taking one star off because shipping to Bangalore took 5 days, but definitely worth the wait.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
