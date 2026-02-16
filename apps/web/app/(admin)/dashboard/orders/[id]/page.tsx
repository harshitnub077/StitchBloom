"use client";

import { useEffect, useState } from "react";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import { OrderTimeline } from "@/components/admin/OrderTimeline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@crochetverse/shared";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetch(`/api/admin/orders/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setOrder(data);
                setLoading(false);
            });
    }, [params.id]);

    const updateStatus = async (newStatus: string) => {
        setIsUpdating(true);
        try {
            const res = await fetch(`/api/admin/orders/${params.id}/status`, {
                method: "PATCH",
                body: JSON.stringify({ status: newStatus }),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                const updated = await res.json();
                setOrder(updated); // simple update, might miss relations unless API returns them
                // Reload window or re-fetch to be safe for relations
                window.location.reload();
            }
        } catch (e) {
            console.error(e);
            alert("Failed to update status");
        } finally {
            setIsUpdating(false);
        }
    };

    const downloadInvoice = () => {
        window.open(`/api/admin/orders/${params.id}/invoice`, "_blank");
    };

    if (loading || !order) return <div className="p-8">Loading order...</div>;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Order #{order.id.slice(0, 8)}</h1>
                    <p className="text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={downloadInvoice}>
                        Download Invoice
                    </Button>
                    {/* Refund button placeholder */}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Left Column (Details) */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.orderItems?.map((item: any) => (
                                    <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{item.product.name}</span>
                                            <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                                        </div>
                                        <span>{formatPrice(Number(item.price) * item.quantity)}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between pt-4 font-bold text-lg">
                                    <span>Total</span>
                                    <span>{formatPrice(Number(order.amount))}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column (Status & Customer) */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Current Status</span>
                                <OrderStatusBadge status={order.status} />
                            </div>
                            <Select disabled={isUpdating} onValueChange={updateStatus} defaultValue={order.status}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Update Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="PROCESSING">Processing</SelectItem>
                                    <SelectItem value="SHIPPED">Shipped</SelectItem>
                                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="pt-4 border-t">
                                <OrderTimeline status={order.status} createdAt={order.createdAt} updatedAt={order.updatedAt} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Customer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1">
                                <p className="font-medium">{order.user.name}</p>
                                <p className="text-sm text-muted-foreground">{order.user.email}</p>
                                <p className="text-xs text-muted-foreground mt-2">ID: {order.userId}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
