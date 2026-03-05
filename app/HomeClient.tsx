"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/Icon";
import { Reveal, FadeIn } from "@/components/ui/Reveal";
import StatsSection from "@/components/home/StatsSection";
import SectionHeader from "@/components/ui/SectionHeader";
import type { SiteConfig, ServiceItem } from "@/lib/config";
import type { Project } from "@/lib/data";

interface Props {
  config: SiteConfig;
  projects: Project[];
}

export default function HomeClient({ config, projects }: Props) {
  const heroTitle = config.heroTitle || "ENDÜSTRİYEL SOĞUTMA KULELERİ";
  const heroSubtitle =
    config.heroSubtitle ||
    "Enerji santralleri ve endüstriyel tesisler için yüksek performanslı hiperbolik ve mekanik soğutma çözümleri.";

  const heroStyle = {
    height:
      config.heroHeight === "h-[90vh]"
        ? "90vh"
        : config.heroHeight === "min-h-screen"
        ? "100vh"
        : config.heroHeight === "h-[500px]"
        ? "500px"
        : "700px",
    background:
      config.heroBackgroundType === "color"
        ? config.heroBackgroundColor
        : config.heroBackgroundType === "gradient"
        ? `linear-gradient(to bottom, ${config.heroBackgroundColor}, ${config.heroGradientEnd})`
        : "transparent",
  };

  const services: ServiceItem[] = config.services?.length
    ? config.services
    : [
        { id: "1", icon: "Factory", title: "Doğal Çekişli Kuleler", description: "Termik santraller için yüksek kapasiteli, enerji tasarruflu hiperbolik betonarme yapılar." },
        { id: "2", icon: "Settings", title: "Mekanik Çekişli Kuleler", description: "Hassas sıcaklık kontrolü gerektiren tesisler için fan destekli soğutma sistemleri." },
        { id: "3", icon: "Wrench", title: "Yapısal Güçlendirme", description: "Korozyon önleme, beton onarımı ve dolgu malzemesi değişimi ile ömür uzatma." },
      ];

  return (
    <div className="flex flex-col pb-0">
      {/* ── Hero ─────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center text-center overflow-hidden"
        style={heroStyle}
      >
        <div
          className="absolute inset-0 z-10 bg-black"
          style={{ opacity: config.heroOverlayOpacity ?? 0.5 }}
        />
        {(config.heroBackgroundType === "image" || !config.heroBackgroundType) && (
          <div className="absolute inset-0 z-0">
            <Image
              src={config.heroBackgroundImage || "https://images.unsplash.com/photo-1565514020125-021b777a7267?q=80&w=2070"}
              alt="Hero Background"
              fill
              className="object-cover object-center"
              priority
              unoptimized
            />
          </div>
        )}

        <div className="container mx-auto px-4 z-20 relative">
          <FadeIn delay={0.1}>
            <h1
              className="font-black mb-6 md:mb-8 tracking-tighter leading-tight uppercase"
              style={{
                color: config.heroTitleColor || "#ffffff",
                fontSize:
                  config.heroTitleSize === "text-6xl"
                    ? "clamp(2.5rem, 5vw, 4rem)"
                    : "clamp(2rem, 4vw, 3rem)",
              }}
            >
              {heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p
              className="mb-8 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed tracking-wide text-lg md:text-2xl px-4"
              style={{ color: config.heroSubtitleColor || "#e5e7eb" }}
            >
              {heroSubtitle}
            </p>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <Link
                href="/projeler"
                className="px-8 py-4 md:px-12 md:py-5 text-base md:text-lg font-bold transition-all transform hover:translate-y-[-2px] tracking-widest uppercase hover:opacity-90 w-full sm:w-auto"
                style={{
                  backgroundColor: config.buttonPrimaryColor || "#C5A059",
                  color: "#fff",
                  borderRadius: config.borderRadius === "none" ? "0" : "0.5rem",
                }}
              >
                Projelerimiz
              </Link>
              <Link
                href="/iletisim"
                className="px-12 py-5 text-lg font-bold transition-all transform hover:translate-y-[-2px] tracking-widest uppercase hover:bg-white hover:text-black border-2"
                style={{
                  borderColor: "#fff",
                  color: "#fff",
                  borderRadius: config.borderRadius === "none" ? "0" : "0.5rem",
                }}
              >
                Teklif Alın
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────── */}
      <StatsSection />

      {/* ── About ────────────────────────────────── */}
      <section
        className="py-16 md:py-32 container mx-auto px-4"
        style={{ backgroundColor: config.aboutBackgroundColor || "transparent" }}
      >
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <Reveal width="100%">
              <div className="relative h-[400px] md:h-[600px] shadow-2xl">
                <Image
                  src={config.aboutImage || "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2070"}
                  alt="Hakkımızda"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </Reveal>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <Reveal>
              <h2 className="text-xs md:text-sm font-black tracking-[0.2em] uppercase mb-4" style={{ color: config.primaryColor }}>
                Hakkımızda
              </h2>
            </Reveal>
            <Reveal>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 leading-tight" style={{ color: config.headingColor }}>
                {config.aboutTitle || "MÜHENDİSLİK VE PERFORMANS"}
              </h3>
            </Reveal>
            <Reveal>
              <p className="mb-8 md:mb-10 leading-relaxed text-lg md:text-xl font-light" style={{ color: config.aboutTextColor || config.bodyColor }}>
                {config.aboutText || "HubCos, enerji üretiminin kalbinde yer alan hayati soğutma sistemlerini inşa eder."}
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <Link
                href="/hakkimizda"
                className="font-bold text-lg flex items-center gap-4 group transition-colors uppercase tracking-widest"
                style={{ color: config.primaryColor }}
              >
                Teknolojimiz <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────── */}
      <section
        className="py-16 md:py-32 border-t border-gray-800"
        style={{ backgroundColor: config.cardBackgroundColor || "#171717" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-20 gap-6 md:gap-10">
            <div className="max-w-2xl">
              <Reveal width="100%">
                <h2 className="text-xs md:text-sm font-black tracking-[0.2em] uppercase mb-4" style={{ color: config.primaryColor }}>
                  Faaliyet Alanları
                </h2>
                <h3 className="text-3xl md:text-5xl font-black leading-tight" style={{ color: config.headingColor }}>
                  ENDÜSTRİYEL ÇÖZÜMLER
                </h3>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-gray-800">
            {services.map((service, i) => (
              <FadeIn delay={0.2 * (i + 1)} key={service.id}>
                <div className="p-8 md:p-12 hover:bg-white/5 transition-all duration-500 group border-b border-r-0 md:border-r border-gray-800 h-full last:border-b-0 md:last:border-b">
                  <div className="mb-6 md:mb-10 group-hover:scale-110 transition-transform" style={{ color: config.primaryColor }}>
                    <Icon name={service.icon} className="w-12 h-12 md:w-16 md:h-16" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6" style={{ color: config.headingColor }}>
                    {service.title}
                  </h3>
                  <p className="leading-relaxed text-base md:text-lg" style={{ color: config.bodyColor }}>
                    {service.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────── */}
      <section className="bg-neutral-950 py-16 md:py-32 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <SectionHeader subtitle="Referanslar" title="DEV PROJELER" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, i) => (
              <FadeIn delay={0.2 * (i + 1)} key={project.id}>
                <Link
                  href={`/projeler/${project.id}`}
                  className="group cursor-pointer relative overflow-hidden h-[500px] block"
                  style={{ borderRadius: config.borderRadius === "none" ? "0" : "1rem" }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-500">Görsel Yok</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase mb-2 block" style={{ color: config.primaryColor }}>
                      {project.category}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300">{project.location}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
