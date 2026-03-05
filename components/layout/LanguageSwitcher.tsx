"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/lib/dictionaries";
import type { Locale } from "@/lib/dictionaries";

const FLAG: Record<Locale, string> = { tr: "🇹🇷", en: "🇬🇧", ar: "🇸🇦" };
const LABEL: Record<Locale, string> = { tr: "TR", en: "EN", ar: "AR" };

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Mevcut locale'yi tespit et
  const currentLocale = (locales.find((l) =>
    pathname.startsWith(`/${l}`)
  ) || "tr") as Locale;

  function switchLocale(locale: Locale) {
    if (locale === currentLocale) return;
    // Mevcut path'deki locale segmentini değiştir
    const rest = pathname.replace(/^\/(tr|en|ar)/, "");
    router.push(`/${locale}${rest || "/"}`);
  }

  return (
    <div className="flex items-center gap-1 ml-4 border-l border-white/20 pl-4">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale as Locale)}
          title={locale.toUpperCase()}
          style={{
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: locale === currentLocale ? 700 : 400,
            color: locale === currentLocale ? "#C5A059" : "rgba(255,255,255,0.6)",
            background: locale === currentLocale ? "rgba(197,160,89,0.1)" : "transparent",
            border: locale === currentLocale ? "1px solid rgba(197,160,89,0.4)" : "1px solid transparent",
            cursor: locale === currentLocale ? "default" : "pointer",
            transition: "all 0.2s",
            letterSpacing: "0.05em",
          }}
          onMouseEnter={(e) => {
            if (locale !== currentLocale)
              e.currentTarget.style.color = "#C5A059";
          }}
          onMouseLeave={(e) => {
            if (locale !== currentLocale)
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          }}
        >
          {FLAG[locale as Locale]} {LABEL[locale as Locale]}
        </button>
      ))}
    </div>
  );
}
