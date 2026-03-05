import { getDictionary, locales } from "@/lib/dictionaries";
import { getProjectById, getProjectsFromJson } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Layers, Briefcase, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateStaticParams() {
  const projects = getProjectsFromJson();
  return locales.flatMap((locale) =>
    projects.map((p) => ({ locale, id: p.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const project = getProjectById(id);
  const dict = getDictionary(locale);
  if (!project) return { title: "Proje Bulunamadı" };
  return {
    title: `${project.title} | ${dict.seo.siteName}`,
    description: project.description || `${project.title} – ${project.category} in ${project.location}`,
    keywords: [...dict.seo.keywords, project.category, project.location],
  };
}

const categoryColors: Record<string, string> = {
  MEKANİK: "bg-blue-900/60 text-blue-300 border-blue-700",
  "DOĞAL ÇEKİŞLİ": "bg-emerald-900/60 text-emerald-300 border-emerald-700",
  HİBRİT: "bg-purple-900/60 text-purple-300 border-purple-700",
};

const LABELS: Record<string, Record<string, string>> = {
  tr: { back: "Tüm Projeler", summary: "Proje Özeti", details: "Proje Detayları", highlights: "Öne Çıkan Başarılar", info: "Proje Bilgileri", location: "Lokasyon", service: "Hizmet Türü", area: "Alan / Boyut", duration: "Proje Süresi", category: "Kategori", cta: "Benzer Proje Mi Planlıyorsunuz?", ctaSub: "Tesisiniz için ücretsiz mühendislik danışmanlığı alın.", ctaBtn: "Teklif Alın", others: "Diğer Projeler" },
  en: { back: "All Projects", summary: "Project Summary", details: "Project Details", highlights: "Key Highlights", info: "Project Info", location: "Location", service: "Service Type", area: "Area / Size", duration: "Duration", category: "Category", cta: "Planning a Similar Project?", ctaSub: "Get a free engineering consultation for your facility.", ctaBtn: "Get a Quote", others: "Other Projects" },
  ar: { back: "جميع المشاريع", summary: "ملخص المشروع", details: "تفاصيل المشروع", highlights: "أبرز الإنجازات", info: "معلومات المشروع", location: "الموقع", service: "نوع الخدمة", area: "المساحة / الحجم", duration: "المدة", category: "الفئة", cta: "هل تخطط لمشروع مماثل؟", ctaSub: "احصل على استشارة هندسية مجانية لمنشأتك.", ctaBtn: "احصل على عرض سعر", others: "مشاريع أخرى" },
};

export default async function LocaleProjectDetailPage({ params }: Props) {
  const { id, locale } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const t = LABELS[locale] || LABELS.tr;
  const allProjects = getProjectsFromJson();
  const others = allProjects.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <div className="bg-neutral-950 min-h-screen">
      {/* Hero */}
      <section className="relative h-[500px] flex items-end overflow-hidden">
        <Image src={project.image} alt={project.title} fill className="object-cover object-center" priority unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/60 to-black/20" />
        <div className="container mx-auto px-4 relative z-10 pb-14">
          <Link href={`/${locale}/projeler`} className="inline-flex items-center gap-2 text-sm text-[#C5A059] mb-5 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.back}
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 border ${categoryColors[project.category] ?? "bg-neutral-800 text-gray-300 border-neutral-700"}`}>{project.category}</span>
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 border ${project.status === "Tamamlandı" ? "bg-green-900/50 text-green-300 border-green-700" : "bg-amber-900/50 text-amber-300 border-amber-700"}`}>{project.status}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">{project.title}</h1>
          <p className="text-gray-300 flex items-center gap-2"><MapPin className="w-4 h-4 text-[#C5A059]" />{project.location}</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-5 pb-3 border-b border-neutral-800">{t.summary}</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{project.description}</p>
            </div>
            {project.longDescription && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-5 pb-3 border-b border-neutral-800">{t.details}</h2>
                <p className="text-gray-300 leading-relaxed text-lg">{project.longDescription}</p>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-white mb-5 pb-3 border-b border-neutral-800">{t.highlights}</h2>
              <ul className="space-y-3">
                {["ISO 9001 & ISO 45001 uyumu", "Sıfır iş kazası", "Takvim & bütçe dahilinde teslimat", "Kesintisiz tesis faaliyeti"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 p-6">
              <h3 className="text-white font-bold text-lg mb-5 pb-3 border-b border-neutral-800">{t.info}</h3>
              <dl className="space-y-5">
                {[
                  { icon: MapPin, label: t.location, value: project.location },
                  project.service && { icon: Briefcase, label: t.service, value: project.service },
                  project.area && { icon: Layers, label: t.area, value: project.area },
                  project.duration && { icon: Clock, label: t.duration, value: project.duration },
                ].filter(Boolean).map((item: any) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-[#C5A059] mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-0.5">{item.label}</dt>
                      <dd className="text-white font-semibold">{item.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
            <div className="bg-[#C5A059]/10 border border-[#C5A059]/30 p-6">
              <h3 className="text-white font-bold mb-3">{t.cta}</h3>
              <p className="text-gray-400 text-sm mb-5">{t.ctaSub}</p>
              <Link href={`/${locale}/iletisim`} className="flex items-center justify-center gap-2 bg-[#C5A059] text-white px-6 py-3 font-bold hover:bg-[#b8923f] transition-colors text-sm uppercase tracking-wider">
                {t.ctaBtn} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
        {others.length > 0 && (
          <div className="mt-20 pt-12 border-t border-neutral-800">
            <h2 className="text-2xl font-bold text-white mb-8">{t.others}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((p) => (
                <Link key={p.id} href={`/${locale}/projeler/${p.id}`} className="group">
                  <div className="relative h-56 overflow-hidden mb-4">
                    <Image src={p.image} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" unoptimized />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <span className="text-xs font-bold text-[#C5A059] uppercase tracking-widest">{p.category}</span>
                  <h3 className="text-white font-bold text-xl mt-1 group-hover:text-[#C5A059] transition-colors">{p.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{p.location}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
