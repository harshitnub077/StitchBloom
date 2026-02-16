import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_1234567890", {
    apiVersion: "2026-01-28.clover", // Use latest or fixed version
    typescript: true,
});
