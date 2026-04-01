import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { paymentService } from "@/services/payment-service";
import { cartService } from "@/lib/cart-service";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        const user = session?.user;

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { cartId } = body; // Or user cart resolution

        // Get fresh cart data to ensure prices are correct
        const cart = await cartService.getCart(userId);

        if (!cart || cart.cartItems.length === 0) {
            return new NextResponse("Cart is empty", { status: 400 });
        }

        const sessionUrl = await paymentService.createCheckoutSession(userId, cart.cartItems, user.email || undefined);

        return NextResponse.json({ url: sessionUrl.url });
    } catch (error) {
        console.error("[CHECKOUT_SESSION]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
