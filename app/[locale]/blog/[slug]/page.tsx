import { notFound } from "next/navigation";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getPost, getPosts } from "@/lib/data";
import { locales, getDictionary } from "@/lib/dictionaries";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const posts = getPosts().filter((p) => p.published);
  return locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug || p.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getPost(slug);
  const dict = getDictionary(locale);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...dict.seo.keywords, post.category],
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.date, images: post.image ? [{ url: post.image }] : [] },
  };
}

const BACK_LABELS: Record<string, string> = { tr: "Tüm Yazılar", en: "All Posts", ar: "جميع المقالات" };
const CTA_LABELS: Record<string, Record<string, string>> = {
  tr: { heading: "Projeniz için Teklif Alın", sub: "Mühendislik ekibimizle iletişime geçin.", btn: "Bize Ulaşın" },
  en: { heading: "Get a Quote for Your Project", sub: "Contact our engineering team.", btn: "Contact Us" },
  ar: { heading: "احصل على عرض سعر لمشروعك", sub: "تواصل مع فريق هندستنا.", btn: "اتصل بنا" },
};

const renderContent = (content: string) =>
  content.split("\n").map((line, i) => {
    if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{line.replace("## ", "")}</h2>;
    if (line.trim() === "") return <br key={i} />;
    const parts = line.split(/\*\*([^*]+)\*\*/g);
    return <p key={i} className="text-gray-300 leading-relaxed mb-3">{parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part)}</p>;
  });

export default async function LocaleBlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  const post = getPost(slug);
  if (!post || !post.published) notFound();

  const backLabel = BACK_LABELS[locale] || BACK_LABELS.tr;
  const cta = CTA_LABELS[locale] || CTA_LABELS.tr;

  return (
    <>
      <div className="bg-neutral-900 min-h-screen pt-24 pb-20">
        {post.image && (
          <div className="relative w-full h-[400px] overflow-hidden mb-12">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-neutral-900" />
          </div>
        )}
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-[#C5A059] hover:text-white transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> {backLabel}
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
            <span className="inline-flex items-center gap-1.5 text-[#C5A059] font-semibold"><Tag className="w-4 h-4" />{post.category}</span>
            <span className="inline-flex items-center gap-1.5 text-gray-400"><Calendar className="w-4 h-4" />{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">{post.title}</h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-10 border-l-4 border-[#C5A059] pl-6 italic">{post.excerpt}</p>
          <div className="w-full h-px bg-neutral-700 mb-10" />
          <div>{renderContent(post.content)}</div>
          <div className="w-full h-px bg-neutral-700 mt-16 mb-10" />
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">{cta.heading}</h3>
            <p className="text-gray-400 mb-6">{cta.sub}</p>
            <Link href={`/${locale}/iletisim`} className="inline-block bg-[#C5A059] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#b8923f] transition-colors">{cta.btn}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
