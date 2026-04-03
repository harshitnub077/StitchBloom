import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// Polyfill for Next.js 14.1.0 + Auth.js v5 bug where NextRequest is missing in some contexts
if (typeof (globalThis as any).NextRequest === "undefined" || (globalThis as any).NextRequest?.name === "Proxy") {
  (globalThis as any).NextRequest = NextRequest;
}

// These routes require authentication

const protectedRoutes = [
  '/checkout',
  '/account',
]

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected && !sessionToken) {
    const url = new URL('/sign-in', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|api/health).*)'],
}
