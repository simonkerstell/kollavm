import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { restaurants } from "@/data/mock-data";
import { MapPin, Monitor, Sun, Send } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "https://kollavm.se/restauranger-vm" },
  title: "Vilka restauranger visar VM 2026? Bästa krogarna i Sverige",
  description: "Hitta restauranger och sportbarer som visar fotbolls-VM 2026. Bästa krogarna i Stockholm, Göteborg, Malmö och fler städer med storbildsskärmar och VM-stämning.",
  openGraph: {
    title: "Vilka restauranger visar VM 2026? – KollaVM",
    description: "Hitta bästa restaurangerna att se VM-matcherna på i Sverige.",
    url: "https://kollavm.se/restauranger-vm",
  },
};

const cities = Array.from(new Set(restaurants.map(r => r.city)));

export default function RestaurangerVmPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Vilka restauranger visar VM 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Flera restauranger och sportbarer i Sverige visar fotbolls-VM 2026. Bland de populäraste finns ${restaurants.slice(0, 4).map(r => r.name + " i " + r.city).join(", ")}. Kolla KollaVM.se för en komplett lista med sportbarer i hela Sverige.`,
        },
      },
      {
        "@type": "Question",
        name: "Var kan man se VM-matcherna på restaurang i Stockholm?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `I Stockholm finns flera bra alternativ för att se VM: ${restaurants.filter(r => r.city === "Stockholm").map(r => r.name).join(", ")}. Alla har storbildsskärmar och de flesta har uteplats för sommarens matcher.`,
        },
      },
      {
        "@type": "Question",
        name: "Vilka sportbarer visar fotbolls-VM 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "De flesta sportbarer i Sverige visar alla VM-matcher. O'Learys, Bishops Arms och Harrys är kedjor som brukar visa alla matcher. Kolla med din lokala sportbar för att vara säker.",
        },
      },
      {
        "@type": "Question",
        name: "Måste man boka bord för att se VM på restaurang?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Under stora matcher (som Sveriges matcher) rekommenderas det starkt att boka bord i förväg. Populära sportbarer kan bli fullsatta timmar innan avspark, särskilt under gruppspelet.",
        },
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs crumbs={[{ label: "Restauranger som visar VM" }]} />

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
          Vilka restauranger visar <span className="text-[#f5c518]">VM 2026?</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Hitta de bästa restaurangerna och sportbarerna att se fotbolls-VM 2026 på i Sverige. Storbildsskärmar, VM-stämning och bra mat.
        </p>
        <Link href="/restauranger" className="bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-black px-8 py-3.5 rounded-full text-lg transition-colors inline-block">
          Se alla restauranger →
        </Link>
      </div>

      {/* City sections */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Restauranger per stad</h2>
        {cities.map(city => {
          const cityRestaurants = restaurants.filter(r => r.city === city);
          return (
            <div key={city} className="mb-8">
              <h3 className="text-xl font-black text-[#f5c518] mb-4">Se VM på restaurang i {city}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cityRestaurants.map(r => (
                  <div key={r.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[#f5c518]/30 transition-all">
                    <h4 className="font-bold text-white text-lg mb-1">{r.name}</h4>
                    <div className="flex items-center gap-1 text-gray-400 text-sm mb-2">
                      <MapPin size={12} /> {r.address}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{r.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5 text-gray-300">
                        <Monitor size={14} className="text-[#f5c518]" /> {r.screens} skärmar
                      </div>
                      {r.hasOutdoor && (
                        <div className="flex items-center gap-1.5 text-gray-300">
                          <Sun size={14} className="text-[#f5c518]" /> Uteplats
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* SEO content */}
      <div className="prose prose-invert max-w-none mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Så hittar du en restaurang som visar VM 2026</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Fotbolls-VM 2026 spelas mellan 11 juni och 19 juli, mitt i svenska sommaren. Det gör att många restauranger och sportbarer ordnar speciella VM-visningar med storbildsskärmar, både inomhus och utomhus.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          De bästa ställena att se VM-matcherna på har ofta flera skärmar, bra ljud och en stämning som förstärker upplevelsen. Sportbarkedjor som O&apos;Learys, Bishops Arms och Harrys brukar visa alla matcher och har ofta specialerbjudanden under turneringen.
        </p>

        <h3 className="text-xl font-bold text-white mb-3 mt-8">Tips för att se VM på restaurang</h3>
        <ul className="text-gray-300 space-y-2 mb-4 list-disc pl-5">
          <li><strong>Boka bord i förväg</strong> – speciellt för Sveriges matcher och slutspelsmatcher</li>
          <li><strong>Kom tidigt</strong> – populära ställen fylls snabbt, särskilt vid stora matcher</li>
          <li><strong>Kolla uteplats</strong> – sommarvädret gör det perfekt att se matcherna utomhus</li>
          <li><strong>Fråga om ljud</strong> – inte alla restauranger har ljudet på, fråga innan du bokar</li>
        </ul>

        <h3 className="text-xl font-bold text-white mb-3 mt-8">Sveriges matcher i VM 2026</h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          Sverige spelar i grupp F mot Tunisien (15 juni), Nederländerna (20 juni) och Japan (26 juni). Dessa matcher kommer vara de mest populära att se på restaurang. Kolla vårt <Link href="/matcher" className="text-[#f5c518] hover:underline">matchschema</Link> för exakta tider.
        </p>

        <h3 className="text-xl font-bold text-white mb-3 mt-8">Ser du hellre matcherna hemma?</h3>
        <p className="text-gray-300 leading-relaxed">
          Kolla vår guide om <Link href="/hemma" className="text-[#f5c518] hover:underline">hur du skapar den perfekta VM-upplevelsen hemma</Link> med rätt utemöbler, TV och dryckeskylar. Och glöm inte att <Link href="/tippa-vm" className="text-[#f5c518] hover:underline">tippa VM</Link> – helt gratis!
        </p>
      </div>

      {/* FAQ */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Vanliga frågor om att se VM på restaurang</h2>
        <div className="space-y-3 max-w-2xl mx-auto">
          {[
            { q: "Vilka restauranger visar VM 2026?", a: "De flesta sportbarer och många restauranger visar VM-matcherna. O'Learys, Bishops Arms och Harrys är säkra val. Kolla vår lista för restauranger i din stad." },
            { q: "Måste man boka bord?", a: "Ja, speciellt för Sveriges matcher rekommenderas det att boka i förväg. Populära ställen kan bli fullbokade dagar innan." },
            { q: "Visar alla restauranger alla matcher?", a: "Inte nödvändigtvis. Sportbarer visar oftast alla matcher, medan vanliga restauranger kan välja att bara visa utvalda matcher. Fråga din restaurang." },
            { q: "Kostar det extra att se VM på restaurang?", a: "Vanligtvis inte, men vissa ställen kan ha minimumbeställning eller högre priser under VM-matcher." },
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
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
        <Send size={32} className="text-[#f5c518] mx-auto mb-3" />
        <h2 className="text-xl font-black text-white mb-2">Vet du en restaurang som visar VM?</h2>
        <p className="text-gray-400 text-sm mb-4">Tipsa oss så lägger vi till den i listan!</p>
        <Link href="/restauranger" className="bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-bold px-6 py-3 rounded-full text-sm transition-colors inline-block">
          Tipsa om en restaurang →
        </Link>
      </div>
    </div>
  );
}
