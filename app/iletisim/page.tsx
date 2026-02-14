import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { getSiteConfig } from '@/lib/config';
import ContactForm from '@/components/ContactForm';

export default function Iletisim() {
  const config = getSiteConfig();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">İletişim</h1>
        <p className="text-lg text-gray-600">
          Projelerimiz hakkında detaylı bilgi almak için bizimle iletişime geçebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-neutral-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold text-primary mb-6">İletişim Bilgileri</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-secondary shadow-smborder border-gray-700">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Adres</div>
                  <p className="text-gray-400 text-sm">{config.address || "İstanbul, Türkiye"}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-secondary shadow-sm border border-gray-700">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Telefon</div>
                  <p className="text-gray-400 text-sm">{config.phone || "+90 555 123 45 67"}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-secondary shadow-sm border border-gray-700">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">E-Posta</div>
                  <p className="text-gray-400 text-sm">{config.email || "info@hubcos.com"}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-secondary shadow-sm border border-gray-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Çalışma Saatleri</div>
                  <p className="text-gray-400 text-sm">Pazartesi - Cuma: 09:00 - 18:00</p>
                  <p className="text-gray-400 text-sm">Cumartesi: 09:00 - 14:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
            <ContactForm />
        </div>
      </div>
    </div>
  );
}
