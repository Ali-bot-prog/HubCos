"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function EditFAQPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    question: "",
    answer: "",
    order: 0
  });

  useEffect(() => {
    fetch('/api/faq')
      .then(res => res.json())
      .then(faqs => {
        const faq = faqs.find((f: any) => f.id === params.id);
        if (faq) {
            setFormData(faq);
        } else {
            alert("Soru bulunamadı");
            router.push("/O3_HubCos-7x24-STARK-V2.0-SECURE/faq");
        }
        setLoading(false);
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const res = await fetch('/api/faq', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            router.push("/O3_HubCos-7x24-STARK-V2.0-SECURE/faq");
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
            href="/O3_HubCos-7x24-STARK-V2.0-SECURE/faq"
            className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
            <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
            <h1 className="text-3xl font-bold">Soruyu Düzenle</h1>
            <p className="text-gray-400">İçeriği güncelleyin.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Soru</label>
                    <input 
                        type="text" 
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={formData.question}
                        onChange={(e) => setFormData({...formData, question: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Cevap</label>
                    <textarea 
                        rows={4}
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059]"
                        value={formData.answer}
                        onChange={(e) => setFormData({...formData, answer: e.target.value})}
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
                {loading ? "Kaydediliyor..." : "Güncelle"}
            </button>
        </div>

      </form>
    </div>
  );
}
