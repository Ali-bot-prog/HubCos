import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import SplashScreen from "@/components/SplashScreen";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.xn--hubyap-u9a.com"),
  title: {
    template: "%s | Hubyapı",
    default: "Hubyapı | Industrial Cooling Towers & Structural Strengthening",
  },
  description: "Expert engineering solutions for industrial cooling systems, power plants, and structural strengthening projects. Enhance your plant efficiency with Hubyapı.",
  keywords: [
    "endüstriyel soğutma kuleleri", "hiperbolik soğutma kuleleri", "mekanik soğutma kuleleri",
    "Hubyapı", "HubCos", "enerji santralleri", "betonarme yapılar", "soğutma sistemleri",
    "mechanical draft cooling towers", "structural strengthening", "industrial cooling solutions",
    "hyperbolic cooling tower", "cooling tower maintenance", "concrete repair", "power plant cooling"
  ],
  authors: [{ name: "Hubyapı" }],
  creator: "Hubyapı",
  publisher: "Hubyapı",
  manifest: "/manifest.json",
  openGraph: {
    title: "Hubyapı | Industrial Cooling Towers & Structural Strengthening",
    description: "Expert engineering solutions for industrial cooling systems, power plants, and structural strengthening projects. Enhance your plant efficiency with Hubyapı.",
    url: "https://www.xn--hubyap-u9a.com",
    siteName: "Hubyapı",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: 'https://www.xn--hubyap-u9a.com/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Hubyapı Industrial Cooling Towers & Structural Strengthening',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hubyapı | Industrial Cooling Towers & Structural Strengthening",
    description: "Expert engineering solutions for industrial cooling systems, power plants, and structural strengthening projects.",
  },
  alternates: {
    canonical: "https://www.xn--hubyap-u9a.com",
    languages: {
      "tr": "https://www.xn--hubyap-u9a.com",
      "en": "https://www.xn--hubyap-u9a.com/en",
    },
  },
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport: Viewport = {
  themeColor: "#2D3748",
};


import { getSiteConfig } from "@/lib/config";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig();

  // Dynamic Google Fonts
  const fontPrimary = config.fontPrimary || "Inter";
  const fontSecondary = config.fontSecondary || "Inter";
  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontPrimary.replace(/ /g, '+')}:wght@300;400;500;600;700;900&family=${fontSecondary.replace(/ /g, '+')}:wght@400;700&display=swap`;

  // Custom CSS Variables
  const style = `
    :root {
      --primary: ${config.primaryColor};
      --secondary: ${config.secondaryColor};
      --font-primary: '${fontPrimary}', sans-serif;
      --font-secondary: '${fontSecondary}', sans-serif;
      --radius: ${config.borderRadius === 'full' ? '9999px' : config.borderRadius === 'lg' ? '1rem' : config.borderRadius === 'sm' ? '0.25rem' : config.borderRadius === 'none' ? '0px' : '0.5rem'};
      --font-size-base: ${config.baseFontSize || '16px'};
    }
    body {
      font-family: var(--font-primary);
      font-size: var(--font-size-base);
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-secondary);
      color: ${config.headingColor || 'inherit'};
    }
    p {
      color: ${config.bodyColor || 'inherit'};
    }
    ${config.customCss || ''}
  `;

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href={googleFontsUrl} />
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Hubyapı – Industrial Cooling Towers & Structural Strengthening",
              "alternateName": "HubCos",
              "image": "https://www.xn--hubyap-u9a.com/icon.png",
              "url": "https://www.xn--hubyap-u9a.com",
              "telephone": config.phone || "+90 555 123 45 67",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": config.address || "Türkiye",
                "addressLocality": "İstanbul",
                "addressCountry": "TR"
              },
              "areaServed": ["TR", "Middle East", "Central Asia"],
              "serviceType": [
                "Mechanical Draft Cooling Towers",
                "Hyperbolic Cooling Tower Construction",
                "Structural Strengthening",
                "Concrete Repair",
                "Cooling Tower Maintenance",
                "EPC Engineering Services"
              ],
              "description": "Expert engineering solutions for industrial cooling systems, power plants, and structural strengthening projects. 20+ years serving energy and industrial sectors.",
              "sameAs": [
                "https://www.xn--hubyap-u9a.com"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen overflow-x-hidden`}
        suppressHydrationWarning
      >
        <SplashScreen />
        <Header config={config} />
        <main className={`flex-grow ${config.layoutMode === 'boxed' ? 'container mx-auto max-w-7xl my-8 rounded-2xl shadow-2xl overflow-hidden border border-gray-800 bg-neutral-900' : ''}`}>
           {children}
        </main>
        <Footer config={config} />
        <Toaster />
      </body>
    </html>
  );
}
