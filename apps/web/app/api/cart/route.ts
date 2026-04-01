
import { NextRequest, NextResponse } from "next/server";
import { cartService } from "@/lib/cart-service";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        const { searchParams } = new URL(req.url);
        const guestId = searchParams.get("guestId");

        const cart = await cartService.getCart(userId, guestId);

        if (!cart && userId && guestId) {
            // Potential merge point if user just logged in?
            // For GET, we just want to retrieve.
            return NextResponse.json({ cartItems: [] });
        }

        return NextResponse.json(cart || { cartItems: [] });
    } catch (error) {
        console.error("[CART_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
