"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    } else {
      // Daha önce karar verilmişse gtag'i güncelle
      updateConsent(consent as "granted" | "denied");
    }
  }, []);

  function updateConsent(value: "granted" | "denied") {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: value,
        ad_storage: value,
      });
    }
  }

  function handleAccept() {
    localStorage.setItem("cookie_consent", "granted");
    updateConsent("granted");
    setVisible(false);
  }

  function handleDeny() {
    localStorage.setItem("cookie_consent", "denied");
    updateConsent("denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9998,
        width: "min(92vw, 640px)",
        background: "rgba(17,17,17,0.97)",
        border: "1px solid rgba(197,160,89,0.35)",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
        padding: "1.25rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Başlık */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.1rem" }}>🍪</span>
        <p
          style={{
            margin: 0,
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#C5A059",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Çerez Bildirimi
        </p>
      </div>

      {/* Açıklama */}
      <p
        style={{
          margin: 0,
          fontSize: "0.82rem",
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.6,
        }}
      >
        Bu site, ziyaretçi deneyimini iyileştirmek ve analiz verileri toplamak
        amacıyla çerezler kullanmaktadır. Kabul etmemeniz durumunda yalnızca
        anonim istatistiksel veriler işlenecektir.
      </p>

      {/* Butonlar */}
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
        <button
          onClick={handleDeny}
          style={{
            padding: "0.45rem 1.1rem",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "rgba(255,255,255,0.55)",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")
          }
        >
          Reddet
        </button>
        <button
          onClick={handleAccept}
          style={{
            padding: "0.45rem 1.25rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#111111",
            background: "#C5A059",
            border: "1px solid #C5A059",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#d4b06a")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#C5A059")
          }
        >
          Kabul Et
        </button>
      </div>
    </div>
  );
}
