import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'HubCos ile iletişime geçin. Teklif alın veya sorularınız için bizimle irtibat kurun.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
