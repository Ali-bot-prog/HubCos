import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mechanical Draft Cooling Towers | Design & Installation - Hubyapı',
  description: 'High-efficiency mechanical draft cooling tower solutions for industrial plants. Your reliable partner in engineering, assembly, and maintenance services.',
  keywords: [
    'mechanical draft cooling towers', 'industrial cooling tower design', 'structural strengthening',
    'mekanik çekişli soğutma kuleleri', 'soğutma kulesi montaj', 'endüstriyel so\u011futma'
  ],
  alternates: {
    canonical: 'https://www.xn--hubyap-u9a.com/hizmetler',
    languages: {
      'tr': 'https://www.xn--hubyap-u9a.com/hizmetler',
      'en': 'https://www.xn--hubyap-u9a.com/en/services',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
