import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
    id: string; // CartItem ID
    cartId: string;
    productId: string;
    quantity: number;
    product: {
        id: string;
        name: string;
        price: string | number;
        images: string[];
        slug: string;
        stock: number;
    };
}

interface CartState {
    items: CartItem[];
    isLoading: boolean;
    guestCartId: string | null;

    setItems: (items: CartItem[]) => void;
    setGuestCartId: (id: string) => void;
    addItem: (product: any, quantity: number) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    fetchCart: () => Promise<void>;
}

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isLoading: false,
            guestCartId: null,

            setItems: (items) => set({ items }),
            setGuestCartId: (id) => set({ guestCartId: id }),

            fetchCart: async () => {
                set({ isLoading: true });
                try {
                    const { guestCartId } = get();
                    const res = await fetch(`/api/cart?guestId=${guestCartId || ''}`);
                    if (res.ok) {
                        const data = await res.json();
                        set({ items: data.cartItems || [] });
                        if (data.id && !guestCartId) {
                            set({ guestCartId: data.id });
                        }
                    }
                } catch (err) {
                    console.error(err);
                } finally {
                    set({ isLoading: false });
                }
            },

            addItem: async (product, quantity) => {
                set({ isLoading: true });
                try {
                    const { guestCartId } = get();
                    const res = await fetch("/api/cart/add", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ productId: product.id, quantity, guestId: guestCartId }),
                    });

                    const data = await res.json();
                    if (data.cartId && !guestCartId) {
                        set({ guestCartId: data.cartId });
                    }

                    // Refresh cart
                    await get().fetchCart();
                } catch (err) {
                    console.error(err);
                } finally {
                    set({ isLoading: false });
                }
            },

            removeItem: async (itemId) => {
                try {
                    const prevItems = get().items;
                    set({ items: prevItems.filter(i => i.id !== itemId) }); // Optimistic

                    await fetch("/api/cart/remove", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ itemId }),
                    });
                } catch (err) {
                    console.error(err);
                    get().fetchCart(); // Revert on error
                }
            },

            updateQuantity: async (itemId, quantity) => {
                try {
                    const prevItems = get().items;
                    set({
                        items: prevItems.map(i => i.id === itemId ? { ...i, quantity } : i)
                    }); // Optimistic

                    await fetch("/api/cart/update", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ itemId, quantity }),
                    });
                } catch (err) {
                    console.error(err);
                    get().fetchCart();
                }
            },

            clearCart: async () => {
                set({ items: [] });
                await fetch("/api/cart/clear", { method: "DELETE" });
            }
        }),
        {
            name: "crochetverse-cart",
            partialize: (state) => ({ guestCartId: state.guestCartId }), // Only persist guestCartId
        }
    )
);
