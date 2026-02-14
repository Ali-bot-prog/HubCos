"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, FileText, Calendar } from "lucide-react";

interface Post {
  id: string;
  title: string;
  date: string;
  image: string;
  published: boolean;
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    
    try {
        const res = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            setPosts(posts.filter(p => p.id !== id));
        }
    } catch (error) {
        alert("Silinemedi.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog Yazıları</h1>
          <p className="text-gray-400">Blog yazılarını ekleyin, düzenleyin veya silin.</p>
        </div>
        
        <Link
          href="/O3_HubCos-7x24-STARK-V2.0-SECURE/blog/new"
          className="bg-[#C5A059] hover:bg-[#b08e4f] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-[#C5A059]/20"
        >
          <Plus className="w-5 h-5" />
          Yeni Yazı Ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 group hover:border-[#C5A059]/50 transition-colors">
            <div className="relative h-48">
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500">
                    <FileText className="w-12 h-12 opacity-50" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                 <Link 
                    href={`/O3_HubCos-7x24-STARK-V2.0-SECURE/blog/edit/${post.id}`}
                    className="bg-blue-500/90 hover:bg-blue-600 text-white p-3 rounded-full transition-transform hover:scale-110"
                 >
                    <Edit className="w-5 h-5" />
                 </Link>
                 <button 
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500/90 hover:bg-red-600 text-white p-3 rounded-full transition-transform hover:scale-110"
                 >
                    <Trash2 className="w-5 h-5" />
                 </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
            </div>
          </div>
        ))}

        {posts.length === 0 && !loading && (
             <div className="col-span-full text-center py-12 text-gray-500 bg-gray-900 rounded-2xl border border-gray-800 border-dashed">
                 <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                 <p>Henüz blog yazısı eklenmemiş.</p>
             </div>
        )}
      </div>
    </div>
  );
}
