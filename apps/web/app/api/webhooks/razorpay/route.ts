import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const signature = req.headers.get("x-razorpay-signature");

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) return new NextResponse("Webhook secret not configured", { status: 500 });

    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(JSON.stringify(body))
        .digest("hex");

    if (signature !== expectedSignature) {
        return new NextResponse("Invalid Signature", { status: 400 });
    }

    // Handle events like 'payment.captured', 'payment.failed'
    // Since we handle fulfillment in /verify for standard checkout, 
    // webhooks might be for redundancy or async updates (e.g. refunds)

    if (body.event === "payment.captured") {
        console.log("Payment captured:", body.payload.payment.entity.id);
        // Logic if needed
    }

    return NextResponse.json({ status: "ok" });
}
