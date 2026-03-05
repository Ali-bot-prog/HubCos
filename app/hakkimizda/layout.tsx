import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Hubyapı | 20+ Years Industrial Cooling Engineering',
  description: 'Hubyapı specializes in industrial cooling tower engineering for power plants and industrial facilities. Over 20 years of expertise in hyperbolic and mechanical cooling systems.',
  keywords: [
    'cooling tower engineering company', 'industrial cooling specialist', 'hubyap\u0131 hakkımızda',
    'soğutma kulesi mühendislik firması', 'power plant cooling expertise'
  ],
  alternates: {
    canonical: 'https://www.xn--hubyap-u9a.com/hakkimizda',
    languages: {
      'tr': 'https://www.xn--hubyap-u9a.com/hakkimizda',
      'en': 'https://www.xn--hubyap-u9a.com/en/about',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
