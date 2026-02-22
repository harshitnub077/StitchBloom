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
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-gray-100 flex items-center justify-center">
                {/* Placeholder Hero Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop"
                        alt="StitchBloom Hero Collection"
                        className="w-full h-full object-cover opacity-90"
                    />
                </div>

                {/* Hero Overlay Content */}
                <div className="relative z-10 text-center flex flex-col items-center justify-center px-4">
                    <FadeIn delay={0.1}>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white drop-shadow-lg tracking-wide mb-4">
                            Authentic Indian Handicrafts
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 drop-shadow-md tracking-wider mb-8 font-medium">
                            Proudly Woven & Handcrafted in India
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <Link href="/products">
                            <Button size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-widest uppercase transition-all shadow-md">
                                Shop Collection
                            </Button>
                        </Link>
                    </FadeIn>
                </div>
            </section>

            {/* Shop By Category Section */}
            <section className="py-16 md:py-24 bg-primary text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn direction="up">
                        <h2 className="text-2xl md:text-3xl font-heading tracking-widest uppercase mb-12 text-center md:text-left">
                            Shop By Category
                        </h2>
                    </FadeIn>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Category 1 */}
                        <FadeIn delay={0.1}>
                            <Link href="/products?category=decor" className="group block bg-white">
                                <div className="aspect-square relative overflow-hidden bg-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1515286202422-9df7be74a6cf?q=80&w=800&auto=format&fit=crop"
                                        alt="Home Decor"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-4 flex items-center justify-between text-foreground">
                                    <span className="font-medium">Home Decor</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                            </Link>
                        </FadeIn>

                        {/* Category 2 */}
                        <FadeIn delay={0.2}>
                            <Link href="/products?category=accessories" className="group block bg-white">
                                <div className="aspect-square relative overflow-hidden bg-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=800&auto=format&fit=crop"
                                        alt="Bags + Accessories"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-4 flex items-center justify-between text-foreground">
                                    <span className="font-medium">Bags + Accessories</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                            </Link>
                        </FadeIn>

                        {/* Category 3 */}
                        <FadeIn delay={0.3}>
                            <Link href="/products?category=bags-and-purses" className="group block bg-white">
                                <div className="aspect-square relative overflow-hidden bg-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop"
                                        alt="Storage Organizers"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-4 flex items-center justify-between text-foreground">
                                    <span className="font-medium">Purses & Totes</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                            </Link>
                        </FadeIn>

                        {/* Category 4 */}
                        <FadeIn delay={0.4}>
                            <Link href="/products" className="group block bg-white">
                                <div className="aspect-square relative overflow-hidden bg-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1550977186-c4582f219ce0?q=80&w=800&auto=format&fit=crop"
                                        alt="Table Covers & Runners"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-4 flex items-center justify-between text-foreground">
                                    <span className="font-medium">Tableware & Mats</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                            </Link>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Featured Products Section (Handicrafts/Tableware vibe) */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex items-center justify-between">
                        <FadeIn direction="right">
                            <h2 className="text-3xl md:text-4xl font-heading text-foreground tracking-wide">
                                Handicrafts
                            </h2>
                        </FadeIn>
                        <FadeIn direction="left">
                            <Link href="/products">
                                <Button variant="outline" className="hidden sm:flex rounded-none border-gray-300 text-foreground hover:bg-gray-50 uppercase tracking-widest text-xs">
                                    View All
                                </Button>
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
                        <div className="flex flex-col items-center justify-center border border-gray-200 py-16 text-center text-muted-foreground">
                            <p>No products found. Run the seed script to populate the store!</p>
                            <code className="mt-2 text-xs bg-gray-100 p-1 rounded">pnpm db:seed</code>
                        </div>
                    )}

                    <div className="mt-10 text-center sm:hidden">
                        <Link href="/products">
                            <Button variant="outline" className="rounded-none border-gray-300 text-foreground uppercase tracking-widest text-xs w-full">
                                View All
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
