import { auth } from "@/auth";
import { NextResponse, type NextRequest } from "next/server";
import { rateLimit } from "@/lib/security/ratelimit";

export default auth((req) => {
  const isLoggedin = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/admin");
  const isApiPage = req.nextUrl.pathname.startsWith("/api");

  // 1. Global Rate Limiting for all API routes (60/min)
  if (isApiPage) {
    if (!rateLimit(req as any, { limit: 60, windowMs: 60 * 1000 })) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
  }

  // 2. Strict Rate Limiting for Login (5 per 15 mins)
  if (req.nextUrl.pathname === "/login" && req.method === "POST") {
    if (!rateLimit(req as any, { limit: 5, windowMs: 15 * 60 * 1000 })) {
      return new NextResponse("Too many login attempts. Please try again later.", { status: 429 });
    }
  }

  if (isDashboardPage && !isLoggedin) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isAuthPage && isLoggedin) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register", "/api/:path*"],
};
