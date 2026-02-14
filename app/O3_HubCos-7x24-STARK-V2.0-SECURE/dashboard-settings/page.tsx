"use client";

import { useState, useEffect } from "react";
import { Save, ArrowLeft, Layout, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function DashboardSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<any>({
    dashboardTitle: "Hoş Geldiniz, Admin",
    showProjectsStat: true,
    showMessagesStat: true,
    showUsersStat: true,
    showGrowthStat: true, // This one is dummy for now
    showRecentMessages: true,
    showQuickActions: true
  });

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.dashboardConfig) {
            setConfig(data.dashboardConfig);
        }
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // We need to fetch current content first to merge, or api handles it? 
    // The current api/content seems to overwrite or merge? 
    // Inspecting api/content might be needed, but usually it merges top level.
    // Wait, typical pattern here is get all, update one part, save all.
    // Let's safe fetch full content first.
    try {
        const fullContentRes = await fetch('/api/content');
        const fullContent = await fullContentRes.json();

        const dataToSave = {
            ...fullContent,
            dashboardConfig: config
        };

        const res = await fetch('/api/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSave)
        });

        if (res.ok) {
            alert("Dashboard ayarları kaydedildi!");
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
            href="/O3_HubCos-7x24-STARK-V2.0-SECURE"
            className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
            <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
            <h1 className="text-3xl font-bold">Dashboard Ayarları</h1>
            <p className="text-gray-400">Yönetim paneli ana sayfasını özelleştirin.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2">
                <Layout className="w-5 h-5" /> Genel Görünüm
            </h2>
            
            <div className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Karşılama Mesajı / Başlık</label>
                    <input 
                        type="text" 
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={config.dashboardTitle || ""}
                        onChange={(e) => setConfig({...config, dashboardTitle: e.target.value})}
                        placeholder="Örn: Hoş Geldiniz"
                    />
                </div>
            </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2">
                <Layout className="w-5 h-5" /> İstatistik Kartları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Toggle 
                    label="Toplam Proje Sayısı" 
                    checked={config.showProjectsStat} 
                    onChange={(v) => setConfig({...config, showProjectsStat: v})} 
                />
                <Toggle 
                    label="Yeni Mesajlar" 
                    checked={config.showMessagesStat} 
                    onChange={(v) => setConfig({...config, showMessagesStat: v})} 
                />
                <Toggle 
                    label="Ziyaretçi Sayısı (Demo)" 
                    checked={config.showUsersStat} 
                    onChange={(v) => setConfig({...config, showUsersStat: v})} 
                />
                 <Toggle 
                    label="Büyüme Oranı (Demo)" 
                    checked={config.showGrowthStat} 
                    onChange={(v) => setConfig({...config, showGrowthStat: v})} 
                />
            </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2">
                <Layout className="w-5 h-5" /> Diğer Bileşenler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Toggle 
                    label="Son Mesajlar Listesi" 
                    checked={config.showRecentMessages} 
                    onChange={(v) => setConfig({...config, showRecentMessages: v})} 
                />
                 <Toggle 
                    label="Hızlı İşlemler Paneli" 
                    checked={config.showQuickActions} 
                    onChange={(v) => setConfig({...config, showQuickActions: v})} 
                />
            </div>
        </div>

        <div className="flex justify-end pt-4">
             <button
                type="submit"
                disabled={loading}
                className="bg-[#C5A059] hover:bg-[#b08e4f] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-[#C5A059]/30 transform hover:scale-105"
            >
                <Save className="w-5 h-5" />
                {loading ? "Kaydediliyor..." : "Ayarları Kaydet"}
            </button>
        </div>

      </form>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) {
    return (
        <div 
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${checked ? 'bg-[#C5A059]/10 border-[#C5A059] text-white' : 'bg-gray-900 border-gray-700 text-gray-400'}`}
            onClick={() => onChange(!checked)}
        >
            <span className="font-medium">{label}</span>
            {checked ? <Eye className="w-5 h-5 text-[#C5A059]" /> : <EyeOff className="w-5 h-5" />}
        </div>
    );
}
