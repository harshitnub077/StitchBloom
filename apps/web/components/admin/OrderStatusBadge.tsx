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
            variant = "outline";
            break;
        case "COMPLETED":
        case "SHIPPED":
        case "DELIVERED":
            variant = "default"; // Greenish usually but default is black/primary
            break;
        case "CANCELLED":
        case "REFUNDED":
            variant = "destructive";
            break;
        default:
            variant = "outline";
    }

    return <Badge variant={variant}>{status}</Badge>;
}
