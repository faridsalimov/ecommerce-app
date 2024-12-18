import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const isProtectedRoute = (pathname: string) => {
  return ["/profile", "/cart", "/checkout"].some((route) =>
    pathname.startsWith(route)
  );
};

const isAuthPage = (pathname: string) => {
  return pathname.startsWith("/auth");
};

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = request.nextUrl;

    if (isAuthPage(pathname)) {
      if (token) {
        return NextResponse.redirect(new URL("/profile", request.url));
      }
      return NextResponse.next();
    }

    if (isProtectedRoute(pathname) && !token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/auth/:path*",
  ],
};
