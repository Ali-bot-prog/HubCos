"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, MessageSquare, FileText, LogOut, Settings, Users, Paintbrush, PanelBottom, PanelLeft, HelpCircle } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-700 flex items-center justify-center">
             <div className="w-10 h-10 bg-[#2D3748] rounded-lg flex items-center justify-center mr-3 border border-[#C5A059]/30">
                <span className="text-[#C5A059] text-xl font-serif font-bold">H</span>
            </div>
          <h1 className="text-xl font-bold tracking-wide">HubCos Panel</h1>
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

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => signOut({ callbackUrl: "/O3_HubCos-7x24-STARK-V2.0-SECURE/login" })}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Çıkış Yap
          </button>
        </div>
      </aside>

       {/* Mobile Header (Visible only on small screens) */}
       <div className="md:hidden fixed top-0 w-full bg-gray-800 z-50 p-4 flex justify-between items-center border-b border-gray-700">
          <span className="font-bold text-[#C5A059]">HubCos Admin</span>
          {/* Mobile menu toggle would go here */}
       </div>


      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-900 p-8 md:p-12 mt-16 md:mt-0">
        {children}
      </main>
    </div>
  );
}
