import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog / Haberler',
  description: 'Endüstriyel soğutma sistemleri, enerji verimliliği ve sektörden güncel haberler.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
