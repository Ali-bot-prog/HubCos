import Link from "next/link";
import fs from "fs";
import path from "path";
import { Calendar, ArrowRight } from "lucide-react";

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

export default async function BlogPage() {
  const posts = await getPosts();
  const publishedPosts = posts.filter((p: any) => p.published);

  return (
    <div className="bg-neutral-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Blog & Haberler</h1>
          <div className="w-24 h-1 bg-[#C5A059] mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Endüstriyel soğutma sistemleri, enerji verimliliği ve sektörden en son gelişmeler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedPosts.map((post: any) => (
            <article key={post.id} className="bg-neutral-800 rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-[#C5A059]/10 transition-all duration-300 border border-neutral-700 hover:border-[#C5A059]/30">
              <Link href={`/blog/${post.slug || post.id}`}>
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={post.image || "/images/blog-placeholder.jpg"} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-[#C5A059] text-white px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Devamını Oku
                    </span>
                  </div>
                </div>
              </Link>
              
              <div className="p-8">
                <div className="flex items-center gap-2 text-[#C5A059] text-sm font-medium mb-4">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-[#C5A059] transition-colors">
                  <Link href={`/blog/${post.slug || post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-gray-400 line-clamp-3 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.slug || post.id}`}
                  className="inline-flex items-center gap-2 text-white font-bold hover:text-[#C5A059] transition-colors"
                >
                  İncele <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {publishedPosts.length === 0 && (
            <div className="text-center py-20 bg-neutral-800 rounded-3xl border border-dashed border-neutral-700">
                <p className="text-gray-400 text-xl">Henüz blog yazısı eklenmemiş.</p>
            </div>
        )}
      </div>
    </div>
  );
}
