import { getDictionary, locales } from "@/lib/dictionaries";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return { title: dict.seo.pages.contact.title, description: dict.seo.pages.contact.description, keywords: dict.seo.keywords };
}

const LABELS: Record<string, Record<string, string>> = {
  tr: { heading: "İletişim", name: "Adınız", email: "E-postanız", subject: "Konu", message: "Mesajınız", send: "Gönder", address: "Adres", phone: "Telefon", emailLabel: "E-posta" },
  en: { heading: "Contact", name: "Your Name", email: "Your Email", subject: "Subject", message: "Your Message", send: "Send", address: "Address", phone: "Phone", emailLabel: "Email" },
  ar: { heading: "اتصل بنا", name: "اسمك", email: "بريدك الإلكتروني", subject: "الموضوع", message: "رسالتك", send: "إرسال", address: "العنوان", phone: "الهاتف", emailLabel: "البريد الإلكتروني" },
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = LABELS[locale] || LABELS.tr;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-primary mb-12">{t.heading}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <form className="space-y-6">
          {[
            { id: "name", label: t.name, type: "text" },
            { id: "email", label: t.email, type: "email" },
            { id: "subject", label: t.subject, type: "text" },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="block text-sm font-medium text-gray-300 mb-2">{f.label}</label>
              <input id={f.id} type={f.type} className="w-full px-4 py-3 bg-neutral-900 border border-gray-700 text-white focus:border-secondary focus:outline-none" />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">{t.message}</label>
            <textarea id="message" rows={6} className="w-full px-4 py-3 bg-neutral-900 border border-gray-700 text-white focus:border-secondary focus:outline-none resize-none" />
          </div>
          <button type="submit" className="w-full py-4 bg-secondary text-black font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
            {t.send}
          </button>
        </form>
        <div className="space-y-8 text-gray-400">
          <div><span className="text-secondary font-bold uppercase">{t.phone}:</span><p className="mt-1">+90 536 674 62 99</p></div>
          <div><span className="text-secondary font-bold uppercase">{t.emailLabel}:</span><p className="mt-1">info@hubyapi.com</p></div>
          <div><span className="text-secondary font-bold uppercase">{t.address}:</span><p className="mt-1">Kuzey Yıldızı Mahallesi, Bakır Sokak, No:1, Canik/SAMSUN</p></div>
        </div>
      </div>
    </div>
  );
}
