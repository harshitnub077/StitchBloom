"use client";

import { useRef, useState } from "react";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/use-search";
import Link from "next/link";
import { formatPrice } from "@crochetverse/shared";
import { useOnClickOutside } from "@/hooks/use-on-click-outside"; // Assume exists or I will create simplified in-file

// Simple hook if not exists
function useClickOutside(ref: any, handler: any) {
    useState(() => {
        if (typeof window !== "undefined") {
            const listener = (event: any) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        }
    });
}


export function SearchBar() {
    const { query, setQuery, results, loading, history, clearHistory, onSearch } = useSearch();
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // useClickOutside(containerRef, () => setOpen(false));

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onSearch(query);
            setOpen(false);
        }
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-sm">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    onKeyDown={handleKeyDown}
                />
                {query && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-9 w-9"
                        onClick={() => {
                            setQuery("");
                            setOpen(false);
                        }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {open && (query.length > 0 || history.length > 0) && (
                <div className="absolute top-full z-50 mt-2 w-full rounded-md border bg-popover p-2 shadow-md">

                    {/* Recent Searches */}
                    {query.length === 0 && history.length > 0 && (
                        <div className="mb-2">
                            <div className="flex justify-between px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                <span>Recent</span>
                                <button onClick={clearHistory} className="hover:text-foreground">Clear</button>
                            </div>
                            {history.map((term) => (
                                <div
                                    key={term}
                                    className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                                    onClick={() => {
                                        setQuery(term);
                                        onSearch(term);
                                        setOpen(false);
                                    }}
                                >
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span>{term}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Results */}
                    {query.length > 0 && (
                        <>
                            {loading ? (
                                <div className="p-4 text-center text-sm text-muted-foreground">Searching...</div>
                            ) : results.length > 0 ? (
                                <div className="space-y-1">
                                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Products</div>
                                    {results.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/products/${product.slug}`}
                                            className="flex items-center gap-3 rounded-sm px-2 py-2 hover:bg-accent"
                                            onClick={() => setOpen(false)}
                                        >
                                            {/* Placeholder image or real image if feasible */}
                                            {product.images[0] && (
                                                <img src={product.images[0]} alt="" className="h-8 w-8 rounded object-cover" />
                                            )}
                                            <div className="flex-1 overflow-hidden">
                                                <p className="truncate text-sm font-medium">{product.name}</p>
                                                <p className="text-xs text-muted-foreground">{formatPrice(product.price)}</p>
                                            </div>
                                        </Link>
                                    ))}
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-xs text-primary"
                                        onClick={() => {
                                            onSearch(query);
                                            setOpen(false);
                                        }}
                                    >
                                        View all results for "{query}"
                                        <ArrowRight className="ml-1 h-3 w-3" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="p-4 text-center text-sm text-muted-foreground">
                                    No results found.
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
