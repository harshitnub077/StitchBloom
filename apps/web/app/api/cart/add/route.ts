import { NextRequest, NextResponse } from "next/server";
import { cartService } from "@/lib/cart-service";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        const body = await req.json();
        const { productId, quantity, guestId } = body;

        let cartId = guestId;

        // If logged in, get user's cart
        if (userId) {
            let cart = await cartService.getCart(userId);
            if (!cart) {
                cart = await cartService.createCart(userId);
            }
            cartId = cart.id;
        } else if (!cartId) {
            // Guest: Create new cart if no guestId provided
            const guestCart = await cartService.createCart(null);
            cartId = guestCart.id;
        }

        await cartService.addItem(cartId, productId, quantity);

        return NextResponse.json({ cartId });
    } catch (error) {
        console.error("[CART_ADD]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
