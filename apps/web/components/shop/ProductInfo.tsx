"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@crochetverse/shared";
import { Heart, Share2, ShoppingCart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
    product: any; // Types should be imported
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const cart = useCart();
    const router = useRouter();

    const handleAddToCart = async () => {
        setIsLoading(true);
        try {
            await cart.addItem(product, quantity);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleWishlist = () => {
        alert("Toggled wishlist! (Simulation)");
    };

    return (
        <div className="flex flex-col gap-10 lg:pl-10">
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5C17C] font-bold">Curated Selection</span>
                    <div className="h-px w-10 bg-primary/10" />
                </div>
                <h1 className="text-4xl md:text-5xl font-heading tracking-wide text-primary leading-tight">
                    {product.name}
                </h1>
                <div className="flex items-center justify-between pt-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-1.5 font-bold">Investment</span>
                        <span className="text-3xl font-bold text-primary tracking-wide leading-none">
                            {formatPrice(Number(product.price))}
                        </span>
                    </div>
                    {product.stock > 0 ? (
                        <div className="flex items-center gap-2 bg-[#FCFBF7] border border-primary/10 px-4 py-2.5 rounded-full shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-[#1A4D3E] animate-pulse shadow-[0_0_8px_rgba(26,77,62,0.5)]" />
                            <span className="text-[10px] uppercase tracking-widest text-primary/80 font-bold">In Stock</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 bg-[#FCFBF7] border border-primary/10 px-4 py-2.5 rounded-full shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            <span className="text-[10px] uppercase tracking-widest text-primary/80 font-bold">Out of Stock</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-8">
                <div className="prose prose-sm max-w-none">
                    <p className="text-primary/70 leading-relaxed font-light text-lg">
                        {product.description}
                    </p>
                </div>
                
                <div className="bg-[#FCFBF7] border border-primary/5 p-8 rounded-3xl relative overflow-hidden group shadow-sm">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                        <Star className="h-16 w-16 text-primary" />
                    </div>
                    <p className="text-primary font-heading text-sm tracking-[0.2em] uppercase flex items-center gap-3 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5C17C]" />
                        Heritage Craftsmanship
                    </p>
                    <p className="text-sm text-primary/60 leading-relaxed font-light tracking-wide italic">
                        This piece is a vessel of Indian tradition, meticulously handcrafted using centuries-old techniques. Each stitch tells a story of patience, skill, and cultural heritage, supporting artisanal communities across Bharat.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
                <div className="flex flex-col gap-3 w-full max-w-[200px]">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60">Quantity</span>
                    <div className="relative group">
                        <select
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-[#1A4D3E] transition-all cursor-pointer font-medium shadow-sm hover:border-primary/20"
                        >
                            {[...Array(Math.min(10, product.stock)).keys()].map((i) => (
                                <option key={i + 1} value={i + 1} className="bg-white border-none py-2">
                                    {i + 1} Units
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40 group-hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row pt-6">
                <Button
                    className={cn(
                        "flex-[2] uppercase tracking-[0.2em] font-bold text-xs py-7 rounded-full transition-all duration-500 shadow-md group",
                        isAdded ? "bg-[#1A4D3E]/10 text-[#1A4D3E] border border-[#1A4D3E]/30" : "bg-[#1A4D3E] text-white hover:bg-[#E5C17C] hover:shadow-xl hover:-translate-y-1"
                    )}
                    onClick={handleAddToCart}
                    disabled={isLoading || product.stock === 0}
                >
                    {isAdded ? (
                        <span className="flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                            <div className="w-2 h-2 rounded-full bg-[#1A4D3E] animate-pulse" />
                            Added to Cart
                        </span>
                    ) : (
                        <>
                            <ShoppingCart className="mr-3 h-4 w-4 group-hover:rotate-12 transition-transform" />
                            {isLoading ? "Adding..." : "Add to Cart"}
                        </>
                    )}
                </Button>
                
                <div className="flex gap-4 flex-1">
                    <Button
                        variant="outline"
                        className="flex-1 bg-white border border-primary/10 hover:border-[#1A4D3E] hover:bg-[#FCFBF7] text-primary rounded-full p-0 aspect-square sm:aspect-auto transition-all shadow-sm"
                        onClick={handleWishlist}
                        title="Add to Wishlist"
                    >
                        <Heart className="h-5 w-5" />
                    </Button>
                    <Button 
                        variant="outline" 
                        className="flex-1 bg-white border border-primary/10 hover:border-[#1A4D3E] hover:bg-[#FCFBF7] text-primary rounded-full p-0 aspect-square sm:aspect-auto transition-all shadow-sm" 
                        title="Share"
                    >
                        <Share2 className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 text-[11px] text-white/40 pt-10 border-t border-white/5">
                <div>
                    <span className="font-semibold block text-white/80 uppercase tracking-widest mb-1">Archive ID</span>
                    {product.sku}
                </div>
                <div>
                    <span className="font-semibold block text-white/80 uppercase tracking-widest mb-1">Collection</span>
                    {product.category?.name}
                </div>
                <div className="col-span-2">
                    <span className="font-semibold block text-white/80 uppercase tracking-widest mb-1">Attributes</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {(typeof product.tags === 'string' ? product.tags.split(",") : product.tags || []).map((tag: string) => (
                            <span key={tag} className="bg-white/5 border border-white/5 px-3 py-1 rounded-full text-[10px] text-white/60">
                                {tag.trim()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Archive */}
            <div className="pt-12 mt-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-heading tracking-[0.2em] uppercase text-white">Collector Feedback</h3>
                    <div className="flex text-white/20 items-center gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                        <span className="text-[10px] ml-2 tracking-widest uppercase">Verified Archives</span>
                    </div>
                </div>
                
                <div className="space-y-10">
                    {/* Review 1 */}
                    <div className="glass p-8 rounded-3xl relative">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-xl">
                                PS
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-widest">Priya Sharma</h4>
                                <span className="text-[9px] text-white/30 uppercase tracking-tighter">Verified Acquisition • Mumbai</span>
                            </div>
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed italic font-light italic">
                            &quot;The level of detail in the craftsmanship is truly profound. It transcends typical commerce, feeling more like owning a piece of living history. A testament to Indian artistry.&quot;
                        </p>
                    </div>

                    {/* Review 2 */}
                    <div className="p-8 rounded-3xl border border-white/5 relative bg-white/[0.02]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-xl">
                                RD
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-widest">Rahul Desai</h4>
                                <span className="text-[9px] text-white/30 uppercase tracking-tighter">Verified Acquisition • Delhi</span>
                            </div>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed font-light">
                            &quot;Gifted this to my mother, she absolutely loved it. The material feels premium and exactly as described. Buying handcrafted from local artisans always feels great. Highly recommended!&quot;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
