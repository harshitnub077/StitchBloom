interface OrderTimelineProps {
    status: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export function OrderTimeline({ status, createdAt, updatedAt }: OrderTimelineProps) {
    return (
        <div className="space-y-4">
            <h4 className="text-sm font-medium">Timeline</h4>
            <div className="flex gap-4 text-sm">
                <div className="text-muted-foreground">Created</div>
                <div>{new Date(createdAt).toLocaleString()}</div>
            </div>
            <div className="flex gap-4 text-sm">
                <div className="text-muted-foreground">Last Updated</div>
                <div>{new Date(updatedAt).toLocaleString()}</div>
            </div>
        </div>
    );
}
