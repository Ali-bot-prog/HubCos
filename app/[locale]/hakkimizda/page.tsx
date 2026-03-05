import { getDictionary, locales } from "@/lib/dictionaries";
import type { Metadata } from "next";
import { Reveal, FadeIn } from "@/components/ui/Reveal";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const { about } = dict.seo.pages;
  return { title: about.title, description: about.description, keywords: dict.seo.keywords };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const t = dict.about;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-8 border-b-4 border-secondary inline-block pb-4 tracking-tight">
            {t.heading}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="prose prose-lg text-gray-400 mb-16">
            <p className="mb-6 text-xl leading-relaxed font-light text-primary">
              <strong>HubCos</strong>, {t.intro}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
          <FadeIn delay={0.3}>
            <div className="bg-primary text-white p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <h2 className="text-3xl font-bold mb-6 text-secondary">{t.vision.title}</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{t.vision.text}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="bg-neutral-900 border border-gray-800 p-10 shadow-lg relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <h2 className="text-3xl font-bold text-primary mb-6">{t.mission.title}</h2>
              <p className="text-gray-400 text-lg leading-relaxed">{t.mission.text}</p>
            </div>
          </FadeIn>
        </div>

        <div>
          <Reveal delay={0.5}>
            <h2 className="text-4xl font-black text-primary mb-10 text-center">{t.stats.heading}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "50+", label: t.stats.towers },
              { value: "12GW", label: t.stats.capacity },
              { value: "%100", label: t.stats.safety },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={0.6 + i * 0.1}>
                <div className="text-center p-8 border border-gray-800 shadow-lg bg-neutral-900 hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-6xl font-black text-secondary mb-4">{stat.value}</div>
                  <div className="text-primary font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
