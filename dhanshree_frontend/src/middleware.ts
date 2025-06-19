// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  console.log("accessToken",accessToken)
  const refreshToken = request.cookies.get("refreshToken");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isForgotPasswordPage = request.nextUrl.pathname === "/forgotPassword";

    if (isAdminRoute && !accessToken && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginPage && accessToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isForgotPasswordPage && accessToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
