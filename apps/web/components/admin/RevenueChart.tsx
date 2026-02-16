"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Placeholder for now to avoid recharts dependency issues if not installed
export function RevenueChart({ data }: { data: any[] }) {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[350px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-md">
                    Chart Placeholder ({data?.length || 0} data points)
                </div>
            </CardContent>
        </Card>
    );
}
