import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Droplets, Hammer, ScanLine, Layers, ArrowLeft } from "lucide-react";

const techniques = [
  {
    icon: ShieldCheck,
    title: "Karbon Fiber (CFRP) Takviyesi",
    description:
      "Yüksek mukavemetli karbon fiber şeritler epoksi reçinesiyle betonarme yüzeylere yapıştırılır. Yapının ağırlığını artırmadan eğilme ve kesme kapasitesini %40–80 oranında iyileştirir.",
    tag: "Yapısal",
  },
  {
    icon: ScanLine,
    title: "Epoksi Enjeksiyon",
    description:
      "Mevcut çatlaklar yüksek basınçlı epoksi reçinesiyle doldurularak orijinal yapısal bütünlük yeniden sağlanır; su geçirmezlik ve süreklilik bir arada elde edilir.",
    tag: "Onarım",
  },
  {
    icon: Layers,
    title: "Koruyucu Kaplama Sistemleri",
    description:
      "Elastomerik kaplamalar ve penetran sillanlar betonu uzun vadede su, klorür ve karbonatlaşmaya karşı korur; yapı ömrünü 20–30 yıl uzatır.",
    tag: "Koruma",
  },
  {
    icon: Droplets,
    title: "Korozyon Önleme",
    description:
      "Donatı paslanmasını durduran inhibitör kaplamalar ve katodik koruma sistemleriyle aktif korozyon süreçleri kalıcı olarak engellenir.",
    tag: "Korozyon",
  },
  {
    icon: Hammer,
    title: "Beton Yüzey Onarımı",
    description:
      "Hasarlı beton bölgeler kesilerek alınır; polimer katkılı özel onarım harçlarıyla yeniden oluşturulur ve özgün betonla tam uyum sağlanır.",
    tag: "Onarım",
  },
  {
    icon: ScanLine,
    title: "Yapısal Durum Tespiti",
    description:
      "Karbonatlaşma derinliği, Schmidt çekici testi, ultrasonik hız ölçümü ve endoskopik inceleme ile kapsamlı ön tanı raporu hazırlanır.",
    tag: "Tanı",
  },
];

const damageTypes = [
  { label: "Karbonatlaşma", pct: 88 },
  { label: "Klorür Saldırısı", pct: 72 },
  { label: "Termal Çevrimler", pct: 65 },
  { label: "Biyolojik Etkenler", pct: 55 },
];

