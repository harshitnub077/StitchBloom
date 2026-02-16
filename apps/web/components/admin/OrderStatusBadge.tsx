import { Badge } from "@/components/ui/badge";

interface OrderStatusBadgeProps {
    status: string;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
    let variant: "default" | "secondary" | "destructive" | "outline" = "default";

    switch (status) {
        case "PENDING":
            variant = "secondary";
            break;
        case "PROCESSING":
            variant = "default";
            break;
        case "SHIPPED":
            variant = "default";
            break;
        case "DELIVERED":
            variant = "outline";
            break;
        case "CANCELLED":
            variant = "destructive";
            break;
    }

    return <Badge variant={variant}>{status}</Badge>;
}
