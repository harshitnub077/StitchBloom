"use client";

import { useProductFilters } from "@/hooks/use-product-filters";
import { Button } from "@/components/ui/button";

// This should ideally be fetched from the API or passed as props
const CATEGORIES = [
    { name: "Yarn", slug: "yarn" },
    { name: "Hooks", slug: "hooks" },
    { name: "Patterns", slug: "patterns" },
    { name: "Kits", slug: "kits" },
];

export function ProductFilters() {
    const { searchParams, setFilter, clearFilters } = useProductFilters();
    const currentCategory = searchParams.get("category");
    const currentSort = searchParams.get("sort");

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-sm font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category.slug}
                            onClick={() =>
                                setFilter(
                                    "category",
                                    currentCategory === category.slug ? null : category.slug
                                )
                            }
                            className={`block text-sm hover:underline ${currentCategory === category.slug
                                    ? "font-bold text-primary"
                                    : "text-muted-foreground"
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-4">Sort By</h3>
                <select
                    className="w-full p-2 border rounded-md text-sm bg-background"
                    value={currentSort || "newest"}
                    onChange={(e) => setFilter("sort", e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A-Z</option>
                </select>
            </div>

            <Button
                variant="outline"
                className="w-full"
                onClick={clearFilters}
                disabled={!currentCategory && !currentSort}
            >
                Clear Filters
            </Button>
        </div>
    );
}
