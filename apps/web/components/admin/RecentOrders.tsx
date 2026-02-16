import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentOrdersProps {
    orders: any[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {orders.map((order) => (
                        <div key={order.id} className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                <AvatarFallback>{order.user.name?.[0] || "?"}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{order.user.name}</p>
                                <p className="text-sm text-muted-foreground">{order.user.email}</p>
                            </div>
                            <div className="ml-auto font-medium">+${Number(order.amount).toFixed(2)}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
