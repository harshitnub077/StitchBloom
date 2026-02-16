"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold text-destructive">Something went wrong!</h2>
            <p className="text-muted-foreground text-center max-w-md">
                We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            <div className="flex gap-4">
                <Button onClick={() => window.location.href = "/"} variant="outline">
                    Go Home
                </Button>
                <Button onClick={() => reset()}>Try again</Button>
            </div>
        </div>
    );
}
