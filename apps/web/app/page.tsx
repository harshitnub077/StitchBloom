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
        <main className="min-h-screen bg-[#FCFBF7] text-primary selection:bg-primary selection:text-white mt-16 overflow-hidden">

            {/* ── Hero Section ── */}
            <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
                <HeroSlider />
                {/* Warm overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50 z-10 pointer-events-none" />

                <div className="relative z-20 text-center flex flex-col items-center justify-center px-4 w-full max-w-5xl mx-auto">
                    <FadeIn delay={0.2} direction="up">
                        <span className="inline-block uppercase tracking-[0.5em] text-[10px] md:text-xs text-[#C9A96E] mb-6 font-semibold drop-shadow-sm bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
                            The Art of Indian Crochet
                        </span>
                    </FadeIn>
                    <FadeIn delay={0.4} direction="up">
                        <h1 className="text-6xl md:text-9xl font-heading font-normal text-white tracking-[0.06em] mb-6 leading-none">
                            Stitch<span className="text-[#C9A96E] italic font-light">Bloom</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.6} direction="up">
                        <p className="text-base md:text-lg font-light text-white/75 mb-12 max-w-xl mx-auto tracking-wider">
                            Handcrafted crochet creations born from the soul of Indian artistry. Every thread tells a story.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.8} direction="up">
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <Link
                                href="/products"
                                className="group flex items-center gap-4 bg-[#1A4D3E] text-white px-10 py-4 rounded-full hover:bg-[#0B3028] transition-all duration-500 shadow-lg hover:shadow-xl"
                            >
                                <span className="text-[11px] font-bold tracking-[0.25em] uppercase">Shop Collection</span>
                                <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <Link
                                href="/about"
                                className="flex items-center gap-3 text-white/80 hover:text-white border-b border-white/40 hover:border-white pb-1 transition-all duration-300"
                            >
                                <span className="text-[11px] font-medium tracking-[0.25em] uppercase">Our Story</span>
                            </Link>
                        </div>
                    </FadeIn>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
                    <span className="text-white text-[9px] tracking-[0.4em] uppercase">Scroll</span>
                    <div className="w-px h-8 bg-white/50 animate-pulse" />
                </div>
            </section>

            {/* ── Marquee / Trust Bar ── */}
            <section className="bg-[#1A4D3E] py-4 overflow-hidden">
                <div className="flex items-center gap-12 whitespace-nowrap animate-[marquee_20s_linear_infinite]">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-12 flex-shrink-0">
                            {["Handcrafted with Love", "100% Natural Fibers", "40+ Master Artisans", "Free Shipping Pan-India", "Authentic Indian Crochet", "Made-to-Order Available"].map((text) => (
                                <span key={text} className="text-[11px] uppercase tracking-[0.35em] text-white/70 font-medium flex items-center gap-3">
                                    <span className="w-1 h-1 rounded-full bg-[#C9A96E] inline-block" />
                                    {text}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Value Props ── */}
            <section className="py-20 bg-[#FCFBF7] border-b border-primary/8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { icon: Leaf, title: "Sustainable Craft", desc: "100% organic natural fibers, sustainably sourced from Indian farms." },
                            { icon: Heart, title: "Made with Love", desc: "Every piece is handmade by skilled artisans with decades of experience." },
                            { icon: Package, title: "Ships Across India", desc: "Free pan-India shipping. Carefully packaged in eco-friendly materials." },
                        ].map(({ icon: Icon, title, desc }, i) => (
                            <FadeIn key={title} delay={i * 0.15} direction="up">
                                <div className="flex flex-col items-center text-center gap-5 p-8 rounded-2xl bg-white border border-primary/8 hover:border-[#C9A96E]/50 hover:shadow-lg transition-all duration-500 group">
                                    <div className="w-14 h-14 rounded-full bg-[#F0EBE0] flex items-center justify-center group-hover:bg-[#1A4D3E] transition-colors duration-500">
                                        <Icon className="w-7 h-7 text-[#1A4D3E] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-lg text-primary tracking-wider mb-2">{title}</h3>
                                        <p className="text-sm text-primary/55 leading-relaxed font-light">{desc}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Products ── */}
            <section className="py-24 md:py-32 bg-[#FCFBF7]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <FadeIn direction="up">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div>
                                <span className="text-[#C9A96E] text-[10px] tracking-[0.45em] uppercase font-bold block mb-3">Handpicked for You</span>
                                <h2 className="text-4xl md:text-6xl font-heading text-primary tracking-wide">
                                    New Arrivals
                                </h2>
                            </div>
                            <Link href="/products" className="inline-flex items-center gap-3 text-primary/70 hover:text-primary border-b border-primary/30 hover:border-primary pb-1 group transition-all">
                                <span className="uppercase tracking-widest text-xs font-semibold">View All Products</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </FadeIn>

                    {featuredProducts.length > 0 ? (
                        <Stagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts.slice(0, 4).map((product) => (
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
                        <div className="flex flex-col items-center justify-center border border-primary/15 rounded-2xl py-24 text-center">
                            <p className="text-primary/40 font-light tracking-wide uppercase text-sm">New collection coming soon.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Shop By Category ── */}
            <section className="py-24 md:py-32 bg-[#F5F0E8]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <span className="text-[#C9A96E] text-[10px] tracking-[0.45em] uppercase font-bold block mb-3">Browse by Category</span>
                            <h2 className="text-4xl md:text-6xl font-heading text-primary tracking-wide">Curated Collections</h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            {
                                href: "/products?category=decor",
                                label: "Home Décor",
                                sub: "Mandalas, Wall Art & Baskets",
                                img: "https://images.unsplash.com/photo-1614633833026-00206faf3f3f?q=80&w=800&auto=format&fit=crop",
                            },
                            {
                                href: "/products?category=accessories",
                                label: "Accessories",
                                sub: "Bags, Jewellery & More",
                                img: "https://images.unsplash.com/photo-1544441892-0b815668ca82?q=80&w=800&auto=format&fit=crop",
                            },
                            {
                                href: "/products?category=textiles",
                                label: "Textiles",
                                sub: "Throws, Cushions & Runners",
                                img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop",
                            },
                        ].map((cat, i) => (
                            <FadeIn key={cat.label} delay={i * 0.15} direction="up">
                                <Link href={cat.href} className="group block relative overflow-hidden aspect-[3/4] rounded-3xl shadow-md hover:shadow-2xl transition-all duration-700">
                                    <img
                                        src={cat.img}
                                        alt={cat.label}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B3028]/80 via-[#0B3028]/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-8 w-full flex items-end justify-between">
                                        <div>
                                            <p className="text-[#C9A96E] text-[9px] tracking-[0.4em] uppercase font-bold mb-1">{cat.sub}</p>
                                            <span className="font-heading text-2xl text-white tracking-wide">{cat.label}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:bg-[#C9A96E] group-hover:border-[#C9A96E] transition-all duration-500">
                                            <ArrowRight className="h-4 w-4 text-white" />
                                        </div>
                                    </div>
                                </Link>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── About / Story Section ── */}
            <section className="py-24 md:py-40 bg-[#FCFBF7]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                        <FadeIn direction="right" className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden group rounded-3xl shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1000&auto=format&fit=crop"
                                alt="Artisan at work"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            {/* Floating badge */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-primary/5">
                                <p className="text-[#C9A96E] text-[9px] tracking-[0.4em] uppercase font-bold mb-1">Est. 2019</p>
                                <p className="font-heading text-primary text-lg">Preserving Ancient Roots</p>
                            </div>
                        </FadeIn>

                        <div className="flex flex-col justify-center">
                            <FadeIn direction="left" delay={0.2}>
                                <span className="text-[#C9A96E] text-[10px] tracking-[0.45em] uppercase font-bold block mb-4">Our Heritage</span>
                                <h2 className="text-4xl md:text-5xl font-heading text-primary tracking-wide mb-6 leading-tight">
                                    Crafted by<br />Indian Hands
                                </h2>
                                <p className="text-base text-primary/65 leading-relaxed font-light mb-6">
                                    Every piece in the StitchBloom collection is a testament to centuries-old techniques passed down through generations of Indian artisans. We believe in the power of the human hand to create objects of profound beauty and lasting quality.
                                </p>
                                <p className="text-sm text-primary/45 leading-relaxed font-light mb-10 italic">
                                    From intricate mandala wall art to deeply textured home décor, StitchBloom brings the raw, unfiltered essence of Indian crochet into modern homes.
                                </p>

                                <div className="flex gap-12 mb-10">
                                    <div>
                                        <p className="text-3xl font-heading text-[#1A4D3E] font-bold">40+</p>
                                        <p className="text-[10px] uppercase tracking-widest text-primary/40 mt-1">Master Artisans</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-heading text-[#1A4D3E] font-bold">500+</p>
                                        <p className="text-[10px] uppercase tracking-widest text-primary/40 mt-1">Happy Customers</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-heading text-[#1A4D3E] font-bold">12+</p>
                                        <p className="text-[10px] uppercase tracking-widest text-primary/40 mt-1">Craft Techniques</p>
                                    </div>
                                </div>

                                <Link href="/about" className="inline-flex items-center gap-4 bg-[#1A4D3E] text-white px-8 py-4 rounded-full hover:bg-[#0B3028] transition-all duration-500 w-fit">
                                    <span className="text-[11px] font-bold tracking-[0.25em] uppercase">Discover Our Story</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── The Process ── */}
            <section className="py-24 md:py-40 bg-[#1A4D3E]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <FadeIn>
                        <div className="text-center mb-20">
                            <span className="text-[#C9A96E] text-[10px] tracking-[0.45em] uppercase font-bold block mb-3">Behind Every Stitch</span>
                            <h2 className="text-4xl md:text-6xl font-heading text-white tracking-wide">Our Process</h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                step: "01",
                                title: "Curation",
                                desc: "We hand-select the finest organic fibers from sustainable Indian farms.",
                                img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop",
                            },
                            {
                                step: "02",
                                title: "Crafting",
                                desc: "Each piece is handwoven with complete presence and devotion by our artisans.",
                                img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
                            },
                            {
                                step: "03",
                                title: "Finishing",
                                desc: "Meticulous quality checks ensure every detail meets our heritage standard.",
                                img: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?q=80&w=800&auto=format&fit=crop",
                            },
                        ].map((item, i) => (
                            <FadeIn key={item.step} delay={i * 0.2}>
                                <div className="group cursor-default">
                                    <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6 relative">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B3028]/70 via-transparent to-transparent" />
                                        <div className="absolute top-5 left-5 bg-[#C9A96E] rounded-full w-10 h-10 flex items-center justify-center">
                                            <span className="text-white text-[11px] font-black">{item.step}</span>
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-heading text-white tracking-wider mb-2">{item.title}</h4>
                                    <p className="text-sm text-white/50 leading-relaxed italic font-light">{item.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── More Products ── */}
            {featuredProducts.length > 4 && (
                <section className="py-24 bg-[#FCFBF7]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <FadeIn direction="up">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                                <div>
                                    <span className="text-[#C9A96E] text-[10px] tracking-[0.45em] uppercase font-bold block mb-3">More to Explore</span>
                                    <h2 className="text-4xl md:text-5xl font-heading text-primary tracking-wide">Popular Picks</h2>
                                </div>
                                <Link href="/products" className="inline-flex items-center gap-3 text-primary/70 hover:text-primary border-b border-primary/30 hover:border-primary pb-1 group transition-all">
                                    <span className="uppercase tracking-widest text-xs font-semibold">See All</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </FadeIn>
                        <Stagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts.slice(4, 8).map((product) => (
                                <StaggerItem key={product.id}>
                                    <ProductCard
                                        product={{
                                            ...product,
                                            price: product.price.toString(),
                                            images: (product.images as unknown as string[]) || [],
                                            category: product.category || undefined,
                                        }}
                                    />
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </div>
                </section>
            )}

            {/* ── Artisan Spotlight ── */}
            <section className="py-24 md:py-40 bg-[#F5F0E8]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                        <FadeIn direction="right">
                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl group">
                                <img
                                    src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop"
                                    alt="Featured Artisan"
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B3028]/70 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-primary/5 shadow-lg">
                                    <p className="text-[#C9A96E] text-[9px] tracking-[0.4em] uppercase font-bold mb-1">Featured Artisan</p>
                                    <h3 className="text-xl font-heading text-primary tracking-wide">Smt. Lakshmi Devi</h3>
                                    <p className="text-xs text-primary/55 mt-2 italic">Rajasthan, India — 30+ years of handcraft mastery</p>
                                </div>
                            </div>
                        </FadeIn>

                        <div className="space-y-8">
                            <FadeIn direction="left" delay={0.2}>
                                <span className="text-[#C9A96E] text-[10px] tracking-[0.45em] uppercase font-bold block mb-4">Behind the Thread</span>
                                <h2 className="text-4xl md:text-5xl font-heading text-primary tracking-wide leading-tight mb-6">
                                    The Souls of<br />StitchBloom
                                </h2>
                                <blockquote className="border-l-4 border-[#C9A96E] pl-6 py-2 mb-6">
                                    <p className="text-base text-primary/65 italic leading-relaxed font-light">
                                        "Each knot is a prayer for the preservation of our soil's history. We don't just make things — we pass on a living tradition."
                                    </p>
                                    <cite className="text-[10px] uppercase tracking-widest text-primary/40 font-bold mt-3 block not-italic">— Smt. Lakshmi Devi</cite>
                                </blockquote>
                                <p className="text-sm text-primary/55 leading-relaxed font-light">
                                    We partner with over 40 master artisans across rural India, ensuring the ancient rhythms of handweaving and slow-art are preserved and celebrated.
                                </p>
                                <Link href="/about" className="inline-flex items-center gap-4 mt-8 text-[#1A4D3E] border-b border-[#1A4D3E]/30 hover:border-[#C9A96E] pb-1.5 transition-all group">
                                    <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Meet Our Artisans</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="py-24 md:py-40 bg-[#FCFBF7] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#C9A96E]/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#1A4D3E]/5 translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <span className="text-[#C9A96E] text-[10px] tracking-[0.45em] uppercase font-bold block mb-3">What Our Customers Say</span>
                            <h2 className="text-4xl md:text-5xl font-heading text-primary tracking-wide">Loved by Many</h2>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                quote: "Owning a StitchBloom piece is like holding a silent conversation with history. The quality is extraordinary — every stitch speaks of devotion.",
                                name: "Mrs. Ananya Gupta",
                                role: "Collector since 2024",
                            },
                            {
                                quote: "The sustainability mission is what drew me in, but the sheer artistry is what makes me a loyal advocate. I've gifted StitchBloom pieces to everyone I love.",
                                name: "Mr. Kabir Sengupta",
                                role: "Heritage Custodian",
                            },
                        ].map((review, i) => (
                            <FadeIn key={review.name} delay={i * 0.2} direction={i === 0 ? "right" : "left"}>
                                <div className="bg-white rounded-3xl p-10 border border-primary/8 hover:border-[#C9A96E]/40 hover:shadow-xl transition-all duration-500 group">
                                    <div className="flex gap-1 text-[#C9A96E] mb-6">
                                        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <p className="text-base text-primary/70 italic font-light leading-relaxed mb-8">"{review.quote}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#F0EBE0] border border-primary/10 flex items-center justify-center">
                                            <span className="text-[#1A4D3E] font-heading text-sm font-bold">{review.name[0]}</span>
                                        </div>
                                        <div>
                                            <p className="text-primary text-[11px] tracking-wider font-bold uppercase">{review.name}</p>
                                            <p className="text-primary/40 text-[9px] uppercase tracking-widest mt-0.5">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="py-24 md:py-40 bg-[#1A4D3E] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: "radial-gradient(circle at 30% 50%, #C9A96E 0%, transparent 60%), radial-gradient(circle at 70% 50%, #C9A96E 0%, transparent 60%)"}} />
                <FadeIn>
                    <div className="text-center space-y-8 max-w-3xl mx-auto px-4 relative z-10">
                        <span className="text-[#C9A96E] text-[10px] tracking-[0.45em] uppercase font-bold block">Begin Your Journey</span>
                        <h2 className="text-5xl md:text-8xl font-heading text-white tracking-[0.05em] leading-none">
                            Shop the<br /><span className="text-[#C9A96E]">Collection</span>
                        </h2>
                        <p className="text-white/55 tracking-wide text-sm font-light max-w-md mx-auto leading-relaxed">
                            Discover handcrafted crochet pieces made with love by Indian artisans. Each one unique, each one yours.
                        </p>
                        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/products"
                                className="group flex items-center justify-center gap-4 bg-[#C9A96E] text-white px-12 py-5 rounded-full hover:bg-[#B8965C] transition-all duration-500 shadow-lg hover:shadow-xl"
                            >
                                <span className="text-[11px] font-black tracking-[0.3em] uppercase">Shop Now</span>
                                <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <Link
                                href="/about"
                                className="flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-5 rounded-full hover:border-white hover:bg-white/10 transition-all duration-500"
                            >
                                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Learn More</span>
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </section>

            {/* Marquee keyframes */}
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }
            `}</style>
        </main>
    );
}
