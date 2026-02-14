"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, Image as ImageIcon } from "lucide-react";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    image: "",
    published: true,
    date: ""
  });

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(posts => {
        const post = posts.find((p: any) => p.id === params.id);
        if (post) {
            setFormData(post);
        } else {
            alert("Yazı bulunamadı");
            router.push("/O3_HubCos-7x24-STARK-V2.0-SECURE/blog");
        }
        setLoading(false);
      });
  }, [params.id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Reuse loading state for upload indicator might be better but let's keep it simple
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      
      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        alert("Resim yüklenemedi");
      }
    } catch (error) {
      alert("Hata oluştu");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const res = await fetch('/api/blog', {
            method: 'POST', // Updating existing post via POST logic in route.ts
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            router.push("/O3_HubCos-7x24-STARK-V2.0-SECURE/blog");
        } else {
            alert("Hata oluştu");
        }
    } catch (e) {
        alert("Bağlantı hatası");
    } finally {
        setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-white">Yükleniyor...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link 
            href="/O3_HubCos-7x24-STARK-V2.0-SECURE/blog"
            className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
            <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
            <h1 className="text-3xl font-bold">Blog Yazısını Düzenle</h1>
            <p className="text-gray-400">İçeriği güncelleyin.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Başlık</label>
                    <input 
                        type="text" 
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Özet (Kısa Açıklama)</label>
                    <textarea 
                        rows={2}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">İçerik</label>
                    <textarea 
                        rows={10}
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] font-mono text-sm"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Kapak Görseli</label>
                    <div className="flex items-start gap-6">
                        <div className="w-40 h-40 bg-gray-900 rounded-xl border-2 border-dashed border-gray-700 flex items-center justify-center overflow-hidden relative group">
                            {formData.image ? (
                                <img src={formData.image} alt="Kapak" className="w-full h-full object-cover" />
                            ) : (
                                <ImageIcon className="w-8 h-8 text-gray-600" />
                            )}
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                                Değiştir
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-400 mb-4">
                                Görseli değiştirmek için tıklayın.
                            </p>
                            <button 
                                type="button"
                                className="relative bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
                            >
                                <Upload className="w-4 h-4" />
                                Görsel Seç
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </button>
                        </div>
                    </div>
                </div>

                 <div className="flex items-center gap-4">
                     <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Yayın Tarihi</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                     </div>
                </div>

            </div>
        </div>

        <div className="flex justify-end pt-4">
             <button
                type="submit"
                disabled={loading}
                className="bg-[#C5A059] hover:bg-[#b08e4f] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-[#C5A059]/30 transform hover:scale-105"
            >
                <Save className="w-5 h-5" />
                {loading ? "Kaydediliyor..." : "Güncelle"}
            </button>
        </div>

      </form>
    </div>
  );
}
