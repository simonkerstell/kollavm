"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Trophy, X } from "lucide-react";
import AuthModal from "./AuthModal";

export default function StickyCTA() {
  const { user, loading } = useAuth();
  const [dismissed, setDismissed] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    const wasDismissed = sessionStorage.getItem("cta_dismissed");
    if (!wasDismissed) setDismissed(false);
  }, []);

  // Don't show if logged in, loading, or dismissed
  if (loading || user || dismissed) return null;

  function handleDismiss() {
    setDismissed(true);
    sessionStorage.setItem("cta_dismissed", "1");
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d1f3c]/95 backdrop-blur border-t border-[#f5c518]/30 px-4 py-3 safe-bottom">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Trophy size={20} className="text-[#f5c518] shrink-0" />
            <p className="text-white text-sm font-medium truncate">
              <span className="hidden sm:inline">Tippa VM 2026 gratis – tävla mot dina vänner!</span>
              <span className="sm:hidden">Tippa VM 2026 gratis!</span>
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowAuth(true)}
              className="bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-black px-5 py-2 rounded-full text-sm transition-colors"
            >
              Skapa konto
            </button>
            <button onClick={handleDismiss} className="text-gray-500 hover:text-white p-1 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} initialMode="register" />}
    </>
  );
}
