import { NextRequest } from "next/server";

// Polyfill for Next.js 14.1.0 + Auth.js v5 bug where NextRequest is missing in some contexts
if (typeof (globalThis as any).NextRequest === "undefined" || (globalThis as any).NextRequest?.name === "Proxy") {
  (globalThis as any).NextRequest = NextRequest;
}

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "database" },
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  basePath: "/api/auth",
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async session({ session, user }: any) {
      if (session?.user && user) {
        session.user.id = user.id;
      }
      return session;
    }
  }
});

