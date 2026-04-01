import { PrismaClient } from "@crochetverse/database";
import { auth as nextAuth } from "@/auth";
import { db } from "@/lib/db";

export { db };

export async function getCurrentUser() {
    const session = await nextAuth();
    if (!session?.user?.id) return null;

    const user = await db.user.findUnique({
        where: { id: session.user.id },
    });

    return user;
}

export async function requireAuth() {
    const session = await nextAuth();
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }
    return session.user.id;
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
