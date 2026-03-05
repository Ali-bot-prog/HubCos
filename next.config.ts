import type { NextConfig } from "next";

const CACHE_PUBLIC = "public, s-maxage=3600, stale-while-revalidate=86400";
const CACHE_NONE = "no-store, max-age=0";

const nextConfig: NextConfig = {
  headers: async () => {
    return [
      // API routes — never cache (contact form, dynamic data)
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: CACHE_NONE }],
      },
      // Admin panel — never cache
      {
        source: "/:adminPath(O3_HubCos-7x24-STARK-V2\\.0-SECURE)/:path*",
        headers: [{ key: "Cache-Control", value: CACHE_NONE }],
      },
      // Locale routes — CDN caches 1hr
      {
        source: "/:locale(tr|en|ar)",
        headers: [{ key: "Cache-Control", value: CACHE_PUBLIC }],
      },
      {
        source: "/:locale(tr|en|ar)/:path*",
        headers: [{ key: "Cache-Control", value: CACHE_PUBLIC }],
      },
      // Public static pages — CDN caches 1hr, stale-while-revalidate 24hr
      {
        source: "/hakkimizda",
        headers: [{ key: "Cache-Control", value: CACHE_PUBLIC }],
      },
      {
        source: "/hizmetler",
        headers: [{ key: "Cache-Control", value: CACHE_PUBLIC }],
      },
      {
        source: "/hizmetler/:path*",
        headers: [{ key: "Cache-Control", value: CACHE_PUBLIC }],
      },
      {
        source: "/projeler",
        headers: [{ key: "Cache-Control", value: CACHE_PUBLIC }],
      },
      {
        source: "/projeler/:id",
        headers: [{ key: "Cache-Control", value: CACHE_PUBLIC }],
      },
      {
        source: "/iletisim",
        headers: [{ key: "Cache-Control", value: CACHE_PUBLIC }],
      },
      {
        source: "/sss",
        headers: [{ key: "Cache-Control", value: CACHE_PUBLIC }],
      },
      {
        source: "/blog",
        headers: [{ key: "Cache-Control", value: CACHE_PUBLIC }],
      },
      {
        source: "/blog/:slug",
        headers: [{ key: "Cache-Control", value: CACHE_PUBLIC }],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;


