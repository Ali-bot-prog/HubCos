"use client";

import { useState, useEffect } from "react";
import { Save, ArrowLeft, Upload, Globe, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function IdentityEditorPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    siteTitle: "HubCos - Endüstriyel Soğutma Kuleleri",
    footerText: "Modern mimari ve güvenilir yapı anlayışıyla geleceği inşa ediyoruz.",
    address: "İstanbul, Türkiye",
    phone: "+90 555 123 45 67",
    email: "info@hubcos.com",
    linkedin: "https://linkedin.com/company/hubcos",
    instagram: "https://instagram.com/hubcos"
  });

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Ayarlar başarıyla kaydedildi!");
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
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
            href="/O3_HubCos-7x24-STARK-V2.0-SECURE/content"
            className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
            <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
            <h1 className="text-3xl font-bold">Site Kimliği & İletişim</h1>
            <p className="text-gray-400">Logo, iletişim bilgileri ve genel site ayarları.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* General Settings */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5" /> Genel Ayarlar
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Site Başlığı (Tab Title)</label>
                    <input 
                        type="text" 
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.siteTitle}
                        onChange={(e) => setData({...data, siteTitle: e.target.value})}
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Logo Yükle</label>
                    <div className="border hover:border-[#C5A059] border-gray-700 border-dashed rounded-xl px-4 py-3 bg-gray-900 text-gray-500 text-sm flex items-center gap-2 cursor-pointer transition-colors">
                        <Upload className="w-4 h-4" />
                        Görsel seçmek için tıklayın...
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Footer Alt Metni</label>
                    <input 
                        type="text" 
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.footerText}
                        onChange={(e) => setData({...data, footerText: e.target.value})}
                    />
                </div>
            </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> İletişim Bilgileri
            </h2>
            
            <div className="space-y-4">
                 <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                        <MapPin className="w-4 h-4 text-[#C5A059]" /> Adres
                    </label>
                    <input 
                        type="text" 
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.address}
                        onChange={(e) => setData({...data, address: e.target.value})}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                            <Phone className="w-4 h-4 text-[#C5A059]" /> Telefon
                        </label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                            value={data.phone}
                            onChange={(e) => setData({...data, phone: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                            <Mail className="w-4 h-4 text-[#C5A059]" /> E-posta
                        </label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                            value={data.email}
                            onChange={(e) => setData({...data, email: e.target.value})}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Social Media */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2">
                Sosyal Medya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn URL</label>
                    <input 
                        type="text" 
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.linkedin}
                        onChange={(e) => setData({...data, linkedin: e.target.value})}
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Instagram URL</label>
                    <input 
                        type="text" 
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.instagram}
                        onChange={(e) => setData({...data, instagram: e.target.value})}
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
                {loading ? "Kaydediliyor..." : "Ayarları Kaydet"}
            </button>
        </div>

      </form>
    </div>
  );
}
