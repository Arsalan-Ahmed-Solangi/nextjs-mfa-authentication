import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const AUTH_ROUTES = [
  "/auth/login",
  "/auth/signup",
  "/auth/mfa",
];

export function proxy(request) {
  const token =
    request.cookies.get("auth_token")?.value;

  const pathname =
    request.nextUrl.pathname;

  let isAuthenticated = false;

  if (token) {
    try {
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  if (
    isAuthenticated &&
    AUTH_ROUTES.includes(pathname)
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  if (
    !isAuthenticated &&
    pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/login",
    "/auth/signup",
    "/auth/mfa",
  ],
};