"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Hatalı kullanıcı adı veya şifre!");
      setLoading(false);
    } else {
      router.push("/O3_HubCos-7x24-STARK-V2.0-SECURE");
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center p-4">
      <div className="bg-[#1F2937] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#2D3748] rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg border border-[#C5A059]/20">
                <span className="text-[#C5A059] text-4xl font-serif font-bold">H</span>
            </div>
          <h1 className="text-2xl font-bold text-white mb-2">HubCos Panel</h1>
          <p className="text-gray-400 text-sm">Yönetici girişi yapın</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Kullanıcı Adı</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#374151] border border-gray-600 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 focus:border-[#C5A059] transition-all placeholder-gray-500"
                placeholder="Örn: admin"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Şifre</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#374151] border border-gray-600 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 focus:border-[#C5A059] transition-all placeholder-gray-500"
                placeholder="••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C5A059] hover:bg-[#b08e4f] text-white font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#C5A059]/20"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
        
         <div className="mt-6 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} HubCos.com
        </div>
      </div>
    </div>
  );
}
