# HubCos - Endüstriyel Soğutma Kuleleri 🏭

HubCos, enerji santralleri ve endüstriyel tesisler için yüksek performanslı soğutma sistemleri inşa eden lider bir mühendislik firmasıdır. Bu proje, HubCos'un kurumsal kimliğini, hizmetlerini, projelerini ve vizyonunu yansıtan modern, hızlı ve SEO uyumlu bir web uygulamasıdır.

## 🚀 Teknolojiler
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Bileşenleri:** [Radix UI](https://www.radix-ui.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/)
- **Database / ORM:** [Prisma](https://www.prisma.io/)
- **Dil:** TypeScript

## 🌟 Öne Çıkan Özellikler
- **Modern Gelişmiş UI/UX:** Akıcı animasyonlar, parallax efektleri ve mobil uyumlu yapı.
- **Kapsamlı Yönetim Paneli:** Projeler, referanslar, SEO ayarları, blog içerikleri ve iletişim mesajları için gelişmiş yönetim ekranı.
- **Gelişmiş SEO Optimizasyonu:** Dinamik sitemap.xml, robots.txt, sayfa bazlı title/description, OpenGraph ve Twitter card destekleri.
- **Güvenlik & Performans:** Next.js Server Components, API Routes ile güvenli kimlik doğrulama, bcrypt şifreleme ve optimize edilmiş font/imaj yüklemeleri.

## 🛠 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### Gereksinimler
- Node.js (v18.17 veya üzeri)
- npm, yarn, pnpm veya bun
- PostgreSQL veya projenin kullandığı veritabanı sistemi

### Adımlar

**1. Depoyu klonlayın:**
```bash
git clone https://github.com/kullanici-adiniz/hubcos-website.git
cd hubcos-website
```

**2. Bağımlılıkları yükleyin:**
```bash
npm install
```

**3. Çevre değişkenlerini (`.env`) yapılandırın:**
Proje kök dizininde bir `.env` dosyası oluşturun ve gerekli değerleri doldurun:
```env
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/hubcosdb?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
# Diğer gerekli anahtarları da ekleyin (örn: JWT_SECRET vb varsa)
```

**4. Veritabanı şemasını uygulayın:**
```bash
npx prisma db push
# Veya migration'lar varsa: npx prisma migrate dev
```
*(Eğer demo içerik üreten bir seed script'iniz varsa `npx prisma db seed` komutunu çalıştırabilirsiniz.)*

**5. Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışıyor olacaktır. 

## 📦 Production (Canlı Ortam) İçin Derleme

Projeyi yayına almak için önce optimize edilmiş bir build oluşturmalısınız:

```bash
npm run build
npm start
```

## 📝 Geliştirme Notları
- Bu projede Client Component (istemci etkileşimi - animasyonlar) ve Server Component mimarisi iç içe kullanılmaktadır. Sayfaya özel SEO tanımlamaları için ilgili route altında `layout.tsx` dosyaları kullanılmaktadır.
- Projede herhangi bir NextAuth veya custom session kontrolü yapılıyorsa `middleware.ts` üzerinden route koruması gerçekleştirilmiştir.
