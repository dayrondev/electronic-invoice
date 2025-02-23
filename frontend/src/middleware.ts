import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

const REGISTER_BUSINESS_URL = "/register-business";

const protectedRoutes = ["/application", REGISTER_BUSINESS_URL];
const publicRoutes = ["/", "/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getSession();

  if (isProtectedRoute) {
    if (!session?.user)
      return NextResponse.redirect(new URL("/login", req.nextUrl));

    if (!session.user.hasBusiness && !path.startsWith(REGISTER_BUSINESS_URL))
      return NextResponse.redirect(new URL(REGISTER_BUSINESS_URL, req.nextUrl));

    if (session.user.hasBusiness && path.startsWith(REGISTER_BUSINESS_URL))
      return NextResponse.redirect(new URL("/application", req.nextUrl));
  }

  if (isPublicRoute && session?.user) {
    return NextResponse.redirect(new URL("/application", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
