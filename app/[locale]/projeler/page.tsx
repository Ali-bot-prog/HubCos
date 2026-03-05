import { getDictionary, locales } from "@/lib/dictionaries";
import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/data";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return { title: dict.seo.pages.projects.title, description: dict.seo.pages.projects.description, keywords: dict.seo.keywords };
}

const LABEL: Record<string, Record<string, string>> = {
  tr: { heading: "Projeler", sub: "Referanslarımız", readMore: "Detaylar" },
  en: { heading: "Projects", sub: "Our References", readMore: "Details" },
  ar: { heading: "المشاريع", sub: "مراجعنا", readMore: "التفاصيل" },
};

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const t = LABEL[locale] || LABEL.tr;
  // Re‑use existing projects logic — just render with locale prefix links
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-primary mb-4">{t.heading}</h1>
      <p className="text-gray-400 mb-12">{t.sub}</p>
      <p className="text-gray-500">
        {/* Projeleri /[locale]/projeler/[id] linkleriyle listele */}
        Projeler burada listelenecek. Mevcut projeler sayfası içeriği korunuyor.
      </p>
    </div>
  );
}
