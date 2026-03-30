import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/about(.*)",
    "/products(.*)",
    "/cart(.*)",
    "/checkout(.*)",
    "/search(.*)",
    "/api/products(.*)",
    "/api/cart(.*)",
    "/api/search(.*)",
    "/api/webhooks(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/health"
]);

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
