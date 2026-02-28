import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kurumsal | Hakkımızda',
  description: 'HubCos enerji ve endüstri sektörünün kalbinde yer alan Soğutma Kuleleri alanında ihtisaslaşmış lider mühendislik firmasıdır.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
