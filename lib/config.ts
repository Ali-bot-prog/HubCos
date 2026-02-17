import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'data', 'site-config.json');

export interface SiteConfig {
  siteTitle: string;
  footerText: string;
  address: string;
  phone: string;
  email: string;
  linkedin: string;
  instagram: string;

  // Content Fields
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;

  // Typography
  fontPrimary?: string; // e.g. 'Inter', 'Roboto'
  fontSecondary?: string; // e.g. 'Playfair Display'
  baseFontSize?: string; // '16px'
  headingColor?: string;
  bodyColor?: string;

  // Hero Section
  heroBackgroundType?: 'image' | 'color' | 'gradient' | 'video';
  heroBackgroundImage?: string;
  heroBackgroundColor?: string; // Also used for gradient start
  heroGradientEnd?: string;
  heroOverlayOpacity?: number; // 0-1
  heroTitleColor?: string;
  heroSubtitleColor?: string;
  heroTitleSize?: string; // e.g. 'text-6xl'
  heroHeight?: string; // e.g. 'h-screen'

  // About Section
  aboutBackgroundColor?: string;
  aboutTextColor?: string;
  aboutImage?: string;

  // UI Elements
  buttonPrimaryColor?: string;
  buttonSecondaryColor?: string;
  cardBackgroundColor?: string;
  cardBorderRadius?: string;

  // New Design Fields
  primaryColor: string;
  secondaryColor: string;
  layoutMode: 'default' | 'wide' | 'boxed';
  customCss?: string;
  borderRadius?: string; // 'none', 'sm', 'md', 'lg', 'full'
  // Services Section
  servicesTitle?: string;
  servicesSubtitle?: string;
  services?: ServiceItem[];

  // Navigation & Footer
  navLinks?: NavItem[];
  footerLinks?: NavItem[];
  footerServices?: NavItem[];
}

export interface NavItem {
  id: string;
  title: string;
  url: string;
}

export interface ServiceItem {
  id: string;
  icon: string; // 'Factory', 'Wrench', 'Settings', 'ShieldCheck', 'Ruler', 'Activity', etc.
  title: string;
  description: string;
}

