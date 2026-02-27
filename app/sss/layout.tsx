import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular',
  description: 'Soğutma kuleleri, faaliyetlerimiz ve mühendislik çözümlerimiz hakkında sıkça sorulan sorular ve cevapları.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
