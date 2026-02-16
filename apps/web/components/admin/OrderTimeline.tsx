// Simple visual timeline, normally populated by OrderAuditLog or similar
// For this MVP, we just show the current status with a timestamp if available

interface OrderTimelineProps {
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export function OrderTimeline({ status, createdAt, updatedAt }: OrderTimelineProps) {
    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="w-0.5 flex-1 bg-border" />
                </div>
                <div>
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-muted-foreground">{new Date(createdAt).toLocaleString()}</p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                    <p className="font-medium">Current Status: {status}</p>
                    <p className="text-sm text-muted-foreground">Updated: {new Date(updatedAt).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}