export default function YapisalGuclendirmePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Industrial Structural Strengthening & Concrete Repair",
    provider: {
      "@type": "Organization",
      name: "Hubyapı",
      url: "https://www.xn--hubyap-u9a.com",
    },
    description:
      "Advanced structural strengthening, corrosion prevention, and concrete repair services for power plants and cooling towers.",
    serviceType: "Structural Strengthening",
    areaServed: "Turkey",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-neutral-950 min-h-screen">
        {/* ── Hero ──────────────────────────────────── */}
        <section className="relative h-[520px] flex items-end overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070"
            alt="Structural Strengthening of Industrial Cooling Tower"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/60 to-black/20" />
          <div className="container mx-auto px-4 relative z-10 pb-16">
            <Link
              href="/hizmetler"
              className="inline-flex items-center gap-2 text-sm text-[#C5A059] mb-6 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Hizmetlerimiz
            </Link>
            <div className="inline-block bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold uppercase tracking-widest px-4 py-1.5 mb-5">
              Uzmanlık Alanı
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5 max-w-4xl">
              Yapısal Güçlendirme &amp; Beton Onarımı
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">
              Enerji santralleri ve endüstriyel kulelerdeki betonarme yapılar için
              gelişmiş güçlendirme, korozyon önleme ve beton onarım hizmetleri.
              Yapınızın ömrünü güvenle uzatın.
            </p>
          </div>
        </section>

        {/* ── Neden Güçlendirme? ────────────────────── */}
        <section className="py-20 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#C5A059] text-sm font-bold uppercase tracking-widest mb-3">
                Problem
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                Betonarme Yapılarda Bozulma Mekanizmaları
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                Soğutma kuleleri sürekli yüksek nem, ısıl döngüler ve kimyasal
                etkiye maruz kalır. 15–20 yıl sonra yapısal performans kaybı
                gözlemlenmeye başlar. Zamanında müdahale, yıkım/yeniden inşa
                maliyetinin çok altında yapıyı onlarca yıl daha aktif tutar.
              </p>
              <div className="space-y-5">
                {damageTypes.map((d) => (
                  <div key={d.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-300 font-medium">{d.label}</span>
                      <span className="text-[#C5A059] font-bold">{d.pct}%</span>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#C5A059] to-[#e8c47a] rounded-full"
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
                <p className="text-gray-500 text-xs mt-2">
                  * Endüstriyel soğutma kulelerinde karşılaşılan hasar türlerinin görülme
                  sıklığı (HubCos proje veritabanı)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "20+", label: "Yıl Deneyim" },
                { value: "50+", label: "Rehabilitasyon Projesi" },
                { value: "%30", label: "Ortalama Ömür Uzatımı" },
                { value: "0", label: "İş Kazası Rekoru" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-neutral-900 border border-neutral-800 p-8 text-center hover:border-[#C5A059]/50 transition-colors"
                >
                  <div className="text-4xl font-black text-[#C5A059] mb-2">
                    {s.value}
                  </div>
                  <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Teknikler ─────────────────────────────── */}
        <section className="py-20 border-t border-neutral-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-[#C5A059] text-sm font-bold uppercase tracking-widest mb-3">
                Yöntemler
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Uyguladığımız Güçlendirme Teknikleri
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techniques.map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.title}
                    className="bg-neutral-900 border border-neutral-800 p-8 hover:border-[#C5A059]/40 hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <div className="p-3 bg-neutral-800 group-hover:bg-[#C5A059]/10 transition-colors shrink-0">
                        <Icon className="w-6 h-6 text-[#C5A059]" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mt-3">
                        {t.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{t.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {t.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Süreç ─────────────────────────────────── */}
        <section className="py-20 border-t border-neutral-800">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <p className="text-[#C5A059] text-sm font-bold uppercase tracking-widest mb-3">
                Süreç
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Proje Akışı
              </h2>
            </div>
            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-neutral-800 hidden md:block" />
              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Yapısal Durum Tespiti",
                    desc: "Schmidt çekici, ultrasonik hız ölçümü ve karbonatlaşma derinliği testleri ile kapsamlı tanı raporu hazırlanır.",
                  },
                  {
                    step: "02",
                    title: "Mühendislik Tasarımı",
                    desc: "Tanı bulgularına göre CFRP takviye, epoksi enjeksiyon veya hibrit güçlendirme programı tasarlanır.",
                  },
                  {
                    step: "03",
                    title: "Uygulama",
                    desc: "Tesis faaliyeti kesintisiz sürerken bölümlere ayrılmış çalışma programıyla uygulamalar hayata geçirilir.",
                  },
                  {
                    step: "04",
                    title: "Kalite Kontrol & Raporlama",
                    desc: "Her aşama belgelenir, bağımsız denetim kapsanabilir; müşteriye kapsamlı as-built raporu teslim edilir.",
                  },
                ].map((p) => (
                  <div key={p.step} className="flex gap-8">
                    <div className="shrink-0 w-12 h-12 bg-[#C5A059]/10 border border-[#C5A059]/40 flex items-center justify-center">
                      <span className="text-[#C5A059] font-black text-sm">{p.step}</span>
                    </div>
                    <div className="pb-8 border-b border-neutral-800 flex-1 last:border-0">
                      <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────── */}
        <section className="py-20 border-t border-neutral-800">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-black text-white mb-4">
              Yapınızın Durumunu Değerlendirin
            </h2>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              Ücretsiz ön değerlendirme için mühendislik ekibimizle irtibata
              geçin. Sahaya gelerek durumu yerinde inceleriz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 bg-[#C5A059] text-white px-8 py-4 font-bold hover:bg-[#b8923f] transition-colors uppercase tracking-widest text-sm"
              >
                Teklif Alın <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projeler"
                className="inline-flex items-center justify-center gap-2 border border-neutral-700 text-white px-8 py-4 font-bold hover:border-[#C5A059] transition-colors uppercase tracking-widest text-sm"
              >
                Referanslar
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
