"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, FolderKanban, MessageSquare, FileText, LogOut, Settings, Users, Paintbrush, PanelBottom, PanelLeft, HelpCircle, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

const menuItems = [
    { name: "Genel Bakış", href: "/O3_HubCos-7x24-STARK-V2.0-SECURE", icon: LayoutDashboard },
    { name: "Site Tasarımı", href: "/O3_HubCos-7x24-STARK-V2.0-SECURE/design", icon: Paintbrush },
    { name: "Menü / Sidebar", href: "/O3_HubCos-7x24-STARK-V2.0-SECURE/menu", icon: PanelLeft },
    { name: "Blog Yazıları", href: "/O3_HubCos-7x24-STARK-V2.0-SECURE/blog", icon: FileText },
    { name: "S.S.S (FAQ)", href: "/O3_HubCos-7x24-STARK-V2.0-SECURE/faq", icon: HelpCircle },
    { name: "Footer", href: "/O3_HubCos-7x24-STARK-V2.0-SECURE/footer", icon: PanelBottom },
    { name: "İçerik Yönetimi", href: "/O3_HubCos-7x24-STARK-V2.0-SECURE/content", icon: FileText },
    { name: "Projeler", href: "/O3_HubCos-7x24-STARK-V2.0-SECURE/projects", icon: FolderKanban },
    { name: "Mesajlar", href: "/O3_HubCos-7x24-STARK-V2.0-SECURE/messages", icon: MessageSquare },
    { name: "Yöneticiler", href: "/O3_HubCos-7x24-STARK-V2.0-SECURE/users", icon: Users },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen bg-gray-900 text-white md:overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Mobile Drawer / Desktop Static */}
      <aside 
        className={`
            fixed md:static inset-y-0 left-0 z-[60] w-64 bg-gray-800 border-r border-gray-700 flex flex-col transition-transform duration-300 ease-in-out h-full
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
           <div className="flex items-center">
                <div className="w-10 h-10 bg-[#2D3748] rounded-lg flex items-center justify-center mr-3 border border-[#C5A059]/30">
                    <span className="text-[#C5A059] text-xl font-serif font-bold">H</span>
                </div>
                <h1 className="text-xl font-bold tracking-wide">HubCos Panel</h1>
           </div>
           {/* Close button for mobile */}
           <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
           >
             <X size={24} />
           </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#C5A059] text-white font-medium shadow-lg shadow-[#C5A059]/20"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700 mt-auto">
          <button
            onClick={() => signOut({ callbackUrl: "/O3_HubCos-7x24-STARK-V2.0-SECURE/login" })}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Çıkış Yap
          </button>
        </div>
      </aside>

       {/* Top Bar (Mobile Only) */}
      <div className="md:hidden flex flex-col w-full shrink-0 sticky top-0 z-40">
        {/* DEBUG BANNER */}
        <div className="bg-red-600 text-white text-xs font-bold text-center py-1">
          GÜNCELLEME KONTROL: V2.5 (NATIVE SCROLL)
        </div>

        <div className="flex items-center justify-between bg-gray-800 p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2D3748] rounded flex items-center justify-center border border-[#C5A059]/30">
              <span className="text-[#C5A059] font-serif font-bold">H</span>
            </div>
            <span className="font-bold text-white">HubCos Admin</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-gray-300 hover:text-white p-1 rounded-md hover:bg-gray-700"
          >
            <Menu size={24} />
          </button>
        </div>
       </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-900 w-full md:overflow-x-hidden md:overflow-y-auto h-auto md:h-full">
        <div className="p-4 md:p-8 lg:p-12 pb-24">
            {children}
          </div>
      </main>
    </div>
  );
}
