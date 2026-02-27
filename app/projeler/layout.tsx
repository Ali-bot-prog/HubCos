import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projelerimiz',
  description: 'Türkiye ve bölgedeki enerji santralleri ile endüstriyel tesisler için başarıyla tamamladığımız projeler ve referanslarımız.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
