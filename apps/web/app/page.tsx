import Link from "next/link";
import { db } from "@/lib/auth";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, ShoppingBag, Star } from "lucide-react";

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
            <section className="relative overflow-hidden bg-primary/5 py-24 sm:py-32">
                <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-6xl">
                            Handcrafted with Love
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Discover unique, handmade crochet items that bring warmth and style to your life.
                            From cozy blankets to adorable amigurumi, find your perfect piece in the CrochetVerse.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href="/products">
                                <Button size="lg" className="gap-2 text-lg">
                                    Shop Now <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button variant="outline" size="lg" className="text-lg">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Decorative Background Elements */}
                <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                    <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Package className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold">Quality Materials</h3>
                            <p className="mt-2 text-muted-foreground">We use only the finest yarns and eco-friendly materials.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Star className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold">Unique Designs</h3>
                            <p className="mt-2 text-muted-foreground">One-of-a-kind patterns you won't find anywhere else.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <ShoppingBag className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold">Secure Checkout</h3>
                            <p className="mt-2 text-muted-foreground">Safe and easy payments with Stripe and Razorpay.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="bg-muted/30 py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex items-center justify-between">
                        <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
                        <Link href="/products" className="hidden text-sm font-semibold text-primary hover:underline sm:block">
                            View all products <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>

                    {featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={{
                                        ...product,
                                        price: product.price.toString(),
                                        category: product.category || undefined
                                    }}
                                />
                            ))}
                        </div>
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
