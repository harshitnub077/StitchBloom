import { NextRequest, NextResponse } from "next/server";
import { cartService } from "@/lib/cart-service";

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const { itemId } = body;

        await cartService.removeItem(itemId);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[CART_REMOVE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
