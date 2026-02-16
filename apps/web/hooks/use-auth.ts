import { useAuth as useClerkAuth, useUser as useClerkUser } from "@clerk/nextjs";

export function useAuth() {
    return useClerkAuth();
}

export function useUser() {
    return useClerkUser();
}

export function useAdmin() {
    const { user } = useClerkUser();
    // Assuming we sync role to Clerk public metadata or fetch from DB
    // For now, let's assume we check the public metadata if we set it there
    // Or purely rely on server-side checks for sensitive ops.
    // Ideally, we sync the 'role' to user.publicMetadata.role

    const isAdmin = user?.publicMetadata?.role === "ADMIN";
    return { isAdmin, user };
}
