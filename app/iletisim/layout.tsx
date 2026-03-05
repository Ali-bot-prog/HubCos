import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Hubyapı | Get a Free Engineering Consultation',
  description: 'Reach out to our engineering team for cooling tower design, installation, or structural repair project inquiries. We serve power plants and industrial facilities.',
  keywords: [
    'contact hubyapı', 'cooling tower consultation', 'industrial engineering inquiry',
    'iletişim', 'teklif al', 'soğutma kulesi danışma'
  ],
  alternates: {
    canonical: 'https://www.xn--hubyap-u9a.com/iletisim',
    languages: {
      'tr': 'https://www.xn--hubyap-u9a.com/iletisim',
      'en': 'https://www.xn--hubyap-u9a.com/en/contact',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
