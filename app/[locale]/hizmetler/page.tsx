import { getDictionary, locales } from "@/lib/dictionaries";
import { getSiteConfig } from "@/lib/config";
import type { Metadata } from "next";
import Icon from "@/components/ui/Icon";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return { title: dict.seo.pages.services.title, description: dict.seo.pages.services.description, keywords: dict.seo.keywords };
}

const DEFAULT_SERVICES = [
  { id: "1", icon: "Factory", titleKey: "hyperbolic", descKey: "hyperbolicDesc" },
  { id: "2", icon: "Activity", titleKey: "mechanical", descKey: "mechanicalDesc" },
  { id: "3", icon: "Wrench",   titleKey: "maintenance", descKey: "maintenanceDesc" },
  { id: "4", icon: "ShieldCheck", titleKey: "structural", descKey: "structuralDesc" },
  { id: "5", icon: "Ruler",    titleKey: "thermal",    descKey: "thermalDesc" },
  { id: "6", icon: "Building2", titleKey: "epc",       descKey: "epcDesc" },
];

const SERVICE_LABELS: Record<string, Record<string, string>> = {
  tr: {
    hyperbolic: "Hiperbolik Kule İnşaatı", hyperbolicDesc: "Büyük ölçekli termik ve nükleer santraller için doğal çekişli betonarme soğutma kulelerinin tasarımı ve inşası.",
    mechanical: "Mekanik Çekişli Kuleler",  mechanicalDesc: "Endüstriyel tesisler için fan destekli, yüksek kontrollü mekanik soğutma kuleleri çözümleri.",
    maintenance: "Bakım ve Onarım",          maintenanceDesc: "Mevcut kulelerin periyodik bakımı, fan ve motor değişimleri, dolgu malzemesi yenileme.",
    structural: "Yapısal Güçlendirme",       structuralDesc: "Korozyona uğramış yüzeylerin tamiri, karbon fiber güçlendirme ve kaplama uygulamaları.",
    thermal: "Termal Performans Analizi",    thermalDesc: "Mevcut sistemlerin verimlilik ölçümleri ve kapasite artırımı için mühendislik analizleri.",
    epc: "EPC Anahtar Teslim",              epcDesc: "Projelendirme, tedarik ve montajı kapsayan anahtar teslim taahhüt hizmetleri.",
  },
  en: {
    hyperbolic: "Hyperbolic Tower Construction", hyperbolicDesc: "Design and construction of natural draft reinforced concrete cooling towers for large-scale power plants.",
    mechanical: "Mechanical Draft Towers",        mechanicalDesc: "Fan-assisted cooling tower solutions for industrial facilities requiring precise temperature control.",
    maintenance: "Maintenance & Repair",           maintenanceDesc: "Periodic maintenance, fan and motor replacements, and fill media renewal for existing towers.",
    structural: "Structural Strengthening",        structuralDesc: "Repair of corroded surfaces, carbon fiber reinforcement, and protective coating applications.",
    thermal: "Thermal Performance Analysis",      thermalDesc: "Engineering analyses for efficiency measurement and capacity enhancement of existing systems.",
    epc: "EPC Turnkey Projects",                  epcDesc: "Engineering, procurement, and installation services covering the entire project lifecycle.",
  },
  ar: {
    hyperbolic: "إنشاء الأبراج المفرغة", hyperbolicDesc: "تصميم وإنشاء أبراج تبريد خرسانية مسلحة للسحب الطبيعي لمحطات الطاقة الكبيرة.",
    mechanical: "أبراج السحب الميكانيكي",  mechanicalDesc: "حلول أبراج تبريد بمساعدة المراوح للمنشآت الصناعية التي تتطلب تحكمًا دقيقًا في درجة الحرارة.",
    maintenance: "الصيانة والإصلاح",         maintenanceDesc: "الصيانة الدورية واستبدال المراوح والمحركات وتجديد مواد الحشو للأبراج القائمة.",
    structural: "التقوية الهيكلية",           structuralDesc: "إصلاح الأسطح المتآكلة وتقوية الألياف الكربونية وتطبيقات الطلاء الواقي.",
    thermal: "تحليل الأداء الحراري",         thermalDesc: "تحليلات هندسية لقياس الكفاءة وتعزيز قدرة الأنظمة القائمة.",
    epc: "مشاريع تسليم مفتاح EPC",          epcDesc: "خدمات الهندسة والمشتريات والتركيب التي تغطي دورة حياة المشروع بأكملها.",
  },
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const config = await getSiteConfig();
  const labels = SERVICE_LABELS[locale] || SERVICE_LABELS.tr;

  const services = config.services?.length
    ? config.services
    : DEFAULT_SERVICES.map((s) => ({
        ...s,
        title: labels[s.titleKey],
        description: labels[s.descKey],
      }));

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">
          {config.servicesTitle || dict.seo.pages.services.title}
        </h1>
        <p className="text-lg text-gray-400">{dict.seo.pages.services.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-neutral-900 p-10 shadow-lg border-t-4 border-secondary hover:translate-y-[-5px] transition-all duration-300 group border-x border-b border-gray-800">
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
