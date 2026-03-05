import { getDictionary, locales } from "@/lib/dictionaries";
import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { Calendar, ArrowRight } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return { title: dict.seo.pages.blog.title, description: dict.seo.pages.blog.description, keywords: dict.seo.keywords };
}

async function getPosts() {
  const filePath = path.join(process.cwd(), "data/posts.json");
  if (!fs.existsSync(filePath)) return [];
  try { return JSON.parse(fs.readFileSync(filePath, "utf8")); } catch { return []; }
}

const LABELS: Record<string, Record<string, string>> = {
  tr: { heading: "Blog & Haberler", readMore: "Devamını Oku", empty: "Henüz blog yazısı eklenmemiş." },
  en: { heading: "Blog & News",      readMore: "Read More",      empty: "No blog posts yet." },
  ar: { heading: "المدونة والأخبار", readMore: "اقرأ المزيد",   empty: "لا توجد مقالات بعد." },
};

export default async function LocaleBlogPage({ params }: Props) {
  const { locale } = await params;
  const t = LABELS[locale] || LABELS.tr;
  const posts = await getPosts();
  const publishedPosts = posts.filter((p: any) => p.published);

  return (
    <div className="bg-neutral-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.heading}</h1>
          <div className="w-24 h-1 bg-[#C5A059] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedPosts.map((post: any) => (
            <article key={post.id} className="bg-neutral-800 rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-neutral-700 hover:border-[#C5A059]/30">
              <Link href={`/${locale}/blog/${post.slug || post.id}`}>
                <div className="relative h-64 overflow-hidden">
                  <img src={post.image || "/images/blog-placeholder.jpg"} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </Link>
              <div className="p-8">
                <div className="flex items-center gap-2 text-[#C5A059] text-sm font-medium mb-4">
                  <Calendar className="w-4 h-4" />{post.date}
                </div>
                <h2 className="text-2xl font-bold text-white mb-4 line-clamp-2">
                  <Link href={`/${locale}/blog/${post.slug || post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-400 line-clamp-3 mb-6">{post.excerpt}</p>
                <Link href={`/${locale}/blog/${post.slug || post.id}`} className="inline-flex items-center gap-2 text-white font-bold hover:text-[#C5A059] transition-colors">
                  {t.readMore} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        {publishedPosts.length === 0 && (
          <div className="text-center py-20 bg-neutral-800 rounded-3xl border border-dashed border-neutral-700">
            <p className="text-gray-400 text-xl">{t.empty}</p>
          </div>
        )}
      </div>
    </div>
  );
}
