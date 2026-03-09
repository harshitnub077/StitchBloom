"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

// Placeholder for now to avoid recharts dependency issues if not installed
export function RevenueChart({ data }: { data: any[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-4"
        >
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <div className="h-[350px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-md">
                        Chart Placeholder ({data?.length || 0} data points)
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
