import { NextRequest } from "next/server";

// Patch for Next.js 14.1.0 + Auth.js v5 bug where NextRequest is missing in some contexts
if (typeof (globalThis as any).NextRequest === "undefined" || (globalThis as any).NextRequest?.name === "Proxy") {
  (globalThis as any).NextRequest = NextRequest;
}

import { handlers } from "@/auth"

const { GET: _GET, POST: _POST } = handlers;

export const GET = async (req: any) => {
  try {
    return await _GET(req);
  } catch (error: any) {
    console.error("Auth.js GET Error:", error);
    throw error;
  }
};

export const POST = async (req: any) => {
  try {
    return await _POST(req);
  } catch (error: any) {
    console.error("Auth.js POST Error:", error);
    throw error;
  }
};


