"use client";

import { useState, useEffect } from "react";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HomeEditorPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    aboutTitle: "",
    aboutText: ""
  });

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(config => {
        setData({
          heroTitle: config.heroTitle || "",
          heroSubtitle: config.heroSubtitle || "",
          aboutTitle: config.aboutTitle || "",
          aboutText: config.aboutText || ""
        });
      })
      .catch(err => console.error("Failed to load config:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        const res = await fetch('/api/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert("Değişiklikler başarıyla kaydedildi!");
        } else {
            alert("Kaydederken bir hata oluştu.");
        }
    } catch (error) {
        console.error("Error saving config:", error);
        alert("Bağlantı hatası.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
            href="/yonetim/content"
            className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
            <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
            <h1 className="text-3xl font-bold">Ana Sayfa Düzenle</h1>
            <p className="text-gray-400">Site girişindeki metinleri güncelleyin.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Hero Section */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2">
                1. Hero Bölümü (Üst Alan)
            </h2>
            
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Ana Başlık</label>
                    <input 
                        type="text" 
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.heroTitle}
                        onChange={(e) => setData({...data, heroTitle: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Alt Açıklama</label>
                    <textarea 
                        rows={3}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.heroSubtitle}
                        onChange={(e) => setData({...data, heroSubtitle: e.target.value})}
                    />
                </div>
            </div>
        </div>

        {/* About Section */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2">
                2. Hakkımızda Özeti
            </h2>
            
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Bölüm Başlığı</label>
                    <input 
                        type="text" 
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.aboutTitle}
                        onChange={(e) => setData({...data, aboutTitle: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Hakkımızda Metni</label>
                    <textarea 
                        rows={5}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.aboutText}
                        onChange={(e) => setData({...data, aboutText: e.target.value})}
                    />
                </div>
            </div>
        </div>

        <div className="flex justify-end pt-4">
             <button
                type="submit"
                disabled={loading}
                className="bg-[#C5A059] hover:bg-[#b08e4f] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#C5A059]/20"
            >
                <Save className="w-5 h-5" />
                {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </button>
        </div>

      </form>
    </div>
  );
}
