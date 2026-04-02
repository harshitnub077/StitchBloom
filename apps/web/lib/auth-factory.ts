import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { NextRequest as OriginalNextRequest } from "next/server"

// DEFINITIVE ENVIRONMENT SHIM: Resolve 'NextRequest is not a constructor' in Auth.js v5 beta.30
// Moving this to an isolated factory file that is ONLY imported by the API route.
if (typeof (globalThis as any).NextRequest === "undefined" || (globalThis as any).NextRequest?.name === "Proxy") {
    (globalThis as any).NextRequest = OriginalNextRequest
}

export const authConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "database" as const },
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
}

export const getAuthHandlers = () => NextAuth(authConfig);
