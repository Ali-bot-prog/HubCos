"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, ArrowLeft, Factory, Wrench, Settings, Zap, Shield, Truck, Ruler, HardHat, Hammer, Construction, Box, Layers, Activity, Snowflake, Flame, Droplets, Wind } from "lucide-react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

// Available icons for selection
const ICON_OPTIONS = [
  { name: "Factory", icon: Factory },
  { name: "Wrench", icon: Wrench },
  { name: "Settings", icon: Settings },
  { name: "Zap", icon: Zap },
  { name: "Shield", icon: Shield },
  { name: "Truck", icon: Truck },
  { name: "Ruler", icon: Ruler },
  { name: "HardHat", icon: HardHat },
  { name: "Hammer", icon: Hammer },
  { name: "Construction", icon: Construction },
  { name: "Box", icon: Box },
  { name: "Layers", icon: Layers },
  { name: "Activity", icon: Activity },
  { name: "Snowflake", icon: Snowflake },
  { name: "Flame", icon: Flame },
  { name: "Droplets", icon: Droplets },
  { name: "Wind", icon: Wind },
];

export default function ServicesEditor() {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        if (data.services && Array.isArray(data.services)) {
            setServices(data.services);
        } else {
            // Fallback for migration if services array is missing but old fields exist
            setServices([
                { id: "1", icon: "Factory", title: data.service1Title || "Hizmet 1", description: data.service1Desc || "Açıklama 1" },
                { id: "2", icon: "Settings", title: data.service2Title || "Hizmet 2", description: data.service2Desc || "Açıklama 2" },
                { id: "3", icon: "Wrench", title: data.service3Title || "Hizmet 3", description: data.service3Desc || "Açıklama 3" }
            ]);
        }
      });
  }, []);

  const handleAddService = () => {
    const newService = {
        id: Date.now().toString(),
        icon: "Factory",
        title: "Yeni Hizmet",
        description: "Hizmet açıklaması buraya..."
    };
    setServices([...services, newService]);
  };

  const handleRemoveService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const updateService = (id: string, field: string, value: string) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Save both the services array and the main title/subtitle
    const dataToSave = {
        ...content,
        services: services
    };

    try {
        const res = await fetch('/api/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSave)
        });

        if (res.ok) {
            alert("Hizmetler başarıyla güncellendi!");
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
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
            href="/yonetim/content"
            className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
            <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
            <h1 className="text-3xl font-bold">Hizmetler Sayfası</h1>
            <p className="text-gray-400">Hizmet kartlarını, ikonlarını ve açıklamalarını düzenleyin.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Header Section */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-[#C5A059] mb-6">Sayfa Başlığı</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Ana Başlık</label>
                    <input 
                        type="text" 
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={content.servicesTitle || ""}
                        onChange={(e) => setContent({...content, servicesTitle: e.target.value})}
                        placeholder="Örn: Uzmanlık Alanlarımız"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Alt Açıklama</label>
                    <input 
                        type="text" 
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={content.servicesSubtitle || ""}
                        onChange={(e) => setContent({...content, servicesSubtitle: e.target.value})}
                         placeholder="Örn: Sadece soğutma kuleleri üzerine odaklanmış..."
                    />
                </div>
            </div>
        </div>

        {/* Services List */}
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Hizmet Kartları</h2>
                <button 
                    type="button"
                    onClick={handleAddService}
                    className="flex items-center gap-2 bg-[#C5A059] hover:bg-[#b08e4f] text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
                >
                    <Plus className="w-4 h-4" /> Yeni Ekle
                </button>
            </div>

            {services.map((service, index) => (
                <div key={service.id} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 relative group">
                    <button 
                        type="button"
                        onClick={() => handleRemoveService(service.id)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors p-2"
                        title="Sil"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Icon Selection */}
                        <div className="lg:col-span-3">
                            <label className="block text-sm font-medium text-gray-400 mb-2">İkon</label>
                            <div className="grid grid-cols-4 gap-2 bg-gray-900 p-3 rounded-xl border border-gray-700 h-40 overflow-y-auto">
                                {ICON_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.name}
                                        type="button"
                                        onClick={() => updateService(service.id, 'icon', opt.name)}
                                        className={`p-2 rounded-lg flex items-center justify-center transition-colors ${service.icon === opt.name ? 'bg-[#C5A059] text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                                        title={opt.name}
                                    >
                                        <opt.icon className="w-5 h-5" />
                                    </button>
                                ))}
                            </div>
                            <div className="mt-2 text-center text-xs text-gray-500">
                                Seçili: <span className="text-[#C5A059] font-bold">{service.icon}</span>
                            </div>
                        </div>

                        {/* Text Fields */}
                        <div className="lg:col-span-9 space-y-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Başlık</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                                    value={service.title}
                                    onChange={(e) => updateService(service.id, 'title', e.target.value)}
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Açıklama</label>
                                <textarea 
                                    rows={3}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                                    value={service.description}
                                    onChange={(e) => updateService(service.id, 'description', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
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
