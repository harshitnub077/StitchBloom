import { db } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import type { Stripe } from "stripe";
import { resend, EMAIL_SENDER } from "@/lib/email";
import { OrderConfirmationEmail } from "@/components/emails/OrderConfirmation";

export const paymentService = {
    async createCheckoutSession(userId: string, cartItems: any[], userEmail?: string) {
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = cartItems.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.product.name,
                    images: item.product.images,
                },
                unit_amount: Math.round(Number(item.product.price) * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
            metadata: {
                userId,
                cartId: cartItems[0]?.cartId, // Assuming all items from same cart
            },
            customer_email: userEmail,
            shipping_address_collection: {
                allowed_countries: ["US", "CA", "GB"],
            },
        });

        return session;
    },

    async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
        const userId = session.metadata?.userId;
        const cartId = session.metadata?.cartId;

        if (!userId || !cartId) {
            console.error("Missing metadata in checkout session");
            return;
        }

        // Verify payment status
        if (session.payment_status !== "paid") {
            console.error("Payment not paid");
            return;
        }

        // Retrieve cart items to create order items
        // In a real app, we might want to store this snapshotted data differently 
        // or trust the metadata if we serialized it all there (size limits apply).
        // Better: Fetch cart from DB using cartId.
        const cart = await db.cart.findUnique({
            where: { id: cartId },
            include: { cartItems: { include: { product: true } } }
        });

        if (!cart) {
            console.error("Cart not found for order creation");
            return;
        }

        // Create Order
        const order = await db.order.create({
            data: {
                userId,
                orderNumber: `ORD-${Date.now()}`,
                total: Number(session.amount_total) / 100,
                subtotal: Number(session.amount_total) / 100,
                tax: 0,
                shipping: 0,
                status: "PROCESSING",
                paymentStatus: "PAID",
                paymentMethod: "STRIPE",
                paymentIntentId: session.payment_intent as string,
                shippingAddress: (session as any).shipping_details?.address as any || {},
                billingAddress: session.customer_details?.address as any || {},
                orderItems: {
                    create: cart.cartItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: Number(item.product.price),
                        total: Number(item.product.price) * item.quantity
                    }))
                }
            },
        });

        // Clear Cart
        await db.cartItem.deleteMany({
            where: { cartId }
        });

        // Optionally: Update persistence/stock
        console.log(`Order created: ${order.id}`);

        // Send Order Confirmation Email
        try {
            if (session.customer_details?.email) {
                await resend.emails.send({
                    from: EMAIL_SENDER,
                    to: session.customer_details.email,
                    subject: `Order Confirmation #${order.id.slice(0, 8)}`,
                    react: OrderConfirmationEmail({
                        orderId: order.id,
                        items: cart.cartItems.map(item => ({
                            name: item.product.name,
                            quantity: item.quantity,
                            price: Number(item.product.price)
                        })),
                        total: Number(order.total)
                    })
                });
            }
        } catch (emailError) {
            console.error("Failed to send order confirmation:", emailError);
        }
    },
};
