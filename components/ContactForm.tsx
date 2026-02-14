"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-900 p-8 rounded-lg shadow-sm border border-gray-800">
      <h3 className="text-2xl font-bold text-primary mb-6">Bize Mesaj Gönderin</h3>
      
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-800 text-green-400 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağız.
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-800 text-red-400 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Ad Soyad</label>
            <input 
              type="text" 
              name="name" 
              required
              className="w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-white placeholder-gray-600"
              placeholder="Adınız Soyadınız"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">Telefon</label>
            <input 
              type="tel" 
              name="phone" 
              className="w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-white placeholder-gray-600"
              placeholder="05XX XXX XX XX"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">E-Posta</label>
            <input 
              type="email" 
              name="email" 
              required
              className="w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-white placeholder-gray-600"
              placeholder="ornek@email.com"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">Konu</label>
            <select 
              name="subject" 
              className="w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-white"
            >
              <option>Genel Bilgi</option>
              <option>Satış / Proje Detayı</option>
              <option>Arsa Teklifi</option>
              <option>İş Başvurusu</option>
              <option>Diğer</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Mesajınız</label>
          <textarea 
            name="message" 
            required
            rows={4} 
            className="w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-white placeholder-gray-600"
            placeholder="Mesajınızı buraya yazınız..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-secondary text-white font-semibold py-3 px-8 rounded-md hover:bg-amber-600 transition-colors w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? "Gönderiliyor..." : "Gönder"}
          {!loading && <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}
