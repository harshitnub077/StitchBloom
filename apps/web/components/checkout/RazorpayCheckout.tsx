"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const loadScript = (src: string) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

interface RazorpayCheckoutProps {
    amount: number;
    currency?: string;
    onSuccess: (paymentId: string) => void;
    onError: (error: any) => void;
}

export function RazorpayCheckout({ amount, currency = "INR", onSuccess, onError }: RazorpayCheckoutProps) {

    const handlePayment = async () => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        try {
            // Create Order on Server
            const orderRes = await fetch("/api/razorpay/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, currency }),
            });

            if (!orderRes.ok) {
                throw new Error("Failed to create Razorpay order");
            }

            const orderData = await orderRes.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "CrochetVerse",
                description: "Handcrafted Crochet Items",
                order_id: orderData.id,
                handler: function (response: any) {
                    onSuccess(response.razorpay_payment_id);
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();
        } catch (err) {
            console.error(err);
            onError(err);
        }
    };

    return (
        <Button onClick={handlePayment} variant="secondary" className="w-full">
            Pay with Razorpay
        </Button>
    );
}
