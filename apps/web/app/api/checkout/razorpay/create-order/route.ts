import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { auth } from "@clerk/nextjs/server";
import { cartService } from "@/lib/cart-service";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Get cart
        const cart = await cartService.getCart(userId);
        if (!cart || cart.cartItems.length === 0) {
            return new NextResponse("Cart is empty", { status: 400 });
        }

        // Calculate total
        const total = cart.cartItems.reduce((acc: number, item: any) => {
            return acc + Number(item.product.price) * item.quantity;
        }, 0);

        const options = {
            amount: Math.round(total * 100), // amount in lowest denomination (paise)
            currency: "INR",
            receipt: `receipt_${Date.now()}_${userId.slice(0, 5)}`,
            notes: {
                userId,
                cartId: cart.id
            }
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json(order);
    } catch (error) {
        console.error("[RAZORPAY_CREATE_ORDER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
