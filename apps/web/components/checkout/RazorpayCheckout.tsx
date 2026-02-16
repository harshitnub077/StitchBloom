"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export function RazorpayCheckout() {
    const { items, fetchCart } = useCart(); // Assuming access to cart state
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { userId } = useAuth();
    const { user } = useUser();

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true);

        // 1. Load script
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
            alert("Razorpay SDK failed to load. Are you online?");
            setLoading(false);
            return;
        }

        // 2. Create Order
        try {
            const orderRes = await fetch("/api/checkout/razorpay/create-order", {
                method: "POST",
            });

            if (!orderRes.ok) throw new Error("Failed to create order");
            const orderData = await orderRes.json();

            // 3. Initialize Razorpay Options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Add to env
                amount: orderData.amount,
                currency: orderData.currency,
                name: "CrochetVerse",
                description: "Transaction for your order",
                order_id: orderData.id,
                handler: async function (response: any) {
                    // 4. Verify Payment
                    try {
                        const verifyRes = await fetch("/api/checkout/razorpay/verify", {
                            method: "POST",
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                userId,
                                cartId: items[0]?.cartId // or pass from create order response
                            }),
                            headers: { "Content-Type": "application/json" }
                        });

                        if (verifyRes.ok) {
                            router.push("/checkout/success");
                            // Clear cart locally if needed (though verify API does it in DB)
                            // fetchCart(); // Refresh cart state
                        } else {
                            alert("Payment verification failed");
                        }
                    } catch (error) {
                        console.error(error);
                        alert("Payment verification error");
                    }
                },
                prefill: {
                    name: user?.fullName || "",
                    email: user?.emailAddresses[0]?.emailAddress || "",
                    contact: "",
                },
                theme: {
                    color: "#0F172A", // Slate 900
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
        >
            {loading ? "Processing..." : "Pay with Razorpay (INR)"}
        </Button>
    );
}
