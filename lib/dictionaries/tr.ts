export const tr = {
  locale: "tr",
  dir: "ltr" as const,
  lang: "tr",

  // ─── SEO ────────────────────────────────────────────────────────────
  seo: {
    siteName: "Hubyapı | HubCos",
    titleTemplate: "%s | Hubyapı",
    // Tüm marka varyantları buraya — "hub yapı", "hub yapi", "hubcos" vb.
    keywords: [
      "Hubyapı", "Hub Yapı", "HubCos", "hub yapi", "hub cos", "hubyapi",
      "endüstriyel soğutma kuleleri", "hiperbolik soğutma kulesi",
      "mekanik soğutma kulesi", "soğutma kulesi bakım",
      "soğutma kulesi inşaatı", "soğutma kulesi rehabilitasyon",
      "enerji santrali soğutma", "termik santral soğutma",
      "yapısal güçlendirme", "betonarme güçlendirme",
      "EPC mühendislik", "endüstriyel mühendislik",
      "Türkiye soğutma kulesi firması",
    ],
    alternateNames: [
      "HubCos", "Hub Yapı", "Hub Yapi", "Hubyapi", "Hubyapı Endüstriyel"
    ],
    pages: {
      home: {
        title: "Endüstriyel Soğutma Kuleleri & Yapısal Güçlendirme",
        description:
          "Hubyapı (Hub Yapı / HubCos) — Enerji santralleri ve endüstriyel tesisler için hiperbolik ve mekanik soğutma kulesi inşaatı, bakım ve yapısal güçlendirme hizmetleri. 20+ yıl deneyim.",
      },
      about: {
        title: "Hakkımızda — Kurumsal",
        description:
          "Hubyapı (HubCos), 20 yılı aşkın deneyimiyle Türkiye ve bölgede endüstriyel soğutma kuleleri alanında lider mühendislik firmasıdır.",
      },
      services: {
        title: "Hizmetler — Uzmanlık Alanlarımız",
        description:
          "Hiperbolik kule inşaatı, mekanik soğutma kuleleri, bakım-onarım, yapısal güçlendirme, termal performans analizi ve EPC anahtar teslim hizmetleri.",
      },
      projects: {
        title: "Projeler — Referanslarımız",
        description:
          "Hubyapı'nın Türkiye ve bölgede gerçekleştirdiği soğutma kulesi ve yapısal güçlendirme proje referansları.",
      },
      contact: {
        title: "İletişim",
        description:
          "Hubyapı (Hub Yapı / HubCos) ile iletişime geçin. Proje teklifi, teknik danışmanlık ve bilgi için bize ulaşın.",
      },
      faq: {
        title: "Sıkça Sorulan Sorular",
        description:
          "Soğutma kulesi inşaatı, bakımı ve yapısal güçlendirme hakkında sıkça sorulan sorular — Hubyapı / HubCos.",
      },
      blog: {
        title: "Blog — Teknik Makaleler",
        description:
          "Endüstriyel soğutma sistemleri, hiperbolik kuleler ve yapısal mühendislik hakkında teknik içerikler.",
      },
    },
  },

  // ─── NAV ──────────────────────────────────────────────────────────
  nav: {
    home: "Anasayfa",
    about: "Hakkımızda",
    projects: "Projeler",
    services: "Hizmetler",
    contact: "İletişim",
    faq: "SSS",
    blog: "Blog",
  },

  // ─── SAYFALAR ─────────────────────────────────────────────────────
  home: {
    hero: {
      title: "Endüstriyel Soğutma Kuleleri",
      subtitle:
        "Enerji santralleri ve endüstriyel tesisler için yüksek performanslı hiperbolik ve mekanik soğutma çözümleri.",
      cta1: "Projelerimiz",
      cta2: "Teklif Alın",
    },
  },

  about: {
    heading: "KURUMSAL",
    intro:
      "HubCos, enerji ve endüstri sektörünün kalbinde yer alan \"Soğutma Kuleleri\" alanında ihtisaslaşmış lider mühendislik firmasıdır.",
    vision: {
      title: "Vizyonumuz",
      text: "Global enerji pazarında, en yüksek verimliliğe sahip, çevre dostu ve sürdürülebilir soğutma kulesi teknolojilerinin öncü uygulayıcısı olmak.",
    },
    mission: {
      title: "Misyonumuz",
      text: "Endüstriyel tesislerin operasyonel sürekliliğini, sıfır hata toleransı ve ileri mühendislik teknikleriyle inşa ettiğimiz soğutma sistemleriyle garanti altına almak.",
    },
    stats: {
      heading: "RAKAMLARLA HUBCOS",
      towers: "Kule İnşaatı",
      capacity: "Soğutma Gücü",
      safety: "İş Güvenliği",
    },
  },

  footer: {
    rights: "© 2024 Hubyapı Endüstriyel Mühendislik. Tüm hakları saklıdır.",
    tagline: "Hub Yapı | HubCos — Soğutma Kulesi Uzmanları",
  },
};

// Explicitly type dir as union to allow RTL locales (ar)
export type Dictionary = Omit<typeof tr, "dir"> & { dir: "ltr" | "rtl" };
