import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/O3_HubCos-7x24-STARK-V2.0-SECURE")) {
      // 1. IP Whitelist Check
      const allowedIps = (process.env.ALLOWED_IPS || "").split(",").filter(Boolean);
      
      // Get IP from headers (x-forwarded-for is standard for Vercel/Proxies)
      let ip = req.headers.get("x-forwarded-for") || "unknown";
      if (ip.includes(",")) {
        ip = ip.split(",")[0];
      }

      // If whitelist is defined AND current IP is NOT in list -> Block
      if (allowedIps.length > 0 && !allowedIps.includes(ip)) {
         // Redirect to home page
         return NextResponse.redirect(new URL("/", req.url));
      }

      // 2. Auth Check
      // Only check auth if we are NOT already on the login page
      // req.nextauth.token is provided by withAuth wrapper
      if (
        !req.nextUrl.pathname.startsWith("/O3_HubCos-7x24-STARK-V2.0-SECURE/login") &&
        req.nextauth.token === null
      ) {
        return NextResponse.redirect(new URL("/O3_HubCos-7x24-STARK-V2.0-SECURE/login", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/O3_HubCos-7x24-STARK-V2.0-SECURE/login",
    },
  }
);

export const config = {
  matcher: ["/O3_HubCos-7x24-STARK-V2.0-SECURE/:path*"],
};
