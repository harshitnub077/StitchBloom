import Link from "next/link";
import { db } from "@/lib/auth";
import { ProductCard } from "@/components/shop/ProductCard";
import { ArrowRight, MoveRight, Star, Leaf, Heart, Package } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { HeroSlider } from "@/components/motion/HeroSlider";

async function getFeaturedProducts() {
    try {
        const products = await db.product.findMany({
            where: { isActive: true },
            take: 8,
            orderBy: { createdAt: "desc" },
            include: { category: true },
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
        <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-black overflow-hidden font-sans">

            {/* ── Hero Section ── */}
            <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
                <HeroSlider />
                {/* Refined gradient for extreme contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background z-10 pointer-events-none" />

                <div className="relative z-20 pointer-events-none" />

                {/* Scroll indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 opacity-50">
                    <span className="text-white text-[8px] tracking-[0.6em] uppercase">Descend</span>
                    <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
                        <div className="w-full h-1/2 bg-white animate-[scroll_2s_ease-in-out_infinite]" />
                    </div>
                </div>
            </section>

            {/* ── Marquee / Trust Bar ── */}
            <section className="bg-secondary/40 py-5 overflow-hidden border-b border-white/5">
                <div className="flex items-center gap-16 whitespace-nowrap animate-[marquee_30s_linear_infinite]">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-16 flex-shrink-0">
                            {["Bespoke Devotion", "Uncompromising Fibers", "Legacy Artisans", "Global Delivery", "Impeccable Craft"].map((text) => (
                                <span key={text} className="text-[9px] uppercase tracking-[0.5em] text-white/50 font-light flex items-center gap-4">
                                    <span className="w-1 h-px bg-accent inline-block" />
                                    {text}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </section>



            {/* ── Featured Products ── */}
            <section className="py-40 bg-background">
                <div className="container mx-auto px-6 sm:px-8 max-w-7xl">
                    <FadeIn direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
                            <div className="max-w-2xl">
                                <span className="text-accent text-[9px] tracking-[0.5em] uppercase block mb-5">Curated Selection</span>
                                <h2 className="text-5xl md:text-7xl font-heading text-white tracking-wider font-light">
                                    Our Products
                                </h2>
                            </div>
                            <Link href="/products" className="inline-flex items-center gap-4 text-foreground/50 hover:text-white border-b border-white/20 hover:border-white pb-2 group transition-all">
                                <span className="uppercase tracking-[0.3em] text-[10px] font-medium">View Collection</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform stroke-1" />
                            </Link>
                        </div>
                    </FadeIn>

                    {featuredProducts.length > 0 ? (
                        <Stagger className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts.slice(0, 4).map((product: any) => (
                                <StaggerItem key={product.id}>
                                    <ProductCard
                                        product={{
                                            ...product,
                                            price: product.price.toString(),
                                            images: (product.images as unknown as string[]) || [],
                                            category: product.category || undefined
                                        }}
                                    />
                                </StaggerItem>
                            ))}
                        </Stagger>
                    ) : (
                        <div className="flex flex-col items-center justify-center border border-white/5 py-32 text-center bg-secondary/20 backdrop-blur-sm">
                            <p className="text-foreground/30 font-light tracking-[0.4em] uppercase text-xs">The vault is currently empty.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Shop By Category ── */}
            <section className="py-40 bg-secondary/20 border-y border-white/5">
                <div className="container mx-auto px-6 sm:px-8 max-w-[1400px]">
                    <FadeIn direction="up">
                        <div className="text-center mb-24">
                            <span className="text-accent text-[9px] tracking-[0.5em] uppercase font-bold block mb-5">Categorical Elegance</span>
                            <h2 className="text-5xl md:text-7xl font-heading text-white tracking-widest font-light">By Discipline</h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                href: "/products?category=decor",
                                label: "Crochet Flowers",
                                sub: "Botanical Decor",
                                img: "/images/hero/flower.jpg",
                            },
                            {
                                href: "/products?category=accessories",
                                label: "Keychains",
                                sub: "Handcrafted Charms",
                                img: "/images/hero/keychain.jpg",
                            },
                            {
                                href: "/products?category=textiles",
                                label: "Hair Bands",
                                sub: "Elegant Woven Wraps",
                                img: "/images/hero/band.jpg",
                            },
                        ].map((cat, i) => (
                            <FadeIn key={cat.label} delay={i * 0.15} direction="up">
                                <Link href={cat.href} className="group block relative overflow-hidden aspect-[3/4] shadow-2xl border border-white/5">
                                    <img
                                        src={cat.img}
                                        alt={cat.label}
                                        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105 filter grayscale-[0.5] group-hover:grayscale-0 brightness-75 group-hover:brightness-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="absolute bottom-0 left-0 p-10 w-full flex items-end justify-between z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                        <div>
                                            <p className="text-accent text-[9px] tracking-[0.5em] uppercase font-bold mb-3">{cat.sub}</p>
                                            <span className="font-heading text-3xl text-white tracking-wider font-light">{cat.label}</span>
                                        </div>
                                    </div>
                                    <div className="absolute top-10 right-10 w-12 h-12 border border-white/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 bg-black/40 backdrop-blur-sm group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-[600ms]">
                                        <ArrowRight className="h-5 w-5 stroke-1" />
                                    </div>
                                </Link>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── About / Story Section ── */}
            <section className="py-40 md:py-52 bg-background border-b border-white/5">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                        <FadeIn direction="right" className="relative aspect-[3/4] w-full max-w-lg mx-auto overflow-hidden group border border-white/10 p-4">
                            <div className="w-full h-full relative overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1000&auto=format&fit=crop"
                                    alt="Artisan at work"
                                    className="w-full h-full object-cover grayscale brightness-[0.7] transition-all duration-[2000ms] group-hover:scale-110 group-hover:grayscale-0"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 md:bottom-12 md:-right-12 bg-black border border-white/10 p-8 shadow-2xl max-w-[250px] z-10 hidden sm:block">
                                <p className="text-accent text-[9px] tracking-[0.5em] uppercase font-bold mb-3">Est. 2019</p>
                                <p className="font-heading text-white text-xl font-light">The Vanguard of Tradition</p>
                            </div>
                        </FadeIn>

                        <div className="flex flex-col justify-center">
                            <FadeIn direction="left" delay={0.2}>
                                <span className="text-accent text-[9px] tracking-[0.5em] uppercase font-bold block mb-6">Our DNA</span>
                                <h2 className="text-5xl md:text-7xl font-heading text-white tracking-wide mb-10 leading-none font-light">
                                    Sculpted by<br />Human Hands
                                </h2>
                                <p className="text-base text-foreground/60 leading-loose font-light mb-8 max-w-md">
                                    Every meticulously woven artifact in the StitchBloom compendium is a monument to centuries-old techniques, fiercely preserved by Indian masters.
                                </p>
                                <p className="text-sm text-foreground/40 leading-relaxed font-light mb-14 max-w-md">
                                    We reject the mechanical in favor of the deeply personal. From structural tapestries to uncompromising interior forms, we bring raw emotion into modern architecture.
                                </p>

                                <div className="grid grid-cols-2 gap-12 mb-14 border-y border-white/10 py-10 max-w-lg">
                                    <div>
                                        <p className="text-4xl font-heading text-white font-light">40<span className="text-accent">+</span></p>
                                        <p className="text-[9px] uppercase tracking-[0.4em] text-foreground/40 mt-3">Maestros</p>
                                    </div>
                                    <div>
                                        <p className="text-4xl font-heading text-white font-light">12<span className="text-accent">+</span></p>
                                        <p className="text-[9px] uppercase tracking-[0.4em] text-foreground/40 mt-3">Disciplines</p>
                                    </div>
                                </div>

                                <Link href="/about" className="inline-flex items-center gap-6 text-white border-b border-white hover:border-accent hover:text-accent pb-2 transition-all duration-500 w-fit group">
                                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Uncover The Truth</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform stroke-1" />
                                </Link>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="py-32 md:py-48 bg-secondary/10 relative overflow-hidden border-b border-white/5">
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <FadeIn>
                        <div className="text-center mb-24">
                            <span className="text-accent text-[9px] tracking-[0.5em] uppercase block mb-5 font-bold">Patrons</span>
                            <h2 className="text-4xl md:text-6xl font-heading text-white tracking-wide font-light">Testaments of Devotion</h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                        {[
                            {
                                quote: "Owning a StitchBloom piece is like holding a silent conversation with history. The quality is extraordinary.",
                                name: "A. Gupta",
                                role: "Collector",
                            },
                            {
                                quote: "The sustainability mission drew me in, but the sheer artistry makes me a loyal advocate.",
                                name: "K. Sengupta",
                                role: "Heritage Scholar",
                            },
                        ].map((review, i) => (
                            <FadeIn key={review.name} delay={i * 0.2} direction={i === 0 ? "right" : "left"}>
                                <div className="bg-background border border-white/5 p-12 hover:border-accent/40 transition-all duration-700 group h-full flex flex-col justify-between shadow-xl">
                                    <div>
                                        <div className="flex gap-1 text-accent mb-8 opacity-60">
                                            {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                                        </div>
                                        <p className="text-sm text-foreground/70 italic font-light leading-relaxed mb-10">&quot;{review.quote}&quot;</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="text-white text-[10px] tracking-widest font-bold uppercase">{review.name}</p>
                                            <p className="text-foreground/40 text-[8px] uppercase tracking-[0.3em] mt-1">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="py-44 md:py-60 bg-background relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: "radial-gradient(circle at 50% 50%, #262626 0%, transparent 60%)"}} />
                <FadeIn>
                    <div className="text-center space-y-14 max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
                        <span className="text-accent text-[9px] tracking-[0.6em] uppercase block">Acquisition</span>
                        <h2 className="text-6xl md:text-9xl font-heading text-white tracking-[0.1em] leading-none font-light uppercase">
                            The Archive
                        </h2>
                        <div className="w-[1px] h-16 bg-accent/50 mx-auto" />
                        <div className="pt-4 flex flex-col sm:flex-row gap-8 justify-center w-full">
                            <Link
                                href="/products"
                                className="group flex items-center justify-center gap-6 bg-white text-black px-14 py-6 hover:bg-accent transition-all duration-[600ms]"
                            >
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Procure Pieces</span>
                                <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform stroke-1" />
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </section>

        </main>
    );
}
