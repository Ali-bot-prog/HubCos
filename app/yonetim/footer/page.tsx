"use client";

import { useState, useEffect } from "react";
import { Save, ArrowLeft, MessageSquare, Linkedin, Instagram, Plus, Trash2, Link as LinkIcon, Layers } from "lucide-react";
import Link from "next/link";

export default function FooterPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(config => {
        setData(config);
      });
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
            alert("Footer ayarları kaydedildi!");
        } else {
            alert("Bir hata oluştu.");
        }
    } catch (error) {
        alert("Bağlantı hatası.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link 
            href="/yonetim"
            className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
            <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
            <h1 className="text-3xl font-bold">Footer Yönetimi</h1>
            <p className="text-gray-400">Footer metni ve sosyal medya bağlantılarını buradan düzenleyebilirsiniz.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Footer Text */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" /> Footer İçeriği
            </h2>
            
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Footer Alt Metni</label>
                <input 
                    type="text" 
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                    value={data.footerText || ""}
                    onChange={(e) => setData({...data, footerText: e.target.value})}
                    placeholder="Örn: Modern mimari ve güvenilir yapı anlayışıyla..."
                />
                <p className="text-xs text-gray-500 mt-2">
                    Bu metin sitenin en alt kısmında, telif hakkı yazısının üzerinde görünür.
                </p>
            </div>
        </div>

        {/* Social Media */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2">
                Sosyal Medya Bağlantıları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                        <Linkedin className="w-4 h-4 text-[#0077b5]" /> LinkedIn URL
                    </label>
                    <input 
                        type="text" 
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.linkedin || ""}
                        onChange={(e) => setData({...data, linkedin: e.target.value})}
                        placeholder="https://linkedin.com/..."
                    />
                </div>
                 <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                        <Instagram className="w-4 h-4 text-[#E4405F]" /> Instagram URL
                    </label>
                    <input 
                        type="text" 
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.instagram || ""}
                        onChange={(e) => setData({...data, instagram: e.target.value})}
                        placeholder="https://instagram.com/..."
                    />
                </div>
            </div>
            </div>


        {/* Footer Links Editor */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#C5A059] flex items-center gap-2">
                    <LinkIcon className="w-5 h-5" /> Hızlı Erişim Linkleri
                </h2>
                <button 
                    type="button"
                    onClick={() => {
                        const newLink = { id: Date.now().toString(), title: "Yeni Link", url: "/" };
                        setData({ ...data, footerLinks: [...(data.footerLinks || []), newLink] });
                    }}
                    className="flex items-center gap-2 bg-[#C5A059] hover:bg-[#b08e4f] text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
                >
                    <Plus className="w-4 h-4" /> Ekle
                </button>
            </div>
            <div className="space-y-4">
                {(data.footerLinks || []).map((link: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl border border-gray-700">
                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                                type="text"
                                className="bg-gray-800 border-gray-600 rounded-lg px-3 py-2 text-white"
                                value={link.title}
                                onChange={(e) => {
                                    const newLinks = [...(data.footerLinks || [])];
                                    newLinks[index].title = e.target.value;
                                    setData({ ...data, footerLinks: newLinks });
                                }}
                                placeholder="Başlık"
                            />
                            <input 
                                type="text"
                                className="bg-gray-800 border-gray-600 rounded-lg px-3 py-2 text-white"
                                value={link.url}
                                onChange={(e) => {
                                    const newLinks = [...(data.footerLinks || [])];
                                    newLinks[index].url = e.target.value;
                                    setData({ ...data, footerLinks: newLinks });
                                }}
                                placeholder="URL"
                            />
                        </div>
                        <button 
                            type="button"
                            onClick={() => {
                                const newLinks = (data.footerLinks || []).filter((_:any, i:number) => i !== index);
                                setData({ ...data, footerLinks: newLinks });
                            }}
                            className="text-gray-500 hover:text-red-400 p-2"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>

        {/* Footer Services Editor */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#C5A059] flex items-center gap-2">
                    <Layers className="w-5 h-5" /> Hizmet Bağlantıları
                </h2>
                <button 
                    type="button"
                    onClick={() => {
                        const newLink = { id: Date.now().toString(), title: "Yeni Hizmet", url: "/hizmetler" };
                        setData({ ...data, footerServices: [...(data.footerServices || []), newLink] });
                    }}
                    className="flex items-center gap-2 bg-[#C5A059] hover:bg-[#b08e4f] text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
                >
                    <Plus className="w-4 h-4" /> Ekle
                </button>
            </div>
            <div className="space-y-4">
                {(data.footerServices || []).map((link: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl border border-gray-700">
                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                                type="text"
                                className="bg-gray-800 border-gray-600 rounded-lg px-3 py-2 text-white"
                                value={link.title}
                                onChange={(e) => {
                                    const newLinks = [...(data.footerServices || [])];
                                    newLinks[index].title = e.target.value;
                                    setData({ ...data, footerServices: newLinks });
                                }}
                                placeholder="Başlık"
                            />
                            <input 
                                type="text"
                                className="bg-gray-800 border-gray-600 rounded-lg px-3 py-2 text-white"
                                value={link.url}
                                onChange={(e) => {
                                    const newLinks = [...(data.footerServices || [])];
                                    newLinks[index].url = e.target.value;
                                    setData({ ...data, footerServices: newLinks });
                                }}
                                placeholder="URL"
                            />
                        </div>
                        <button 
                            type="button"
                            onClick={() => {
                                const newLinks = (data.footerServices || []).filter((_:any, i:number) => i !== index);
                                setData({ ...data, footerServices: newLinks });
                            }}
                            className="text-gray-500 hover:text-red-400 p-2"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex justify-end pt-4">
             <button
                type="submit"
                disabled={loading}
                className="bg-[#C5A059] hover:bg-[#b08e4f] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-[#C5A059]/30 transform hover:scale-105"
            >
                <Save className="w-5 h-5" />
                {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </button>
        </div>

      </form>
    </div>
  );
}
