import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, Clock, Layers, Briefcase, ArrowLeft, ArrowRight, CheckCircle2
} from "lucide-react";
import type { Metadata } from "next";
import { getProjectById, getProjectsFromJson } from "@/lib/data";
import type { Project } from "@/lib/data";

export async function generateStaticParams() {
  return getProjectsFromJson().map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Proje Bulunamadı" };
  return {
    title: `${project.title} | Case Study – Hubyapı`,
    description:
      project.description ||
      `Detailed case study for ${project.title} – ${project.category} cooling tower project in ${project.location}.`,
    keywords: [
      project.category.toLowerCase(),
      "cooling tower project",
      "industrial cooling case study",
      project.location,
      "Hubyapı referans",
    ],
    alternates: {
      canonical: `https://www.xn--hubyap-u9a.com/projeler/${project.id}`,
    },
  };
}

const categoryColors: Record<string, string> = {
  MEKANİK: "bg-blue-900/60 text-blue-300 border-blue-700",
  "DOĞAL ÇEKİŞLİ": "bg-emerald-900/60 text-emerald-300 border-emerald-700",
  HİBRİT: "bg-purple-900/60 text-purple-300 border-purple-700",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const allProjects = getProjectsFromJson();
  const others = allProjects.filter((p) => p.id !== project.id).slice(0, 2);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${project.title} – Case Study`,
    description: project.description,
    image: project.image,
    author: {
      "@type": "Organization",
      name: "Hubyapı",
      url: "https://www.xn--hubyap-u9a.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Hubyapı",
      logo: { "@type": "ImageObject", url: "https://www.xn--hubyap-u9a.com/icon.png" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="bg-neutral-950 min-h-screen">
        {/* ── Hero ──────────────────────────────────── */}
        <section className="relative h-[500px] flex items-end overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/60 to-black/20" />
          <div className="container mx-auto px-4 relative z-10 pb-14">
            <Link
              href="/projeler"
              className="inline-flex items-center gap-2 text-sm text-[#C5A059] mb-5 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Tüm Projeler
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className={`text-xs font-bold uppercase tracking-widest px-3 py-1 border ${
                  categoryColors[project.category] ??
                  "bg-neutral-800 text-gray-300 border-neutral-700"
                }`}
              >
                {project.category}
              </span>
              <span
                className={`text-xs font-bold uppercase tracking-widest px-3 py-1 border ${
                  project.status === "Tamamlandı"
                    ? "bg-green-900/50 text-green-300 border-green-700"
                    : "bg-amber-900/50 text-amber-300 border-amber-700"
                }`}
              >
                {project.status}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
              {project.title}
            </h1>
            <p className="text-gray-300 flex items-center gap-2 text-base">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              {project.location}
            </p>
          </div>
        </section>

        {/* ── Content Grid ──────────────────────────── */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-5 pb-3 border-b border-neutral-800">
                  Proje Özeti
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>

              {project.longDescription && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-5 pb-3 border-b border-neutral-800">
                    Proje Detayları
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {project.longDescription}
                  </p>
                </div>
              )}

              {/* Key highlights */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-5 pb-3 border-b border-neutral-800">
                  Öne Çıkan Başarılar
                </h2>
                <ul className="space-y-3">
                  {[
                    "Tesis faaliyetleri kesintisiz sürdürülürken proje tamamlandı",
                    "ISO 9001 ve ISO 45001 standartlarına tam uyum",
                    "Sıfır iş kazası ile güvenli proje teslimi",
                    "Belirlenen takvim ve bütçe dahilinde teslimat",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 p-6">
                <h3 className="text-white font-bold text-lg mb-5 pb-3 border-b border-neutral-800">
                  Proje Bilgileri
                </h3>
                <dl className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C5A059] mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-0.5">
                        Lokasyon
                      </dt>
                      <dd className="text-white font-semibold">{project.location}</dd>
                    </div>
                  </div>

                  {project.service && (
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-[#C5A059] mt-0.5 shrink-0" />
                      <div>
                        <dt className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-0.5">
                          Hizmet Türü
                        </dt>
                        <dd className="text-white font-semibold">{project.service}</dd>
                      </div>
                    </div>
                  )}

                  {project.area && (
                    <div className="flex items-start gap-3">
                      <Layers className="w-5 h-5 text-[#C5A059] mt-0.5 shrink-0" />
                      <div>
                        <dt className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-0.5">
                          Alan / Boyut
                        </dt>
                        <dd className="text-white font-semibold">{project.area}</dd>
                      </div>
                    </div>
                  )}

                  {project.duration && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#C5A059] mt-0.5 shrink-0" />
                      <div>
                        <dt className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-0.5">
                          Proje Süresi
                        </dt>
                        <dd className="text-white font-semibold">{project.duration}</dd>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 shrink-0 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                    </div>
                    <div>
                      <dt className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-0.5">
                        Kategori
                      </dt>
                      <dd className="text-white font-semibold">{project.category}</dd>
                    </div>
                  </div>
                </dl>
              </div>

              {/* CTA */}
              <div className="bg-[#C5A059]/10 border border-[#C5A059]/30 p-6">
                <h3 className="text-white font-bold mb-3">Benzer Proje Mi Planlıyorsunuz?</h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                  Tesisiniz için ücretsiz mühendislik danışmanlığı alın.
                </p>
                <Link
                  href="/iletisim"
                  className="flex items-center justify-center gap-2 bg-[#C5A059] text-white px-6 py-3 font-bold hover:bg-[#b8923f] transition-colors text-sm uppercase tracking-wider"
                >
                  Teklif Alın <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>
          </div>

          {/* ── Other Projects ────────────────────────── */}
          {others.length > 0 && (
            <div className="mt-20 pt-12 border-t border-neutral-800">
              <h2 className="text-2xl font-bold text-white mb-8">Diğer Projeler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {others.map((p) => (
                  <Link key={p.id} href={`/projeler/${p.id}`} className="group">
                    <div className="relative h-56 overflow-hidden mb-4">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#C5A059] uppercase tracking-widest">
                        {p.category}
                      </span>
                      <h3 className="text-white font-bold text-xl mt-1 group-hover:text-[#C5A059] transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">{p.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
