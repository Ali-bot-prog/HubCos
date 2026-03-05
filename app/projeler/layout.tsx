import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project References | Hubyapı Industrial Cooling Projects',
  description: "Explore Hubyapı's completed and ongoing industrial cooling tower and structural strengthening projects across Turkey and the region.",
  keywords: [
    'cooling tower projects', 'industrial cooling case studies', 'hyperbolic tower construction Turkey',
    'soğutma kulesi projeleri', 'betonarme kule referansları'
  ],
  alternates: {
    canonical: 'https://www.xn--hubyap-u9a.com/projeler',
    languages: {
      'tr': 'https://www.xn--hubyap-u9a.com/projeler',
      'en': 'https://www.xn--hubyap-u9a.com/en/projects',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
