"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds splash

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111111]">
      <div className="relative w-32 h-32 animate-pulse">
        {/* Simple Logo Placeholder or Animation */}
        <div className="absolute inset-0 border-4 border-[#C5A059] rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-white">HubCos</div>
      </div>
    </div>
  );
}
