"use client";

import Link from "next/link";
import { Home, Type, Image as ImageIcon, FileText, ArrowRight, MapPin, LayoutGrid, Phone } from "lucide-react";

export default function ContentDashboard() {
  const sections = [
    {
      title: "Ana Sayfa Düzenle",
      description: "Hero alanı, ana başlıklar ve 'Hakkımızda' özet metni.",
      icon: Home,
      href: "/O3_HubCos-7x24-STARK-V2.0-SECURE/content/home",
      color: "bg-blue-500"
    },
    {
      name: "Kurumsal Kimlik",
      desc: "Logo, site başlığı ve iletişim bilgileri",
      href: "/O3_HubCos-7x24-STARK-V2.0-SECURE/content/identity",
      icon: ImageIcon,
      color: "bg-purple-500"
    },
    {
      name: "Hizmetler",
      desc: "Anasayfa hizmetler bölümü",
      href: "/O3_HubCos-7x24-STARK-V2.0-SECURE/content/services",
      icon: LayoutGrid,
      color: "bg-green-500"
    },
    {
      name: "İletişim Sayfası",
      desc: "İletişim sayfası başlık ve metinleri",
      href: "/O3_HubCos-7x24-STARK-V2.0-SECURE/content/contact",
      icon: Phone,
      color: "bg-orange-500"
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">İçerik Yönetimi (CMS)</h1>
      <p className="text-gray-400 mb-8">Sitenizin üzerindeki yazı ve görselleri buradan değiştirebilirsiniz.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link 
            key={section.href}
            href={section.href}
            className="group bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-[#C5A059] transition-all hover:-translate-y-1 block"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${section.color} bg-opacity-20 text-${section.color.replace('bg-', '')} mb-6 group-hover:scale-110 transition-transform`}>
              <section.icon className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C5A059] transition-colors">
                {section.title}
            </h3>
            <p className="text-gray-400 mb-6 h-12">
                {section.description}
            </p>

            <div className="flex items-center gap-2 text-sm font-bold text-gray-500 group-hover:text-white transition-colors">
                Düzenle <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
