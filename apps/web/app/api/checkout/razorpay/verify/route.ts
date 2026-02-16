import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, cartId } = body;

        const bodyData = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(bodyData.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Retrieve cart to create order items
            const cart = await db.cart.findUnique({
                where: { id: cartId },
                include: { cartItems: { include: { product: true } } }
            });

            if (!cart) {
                return new NextResponse("Cart not found", { status: 404 });
            }

            // Create Order
            const total = cart.cartItems.reduce((acc, item) => acc + Number(item.product.price) * item.quantity, 0);

            await db.order.create({
                data: {
                    userId,
                    orderNumber: `ORD-${Date.now()}`,
                    paymentMethod: "RAZORPAY",
                    status: "PROCESSING",
                    paymentStatus: "PAID",
                    total: total,
                    subtotal: total,
                    tax: 0,
                    shipping: 0,
                    paymentIntentId: razorpay_payment_id,
                    shippingAddress: {
                        line1: "123 Main St",
                        city: "Test City",
                        country: "Test Country",
                        postalCode: "123456"
                    },
                    billingAddress: {
                        line1: "123 Main St",
                        city: "Test City",
                        country: "Test Country",
                        postalCode: "123456"
                    },
                    orderItems: {
                        create: cart.cartItems.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: Number(item.product.price),
                            total: Number(item.product.price) * item.quantity
                        }))
                    }
                }
            });

            // Clear Cart
            await db.cartItem.deleteMany({
                where: { cartId }
            });

            return NextResponse.json({
                message: "success",
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
            });
        } else {
            return new NextResponse("Invalid Signature", { status: 400 });
        }
    } catch (error) {
        console.error("[RAZORPAY_VERIFY]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
