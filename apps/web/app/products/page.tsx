import { Suspense } from "react";
import { Metadata } from "next";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { db } from "@/lib/auth";
import { Prisma } from "@crochetverse/database";

export const metadata: Metadata = {
    title: "Shop All | CrochetVerse",
    description: "Browse our extensive collection of yarn, hooks, and patterns.",
};

// Define search params type (Next.js 13+ Page Props)
interface PageProps {
    searchParams: {
        page?: string;
        search?: string;
        category?: string;
        minPrice?: string;
        maxPrice?: string;
        sort?: string;
    };
}

// Fetch products directly in Server Component
async function getProducts(searchParams: PageProps["searchParams"]) {
    const page = parseInt(searchParams.page || "1");
    const limit = 12;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
        isActive: true,
        AND: [
            searchParams.search
                ? {
                    OR: [
                        { name: { contains: searchParams.search } },
                        {
                            description: {
                                contains: searchParams.search,
                            },
                        },
                    ],
                }
                : {},
            searchParams.category
                ? {
                    category: {
                        slug: searchParams.category,
                    },
                }
                : {},
        ],
    };

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
    switch (searchParams.sort) {
        case "price-asc":
            orderBy = { price: "asc" };
            break;
        case "price-desc":
            orderBy = { price: "desc" };
            break;
        case "name-asc":
            orderBy = { name: "asc" };
            break;
        case "name-desc":
            orderBy = { name: "desc" };
            break;
    }

    try {
        const products = await db.product.findMany({
            where,
            skip,
            take: limit,
            orderBy,
            include: {
                category: true,
            },
        });

        return products;
    } catch (error) {
        console.error("Database connection failed:", error);
        return [];
    }
}

export default async function ProductsPage({ searchParams }: PageProps) {
    const products = await getProducts(searchParams);

    return (
        <div className="container mx-auto px-4 pt-40 pb-20 max-w-7xl">
            <div className="flex flex-col md:flex-row gap-12">
                <aside className="w-full md:w-64 flex-shrink-0">
                    <ProductFilters />
                </aside>
                <main className="flex-1">
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-heading tracking-wide mb-3 text-primary">Discover Collection</h1>
                        <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary/60">
                            Showing {products.length} crafted masterpieces
                        </p>
                    </div>
                    <Suspense fallback={<div className="flex justify-center py-20 text-primary/60 uppercase tracking-widest text-xs">Loading collection...</div>}>
                        <ProductGrid products={products.map(p => ({
                            ...p,
                            price: p.price.toString(),
                            images: (p.images as unknown as string[]) || [],
                            category: p.category || undefined
                        }))} />
                    </Suspense>
                </main>
            </div>
        </div>
    );
}
