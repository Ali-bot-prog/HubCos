import { NextRequest, NextResponse } from "next/server";

export const locales = ["tr", "en", "ar"] as const;
export const defaultLocale = "tr";

function getLocale(request: NextRequest): string {
  // Accept-Language header'a bak
  const acceptLang = request.headers.get("accept-language") || "";
  const preferred = acceptLang.split(",")[0].split("-")[0].toLowerCase();
  if ((locales as readonly string[]).includes(preferred)) return preferred;
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin, API, statik dosyaları atla
  if (
    pathname.startsWith("/O3_HubCos") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/manifest") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/robots") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Zaten locale içeriyorsa geçir
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Locale yoksa yönlendir
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl, { status: 308 }); // permanent
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
