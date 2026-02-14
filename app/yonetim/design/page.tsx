"use client";

import { useState, useEffect } from "react";
import { Save, ArrowLeft, Paintbrush, Type, Layout, Image as ImageIcon, Monitor, Component } from "lucide-react";
import Link from "next/link";

const TABS = [
  { id: "colors", label: "Renkler", icon: Paintbrush },
  { id: "typography", label: "Tipografi", icon: Type },
  { id: "layout", label: "Düzen & Hero", icon: Layout },
  { id: "components", label: "Bileşenler", icon: Component },
];

export default function DesignPage() {
  const [activeTab, setActiveTab] = useState("colors");
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
            alert("Tasarım ayarları kaydedildi!");
        } else {
            alert("Bir hata oluştu.");
        }
    } catch (error) {
        alert("Bağlantı hatası.");
    } finally {
        setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "colors":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#C5A059] mb-4">Site Renkleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Ana Renk (Primary)</label>
                    <div className="flex gap-2">
                        <input type="color" className="h-12 w-12 rounded-lg cursor-pointer bg-transparent border-none p-0"
                            value={data.primaryColor || "#C5A059"} onChange={(e) => setData({...data, primaryColor: e.target.value})} />
                        <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] uppercase"
                            value={data.primaryColor || ""} onChange={(e) => setData({...data, primaryColor: e.target.value})} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">İkincil Renk (Secondary)</label>
                    <div className="flex gap-2">
                        <input type="color" className="h-12 w-12 rounded-lg cursor-pointer bg-transparent border-none p-0"
                            value={data.secondaryColor || "#1a1a1a"} onChange={(e) => setData({...data, secondaryColor: e.target.value})} />
                        <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] uppercase"
                            value={data.secondaryColor || ""} onChange={(e) => setData({...data, secondaryColor: e.target.value})} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Başlık Rengi</label>
                    <div className="flex gap-2">
                        <input type="color" className="h-12 w-12 rounded-lg cursor-pointer bg-transparent border-none p-0"
                            value={data.headingColor || "#ffffff"} onChange={(e) => setData({...data, headingColor: e.target.value})} />
                        <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] uppercase"
                            value={data.headingColor || ""} onChange={(e) => setData({...data, headingColor: e.target.value})} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Metin Rengi</label>
                    <div className="flex gap-2">
                        <input type="color" className="h-12 w-12 rounded-lg cursor-pointer bg-transparent border-none p-0"
                            value={data.bodyColor || "#9ca3af"} onChange={(e) => setData({...data, bodyColor: e.target.value})} />
                        <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] uppercase"
                            value={data.bodyColor || ""} onChange={(e) => setData({...data, bodyColor: e.target.value})} />
                    </div>
                </div>
            </div>
          </div>
        );
      case "typography":
        return (
           <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#C5A059] mb-4">Fontlar ve Tipografi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Ana Font (Google Fonts Adı)</label>
                    <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.fontPrimary || "Inter"} onChange={(e) => setData({...data, fontPrimary: e.target.value})} 
                        placeholder="Örn: Inter, Roboto, Poppins" />
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-400 mb-2">Başlık Fontu (Opsiyonel)</label>
                    <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.fontSecondary || "Inter"} onChange={(e) => setData({...data, fontSecondary: e.target.value})} 
                         placeholder="Örn: Playfair Display, Montserrat" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Temel Yazı Boyutu</label>
                    <select className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.baseFontSize || "16px"} onChange={(e) => setData({...data, baseFontSize: e.target.value})}>
                        <option value="14px">Küçük (14px)</option>
                        <option value="16px">Normal (16px)</option>
                        <option value="18px">Büyük (18px)</option>
                    </select>
                </div>
            </div>
           </div>
        );
      case "layout":
        return (
           <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#C5A059] mb-4">Düzen ve Hero Ayarları</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Site Genişliği</label>
                    <select className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.layoutMode || "default"} onChange={(e) => setData({...data, layoutMode: e.target.value})}>
                        <option value="default">Varsayılan (Tam Genişlik)</option>
                        <option value="boxed">Kutulu (Boxed)</option>
                        <option value="wide">Geniş (Wide)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Köşe Yuvarlaklığı</label>
                    <select className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.borderRadius || "md"} onChange={(e) => setData({...data, borderRadius: e.target.value})}>
                        <option value="none">Köşeli (0px)</option>
                        <option value="sm">Az Yuvarlak (4px)</option>
                        <option value="md">Orta (8px - Varsayılan)</option>
                        <option value="lg">Geniş (16px)</option>
                        <option value="full">Tam Yuvarlak</option>
                    </select>
                </div>
                
                <div className="md:col-span-2 pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Hero (Giriş) Bölümü Görünümü</h3>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Arka Plan Tipi</label>
                    <select className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.heroBackgroundType || "image"} onChange={(e) => setData({...data, heroBackgroundType: e.target.value})}>
                        <option value="image">Resim</option>
                        <option value="color">Düz Renk</option>
                        <option value="gradient">Gradyan</option>
                    </select>
                </div>
                
                {data.heroBackgroundType === "image" && (
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Arka Plan Resmi URL</label>
                        <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                            value={data.heroBackgroundImage || ""} onChange={(e) => setData({...data, heroBackgroundImage: e.target.value})} 
                            placeholder="https://..." />
                        <p className="text-xs text-gray-500 mt-1">Unsplash veya başka bir kaynaktan resim linki yapıştırın.</p>
                    </div>
                )}

                {(data.heroBackgroundType === "color" || data.heroBackgroundType === "gradient") && (
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                             {data.heroBackgroundType === "gradient" ? "Başlangıç Rengi" : "Arka Plan Rengi"}
                        </label>
                        <div className="flex gap-2">
                             <input type="color" className="h-12 w-12 rounded-lg cursor-pointer bg-transparent border-none p-0"
                                value={data.heroBackgroundColor || "#111111"} onChange={(e) => setData({...data, heroBackgroundColor: e.target.value})} />
                             <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] uppercase"
                                value={data.heroBackgroundColor || ""} onChange={(e) => setData({...data, heroBackgroundColor: e.target.value})} />
                        </div>
                    </div>
                )}

                {data.heroBackgroundType === "gradient" && (
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Bitiş Rengi</label>
                        <div className="flex gap-2">
                             <input type="color" className="h-12 w-12 rounded-lg cursor-pointer bg-transparent border-none p-0"
                                value={data.heroGradientEnd || "#000000"} onChange={(e) => setData({...data, heroGradientEnd: e.target.value})} />
                             <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] uppercase"
                                value={data.heroGradientEnd || ""} onChange={(e) => setData({...data, heroGradientEnd: e.target.value})} />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Bölüm Yüksekliği</label>
                    <select className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.heroHeight || "h-[90vh]"} onChange={(e) => setData({...data, heroHeight: e.target.value})}>
                        <option value="h-[500px]">Kısa (500px)</option>
                        <option value="h-[700px]">Orta (700px)</option>
                        <option value="h-[90vh]">Ekranı Kapla (90vh)</option>
                        <option value="min-h-screen">Tam Ekran</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                     <label className="block text-sm font-medium text-gray-400 mb-2">Perde Opaklığı (Resim Üzeri Karartma)</label>
                     <input type="range" min="0" max="1" step="0.1" className="w-full"
                        value={data.heroOverlayOpacity ?? 0.5} onChange={(e) => setData({...data, heroOverlayOpacity: parseFloat(e.target.value)})} />
                     <div className="text-right text-sm text-gray-400">{data.heroOverlayOpacity ?? 0.5}</div>
                </div>
            </div>
           </div>
        );
      case "components":
        return (
           <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#C5A059] mb-4">UI Bileşenleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Buton Rengi (Primary)</label>
                    <div className="flex gap-2">
                         <input type="color" className="h-10 w-10 rounded-lg cursor-pointer bg-transparent border-none p-0"
                            value={data.buttonPrimaryColor || "#C5A059"} onChange={(e) => setData({...data, buttonPrimaryColor: e.target.value})} />
                         <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C5A059] text-sm"
                            value={data.buttonPrimaryColor || ""} onChange={(e) => setData({...data, buttonPrimaryColor: e.target.value})} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Kart Arka Planı</label>
                    <div className="flex gap-2">
                         <input type="color" className="h-10 w-10 rounded-lg cursor-pointer bg-transparent border-none p-0"
                            value={data.cardBackgroundColor || "#171717"} onChange={(e) => setData({...data, cardBackgroundColor: e.target.value})} />
                         <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C5A059] text-sm"
                            value={data.cardBackgroundColor || ""} onChange={(e) => setData({...data, cardBackgroundColor: e.target.value})} />
                    </div>
                </div>
            </div>
           </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link 
            href="/yonetim"
            className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
            <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
            <h1 className="text-3xl font-bold">Site Tasarımını Düzenle</h1>
            <p className="text-gray-400">Renkler, fontlar ve genel görünüm ayarları.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-3">
             <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700 sticky top-8">
                <nav className="space-y-2">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                                activeTab === tab.id 
                                ? "bg-[#C5A059] text-white shadow-lg shadow-[#C5A059]/20" 
                                : "text-gray-400 hover:bg-gray-700 hover:text-white"
                            }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
             </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
            <form onSubmit={handleSubmit}>
                <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 min-h-[500px]">
                    {renderTabContent()}
                </div>

                <div className="flex justify-end pt-6 sticky bottom-6 z-10">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#C5A059] hover:bg-[#b08e4f] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-[#C5A059]/30 transform hover:scale-105"
                    >
                        <Save className="w-5 h-5" />
                        {loading ? "Kaydediliyor..." : "Tasarımı Kaydet"}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}
