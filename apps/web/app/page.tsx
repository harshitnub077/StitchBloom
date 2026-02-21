import Link from "next/link";
import { db } from "@/lib/auth";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, ShoppingBag, Star } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

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
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-background pt-24 pb-16">
                {/* Immersive glow background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <FadeIn delay={0.1}>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 drop-shadow-sm pb-4">
                                Handcrafted <br />
                                <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-500 bg-clip-text text-transparent italic pr-2">with Love.</span>
                            </h1>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <p className="mt-8 text-xl md:text-2xl leading-relaxed text-muted-foreground max-w-2xl mx-auto font-light">
                                Discover highly curated, premium handmade crochet items that bring warmth and artistic style to your life.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.4}>
                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link href="/products">
                                    <Button size="lg" className="rounded-full h-14 px-8 text-lg hover:-translate-y-1 transition-transform group">
                                        Explore Collection
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link href="/about">
                                    <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-white/10 hover:bg-white/5 hover:-translate-y-1 transition-transform backdrop-blur-md">
                                        Our Story
                                    </Button>
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 sm:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Stagger className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        <StaggerItem>
                            <div className="flex flex-col items-center text-center group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 shadow-lg">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary border border-primary/20 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500">
                                    <Package className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold font-heading text-white">Premium Materials</h3>
                                <p className="mt-3 text-muted-foreground leading-relaxed font-light">Crafted with the finest, sustainably sourced yarns for maximum comfort and durability.</p>
                            </div>
                        </StaggerItem>
                        <StaggerItem>
                            <div className="flex flex-col items-center text-center group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 shadow-lg">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary border border-primary/20 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500">
                                    <Star className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold font-heading text-white">Unique Designs</h3>
                                <p className="mt-3 text-muted-foreground leading-relaxed font-light">One-of-a-kind patterns and modern silhouettes you won&apos;t find anywhere else.</p>
                            </div>
                        </StaggerItem>
                        <StaggerItem>
                            <div className="flex flex-col items-center text-center group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 shadow-lg">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary border border-primary/20 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500">
                                    <ShoppingBag className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold font-heading text-white">Secure Checkout</h3>
                                <p className="mt-3 text-muted-foreground leading-relaxed font-light">Safe, encrypted payments and guaranteed global delivery from our studio to you.</p>
                            </div>
                        </StaggerItem>
                    </Stagger>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="bg-muted/30 py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex items-center justify-between">
                        <FadeIn direction="right">
                            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
                        </FadeIn>
                        <FadeIn direction="left">
                            <Link href="/products" className="hidden text-sm font-semibold text-primary hover:underline sm:block">
                                View all products <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </FadeIn>
                    </div>

                    {featuredProducts.length > 0 ? (
                        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts.map((product) => (
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
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center text-muted-foreground">
                            <p>No products found. Run the seed script to populate the store!</p>
                            <code className="mt-2 rounded bg-muted px-2 py-1 text-xs">pnpm db:seed</code>
                        </div>
                    )}

                    <div className="mt-8 text-center sm:hidden">
                        <Link href="/products">
                            <Button variant="ghost">View all products</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
