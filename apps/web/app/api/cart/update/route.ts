import { NextRequest, NextResponse } from "next/server";
import { cartService } from "@/lib/cart-service";

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { itemId, quantity } = body;

        await cartService.updateItem(itemId, quantity);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[CART_UPDATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
