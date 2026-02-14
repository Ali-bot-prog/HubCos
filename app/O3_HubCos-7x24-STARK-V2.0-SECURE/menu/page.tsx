"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, ArrowLeft, GripVertical, Link as LinkIcon, Menu } from "lucide-react";
import Link from "next/link";

export default function MenuPage() {
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<any[]>([]);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(config => {
        setData(config);
        if (config.navLinks && Array.isArray(config.navLinks)) {
            setLinks(config.navLinks);
        } else {
            // Default links if none exist
            setLinks([
                { id: "1", title: "Anasayfa", url: "/" },
                { id: "2", title: "Hakkımızda", url: "/hakkimizda" },
                { id: "3", title: "Projeler", url: "/projeler" },
                { id: "4", title: "Hizmetler", url: "/hizmetler" },
                { id: "5", title: "İletişim", url: "/iletisim" },
            ]);
        }
      });
  }, []);

  const handleAddLink = () => {
    const newLink = {
        id: Date.now().toString(),
        title: "Yeni Link",
        url: "/"
    };
    setLinks([...links, newLink]);
  };

  const handleRemoveLink = (id: string) => {
    if (!confirm("Bu linki silmek istediğinize emin misiniz?")) return;
    setLinks(links.filter(l => l.id !== id));
  };

  const updateLink = (id: string, field: string, value: string) => {
    setLinks(links.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const dataToSave = {
        ...data,
        navLinks: links
    };

    try {
        const res = await fetch('/api/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSave)
        });

        if (res.ok) {
            alert("Menü güncellendi!");
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
            <h1 className="text-3xl font-bold">Menü Yönetimi</h1>
            <p className="text-gray-400">Site üst menüsünü ve mobil menüyü düzenleyin.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#C5A059] flex items-center gap-2">
                    <Menu className="w-5 h-5" /> Menü Öğeleri
                </h2>
                <button 
                    type="button"
                    onClick={handleAddLink}
                    className="flex items-center gap-2 bg-[#C5A059] hover:bg-[#b08e4f] text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
                >
                    <Plus className="w-4 h-4" /> Yeni Link Ekle
                </button>
            </div>
            
            <div className="space-y-4">
                 {links.map((link, index) => (
                    <div key={link.id} className="bg-gray-900 p-4 rounded-xl border border-gray-700">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="text-gray-500 cursor-grab">
                                <GripVertical className="w-5 h-5" />
                            </div>
                            
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">Başlık</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
                                        value={link.title}
                                        onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                                        placeholder="Örn: Hakkımızda"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">URL / Link</label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input 
                                            type="text" 
                                            className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
                                            value={link.url}
                                            onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                                            placeholder="Örn: /hakkimizda"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newChild = { id: Date.now().toString(), title: "Alt Link", url: "/" };
                                        const newLinks = links.map(l => {
                                            if (l.id === link.id) {
                                                return { ...l, children: [...(l.children || []), newChild] };
                                            }
                                            return l;
                                        });
                                        setLinks(newLinks);
                                    }}
                                    className="text-gray-500 hover:text-[#C5A059] p-2 transition-colors"
                                    title="Alt Link Ekle"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => handleRemoveLink(link.id)}
                                    className="text-gray-500 hover:text-red-400 p-2 transition-colors"
                                    title="Sil"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Children */}
                        {link.children && link.children.length > 0 && (
                            <div className="ml-10 mt-2 space-y-2 border-l-2 border-gray-700 pl-4">
                                {link.children.map((child: any) => (
                                    <div key={child.id} className="flex items-center gap-4">
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input 
                                                type="text" 
                                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C5A059]"
                                                value={child.title}
                                                onChange={(e) => {
                                                    const newLinks = links.map(l => {
                                                        if (l.id === link.id) {
                                                            const newChildren = l.children.map((c: any) => c.id === child.id ? { ...c, title: e.target.value } : c);
                                                            return { ...l, children: newChildren };
                                                        }
                                                        return l;
                                                    });
                                                    setLinks(newLinks);
                                                }}
                                                placeholder="Alt Başlık"
                                            />
                                            <div className="relative">
                                                 <input 
                                                    type="text" 
                                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C5A059]"
                                                    value={child.url}
                                                    onChange={(e) => {
                                                        const newLinks = links.map(l => {
                                                            if (l.id === link.id) {
                                                                const newChildren = l.children.map((c: any) => c.id === child.id ? { ...c, url: e.target.value } : c);
                                                                return { ...l, children: newChildren };
                                                            }
                                                            return l;
                                                        });
                                                        setLinks(newLinks);
                                                    }}
                                                    placeholder="Alt URL"
                                                />
                                            </div>
                                        </div>
                                         <button 
                                            type="button"
                                            onClick={() => {
                                                const newLinks = links.map(l => {
                                                    if (l.id === link.id) {
                                                        const newChildren = l.children.filter((c: any) => c.id !== child.id);
                                                        return { ...l, children: newChildren };
                                                    }
                                                    return l;
                                                });
                                                setLinks(newLinks);
                                            }}
                                            className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                                            title="Sil"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                 ))}

                 {links.length === 0 && (
                     <div className="text-center py-8 text-gray-500">
                         Henüz menü öğesi eklenmemiş.
                     </div>
                 )}
            </div>

            <div className="mt-4 text-sm text-gray-400">
                <p>Not: Menü sırasını değiştirmek için şu an sürükle-bırak aktif değil (yukarı/aşağı butonları eklenebilir), ancak listeye ekleme sırasına göre gösterilir.</p>
            </div>
        </div>

        <div className="flex justify-end pt-4">
             <button
                type="submit"
                disabled={loading}
                className="bg-[#C5A059] hover:bg-[#b08e4f] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-[#C5A059]/30 transform hover:scale-105"
            >
                <Save className="w-5 h-5" />
                {loading ? "Kaydediliyor..." : "Kaydet"}
            </button>
        </div>

      </form>
    </div>
  );
}
