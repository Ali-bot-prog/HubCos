import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  published: boolean;
  category: string;
}

function getPosts(): Post[] {
  const filePath = path.join(process.cwd(), "data/posts.json");
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return [];
  }
}

function getPost(slug: string): Post | undefined {
  const posts = getPosts();
  return posts.find((p) => p.slug === slug || p.id === slug);
}

export async function generateStaticParams() {
  const posts = getPosts();
  return posts
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slug || p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [
      "industrial cooling", "mechanical draft cooling towers", "structural strengthening",
      "soğutma kulesi", post.category,
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.image ? [{ url: post.image }] : [],
    },
    alternates: {
      canonical: `https://www.xn--hubyap-u9a.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || !post.published) notFound();

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Hubyapı",
      url: "https://www.xn--hubyap-u9a.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Hubyapı",
      logo: {
        "@type": "ImageObject",
        url: "https://www.xn--hubyap-u9a.com/icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.xn--hubyap-u9a.com/blog/${post.slug}`,
    },
  };

  // Render markdown-like content (simple newlines and ## headings)
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={i} className="font-bold text-white mt-4 mb-1">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={i} className="text-gray-300 ml-4 list-disc mb-1">
            {line.replace(/^- /, "").replace(/\*\*([^*]+)\*\*/g, "$1")}
          </li>
        );
      }
      if (line.trim() === "") return <br key={i} />;
      // Handle inline bold within paragraphs
      const parts = line.split(/\*\*([^*]+)\*\*/g);
      return (
        <p key={i} className="text-gray-300 leading-relaxed mb-3">
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} className="text-white font-semibold">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <div className="bg-neutral-900 min-h-screen pt-24 pb-20">
        {/* Hero Image */}
        {post.image && (
          <div className="relative w-full h-[400px] overflow-hidden mb-12">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-neutral-900" />
          </div>
        )}

        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#C5A059] hover:text-white transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Tüm Yazılar
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
            <span className="inline-flex items-center gap-1.5 text-[#C5A059] font-semibold">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-gray-400">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-300 leading-relaxed mb-10 border-l-4 border-[#C5A059] pl-6 italic">
            {post.excerpt}
          </p>

          <div className="w-full h-px bg-neutral-700 mb-10" />

          {/* Content */}
          <div className="prose-custom">{renderContent(post.content)}</div>

          <div className="w-full h-px bg-neutral-700 mt-16 mb-10" />

          {/* CTA */}
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Projeniz için Teklif Alın
            </h3>
            <p className="text-gray-400 mb-6">
              Mühendislik ekibimizle iletişime geçin — soğutma kulesi tasarımı,
              kurulum veya yapısal güçlendirme konularında yardımcı olalım.
            </p>
            <Link
              href="/iletisim"
              className="inline-block bg-[#C5A059] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#b8923f] transition-colors"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