export function getSiteConfig(): SiteConfig {
  if (!fs.existsSync(configPath)) {
    return {
      siteTitle: "HUBYAPI",
      footerText: "Modern mimari ve güvenilir yapı anlayışıyla geleceği inşa ediyoruz.",
      address: "İstanbul, Türkiye",
      phone: "+90 555 123 45 67",
      email: "info@hubyapi.com",
      linkedin: "#",
      instagram: "#",
      heroTitle: "ENDÜSTRİYEL SOĞUTMA KULELERİ",
      heroSubtitle: "Enerji santralleri ve endüstriyel tesisler için yüksek performanslı hiperbolik ve mekanik soğutma çözümleri.",
      aboutTitle: "MÜHENDİSLİK VE PERFORMANS",
      aboutText: "HUBYAPI, enerji üretiminin kalbinde yer alan hayati soğutma sistemlerini inşa eder. Doğal çekişli hiperbolik kulelerden, paket tip mekanik kulelere kadar endüstriyel soğutma ihtiyaçlarınız için mühendislik harikası yapılar üretiyoruz.",
      primaryColor: "#C5A059", // Gold/Construction Yellow
      secondaryColor: "#1a1a1a", // Anthracite
      layoutMode: "default",
      borderRadius: "md",
      
      // Defaults for new fields
      fontPrimary: "Inter",
      fontSecondary: "Inter",
      baseFontSize: "16px",
      headingColor: "#ffffff",
      bodyColor: "#9ca3af", // gray-400
      
      heroBackgroundType: "image",
      heroBackgroundImage: "https://images.unsplash.com/photo-1565514020125-021b777a7267?q=80&w=2070",
      heroBackgroundColor: "#111111",
      heroGradientEnd: "#000000",
      heroOverlayOpacity: 0.5,
      heroTitleColor: "#ffffff",
      heroSubtitleColor: "#e5e7eb", // gray-200
      heroTitleSize: "text-6xl",
      heroHeight: "min-h-[700px]",

      aboutBackgroundColor: "transparent",
      aboutTextColor: "#9ca3af",
      aboutImage: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2070",

      buttonPrimaryColor: "#C5A059",
      buttonSecondaryColor: "#1a1a1a",
      cardBackgroundColor: "#171717", // neutral-900
      cardBorderRadius: "md",

      services: [
        { id: "1", icon: "Factory", title: "Doğal Çekişli Kuleler", description: "Termik santraller için yüksek kapasiteli, enerji tasarruflu hiperbolik betonarme yapılar." },
        { id: "2", icon: "Settings", title: "Mekanik Çekişli Kuleler", description: "Hassas sıcaklık kontrolü gerektiren tesisler için fan destekli soğutma sistemleri." },
        { id: "3", icon: "Wrench", title: "Yapısal Güçlendirme", description: "Korozyon önleme, beton onarımı ve dolgu malzemesi değişimi ile ömür uzatma." }
      ]
    };
  }
  const fileContent = fs.readFileSync(configPath, 'utf8');
  try {
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error parsing site config:", error);
    return {
      siteTitle: "HUBYAPI",
        footerText: "Modern mimari ve güvenilir yapı anlayışıyla geleceği inşa ediyoruz.",
        address: "İstanbul, Türkiye",
        phone: "+90 555 123 45 67",
      email: "info@hubyapi.com",
        linkedin: "#",
        instagram: "#",
        heroTitle: "ENDÜSTRİYEL SOĞUTMA KULELERİ",
        heroSubtitle: "Enerji santralleri ve endüstriyel tesisler için yüksek performanslı hiperbolik ve mekanik soğutma çözümleri.",
        aboutTitle: "MÜHENDİSLİK VE PERFORMANS",
      aboutText: "HUBYAPI, enerji üretiminin kalbinde yer alan hayati soğutma sistemlerini inşa eder.",
        primaryColor: "#C5A059", 
        secondaryColor: "#1a1a1a",
        layoutMode: "default",
        borderRadius: "md",
        
        // Defaults for new fields
        fontPrimary: "Inter",
        fontSecondary: "Inter",
        baseFontSize: "16px",
        headingColor: "#ffffff",
        bodyColor: "#9ca3af", // gray-400
        
        heroBackgroundType: "image",
        heroBackgroundImage: "https://images.unsplash.com/photo-1565514020125-021b777a7267?q=80&w=2070",
        heroBackgroundColor: "#111111",
        heroGradientEnd: "#000000",
        heroOverlayOpacity: 0.5,
        heroTitleColor: "#ffffff",
        heroSubtitleColor: "#e5e7eb", // gray-200
        heroTitleSize: "text-6xl",
        heroHeight: "min-h-[700px]",

        aboutBackgroundColor: "transparent",
        aboutTextColor: "#9ca3af",
        aboutImage: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2070",

        buttonPrimaryColor: "#C5A059",
        buttonSecondaryColor: "#1a1a1a",
        cardBackgroundColor: "#171717", // neutral-900
        cardBorderRadius: "md",

        services: [
            { id: "1", icon: "Factory", title: "Doğal Çekişli Kuleler", description: "Termik santraller için yüksek kapasiteli, enerji tasarruflu hiperbolik betonarme yapılar." },
            { id: "2", icon: "Settings", title: "Mekanik Çekişli Kuleler", description: "Hassas sıcaklık kontrolü gerektiren tesisler için fan destekli soğutma sistemleri." },
            { id: "3", icon: "Wrench", title: "Yapısal Güçlendirme", description: "Korozyon önleme, beton onarımı ve dolgu malzemesi değişimi ile ömür uzatma." }
        ]
    };
  }
}

export function updateSiteConfig(newConfig: Partial<SiteConfig>) {
  const currentConfig = getSiteConfig();
  const updatedConfig = { ...currentConfig, ...newConfig };
  
  // Ensure the directory exists
  const dir = path.dirname(configPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2));
  return updatedConfig;
}
