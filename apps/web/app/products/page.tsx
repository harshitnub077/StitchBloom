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
                        { name: { contains: searchParams.search, mode: "insensitive" } },
                        {
                            description: {
                                contains: searchParams.search,
                                mode: "insensitive",
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
}

export default async function ProductsPage({ searchParams }: PageProps) {
    const products = await getProducts(searchParams);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-64 flex-shrink-0">
                    <ProductFilters />
                </aside>
                <main className="flex-1">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">Shop</h1>
                        <p className="text-muted-foreground mt-2">
                            Showing {products.length} results
                        </p>
                    </div>
                    <Suspense fallback={<div>Loading products...</div>}>
                        <ProductGrid products={products} />
                    </Suspense>
                </main>
            </div>
        </div>
    );
}
