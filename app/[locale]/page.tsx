import { getDictionary } from "@/lib/dictionaries";
import { getSiteConfig } from "@/lib/config";
import { getProjectsFromJson } from "@/lib/data";
import HomeClient from "@/app/HomeClient";
import type { Metadata } from "next";
import { locales } from "@/lib/dictionaries";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://www.xn--hubyap-u9a.com";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const { home } = dict.seo.pages;
  return {
    title: home.title,
    description: home.description,
    keywords: dict.seo.keywords,
  };
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;
  const [config, projects] = await Promise.all([
    getSiteConfig(),
    Promise.resolve(getProjectsFromJson()),
  ]);
  return <HomeClient config={config} projects={projects} locale={locale} />;
}
