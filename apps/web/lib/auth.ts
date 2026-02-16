import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@crochetverse/database";
import { User } from "@crochetverse/shared";

// We need a server-side prisma client here or import from packages/database
// Since @crochetverse/database exports a client, we can likely instantiate or use a singleton if exported
// But typically in Next.js app dir we instantiate per request or use a global singleton.
// For now, let's assume we can import a singleton 'db' from @crochetverse/database if it was exported,
// otherwise we instantiate one.
// Let's instantiate one here for simplicity or standard pattern.

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;


export async function getCurrentUser() {
    const { userId } = await auth();
    if (!userId) return null;

    const user = await db.user.findUnique({
        where: { clerkId: userId },
    });

    return user;
}

export async function requireAuth() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    return userId;
}

export async function requireAdmin() {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
        throw new Error("Forbidden");
    }

    return user;
}

export async function getUserRole() {
    const user = await getCurrentUser();
    return user?.role;
}
