'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, Linkedin, Instagram } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { SiteConfig } from '@/lib/config';

const FOOTER_LABELS: Record<string, Record<string, string | string[]>> = {
  tr: {
    quickLinks: 'Hızlı Erişim',
    services: 'Hizmetlerimiz',
    contact: 'İletişim',
    rights: 'Tüm hakları saklıdır.',
    serviceList: ['Doğal Çekişli Kuleler', 'Mekanik Çekişli Kuleler', 'Yapısal Güçlendirme', 'EPC Anahtar Teslim'],
    navList: ['Anasayfa', 'Hakkımızda', 'Projeler', 'Hizmetler', 'İletişim'],
  },
  en: {
    quickLinks: 'Quick Links',
    services: 'Our Services',
    contact: 'Contact',
    rights: 'All rights reserved.',
    serviceList: ['Natural Draft Towers', 'Mechanical Draft Towers', 'Structural Strengthening', 'EPC Turnkey'],
    navList: ['Home', 'About', 'Projects', 'Services', 'Contact'],
  },
  ar: {
    quickLinks: 'روابط سريعة',
    services: 'خدماتنا',
    contact: 'اتصل بنا',
    rights: 'جميع الحقوق محفوظة.',
    serviceList: ['أبراج السحب الطبيعي', 'أبراج السحب الميكانيكي', 'التقوية الهيكلية', 'تسليم مفتاح EPC'],
    navList: ['الرئيسية', 'من نحن', 'المشاريع', 'الخدمات', 'اتصل بنا'],
  },
};

function getLocaleFromPath(pathname: string): string {
  const seg = pathname.split('/')[1];
  return ['tr', 'en', 'ar'].includes(seg) ? seg : 'tr';
}

export default function Footer({ config }: { config?: SiteConfig }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/O3_HubCos-7x24-STARK-V2.0-SECURE');
  if (isAdminPage) return null;

  const locale = getLocaleFromPath(pathname || '');
  const t = (FOOTER_LABELS[locale] || FOOTER_LABELS.tr) as Record<string, any>;
  const loc = (path: string) => `/${locale}${path}`;

  const navPaths = [loc('/'), loc('/hakkimizda'), loc('/projeler'), loc('/hizmetler'), loc('/iletisim')];

  return (
    <footer className="bg-neutral-950 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <Logo className="text-white" title={config?.siteTitle} />
            </div>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              {config?.footerText || (locale === 'ar' ? 'نبني المستقبل بجودة عالية.' : locale === 'en' ? 'Building the future with reliable engineering.' : 'Modern mühendislik ve güvenilir yapı anlayışıyla geleceği inşa ediyoruz.')}
            </p>
            <div className="flex gap-4">
              <a href={config?.linkedin || '#'} className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={config?.instagram || '#'} className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 md:mb-6 border-b border-gray-700 pb-2 inline-block">{t.quickLinks}</h4>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
              {config?.footerLinks?.length
                ? config.footerLinks.map((link: any, i: number) => (
                  <li key={i}><Link href={link.url} className="hover:text-secondary transition-colors">{link.title}</Link></li>
                ))
                : (t.navList as string[]).map((label: string, i: number) => (
                  <li key={i}><Link href={navPaths[i]} className="hover:text-secondary transition-colors">{label}</Link></li>
                ))
              }
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 md:mb-6 border-b border-gray-700 pb-2 inline-block">{t.services}</h4>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
              {config?.footerServices?.length
                ? config.footerServices.map((s: any, i: number) => (
                  <li key={i}><Link href={s.url} className="hover:text-secondary transition-colors">{s.title}</Link></li>
                ))
                : (t.serviceList as string[]).map((s: string) => <li key={s}>{s}</li>)
              }
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 md:mb-6 border-b border-gray-700 pb-2 inline-block">{t.contact}</h4>
            <ul className="space-y-3 md:space-y-4 text-gray-400 text-sm md:text-base">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span>{config?.address || 'Kuzey Yıldızı Mah., Canik/SAMSUN'}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span>{config?.phone || '+90 536 674 62 99'}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span>{config?.email || 'info@hubyapi.com'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} {config?.siteTitle || 'HUBYAPI'}. Powered by <span className="text-secondary font-semibold">OmNexus</span>. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
}
