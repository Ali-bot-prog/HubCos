"use client";

import { useEffect, useState } from "react";
import { Users, Briefcase, MessageSquare, TrendingUp, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
      projects: 0,
      messages: 0,
      users: 0
  });
  const [config, setConfig] = useState<any>({
    dashboardTitle: "Hoş Geldiniz, Admin",
    showProjectsStat: true,
    showMessagesStat: true,
    showUsersStat: true,
    showGrowthStat: true,
    showRecentMessages: true,
    showQuickActions: true
  });

  useEffect(() => {
    // Fetch stats
    Promise.all([
        fetch('/api/projects').then(res => res.json()),
        fetch('/api/messages').then(res => res.json()),
        fetch('/api/admins').then(res => res.json()),
        fetch('/api/content').then(res => res.json())
    ]).then(([projects, messages, admins, content]) => {
        setStats({
            projects: Array.isArray(projects) ? projects.length : 0,
            messages: Array.isArray(messages) ? messages.filter((m: any) => !m.read).length : 0,
            users: Array.isArray(admins) ? admins.length : 0
        });
        if (content.dashboardConfig) {
            setConfig(content.dashboardConfig);
        }
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{config.dashboardTitle || "Hoş Geldiniz"}</h1>
        <Link href="/O3_HubCos-7x24-STARK-V2.0-SECURE/dashboard-settings" className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors" title="Dashboard Düzenle">
            <Settings className="w-6 h-6" />
        </Link>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {config.showProjectsStat && <StatCard title="Toplam Proje" value={stats.projects} icon={Briefcase} color="bg-blue-500" />}
        {config.showMessagesStat && <StatCard title="Yeni Mesajlar" value={stats.messages} icon={MessageSquare} color="bg-green-500" />}
        {config.showUsersStat && <StatCard title="Yöneticiler" value={stats.users} icon={Users} color="bg-purple-500" />}
        {config.showGrowthStat && <StatCard title="Büyüme" value="%15" icon={TrendingUp} color="bg-[#C5A059]" />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {config.showRecentMessages && (
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <h2 className="text-xl font-bold mb-4">Son Durum</h2>
                <div className="space-y-4">
                    <p className="text-gray-400">
                        Sistemde toplam <span className="text-white font-bold">{stats.projects}</span> proje yayınlanıyor.
                    </p>
                    <p className="text-gray-400">
                        <span className="text-white font-bold">{stats.messages}</span> okunmamış mesajınız var.
                    </p>
                </div>
            </div>
        )}

        {config.showQuickActions && (
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <h2 className="text-xl font-bold mb-4">Hızlı İşlemler</h2>
                <div className="flex flex-wrap gap-4">
                    <Link href="/O3_HubCos-7x24-STARK-V2.0-SECURE/projects/new" className="bg-[#2D3748] hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition-colors text-white inline-block">
                        Yeni Proje Ekle
                    </Link>
                    <Link href="/O3_HubCos-7x24-STARK-V2.0-SECURE/content" className="bg-[#2D3748] hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition-colors text-white inline-block">
                        Siteyi Düzenle
                    </Link>
                     <Link href="/O3_HubCos-7x24-STARK-V2.0-SECURE/menu" className="bg-[#2D3748] hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition-colors text-white inline-block">
                        Menüyü Düzenle
                    </Link>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex items-center gap-4 hover:border-[#C5A059]/50 transition-colors">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} bg-opacity-20 text-${color.replace('bg-', '')}`}>
        <Icon className={`w-6 h-6 text-white`} />
      </div>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
