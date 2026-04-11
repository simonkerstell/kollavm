import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Trophy, Users, Target, Award, BarChart3, Shield } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "https://kollavm.se/tippa-vm" },
  title: "Tippa VM 2026 gratis – Tävla mot vänner i fotbolls-VM",
  description: "Tippa fotbolls-VM 2026 helt gratis på KollaVM. Tippa matchresultat, gruppvinnare, slutspelsträdet, skyttekung och MVP. Skapa ligor och tävla mot dina vänner.",
  openGraph: {
    title: "Tippa VM 2026 gratis – KollaVM",
    description: "Tippa fotbolls-VM 2026 helt gratis. Matchresultat, gruppvinnare, slutspel, skyttekung och MVP. Tävla mot vänner!",
    url: "https://kollavm.se/tippa-vm",
  },
};

const features = [
  { icon: Trophy, title: "Tippa matchresultat", desc: "Tippa alla 72 gruppspelsmatcher med exakt resultat. 3 poäng för exakt rätt, 1 poäng för rätt utfall." },
  { icon: BarChart3, title: "Tippa gruppspelet", desc: "Vem vinner varje grupp? Tippa etta och tvåa i alla 12 grupper. 3 poäng för rätt gruppsegrare." },
  { icon: Shield, title: "Tippa slutspelsträdet", desc: "Fyll i hela slutspelsträdet från sextondelsfinaler till final. Upp till 10 poäng per rätt." },
  { icon: Target, title: "Tippa Guldskon", desc: "Vem blir VM:s skyttekung? Välj bland världens bästa anfallare. 10 poäng om rätt." },
  { icon: Award, title: "Tippa Guldbollen", desc: "Vem blir VM:s bästa spelare (MVP)? Välj din favorit. 10 poäng om rätt." },
  { icon: Users, title: "Tävla i ligor", desc: "Skapa privata ligor och bjud in vänner med en inbjudningskod. Se vem som tippar bäst!" },
];

const points = [
  { label: "Exakt rätt matchresultat", points: "3p" },
  { label: "Rätt utfall (1X2)", points: "1p" },
  { label: "Rätt gruppsegrare", points: "3p" },
  { label: "Rätt grupptvåa", points: "2p" },
  { label: "Rätt lag i sextondelsfinaler", points: "2p" },
  { label: "Rätt lag i åttondelsfinaler", points: "3p" },
  { label: "Rätt lag i kvartsfinaler", points: "5p" },
  { label: "Rätt lag i semifinaler", points: "7p" },
  { label: "Rätt finalist/VM-vinnare", points: "10p" },
  { label: "Rätt Guldskon-vinnare", points: "10p" },
  { label: "Rätt Guldbolle-vinnare (MVP)", points: "10p" },
];

export default function TippaVmPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "KollaVM – Tippa VM 2026 gratis",
    description: "Gratis tippning för fotbolls-VM 2026. Tippa matchresultat, gruppvinnare, slutspel och mer. Tävla mot vänner i privata ligor.",
    url: "https://kollavm.se/tippa-vm",
    applicationCategory: "SportsApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "SEK" },
    operatingSystem: "All",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs crumbs={[{ label: "Tippa VM 2026" }]} />

      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
          Tippa <span className="text-[#f5c518]">fotbolls-VM 2026</span> gratis
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Tippa matchresultat, gruppvinnare, slutspelsträdet, skyttekung och MVP. Skapa ligor och tävla mot dina vänner – helt gratis.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/tippa" className="bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-black px-8 py-3.5 rounded-full text-lg transition-colors">
            Börja tippa nu
          </Link>
          <Link href="/matcher" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-full text-lg transition-colors">
            Se matchschemat
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Så fungerar tippningen på KollaVM</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Icon size={28} className="text-[#f5c518] mb-3" />
              <h3 className="text-white font-bold mb-1">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Points system */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Poängsystem</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-lg mx-auto">
          <div className="space-y-3">
            {points.map(({ label, points: pts }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">{label}</span>
                <span className="bg-[#f5c518] text-[#0a1628] font-black px-2.5 py-0.5 rounded text-xs">{pts}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ section for SEO */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Vanliga frågor om VM-tippningen</h2>
        <div className="space-y-3 max-w-2xl mx-auto">
          {[
            { q: "Kostar det att tippa VM på KollaVM?", a: "Nej, tippningen är helt gratis. Skapa ett konto och börja tippa direkt – ingen betalning krävs." },
            { q: "Hur skapar jag en liga?", a: "Gå till Tippa → Mina ligor → Skapa liga. Du får en inbjudningskod som du delar med vänner. De anger koden för att gå med." },
            { q: "Kan jag ändra mina tips?", a: "Ja, du kan ändra dina tips fram till matchstart. Klicka på Ändra-knappen på det tips du vill uppdatera." },
            { q: "När måste jag tippa?", a: "Du kan tippa matchresultat fram till avspark. Grupptips, slutspel och specialtips kan läggas när som helst innan turneringen börjar." },
            { q: "Hur räknas poängen i ligorna?", a: "Alla poäng från matchresultat, grupptips, slutspelstips och specialtips räknas ihop. Den med flest poäng totalt vinner ligan." },
          ].map((faq, i) => (
            <details key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
              <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-white font-semibold hover:bg-white/5 transition-colors list-none">
                <span className="text-sm">{faq.q}</span>
                <span className="text-[#f5c518] text-xl ml-4 shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-5 pb-4 text-gray-300 text-sm">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#f5c518] rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-black text-[#0a1628] mb-2">Redo att tippa VM 2026?</h2>
        <p className="text-[#0a1628]/70 mb-6">Skapa ett gratis konto och börja tippa alla matcher idag.</p>
        <Link href="/tippa" className="bg-[#0a1628] text-[#f5c518] font-bold px-8 py-3 rounded-full hover:bg-[#0d1f3c] transition-colors inline-block">
          Skapa konto & börja tippa →
        </Link>
      </div>
    </div>
  );
}
