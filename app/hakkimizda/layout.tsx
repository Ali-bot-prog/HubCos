import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'HubCos hakkında kurumsal bilgiler, vizyonumuz ve misyonumuz.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
