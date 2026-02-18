'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { SiteConfig } from '@/lib/config';

interface FooterProps {
  config?: SiteConfig;
}

export default function Footer({ config }: FooterProps) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/O3_HubCos-7x24-STARK-V2.0-SECURE');

  if (isAdminPage) return null;

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
              {config?.footerText || "Modern mimari ve güvenilir yapı anlayışıyla geleceği inşa ediyoruz."}
            </p>
            <div className="flex gap-4">
              <a href={config?.linkedin || "#"} className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={config?.instagram || "#"} className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 md:mb-6 border-b border-gray-700 pb-2 inline-block">Hızlı Erişim</h4>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
               {config?.footerLinks && config.footerLinks.length > 0 ? (
                config.footerLinks.map((link: any, i: number) => (
                  <li key={i}><Link href={link.url} className="hover:text-secondary transition-colors">{link.title}</Link></li>
                ))
              ) : (
                <>
                  <li><Link href="/" className="hover:text-secondary transition-colors">Anasayfa</Link></li>
                  <li><Link href="/hakkimizda" className="hover:text-secondary transition-colors">Hakkımızda</Link></li>
                  <li><Link href="/projeler" className="hover:text-secondary transition-colors">Projeler</Link></li>
                  <li><Link href="/hizmetler" className="hover:text-secondary transition-colors">Hizmetler</Link></li>
                  <li><Link href="/iletisim" className="hover:text-secondary transition-colors">İletişim</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 md:mb-6 border-b border-gray-700 pb-2 inline-block">Hizmetlerimiz</h4>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
              {config?.footerServices && config.footerServices.length > 0 ? (
                config.footerServices.map((service: any, i: number) => (
                  <li key={i}><Link href={service.url} className="hover:text-secondary transition-colors">{service.title}</Link></li>
                ))
              ) : (
                <>
                  <li>Doğal Çekişli Kuleler</li>
                  <li>Mekanik Çekişli Kuleler</li>
                  <li>Yapısal Güçlendirme</li>
                  <li>Endüstriyel Çözümler</li>
                </>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 md:mb-6 border-b border-gray-700 pb-2 inline-block">İletişim</h4>
            <ul className="space-y-3 md:space-y-4 text-gray-400 text-sm md:text-base">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span>{config?.address || "İstanbul, Türkiye"}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span>{config?.phone || "+90 555 123 45 67"}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span>{config?.email || "info@hubcos.com"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {config?.siteTitle || "HUBYAPI"}. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
