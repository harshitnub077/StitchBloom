"use client";

import { useProductFilters } from "@/hooks/use-product-filters";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        <div className="space-y-10 p-6 glass rounded-2xl">
            <div className="space-y-6">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-semibold text-white/40 border-b border-white/5 pb-2">Collections</h3>
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
                                    "flex items-center justify-between group transition-all duration-300 px-2 py-1 rounded-lg hover:bg-white/5",
                                    isActive ? "text-white translate-x-2" : "text-white/40"
                                )}
                            >
                                <span className={cn(
                                    "text-sm tracking-widest uppercase font-medium",
                                    isActive ? "font-bold" : "font-normal group-hover:text-white/80"
                                )}>
                                    {category.name}
                                </span>
                                {isActive && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-semibold text-white/40 border-b border-white/5 pb-2">Filter & Sort</h3>
                <div className="space-y-4">
                    <div className="relative group">
                        <select
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 appearance-none focus:outline-none focus:ring-1 focus:ring-white/20 transition-all cursor-pointer group-hover:border-white/20"
                            value={currentSort || "newest"}
                            onChange={(e) => setFilter("sort", e.target.value)}
                        >
                            <option value="newest" className="bg-zinc-900 border-none">Newest Artifacts</option>
                            <option value="price-asc" className="bg-zinc-900 border-none">Price: Low to High</option>
                            <option value="price-desc" className="bg-zinc-900 border-none">Price: High to Low</option>
                            <option value="name-asc" className="bg-zinc-900 border-none">Name: A-Z</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 group-hover:text-white/60 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                variant="ghost"
                className="w-full text-[10px] uppercase tracking-[0.3em] border border-white/5 hover:bg-white hover:text-black rounded-xl py-6 transition-all duration-500 disabled:opacity-20"
                onClick={clearFilters}
                disabled={!currentCategory && !currentSort}
            >
                Reset Archive
            </Button>
        </div>
    );
}
