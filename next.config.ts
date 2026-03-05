import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: async () => {
    return [
      // Admin panel — never cache
      {
        source: "/(O3_HubCos-7x24-STARK-V2\\.0-SECURE|api/admin)(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
      // Public API routes — no-store (contact form, dynamic content)
      {
        source: "/api/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
      // Static public pages — CDN caches for 1 hour, serves stale for 24h
      {
        source:
          "/(|hakkimizda|hizmetler|hizmetler/(.*)|projeler|projeler/(.*)|iletisim|sss|blog|blog/(.*))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
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

