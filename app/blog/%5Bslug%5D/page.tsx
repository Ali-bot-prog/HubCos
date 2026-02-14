import fs from "fs";
import path from "path";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

// Reuse getPosts logic
async function getPosts() {
  const filePath = path.join(process.cwd(), "data/posts.json");
  if (!fs.existsSync(filePath)) return [];
  const fileData = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(fileData);
  } catch (e) {
    return [];
  }
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post: any) => ({
    slug: post.slug || post.id,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const posts = await getPosts();
  // Find by slug OR id (fallback)
  const post = posts.find((p: any) => (p.slug === params.slug) || (p.id === params.slug));

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-neutral-900 min-h-screen pt-24 pb-20">
      
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <div className="absolute inset-0">
             <img 
                src={post.image || "/images/blog-placeholder.jpg"} 
                alt={post.title}
                className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <Link 
                href="/blog" 
                className="absolute top-8 left-4 md:left-8 flex items-center gap-2 text-white/60 hover:text-[#C5A059] transition-colors"
            >
                <ArrowLeft className="w-5 h-5" /> Blog'a Dön
            </Link>

            <div className="flex items-center gap-2 text-[#C5A059] font-bold mb-6 bg-[#C5A059]/10 px-4 py-2 rounded-full border border-[#C5A059]/20">
                <Calendar className="w-4 h-4" />
                {post.date}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight">
                {post.title}
            </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="max-w-3xl mx-auto bg-neutral-800 rounded-3xl p-8 md:p-12 border border-neutral-700 shadow-2xl">
            <div 
                className="prose prose-invert prose-lg max-w-none prose-a:text-[#C5A059] prose-headings:text-white prose-p:text-gray-300"
                dangerouslySetInnerHTML={{ __html: post.content }} // Assuming simple HTML or text. For markdown, we'd need a parser.
            ></div>
        </div>
      </div>

    </div>
  );
}
