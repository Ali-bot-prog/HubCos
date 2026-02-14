"use client";

import { useState } from "react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, MapPin, Type, Layers } from "lucide-react";
import Link from "next/link";

import { Project } from "@/lib/projects";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: "",
    category: "DOĞAL ÇEKİŞLİ",
    location: "",
    description: "",
    image: "",
    status: "Devam Ediyor"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            router.push("/yonetim/projects");
        } else {
            alert("Hata oluştu");
        }
    } catch (e) {
        alert("Bağlantı hatası");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
            href="/yonetim/projects"
            className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
            <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
            <h1 className="text-3xl font-bold">Yeni Proje Ekle</h1>
            <p className="text-gray-400">Portfolyonuza yeni bir referans ekleyin.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Image Upload */}
            <div className="lg:col-span-1">
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <label className="block text-sm font-medium text-gray-400 mb-4">Proje Görseli</label>
                    
                    <div 
                        className="border-2 border-dashed border-gray-600 rounded-xl h-64 flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-[#C5A059] hover:bg-gray-700/30 transition-all cursor-pointer group relative overflow-hidden"
                        onClick={() => document.getElementById('fileInput')?.click()}
                    >
                        {formData.image ? (
                             <NextImage src={formData.image} alt="Preview" fill className="object-cover" />
                        ) : (
                             <Upload className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform text-[#C5A059]" />
                        )}
                        {!formData.image && <span className="text-sm font-medium">Fotoğraf Yükle</span>}
                        {!formData.image && <span className="text-xs text-gray-600 mt-1">PNG, JPG (Max 5MB)</span>}
                        
                        <input 
                            type="file" 
                            id="fileInput" 
                            hidden 
                            accept="image/*"
                            onChange={async (e) => {
                                if (e.target.files?.[0]) {
                                    setLoading(true);
                                    const file = e.target.files[0];
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    
                                    try {
                                        const res = await fetch('/api/upload', {
                                            method: 'POST',
                                            body: formData
                                        });
                                        if(res.ok) {
                                            const data = await res.json();
                                            setFormData(prev => ({ ...prev, image: data.url }));
                                        }
                                    } catch(err) {
                                        console.error(err);
                                        alert("Yükleme başarısız");
                                    } finally {
                                        setLoading(false);
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Right Column: Details */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 space-y-6">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                            <Type className="w-4 h-4 text-[#C5A059]" /> Proje Başlığı
                        </label>
                        <input 
                            type="text" 
                            required
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                            placeholder="Örn: Kuzey Enerji Santrali"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                                <Layers className="w-4 h-4 text-[#C5A059]" /> Kategori
                            </label>
                            <select 
                                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                            >
                                <option value="DOĞAL ÇEKİŞLİ">DOĞAL ÇEKİŞLİ</option>
                                <option value="MEKANİK">MEKANİK</option>
                                <option value="HİBRİT">HİBRİT</option>
                                <option value="REHABİLİTASYON">REHABİLİTASYON</option>
                            </select>
                        </div>
                         <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                                <MapPin className="w-4 h-4 text-[#C5A059]" /> Konum
                            </label>
                            <input 
                                type="text" 
                                required
                                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                                placeholder="Örn: Samsun, Terme"
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                            />
                        </div>
                        <div>
                             <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                                <Layers className="w-4 h-4 text-[#C5A059]" /> Durum
                            </label>
                            <select 
                                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                            >
                                <option value="Devam Ediyor">Devam Ediyor</option>
                                <option value="Tamamlandı">Tamamlandı</option>
                            </select>
                        </div>
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Açıklama (Opsiyonel)
                        </label>
                        <textarea 
                            rows={4}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                            placeholder="Proje hakkında kısa bilgi..."
                            value={formData.description || ""}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link
                        href="/yonetim/projects"
                        className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:bg-gray-800 transition-colors"
                    >
                        İptal
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#C5A059] hover:bg-[#b08e4f] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#C5A059]/20 disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {loading ? "Kaydediliyor..." : "Projeyi Kaydet"}
                    </button>
                </div>
            </div>
        </div>
      </form>
    </div>
  );
}
