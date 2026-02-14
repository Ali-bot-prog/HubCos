"use client";

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
// import { Building2, Ruler, ShieldCheck, Factory, Wrench, Activity } from 'lucide-react'; // Unused now

export default function Hizmetler() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
        .then(res => res.json())
        .then(data => {
            setContent(data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
  }, []);

  const services = content?.services || [
    { icon: "Factory", title: "Hiperbolik Kule İnşaatı", description: "Büyük ölçekli termik ve nükleer santraller için doğal çekişli betonarme soğutma kulelerinin tasarımı ve inşası." },
    { icon: "Activity", title: "Mekanik Çekişli Kuleler", description: "Endüstriyel tesisler için fan destekli, yüksek kontrollü ve paket tip mekanik soğutma kuleleri çözümleri." },
    { icon: "Wrench", title: "Bakım ve Onarım", description: "Mevcut kulelerin periyodik bakımı, fan ve motor değişimleri, dolgu malzemesi yenileme hizmetleri." },
    { icon: "ShieldCheck", title: "Yapısal Güçlendirme", description: "Korozyona uğramış betonarme yüzeylerin tamiri, karbon fiber güçlendirme ve kaplama uygulamaları." },
    { icon: "Ruler", title: "Termal Performans Analizi", description: "Mevcut sistemlerin verimlilik ölçümleri ve kapasite artırımı için mühendislik analizleri." },
    { icon: "Building2", title: "EPC Anahtar Teslim", description: "Projelendirme, tedarik ve montaj süreçlerinin tamamını kapsayan anahtar teslim taahhüt hizmetleri." }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">{content?.servicesTitle || "Uzmanlık Alanlarımız"}</h1>
        <p className="text-lg text-gray-400">
          {content?.servicesSubtitle || "Sadece soğutma kuleleri üzerine odaklanmış mühendislik çözümleri ve endüstriyel hizmetler."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service: any, index: number) => (
          <div key={service.id || index} className="bg-neutral-900 p-10 rounded-none shadow-lg border-t-4 border-secondary hover:translate-y-[-5px] transition-all duration-300 group border-x border-b border-gray-800">
            <div className="mb-8 p-4 bg-neutral-800 inline-block rounded-full group-hover:bg-primary/20 transition-colors border border-gray-700">
                <Icon name={service.icon} className="w-12 h-12 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
