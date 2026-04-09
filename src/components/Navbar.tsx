"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AvatarConfig, DEFAULT_AVATAR } from "@/lib/tippa-types";
import { getAvatar } from "@/lib/tippa-store";
import Avatar from "./Avatar";
import ProfileModal from "./ProfileModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_AVATAR);
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

  const links = [
    { href: "/matcher", label: "Matchschema" },
    { href: "/tippa", label: "Tippa" },
    { href: "/hemma", label: "Kolla VM hemma" },
    { href: "/restauranger", label: "Restauranger" },
    { href: "/artiklar", label: "VM-guide" },
    { href: "/faq", label: "FAQ" },
  ];

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
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-[#f5c518] transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
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

        {open && (
          <div className="md:hidden bg-[#0a1628] border-t border-[#f5c518]/20 px-4 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#f5c518] transition-colors font-medium text-lg"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
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
