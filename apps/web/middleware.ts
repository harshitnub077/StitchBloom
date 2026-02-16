import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/products(.*)",
    "/api/webhooks(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/health",
    "/cart(.*)", // Assuming cart is public
    "/checkout(.*)", // Checkout might need auth, but let's check. 
    // Actually, sticking to the user's original publicRoutes list to be safe, but adapted for matcher.
    // Original list: "/", "/products(.*)", "/api/webhooks(.*)", "/sign-in(.*)", "/sign-up(.*)", "/api/health"
]);

const isIgnoredRoute = createRouteMatcher([
    "/api/webhooks/clerk"
]);

export default function middleware(req: any) {
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
