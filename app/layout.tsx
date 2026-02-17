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
  title: "HUBYAPI - Endüstriyel Soğutma Kuleleri",
  description: "Modern mimari ve güvenilir yapı anlayışıyla geleceği inşa ediyoruz.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#2D3748",
};


import { getSiteConfig } from "@/lib/config";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getSiteConfig();

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
