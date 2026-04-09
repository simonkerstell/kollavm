import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Home, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "VM-guide 2026 – Allt du behöver veta",
  description: "Din kompletta guide till fotbolls-VM 2026. Artiklar, produkttips, restaurangtips, FAQ och allt för den perfekta VM-upplevelsen.",
  openGraph: {
    title: "VM-guide 2026 – KollaVM",
    description: "Din kompletta guide till fotbolls-VM 2026.",
    url: "https://kollavm.se/vm-guide",
  },
};

const sections = [
  {
    href: "/artiklar",
    icon: BookOpen,
    label: "Artiklar & tips",
    desc: "SEO-guider, produktrecensioner och allt om VM 2026 – Sveriges grupp, matchschema, TV-kanaler och mer.",
  },
  {
    href: "/hemma",
    icon: Home,
    label: "Kolla VM hemma",
    desc: "Utemöbler, dryckeskylar, TV-stativ, ljud och dekorationer för den perfekta VM-upplevelsen hemma.",
  },
  {
    href: "/faq",
    icon: HelpCircle,
    label: "Vanliga frågor",
    desc: "Svar på allt du behöver veta – när börjar VM, vilken kanal sänder, hur fungerar tippningen och mer.",
  },
];

export default function VmGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white mb-2">
          VM-guide <span className="text-[#f5c518]">2026</span>
        </h1>
        <p className="text-gray-400">Allt du behöver veta inför fotbolls-VM 2026 – samlat på ett ställe.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sections.map(({ href, icon: Icon, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="group bg-white/5 hover:bg-[#f5c518]/10 border border-white/10 hover:border-[#f5c518]/40 rounded-2xl p-8 transition-all"
          >
            <Icon className="text-[#f5c518] mb-4" size={32} />
            <h2 className="font-black text-white text-xl mb-2 group-hover:text-[#f5c518] transition-colors">{label}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            <span className="inline-block mt-4 text-[#f5c518] text-sm font-semibold">Läs mer →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
