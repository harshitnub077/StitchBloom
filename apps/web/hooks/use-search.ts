import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
    id: string;
    name: string;
    price: number;
    slug: string;
    images: string[];
}

export function useSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const router = useRouter();

    // Load history from local storage
    useEffect(() => {
        const saved = localStorage.getItem("search_history");
        if (saved) {
            setHistory(JSON.parse(saved));
        }
    }, []);

    // Debounced Search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data);
            } catch (error) {
                console.error(error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [query]);

    const addToHistory = (term: string) => {
        const newHistory = [term, ...history.filter((h) => h !== term)].slice(0, 5);
        setHistory(newHistory);
        localStorage.setItem("search_history", JSON.stringify(newHistory));
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem("search_history");
    };

    const onSearch = (term: string) => {
        addToHistory(term);
        router.push(`/products?search=${encodeURIComponent(term)}`);
    };

    return {
        query,
        setQuery,
        results,
        loading,
        history,
        addToHistory,
        clearHistory,
        onSearch,
    };
}
