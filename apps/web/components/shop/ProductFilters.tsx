"use client";

import { useProductFilters } from "@/hooks/use-product-filters";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// This should ideally be fetched from the API or passed as props
const CATEGORIES = [
    { name: "Decor", slug: "decor" },
    { name: "Accessories", slug: "accessories" },
    { name: "Textiles", slug: "textiles" },
];

export function ProductFilters() {
    const { searchParams, setFilter, clearFilters } = useProductFilters();
    const currentCategory = searchParams.get("category");
    const currentSort = searchParams.get("sort");

    return (
        <div className="space-y-10 p-8 bg-white border border-primary/10 rounded-3xl shadow-lg">
            <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary/60 border-b border-primary/10 pb-3">Collections</h3>
                <div className="flex flex-col gap-3">
                    {CATEGORIES.map((category) => {
                        const isActive = currentCategory === category.slug;
                        return (
                            <button
                                key={category.slug}
                                onClick={() =>
                                    setFilter(
                                        "category",
                                        isActive ? null : category.slug
                                    )
                                }
                                className={cn(
                                    "flex items-center justify-between group transition-all duration-300 px-3 py-2 rounded-xl hover:bg-[#F5F0E8]",
                                    isActive ? "text-primary translate-x-2 bg-[#F5F0E8]" : "text-primary/70"
                                )}
                            >
                                <span className={cn(
                                    "text-xs tracking-widest uppercase font-semibold",
                                    isActive ? "font-bold" : "font-medium group-hover:text-primary"
                                )}>
                                    {category.name}
                                </span>
                                {isActive && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A4D3E] shadow-sm" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary/60 border-b border-primary/10 pb-3">Sort By</h3>
                <div className="space-y-4">
                    <div className="relative group">
                        <select
                            className="w-full bg-[#FCFBF7] border border-primary/10 rounded-xl px-5 py-4 text-xs tracking-widest uppercase font-semibold text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-[#1A4D3E] transition-all cursor-pointer hover:border-primary/20"
                            value={currentSort || "newest"}
                            onChange={(e) => setFilter("sort", e.target.value)}
                        >
                            <option value="newest" className="bg-white border-none py-2 text-primary">New Arrivals</option>
                            <option value="price-asc" className="bg-white border-none py-2 text-primary">Price: Low to High</option>
                            <option value="price-desc" className="bg-white border-none py-2 text-primary">Price: High to Low</option>
                            <option value="name-asc" className="bg-white border-none py-2 text-primary">Name: A-Z</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40 group-hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                variant="ghost"
                className="w-full text-[10px] bg-[#FCFBF7] uppercase tracking-[0.4em] font-bold text-primary border border-primary/10 hover:bg-[#1A4D3E] hover:text-white rounded-xl py-6 transition-all duration-500 disabled:opacity-30 disabled:hover:bg-[#FCFBF7] disabled:hover:text-primary"
                onClick={clearFilters}
                disabled={!currentCategory && !currentSort}
            >
                Reset Filters
            </Button>
        </div>
    );
}
