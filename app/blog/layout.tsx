import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Hubyapı Industrial Cooling Insights',
  description: 'Expert articles on mechanical draft cooling towers, structural strengthening techniques, energy efficiency, and industrial cooling system best practices.',
  keywords: [
    'industrial cooling blog', 'cooling tower insights', 'structural strengthening articles',
    'mekanik soğutma makaleleri', 'endüstriyel soğutma blog'
  ],
  alternates: {
    canonical: 'https://www.xn--hubyap-u9a.com/blog',
    languages: {
      'tr': 'https://www.xn--hubyap-u9a.com/blog',
      'en': 'https://www.xn--hubyap-u9a.com/en/blog',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
