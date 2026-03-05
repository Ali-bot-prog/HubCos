import { getDictionary, locales } from "@/lib/dictionaries";
import type { Metadata } from "next";
import { getFaqs } from "@/lib/data";
import FAQClient from "@/app/sss/FAQClient";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return { title: dict.seo.pages.faq.title, description: dict.seo.pages.faq.description, keywords: dict.seo.keywords };
}

export default async function LocaleFAQPage({ params }: Props) {
  const faqs = getFaqs();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQClient faqs={faqs} />
    </>
  );
}
