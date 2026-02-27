import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hizmetlerimiz',
  description: 'Enerji santralleri ve endüstriyel tesisler için yüksek performanslı soğutma sistemleri ve yapısal güçlendirme hizmetlerimiz.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
