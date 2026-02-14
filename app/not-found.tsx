import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-9xl font-black text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-white mb-6">Sayfa Bulunamadı</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir.
      </p>
      <Link 
        href="/" 
        className="flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded hover:bg-amber-600 transition-colors font-bold uppercase tracking-wider"
      >
        <Home className="w-5 h-5" />
        Anasayfaya Dön
      </Link>
    </div>
  );
}
