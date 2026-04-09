"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AvatarConfig, DEFAULT_AVATAR } from "@/lib/tippa-types";
import { getAvatar } from "@/lib/tippa-store";
import Avatar from "./Avatar";
import ProfileModal from "./ProfileModal";

const mainLinks = [
  { href: "/matcher", label: "Matchschema" },
  { href: "/tippa", label: "Tippa" },
];

const guideSubLinks = [
  { href: "/artiklar", label: "Artiklar & tips" },
  { href: "/hemma", label: "Kolla VM hemma" },
  { href: "/restauranger", label: "Restauranger" },
  { href: "/faq", label: "Vanliga frågor" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [mobileGuideOpen, setMobileGuideOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const guideRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const now = new Date();
  const vmStart = new Date("2026-06-11");
  const vmEnd = new Date("2026-07-19");
  const isLive = now >= vmStart && now <= vmEnd;

  useEffect(() => {
    if (user) {
      getAvatar(user.id).then(setAvatarConfig);
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (guideRef.current && !guideRef.current.contains(e.target as Node)) {
        setGuideOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#0a1628]/95 backdrop-blur border-b border-[#f5c518]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[#f5c518] font-black text-2xl tracking-tight">Kolla<span className="text-white">VM</span></span>
              {isLive && (
                <span className="flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-white rounded-full blink" />
                  LIVE
                </span>
              )}
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-[#f5c518] transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}

              {/* VM-guide dropdown */}
              <div className="relative" ref={guideRef}>
                <button
                  onClick={() => setGuideOpen(!guideOpen)}
                  className="flex items-center gap-1 text-gray-300 hover:text-[#f5c518] transition-colors font-medium"
                >
                  VM-guide
                  <ChevronDown size={14} className={`transition-transform ${guideOpen ? "rotate-180" : ""}`} />
                </button>
                {guideOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-[#0d1f3c] border border-[#f5c518]/20 rounded-xl shadow-2xl overflow-hidden">
                    <Link
                      href="/vm-guide"
                      onClick={() => setGuideOpen(false)}
                      className="block px-4 py-3 text-[#f5c518] font-bold text-sm hover:bg-white/5 transition-colors border-b border-white/10"
                    >
                      Alla kategorier →
                    </Link>
                    {guideSubLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setGuideOpen(false)}
                        className="block px-4 py-3 text-gray-300 hover:text-[#f5c518] hover:bg-white/5 transition-colors text-sm font-medium"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {user && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowProfile(true)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <Avatar config={avatarConfig} size={28} />
                    <span className="text-gray-300 text-sm font-medium">{user.name}</span>
                  </button>
                  <button onClick={logout} className="text-xs text-gray-500 hover:text-[#f5c518] transition-colors">Logga ut</button>
                </div>
              )}
            </div>

            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-[#0a1628] border-t border-[#f5c518]/20 px-4 py-4 flex flex-col gap-4">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#f5c518] transition-colors font-medium text-lg"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile VM-guide accordion */}
            <button
              onClick={() => setMobileGuideOpen(!mobileGuideOpen)}
              className="flex items-center justify-between text-gray-300 hover:text-[#f5c518] transition-colors font-medium text-lg"
            >
              VM-guide
              <ChevronDown size={16} className={`transition-transform ${mobileGuideOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileGuideOpen && (
              <div className="pl-4 flex flex-col gap-3 border-l-2 border-[#f5c518]/20">
                <Link href="/vm-guide" onClick={() => setOpen(false)} className="text-[#f5c518] font-semibold text-base">
                  Alla kategorier
                </Link>
                {guideSubLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-400 hover:text-[#f5c518] transition-colors font-medium text-base"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {user && (
              <button
                onClick={() => { setShowProfile(true); setOpen(false); }}
                className="flex items-center gap-3 text-gray-300 hover:text-[#f5c518] transition-colors font-medium text-lg"
              >
                <Avatar config={avatarConfig} size={24} />
                Min profil
              </button>
            )}
          </div>
        )}
      </nav>

      {showProfile && (
        <ProfileModal
          onClose={() => setShowProfile(false)}
          onAvatarChange={(config) => setAvatarConfig(config)}
        />
      )}
    </>
  );
}
