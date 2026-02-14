"use client";

import { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    fetch('/api/faq')
      .then(res => res.json())
      .then(data => setFaqs(data));
  }, []);

  return (
    <div className="bg-neutral-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Sıkça Sorulan Sorular</h1>
          <div className="w-24 h-1 bg-[#C5A059] mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Endüstriyel soğutma kuleleri ve hizmetlerimiz hakkında merak edilenler.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
                key={faq.id} 
                className={`bg-neutral-800 rounded-2xl border ${openIndex === index ? 'border-[#C5A059]' : 'border-neutral-700'} transition-all duration-300 overflow-hidden`}
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-lg font-bold ${openIndex === index ? 'text-[#C5A059]' : 'text-white'} transition-colors`}>
                    {faq.question}
                </span>
                {openIndex === index ? (
                    <Minus className="w-5 h-5 text-[#C5A059]" />
                ) : (
                    <Plus className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 text-gray-300 leading-relaxed border-t border-neutral-700/50 pt-4">
                    {faq.answer}
                </div>
              </div>
            </div>
          ))}

          {faqs.length === 0 && (
             <div className="text-center py-12 text-gray-500">
                 Henüz soru eklenmemiş.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
