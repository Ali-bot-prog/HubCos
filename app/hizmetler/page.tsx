import Icon from '@/components/ui/Icon';
import { getSiteConfig } from '@/lib/config';

const DEFAULT_SERVICES = [
  { id: "1", icon: "Factory", title: "Hiperbolik Kule İnşaatı", description: "Büyük ölçekli termik ve nükleer santraller için doğal çekişli betonarme soğutma kulelerinin tasarımı ve inşası." },
  { id: "2", icon: "Activity", title: "Mekanik Çekişli Kuleler", description: "Endüstriyel tesisler için fan destekli, yüksek kontrollü ve paket tip mekanik soğutma kuleleri çözümleri." },
  { id: "3", icon: "Wrench", title: "Bakım ve Onarım", description: "Mevcut kulelerin periyodik bakımı, fan ve motor değişimleri, dolgu malzemesi yenileme hizmetleri." },
  { id: "4", icon: "ShieldCheck", title: "Yapısal Güçlendirme", description: "Korozyona uğramış betonarme yüzeylerin tamiri, karbon fiber güçlendirme ve kaplama uygulamaları." },
  { id: "5", icon: "Ruler", title: "Termal Performans Analizi", description: "Mevcut sistemlerin verimlilik ölçümleri ve kapasite artırımı için mühendislik analizleri." },
  { id: "6", icon: "Building2", title: "EPC Anahtar Teslim", description: "Projelendirme, tedarik ve montaj süreçlerinin tamamını kapsayan anahtar teslim taahhüt hizmetleri." },
];

export default async function Hizmetler() {
  const config = await getSiteConfig();
  const services = config.services?.length ? config.services : DEFAULT_SERVICES;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">
          {config.servicesTitle || "Uzmanlık Alanlarımız"}
        </h1>
        <p className="text-lg text-gray-400">
          {config.servicesSubtitle || "Sadece soğutma kuleleri üzerine odaklanmış mühendislik çözümleri ve endüstriyel hizmetler."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-neutral-900 p-10 rounded-none shadow-lg border-t-4 border-secondary hover:translate-y-[-5px] transition-all duration-300 group border-x border-b border-gray-800"
          >
            <div className="mb-8 p-4 bg-neutral-800 inline-block rounded-full group-hover:bg-primary/20 transition-colors border border-gray-700">
              <Icon name={service.icon} className="w-12 h-12 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
            <p className="text-gray-400 leading-relaxed text-lg">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

