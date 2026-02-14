import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/yonetim") &&
      !req.nextUrl.pathname.startsWith("/yonetim/login") &&
      req.nextauth.token === null
    ) {
      return NextResponse.redirect(new URL("/yonetim/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/yonetim/login",
    },
  }
);

export const config = {
  matcher: ["/yonetim/:path*"],
};
