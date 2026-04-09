import Link from "next/link";
import { Share2, Globe, Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#060e1a] border-t border-[#f5c518]/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-[#f5c518] font-black text-2xl">Kolla<span className="text-white">VM</span></span>
            <p className="mt-3 text-gray-400 text-sm">
              Den självklara sajten för att följa fotbolls-VM 2026. Håll koll på varje match – hemma eller på stan.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Sidor</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/matcher" className="hover:text-[#f5c518]">Matchschema</Link></li>
              <li><Link href="/hemma" className="hover:text-[#f5c518]">Kolla VM hemma</Link></li>
              <li><Link href="/restauranger" className="hover:text-[#f5c518]">Restauranger</Link></li>
              <li><Link href="/artiklar" className="hover:text-[#f5c518]">Artiklar</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Följ oss</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#f5c518] transition-colors"><Share2 size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[#f5c518] transition-colors"><Globe size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[#f5c518] transition-colors"><Camera size={20} /></a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#f5c518]/10 text-xs text-gray-500">
          <p className="mb-1">© 2026 KollaVM. Alla rättigheter förbehållna.</p>
          <p>Som affiliate-partner kan vi tjäna provision på köp via våra länkar. Detta påverkar inte vår redaktionella bedömning.</p>
        </div>
      </div>
    </footer>
  );
}
