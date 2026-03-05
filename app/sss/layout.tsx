import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | Industrial Cooling Towers & Engineering - Hubyapı',
  description: 'Answers to frequently asked questions about mechanical draft cooling towers, structural strengthening, maintenance intervals, and Hubyapı engineering services.',
  keywords: [
    'cooling tower faq', 'mechanical draft cooling tower questions', 'structural strengthening faq',
    'sıkça sorulan sorular', 'soğutma kulesi bakım', 'yapısal güçlendirme'
  ],
  alternates: {
    canonical: 'https://www.xn--hubyap-u9a.com/sss',
    languages: {
      'tr': 'https://www.xn--hubyap-u9a.com/sss',
      'en': 'https://www.xn--hubyap-u9a.com/en/faq',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
