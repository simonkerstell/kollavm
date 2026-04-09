import Link from "next/link";
import Countdown from "@/components/Countdown";
import { Calendar, Home, MapPin, BookOpen } from "lucide-react";

const quickLinks = [
  { href: "/matcher", icon: Calendar, label: "Matchschema", desc: "Alla VM-matcher & live-resultat" },
  { href: "/hemma", icon: Home, label: "Kolla VM hemma", desc: "Produkter för den perfekta VM-känslan" },
  { href: "/restauranger", icon: MapPin, label: "Restaurangtips", desc: "Hitta bästa stället att se matchen" },
  { href: "/artiklar", icon: BookOpen, label: "Artiklar", desc: "Tips, guider och produktrecensioner" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628]" />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, #f5c518 0%, transparent 70%)"
        }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#f5c518]/10 border border-[#f5c518]/30 rounded-full px-4 py-1.5 text-sm text-[#f5c518] font-medium mb-6">
            ⚽ Fotbolls-VM 2026 · USA, Kanada & Mexiko
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-4">
            Håll koll på<br />
            <span className="text-[#f5c518]">varje match</span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
            Hemma eller på stan – KollaVM är din guide till fotbolls-VM 2026
          </p>

          <Countdown />

          <p className="text-gray-500 text-sm mt-4">till avspark 11 juni 2026</p>
        </div>
      </section>

      {/* Quick links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Allt du behöver inför <span className="text-[#f5c518]">VM 2026</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map(({ href, icon: Icon, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white/5 hover:bg-[#f5c518]/10 border border-white/10 hover:border-[#f5c518]/40 rounded-2xl p-6 transition-all duration-200"
            >
              <Icon className="text-[#f5c518] mb-3" size={28} />
              <h3 className="font-bold text-white text-lg mb-1 group-hover:text-[#f5c518] transition-colors">{label}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#f5c518] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#0a1628] mb-3">Missa ingen match!</h2>
          <p className="text-[#0a1628]/80 mb-6">Kolla in vårt kompletta matchschema med live-uppdateringar under hela turneringen.</p>
          <Link
            href="/matcher"
            className="inline-block bg-[#0a1628] text-[#f5c518] font-bold px-8 py-3 rounded-full hover:bg-[#0d1f3c] transition-colors"
          >
            Se matchschema →
          </Link>
        </div>
      </section>
    </div>
  );
}
