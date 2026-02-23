import Link from "next/link";
import { db } from "@/lib/auth";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoveRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Marquee } from "@/components/ui/marquee";

async function getFeaturedProducts() {
    try {
        const products = await db.product.findMany({
            where: { isActive: true },
            take: 4,
            orderBy: { createdAt: "desc" },
            include: {
                category: true,
            },
        });
        return products;
    } catch (error) {
        console.error("Error fetching featured products:", error);
        return [];
    }
}

export default async function Home() {
    const featuredProducts = await getFeaturedProducts();

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black mt-16 overflow-hidden">
            {/* Hero Section */}
            <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1605813813133-7d72111fe1e2?q=80&w=2000&auto=format&fit=crop"
                        alt="StitchBloom Hero Collection"
                        className="w-full h-full object-cover scale-105 filter grayscale"
                        style={{ objectPosition: "center 30%" }}
                    />
                </div>

                <div className="relative z-20 text-center flex flex-col items-center justify-center px-4 w-full max-w-5xl mx-auto mt-20">
                    <FadeIn delay={0.2} direction="up">
                        <span className="uppercase tracking-[0.5em] text-sm md:text-base text-white/80 mb-6 block font-medium">
                            The Heritage Collection
                        </span>
                    </FadeIn>
                    <FadeIn delay={0.4} direction="up">
                        <h1 className="text-5xl md:text-8xl font-heading font-normal text-white tracking-wider mb-8 leading-tight">
                            INDIAN <br className="md:hidden" /> ARTISTRY
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.6} direction="up">
                        <Link href="/products" className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-300">
                            <span className="text-sm font-bold tracking-widest uppercase">Explore Pieces</span>
                            <div className="bg-black text-white rounded-full p-2 group-hover:translate-x-1 transition-transform">
                                <MoveRight className="w-4 h-4" />
                            </div>
                        </Link>
                    </FadeIn>
                </div>
            </section>

            {/* Marquee Section */}
            <Marquee text="PURE CRAFTSMANSHIP • ELEGANT DESIGN • HANDCRAFTED IN INDIA • SUSTAINABLE ART • " speed={25} />

            {/* About The Craft Section */}
            <section className="py-24 md:py-32 bg-black text-white border-b border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                        <FadeIn direction="right" className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1610488056250-7f28dc0737ee?q=80&w=1000&auto=format&fit=crop"
                                alt="Craftsmanship"
                                className="w-full h-full object-cover filter grayscale transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 border border-white/20 m-4 z-10 pointer-events-none" />
                        </FadeIn>

                        <div className="flex flex-col justify-center">
                            <FadeIn direction="left" delay={0.2}>
                                <h2 className="text-4xl md:text-5xl font-heading tracking-widest uppercase mb-8 leading-tight">
                                    Preserving <br /> Ancient Roots
                                </h2>
                                <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light mb-8">
                                    Every piece in our collection is a testament to the centuries-old techniques passed down through generations of Indian artisans. We believe in the power of the human hand to create objects of profound beauty and lasting quality.
                                </p>
                                <p className="text-base text-white/50 leading-relaxed font-light mb-10">
                                    From intricate weaves to deeply textured pottery, StitchBloom brings the raw, unfiltered essence of Indian heritage into modern, minimalist spaces.
                                </p>
                            </FadeIn>
                            <FadeIn direction="left" delay={0.4}>
                                <Link href="/about" className="inline-flex items-center gap-3 border-b border-white pb-1 group hover:text-white/70 transition-colors">
                                    <span className="uppercase tracking-widest text-sm font-medium">Our Story</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop By Category Section */}
            <section className="py-24 bg-white text-black">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <h2 className="text-4xl md:text-6xl font-heading tracking-widest uppercase">
                                Curated <br /> Collections
                            </h2>
                            <Link href="/products" className="inline-flex items-center gap-3 border-b border-black pb-1 group hover:text-black/70 transition-colors">
                                <span className="uppercase tracking-widest text-sm font-medium">View All</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Category 1 */}
                        <FadeIn delay={0.1}>
                            <Link href="/products?category=decor" className="group block relative overflow-hidden aspect-[3/4]">
                                <img
                                    src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop"
                                    alt="Home Decor"
                                    className="w-full h-full object-cover filter grayscale transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                                <div className="absolute bottom-0 left-0 p-8 w-full flex items-center justify-between text-white z-10">
                                    <span className="font-heading text-2xl tracking-widest uppercase">Decor</span>
                                    <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>

                        {/* Category 2 */}
                        <FadeIn delay={0.2}>
                            <Link href="/products?category=accessories" className="group block relative overflow-hidden aspect-[3/4]">
                                <img
                                    src="https://images.unsplash.com/photo-1588600878108-578307a3cc9d?q=80&w=800&auto=format&fit=crop"
                                    alt="Accessories"
                                    className="w-full h-full object-cover filter grayscale transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                                <div className="absolute bottom-0 left-0 p-8 w-full flex items-center justify-between text-white z-10">
                                    <span className="font-heading text-2xl tracking-widest uppercase">Accessories</span>
                                    <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>

                        {/* Category 3 */}
                        <FadeIn delay={0.3} className="sm:hidden md:block">
                            <Link href="/products?category=textiles" className="group block relative overflow-hidden aspect-[3/4]">
                                <img
                                    src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop"
                                    alt="Textiles"
                                    className="w-full h-full object-cover filter grayscale transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                                <div className="absolute bottom-0 left-0 p-8 w-full flex items-center justify-between text-white z-10">
                                    <span className="font-heading text-2xl tracking-widest uppercase">Textiles</span>
                                    <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-24 bg-black text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
                        <FadeIn direction="right">
                            <h2 className="text-3xl md:text-5xl font-heading tracking-widest uppercase">
                                Latest Objects
                            </h2>
                        </FadeIn>
                        <FadeIn direction="left">
                            <Link href="/products">
                                <Button variant="outline" className="hidden border-white text-white hover:bg-white hover:text-black uppercase tracking-widest text-xs rounded-none px-8 py-6">
                                    Explore The Archive
                                </Button>
                            </Link>
                        </FadeIn>
                    </div>

                    {featuredProducts.length > 0 ? (
                        <Stagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts.map((product) => (
                                <StaggerItem key={product.id}>
                                    <div className="filter grayscale hover:grayscale-0 transition-all duration-700">
                                        <ProductCard
                                            product={{
                                                ...product,
                                                price: product.price.toString(),
                                                images: (product.images as unknown as string[]) || [],
                                                category: product.category || undefined
                                            }}
                                        />
                                    </div>
                                </StaggerItem>
                            ))}
                        </Stagger>
                    ) : (
                        <div className="flex flex-col items-center justify-center border border-white/20 py-24 text-center text-white/50">
                            <p className="font-light tracking-wide uppercase">No artifacts in the archive currently.</p>
                        </div>
                    )}

                    <div className="mt-12 text-center md:hidden">
                        <Link href="/products">
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black uppercase tracking-widest text-xs rounded-none px-8 py-6 w-full">
                                Explore The Archive
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
