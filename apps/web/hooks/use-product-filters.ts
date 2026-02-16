import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

export function useProductFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const createQueryString = useCallback(
        (name: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === null) {
                params.delete(name);
            } else {
                params.set(name, value);
            }
            return params.toString();
        },
        [searchParams]
    );

    const setFilter = useCallback(
        (name: string, value: string | null) => {
            startTransition(() => {
                router.push(`?${createQueryString(name, value)}`, { scroll: false });
            });
        },
        [createQueryString, router]
    );

    const clearFilters = useCallback(() => {
        startTransition(() => {
            router.push("/products", { scroll: false });
        });
    }, [router]);

    return {
        searchParams,
        setFilter,
        clearFilters,
        isPending,
    };
}
