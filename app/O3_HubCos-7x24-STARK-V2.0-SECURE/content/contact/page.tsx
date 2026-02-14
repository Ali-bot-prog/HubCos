"use client";

import { useState, useEffect } from "react";
import { Save, ArrowLeft, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
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
            alert("İletişim bilgileri kaydedildi!");
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
            href="/O3_HubCos-7x24-STARK-V2.0-SECURE/content"
            className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
            <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
            <h1 className="text-3xl font-bold">İletişim Bilgileri</h1>
            <p className="text-gray-400">Adres, telefon ve e-posta bilgilerinizi buradan güncelleyin.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> İletişim Detayları
            </h2>
            
            <div className="space-y-6">
                 <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                        <MapPin className="w-4 h-4 text-[#C5A059]" /> Adres
                    </label>
                    <textarea 
                        rows={3}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.address || ""}
                        onChange={(e) => setData({...data, address: e.target.value})}
                        placeholder="Örn: Kuzey Yıldızı Mahallesi..."
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
                            value={data.phone || ""}
                            onChange={(e) => setData({...data, phone: e.target.value})}
                            placeholder="+90 555..."
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                            <Mail className="w-4 h-4 text-[#C5A059]" /> E-posta
                        </label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                            value={data.email || ""}
                            onChange={(e) => setData({...data, email: e.target.value})}
                            placeholder="info@hubcos.com"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Sosyal Medya & Üst Bar
            </h2>
             <div className="space-y-6">
                 <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                         Instagram Linki
                    </label>
                    <input 
                        type="text" 
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.instagram || ""}
                        onChange={(e) => setData({...data, instagram: e.target.value})}
                        placeholder="https://instagram.com/..."
                    />
                </div>
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                         LinkedIn Linki
                    </label>
                    <input 
                        type="text" 
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={data.linkedin || ""}
                        onChange={(e) => setData({...data, linkedin: e.target.value})}
                        placeholder="https://linkedin.com/in/..."
                    />
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
                {loading ? "Kaydediliyor..." : "Bilgileri Kaydet"}
            </button>
        </div>

      </form>
    </div>
  );
}
