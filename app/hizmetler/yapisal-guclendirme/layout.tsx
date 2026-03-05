import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Industrial Structural Strengthening & Concrete Repair | Hubyapı',
  description: 'Advanced structural strengthening, corrosion prevention, and concrete repair services for power plants and towers. Extend the lifespan of your structures safely.',
  keywords: [
    'structural strengthening', 'concrete repair', 'corrosion prevention', 'CFRP strengthening',
    'power plant structural repair', 'cooling tower rehabilitation',
    'yapısal güçlendirme', 'beton onarımı', 'korozyon önleme', 'karbon fiber takviye'
  ],
  alternates: {
    canonical: 'https://www.xn--hubyap-u9a.com/hizmetler/yapisal-guclendirme',
    languages: {
      'tr': 'https://www.xn--hubyap-u9a.com/hizmetler/yapisal-guclendirme',
      'en': 'https://www.xn--hubyap-u9a.com/en/services/structural-strengthening',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
