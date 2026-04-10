"use client";
import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("kollavm_cookies");
    if (!consent) {
      setVisible(true);
      // Block GTM until consent
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "consent_default", analytics_storage: "denied" });
    } else if (consent === "accepted") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "consent_update", analytics_storage: "granted" });
    }
  }, []);

  function accept() {
    localStorage.setItem("kollavm_cookies", "accepted");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "consent_update", analytics_storage: "granted" });
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("kollavm_cookies", "declined");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "consent_update", analytics_storage: "denied" });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div className="max-w-2xl mx-auto bg-[#0d1f3c] border border-[#f5c518]/20 rounded-2xl p-5 shadow-2xl shadow-black/50">
        <div className="flex items-start gap-4">
          <Cookie className="text-[#f5c518] shrink-0 mt-0.5" size={24} />
          <div className="flex-1">
            <h3 className="font-bold text-white text-sm mb-1">Vi använder cookies</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Vi använder cookies för att analysera trafik och förbättra din upplevelse. Inga personuppgifter säljs vidare.
            </p>
          </div>
          <button onClick={() => setVisible(false)} className="text-gray-400 hover:text-white shrink-0" aria-label="Stäng cookie-banner">
            <X size={16} />
          </button>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <div className="flex-1">
            <button onClick={accept} className="w-full bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-black py-2.5 rounded-full text-sm transition-colors">
              Acceptera
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-1.5">Ökar chansen att Sverige vinner VM med 47%*</p>
          </div>
          <button onClick={decline} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 rounded-full text-sm font-semibold transition-colors">
            Nej tack
          </button>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
