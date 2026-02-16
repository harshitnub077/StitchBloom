import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentOrders({ orders }: { orders: any[] }) {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {orders && orders.length > 0 ? (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className="flex items-center">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                        <AvatarFallback>{order.user?.name?.charAt(0) || "U"}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{order.user?.name}</p>
                                        <p className="text-sm text-muted-foreground">{order.user?.email}</p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        +${Number(order.amount).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center text-muted-foreground py-8">
                            No recent orders
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
