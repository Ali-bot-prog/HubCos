"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, HelpCircle } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export default function FAQAdminPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faq');
      const data = await res.json();
      setFaqs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bu soruyu silmek istediğinize emin misiniz?")) return;
    
    try {
        const res = await fetch(`/api/faq?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            setFaqs(faqs.filter(f => f.id !== id));
        }
    } catch (error) {
        alert("Silinemedi.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Sıkça Sorulan Sorular</h1>
          <p className="text-gray-400">S.S.S. içeriklerini yönetin.</p>
        </div>
        
        <Link
          href="/O3_HubCos-7x24-STARK-V2.0-SECURE/faq/new"
          className="bg-[#C5A059] hover:bg-[#b08e4f] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-[#C5A059]/20"
        >
          <Plus className="w-5 h-5" />
          Yeni Soru Ekle
        </Link>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#C5A059]/50 transition-colors flex justify-between items-start gap-4">
            <div>
                 <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#C5A059]" />
                    {faq.question}
                 </h3>
                 <p className="text-gray-400">{faq.answer}</p>
            </div>
            
            <div className="flex gap-2">
                 <Link 
                    href={`/O3_HubCos-7x24-STARK-V2.0-SECURE/faq/edit/${faq.id}`}
                    className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                 >
                    <Edit className="w-5 h-5" />
                 </Link>
                 <button 
                    onClick={() => handleDelete(faq.id)}
                    className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                 >
                    <Trash2 className="w-5 h-5" />
                 </button>
            </div>
          </div>
        ))}

        {faqs.length === 0 && !loading && (
             <div className="text-center py-12 text-gray-500 bg-gray-900 rounded-2xl border border-gray-800 border-dashed">
                 <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                 <p>Henüz soru eklenmemiş.</p>
             </div>
        )}
      </div>
    </div>
  );
}
