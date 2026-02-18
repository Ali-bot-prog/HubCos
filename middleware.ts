import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/O3_HubCos-7x24-STARK-V2.0-SECURE")) {
      /*
      // 1. IP Whitelist Check (DISABLED FOR DEBUGGING)
      const allowedIps = (process.env.ALLOWED_IPS || "")
        .split(",")
        .map(ip => ip.trim()) // Handle spaces in env var
        .filter(Boolean);
      
      // Get IP from headers (x-forwarded-for is standard for Vercel/Proxies)
      let ip = req.headers.get("x-forwarded-for") || "unknown";
      if (ip.includes(",")) {
        ip = ip.split(",")[0].trim();
      }

      // If whitelist is defined AND current IP is NOT in list -> Block
      if (allowedIps.length > 0 && !allowedIps.includes(ip)) {
        // Redirect to home page
        return NextResponse.redirect(new URL("/", req.url));
      }
      */

      // Get IP from headers (x-forwarded-for is standard for Vercel/Proxies)
      let ip = req.headers.get("x-forwarded-for") || "unknown";
      if (ip.includes(",")) {
        ip = ip.split(",")[0].trim();
      }

      console.log(`[Middleware DEBUG] Path: ${req.nextUrl.pathname}, IP: ${ip}, Token: ${!!req.nextauth.token}`);

      /*
      // 1. IP Whitelist Check (DISABLED FOR DEBUGGING)
      const allowedIps = (process.env.ALLOWED_IPS || "")
        .split(",")
        .map(ip => ip.trim()) // Handle spaces in env var
        .filter(Boolean);
      
      // If whitelist is defined AND current IP is NOT in list -> Block
      if (allowedIps.length > 0 && !allowedIps.includes(ip)) {
        // Redirect to home page
        return NextResponse.redirect(new URL("/", req.url));
      }
      */

      // 2. Auth Check
      // Only check auth if we are NOT already on the login page
      // req.nextauth.token is provided by withAuth wrapper
      if (
        !req.nextUrl.pathname.startsWith("/O3_HubCos-7x24-STARK-V2.0-SECURE/login") &&
        req.nextauth.token === null
      ) {
        return NextResponse.redirect(new URL("/O3_HubCos-7x24-STARK-V2.0-SECURE/login", req.url));
      }

      // Force clear cookie if we are on login page and have a token but it might be invalid/stale
      // This helps with the "stuck" issues
      if (req.nextUrl.pathname.startsWith("/O3_HubCos-7x24-STARK-V2.0-SECURE/login") && req.cookies.has("next-auth.session-token")) {
        const response = NextResponse.next();
        response.cookies.delete("next-auth.session-token");
        return response;
      }
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow access to login page without token
        if (req.nextUrl.pathname.startsWith("/O3_HubCos-7x24-STARK-V2.0-SECURE/login")) {
          return true;
        }
        return !!token;
      },
    },
    pages: {
      signIn: "/O3_HubCos-7x24-STARK-V2.0-SECURE/login",
    },
  }
);

export const config = {
  matcher: ["/O3_HubCos-7x24-STARK-V2.0-SECURE/:path*"],
};
