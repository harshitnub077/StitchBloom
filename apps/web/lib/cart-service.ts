import { db } from "@/lib/auth";
import { Prisma } from "@crochetverse/database";

export type CartWithItems = Prisma.CartGetPayload<{
    include: {
        cartItems: {
            include: {
                product: true;
            };
        };
    };
}>;

export const cartService = {
    async getCart(userId?: string | null, guestId?: string | null) {
        if (!userId && !guestId) return null;

        const cart = await db.cart.findFirst({
            where: {
                OR: [
                    ...(userId ? [{ userId }] : []),
                    ...(guestId ? [{ id: guestId }] : []), // Assuming guestId IS the cartId for simplicity or need a separate field
                    // Actually, usually guestId is stored in a cookie and maps to cart.id directly if userId is null
                ],
            },
            include: {
                cartItems: {
                    include: {
                        product: true,
                    },
                    orderBy: {
                        product: { name: 'asc' }
                    }
                },
            },
        });

        return cart as CartWithItems | null;
    },

    async createCart(userId?: string | null) {
        return await db.cart.create({
            data: {
                userId,
            },
            include: {
                cartItems: {
                    include: {
                        product: true
                    }
                }
            }
        });
    },

    async addItem(cartId: string, productId: string, quantity: number) {
        // Check if item exists
        const existingItem = await db.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId,
                    productId,
                },
            },
        });

        if (existingItem) {
            return await db.cartItem.update({
                where: { id: existingItem.id },
                data: {
                    quantity: existingItem.quantity + quantity,
                },
            });
        }

        return await db.cartItem.create({
            data: {
                cartId,
                productId,
                quantity,
            },
        });
    },

    async updateItem(itemId: string, quantity: number) {
        if (quantity <= 0) {
            return await db.cartItem.delete({
                where: { id: itemId },
            });
        }
        return await db.cartItem.update({
            where: { id: itemId },
            data: { quantity },
        });
    },

    async removeItem(itemId: string) {
        return await db.cartItem.delete({
            where: { id: itemId },
        });
    },

    async clearCart(cartId: string) {
        return await db.cartItem.deleteMany({
            where: { cartId },
        });
    },

    async mergeCarts(guestCartId: string, userId: string) {
        const guestCart = await db.cart.findUnique({
            where: { id: guestCartId },
            include: { cartItems: true },
        });

        if (!guestCart) return;

        const userCart = await this.getCart(userId);
        let finalCartId = userCart?.id;

        if (!finalCartId) {
            const newCart = await this.createCart(userId);
            finalCartId = newCart.id;
        }

        // Move items
        for (const item of guestCart.cartItems) {
            await this.addItem(finalCartId, item.productId, item.quantity);
        }

        // Delete guest cart
        await db.cart.delete({
            where: { id: guestCartId },
        });
    },
};
