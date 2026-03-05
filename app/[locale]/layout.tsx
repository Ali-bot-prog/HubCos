import type { Metadata } from "next";
import { getDictionary, locales, defaultLocale } from "@/lib/dictionaries";
import type { Locale } from "@/lib/dictionaries";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://www.xn--hubyap-u9a.com";

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const { home } = dict.seo.pages;

  // hreflang alternates object
  const alternateLanguages: Record<string, string> = {};
  locales.forEach((l) => {
    alternateLanguages[l] = `${BASE_URL}/${l}`;
  });
  alternateLanguages["x-default"] = `${BASE_URL}/tr`;

  // JSON-LD with all brand name variants for keyword coverage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hubyapı – Industrial Cooling Towers & Structural Strengthening",
    alternateName: [
      "HubCos",
      "Hub Yapı",
      "Hub Yapi",
      "Hubyapi",
      "Hubyapı Endüstriyel",
      "هوب ياباي",
      "هوبكوس",
    ],
    image: `${BASE_URL}/icon.png`,
    url: `${BASE_URL}/${locale}`,
    telephone: "+90 536 674 62 99",
    address: {
      "@type": "PostalAddress",
      addressLocality: "İstanbul",
      addressCountry: "TR",
    },
    areaServed: ["TR", "Middle East", "Central Asia"],
    serviceType: [
      "Mechanical Draft Cooling Towers",
      "Hyperbolic Cooling Tower Construction",
      "Structural Strengthening",
      "Concrete Repair",
      "Cooling Tower Maintenance",
      "EPC Engineering Services",
    ],
    description:
      "Expert engineering solutions for industrial cooling systems, power plants, and structural strengthening. Hub Yapı / HubCos — 20+ years of expertise.",
    sameAs: [`${BASE_URL}/tr`, `${BASE_URL}/en`, `${BASE_URL}/ar`],
  };

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      template: dict.seo.titleTemplate,
      default: `${home.title} | ${dict.seo.siteName}`,
    },
    description: home.description,
    keywords: dict.seo.keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: `${home.title} | ${dict.seo.siteName}`,
      description: home.description,
      url: `${BASE_URL}/${locale}`,
      siteName: dict.seo.siteName,
      locale:
        locale === "ar" ? "ar_SA" : locale === "en" ? "en_US" : "tr_TR",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: dict.seo.siteName,
        },
      ],
    },
    // Inject JSON-LD via Next.js metadata 'other' field
    other: {
      "script:ld+json": JSON.stringify(jsonLd),
    },
  };
}

// This layout does NOT render <html> or <body> — that is the root layout's job.
// It only wraps children in a locale-aware div for dir support (RTL Arabic).
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  if (locale === "ar") {
    return <div dir="rtl" lang="ar">{children}</div>;
  }

  return <>{children}</>;
}
