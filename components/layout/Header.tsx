'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

export interface SiteConfig {
  siteTitle?: string;
  phone?: string;
  email?: string;
  address?: string;
  instagram?: string;
  linkedin?: string;
  navLinks?: Array<{ id: string; title: string; url: string; children?: any[] }>;
}

// ── Per-locale nav labels ──────────────────────────────────────────────────
const NAV_LABELS: Record<string, Record<string, string>> = {
  tr: { home: 'Anasayfa', about: 'Hakkımızda', projects: 'Projeler', services: 'Hizmetler', contact: 'İletişim', faq: 'SSS', blog: 'Blog' },
  en: { home: 'Home', about: 'About', projects: 'Projects', services: 'Services', contact: 'Contact', faq: 'FAQ', blog: 'Blog' },
  ar: { home: 'الرئيسية', about: 'من نحن', projects: 'المشاريع', services: 'الخدمات', contact: 'اتصل بنا', faq: 'FAQ', blog: 'المدونة' },
};

function getLocaleFromPath(pathname: string): string {
  const segment = pathname.split('/')[1];
  return ['tr', 'en', 'ar'].includes(segment) ? segment : 'tr';
}

export default function Header({ config }: { config?: SiteConfig }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const locale = getLocaleFromPath(pathname || '');
  const labels = NAV_LABELS[locale] || NAV_LABELS.tr;

  // Helper to build locale-prefixed links
  const loc = (path: string) => `/${locale}${path}`;

  const phone = config?.phone || '+90 536 674 62 99';
  const email = config?.email || 'info@hubyapi.com';
  const address = config?.address || 'Kuzey Yıldızı Mah., Canik/SAMSUN';

  // Default nav — locale-aware
  const navLinks = config?.navLinks?.length
    ? config.navLinks.map((l) => ({ ...l, url: l.url.startsWith('/') && !l.url.startsWith(`/${locale}`) ? loc(l.url) : l.url }))
    : [
      { id: '1', title: labels.home, url: loc('/') },
      { id: '2', title: labels.about, url: loc('/hakkimizda') },
      { id: '3', title: labels.projects, url: loc('/projeler') },
      { id: '4', title: labels.services, url: loc('/hizmetler') },
      { id: '5', title: labels.contact, url: loc('/iletisim') },
    ];

  const isAdminPage = pathname?.startsWith('/O3_HubCos-7x24-STARK-V2.0-SECURE');
  if (isAdminPage) return null;

  return (
    <header className="w-full bg-neutral-900 shadow-md sticky top-0 z-50 border-b border-gray-800">
      {/* Top Bar */}
      <div className="bg-primary text-white text-xs py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-secondary" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-secondary" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2 ml-4 border-l border-white/20 pl-4">
              {config?.instagram && <a href={config.instagram} target="_blank" className="hover:text-secondary">INSTAGRAM</a>}
              {config?.linkedin && <a href={config.linkedin} target="_blank" className="hover:text-secondary">LINKEDIN</a>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-secondary" />
            <span>{address}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link href={loc('/')} className="hover:opacity-80 transition-opacity text-primary">
            <Logo title={config?.siteTitle} />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8 font-medium text-gray-300 items-center">
            {navLinks.map((link: any) => (
              <div key={link.id} className="relative group">
                {link.children ? (
                  <>
                    <button className="flex items-center gap-1 hover:text-secondary transition-colors py-2">
                      {link.title}
                    </button>
                    <div className="absolute top-full right-0 w-48 bg-neutral-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="p-2 space-y-1">
                        {link.children.map((child: any) => (
                          <Link key={child.id} href={child.url} className="block px-4 py-2 hover:bg-white/5 hover:text-secondary rounded-lg transition-colors text-sm">
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={link.url} className="hover:text-secondary transition-colors">
                    {link.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Language Switcher — desktop only */}
          <div className="hidden md:flex">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/90 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-neutral-900 border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4 border-b border-gray-800">
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-2">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-6">
            <nav className="flex flex-col gap-6 text-lg font-medium text-gray-300">
              {navLinks.map((link: any) => (
                <div key={link.id}>
                  {link.children ? (
                    <div className="space-y-3">
                      <div className="font-semibold text-primary uppercase text-sm tracking-wider opacity-70 mb-2">{link.title}</div>
                      <div className="pl-4 space-y-3 border-l-2 border-gray-800 ml-1">
                        {link.children.map((child: any) => (
                          <Link key={child.id} href={child.url} className="block py-1 hover:text-secondary transition-colors" onClick={() => setIsOpen(false)}>
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link href={link.url} className="block hover:text-secondary transition-colors" onClick={() => setIsOpen(false)}>
                      {link.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            {/* Mobile Language Switcher */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <LanguageSwitcher />
            </div>
          </div>

          <div className="p-6 border-t border-gray-800 bg-black/20">
            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <a href={`tel:${phone}`} className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-secondary" />
                <span>{phone}</span>
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-secondary" />
                <span>{email}</span>
              </a>
              <div className="flex gap-4 mt-4 pt-4 border-t border-gray-800/50">
                {config?.instagram && <a href={config.instagram} target="_blank" className="hover:text-secondary text-xs uppercase tracking-widest font-bold">INSTAGRAM</a>}
                {config?.linkedin && <a href={config.linkedin} target="_blank" className="hover:text-secondary text-xs uppercase tracking-widest font-bold">LINKEDIN</a>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
