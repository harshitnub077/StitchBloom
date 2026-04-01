import { useSession } from "next-auth/react";

/**
 * Hook for accessing Auth.js authentication state.
 */
export function useAuth() {
    const { data: session, status } = useSession();
    return {
        isLoaded: status !== "loading",
        isSignedIn: status === "authenticated",
        userId: session?.user?.id
    };
}

export function useUser() {
    const { data: session, status } = useSession();
    return {
        user: session?.user,
        isLoaded: status !== "loading",
        isSignedIn: status === "authenticated"
    };
}

export function useAdmin() {
    const { data: session } = useSession();
    // In a real app we sync role to the DB and surface it in session.user.role
    // Let's assume user.role exists if mapped.
    const isAdmin = (session?.user as any)?.role === "ADMIN";
    return { isAdmin, user: session?.user };
}
