import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { paymentService } from "@/services/payment-service";
import { cartService } from "@/lib/cart-service";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

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

        const session = await paymentService.createCheckoutSession(userId, cart.cartItems, user.emailAddresses[0]?.emailAddress);

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("[CHECKOUT_SESSION]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
