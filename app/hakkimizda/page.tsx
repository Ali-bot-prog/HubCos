"use client";

import { Reveal, FadeIn } from '@/components/ui/Reveal';

export default function Hakkimizda() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-8 border-b-4 border-secondary inline-block pb-4 tracking-tight">KURUMSAL</h1>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="prose prose-lg text-gray-400 mb-16">
            <p className="mb-6 text-xl leading-relaxed font-light text-primary">
              <strong>HubCos</strong>, enerji ve endüstri sektörünün kalbinde yer alan "Soğutma Kuleleri" alanında ihtisaslaşmış lider mühendislik firmasıdır. 
              Sıradan inşaat projelerinden farklı olarak, termodinamik ve yapısal mühendisliğin zirvesi olan kulelerin tasarım, inşa ve rehabilitasyonunu üstleniyoruz.
            </p>
            <p className="mb-4">
              20 yılı aşkın süredir; termik santrallerden rafinerilere, demir-çelik tesislerinden kimya fabrikalarına kadar en zorlu endüstriyel koşullarda çalışan müşterilerimiz için 
              kesintisiz performans sunuyoruz. Hiperbolik betonarme yapılar ve mekanik sistemlerdeki derin teknik bilgimizle, Türkiye'nin ve bölgenin enerji güvenliğine katkı sağlıyoruz.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
          <FadeIn delay={0.3}>
            <div className="bg-primary text-white p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h2 className="text-3xl font-bold mb-6 text-secondary">Vizyonumuz</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Global enerji pazarında, en yüksek verimliliğe sahip, çevre dostu ve sürdürülebilir soğutma kulesi teknolojilerinin öncü uygulayıcısı olmak.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="bg-neutral-900 border border-gray-800 p-10 shadow-lg relative overflow-hidden group">
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <h2 className="text-3xl font-bold text-primary mb-6">Misyonumuz</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Endüstriyel tesislerin operasyonel sürekliliğini, sıfır hata toleransı ve ileri mühendislik teknikleriyle inşa ettiğimiz soğutma sistemleriyle garanti altına almak.
              </p>
            </div>
          </FadeIn>
        </div>

        <div>
           <Reveal delay={0.5}>
            <h2 className="text-4xl font-black text-primary mb-10 text-center">RAKAMLARLA HUBCOS</h2>
           </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.6}>
              <div className="text-center p-8 border border-gray-800 shadow-lg bg-neutral-900 hover:-translate-y-2 transition-transform duration-300">
                <div className="text-6xl font-black text-secondary mb-4">50+</div>
                <div className="text-primary font-bold uppercase tracking-widest">Kule İnşaatı</div>
              </div>
            </FadeIn>
           <FadeIn delay={0.7}>
              <div className="text-center p-8 border border-gray-800 shadow-lg bg-neutral-900 hover:-translate-y-2 transition-transform duration-300">
                <div className="text-6xl font-black text-secondary mb-4">12GW</div>
                <div className="text-primary font-bold uppercase tracking-widest">Soğutma Gücü</div>
              </div>
           </FadeIn>
            <FadeIn delay={0.8}>
              <div className="text-center p-8 border border-gray-800 shadow-lg bg-neutral-900 hover:-translate-y-2 transition-transform duration-300">
                <div className="text-6xl font-black text-secondary mb-4">%100</div>
                <div className="text-primary font-bold uppercase tracking-widest">İş Güvenliği</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
