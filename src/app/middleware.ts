import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function
export function middleware(request: NextRequest) {
  const publicUrls = ["/", "/about", "/contact", "/login", "/register"];
  const path = request.nextUrl.pathname; // Extracts the path only (e.g., "/login")

  // Check if token exists in cookies
  const hasToken = request.cookies.get("user");

  // Allow access to public pages
  if (publicUrls.includes(path)) {
    return NextResponse.next();
  }

  // If user is not authenticated, redirect to login
  if (!hasToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow authenticated users to access the requested page
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
