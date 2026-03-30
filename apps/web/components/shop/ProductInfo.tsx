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
        <div className="flex flex-col gap-10">
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-medium">Artifact Archive</span>
                    <div className="h-px w-8 bg-white/20" />
                </div>
                <h1 className="text-4xl md:text-5xl font-heading tracking-widest text-white leading-tight uppercase">
                    {product.name}
                </h1>
                <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Acquisition Investment</span>
                        <span className="text-3xl font-bold text-white tracking-widest leading-none">
                            {formatPrice(Number(product.price))}
                        </span>
                    </div>
                    {product.stock > 0 ? (
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            <span className="text-[10px] uppercase tracking-widest text-white/80 font-medium">Currently Available</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            <span className="text-[10px] uppercase tracking-widest text-white/80 font-medium">Archive Preserved</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-white/60 leading-relaxed font-light text-lg">
                        {product.description}
                    </p>
                </div>
                
                <div className="glass p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Star className="h-12 w-12 text-white" />
                    </div>
                    <p className="text-white font-heading text-sm tracking-[0.2em] uppercase flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-white/40" />
                        Heritage Craftsmanship
                    </p>
                    <p className="text-xs text-white/50 leading-relaxed font-light tracking-wide italic">
                        This piece is a vessel of Indian tradition, meticulously handcrafted using centuries-old techniques. Each stitch tells a story of patience, skill, and cultural heritage, supporting artisanal communities across Bharat.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-6 pt-4">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Unit Quantity</span>
                    <div className="relative group">
                        <select
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white appearance-none focus:outline-none focus:ring-1 focus:ring-white/20 transition-all cursor-pointer min-w-[100px] font-medium"
                        >
                            {[...Array(Math.min(10, product.stock)).keys()].map((i) => (
                                <option key={i + 1} value={i + 1} className="bg-zinc-900 border-none">
                                    {i + 1} Units
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 group-hover:text-white/60">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row pt-4">
                <Button
                    className={cn(
                        "flex-[2] uppercase tracking-[0.2em] text-xs py-8 rounded-2xl transition-all duration-1000 shadow-[0_0_30px_rgba(255,255,255,0.05)] group",
                        isAdded ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/20" : "bg-white text-black hover:bg-white/90"
                    )}
                    onClick={handleAddToCart}
                    disabled={isLoading || product.stock === 0}
                >
                    {isAdded ? (
                        <span className="flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Acquired Successfully
                        </span>
                    ) : (
                        <>
                            <ShoppingCart className="mr-3 h-4 w-4 group-hover:rotate-12 transition-transform" />
                            {isLoading ? "Integrating..." : "Add to Repository"}
                        </>
                    )}
                </Button>
                
                <div className="flex gap-4 flex-1">
                    <Button
                        variant="ghost"
                        className="flex-1 glass border border-white/5 hover:bg-white/10 text-white rounded-2xl p-0 aspect-square sm:aspect-auto"
                        onClick={handleWishlist}
                        title="Add to Wishlist"
                    >
                        <Heart className="h-5 w-5" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="flex-1 glass border border-white/5 hover:bg-white/10 text-white rounded-2xl p-0 aspect-square sm:aspect-auto" 
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
