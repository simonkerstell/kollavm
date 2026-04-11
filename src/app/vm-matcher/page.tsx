import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { groups } from "@/data/groups";
import { Calendar, MapPin, Monitor, Trophy } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "https://kollavm.se/vm-matcher" },
  title: "Alla VM-matcher 2026 – komplett matchschema fotbolls-VM",
  description: "Alla 72 gruppspelsmatcher i fotbolls-VM 2026 med datum, avsparkstider i svensk tid, TV-kanaler och arenor. Komplett VM-schema dag för dag.",
  openGraph: {
    title: "Alla VM-matcher 2026 – KollaVM",
    description: "Komplett matchschema för fotbolls-VM 2026 med alla datum och tider i svensk tid.",
    url: "https://kollavm.se/vm-matcher",
  },
};

const allTeams = groups.flatMap(g => g.teams);
function getFlag(name: string) {
  return allTeams.find(t => t.name === name)?.flag ?? "";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function VmMatcherPage() {
  const allMatches = groups.flatMap(g =>
    g.matches.map(m => ({ ...m, groupId: g.id, sortKey: `${m.date}T${m.time}` }))
  ).sort((a, b) => a.sortKey.localeCompare(b.sortKey));

  const byDate: Record<string, typeof allMatches> = {};
  for (const m of allMatches) {
    if (!byDate[m.date]) byDate[m.date] = [];
    byDate[m.date].push(m);
  }
  const dates = Object.keys(byDate).sort();

  const swedenMatches = allMatches.filter(m => m.home === "Sverige" || m.away === "Sverige");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Hur många matcher spelas i VM 2026?",
        acceptedAnswer: { "@type": "Answer", text: "Totalt spelas 104 matcher i fotbolls-VM 2026 – 72 gruppspelsmatcher och 32 slutspelsmatcher. Gruppspelet pågår 11–27 juni och slutspelet 28 juni – 19 juli." },
      },
      {
        "@type": "Question",
        name: "När spelas VM-matcherna svensk tid?",
        acceptedAnswer: { "@type": "Answer", text: "De flesta gruppspelsmatcher har avspark mellan 18:00 och 06:00 svensk tid (CEST). Matcher på USA:s östkust spelas oftast på kvällen, medan västkustmatcher kan börja sent på natten." },
      },
      {
        "@type": "Question",
        name: "Vilken kanal visar VM-matcherna?",
        acceptedAnswer: { "@type": "Answer", text: "SVT och TV4 delar på sändningarna av alla VM-matcher. Alla matcher visas gratis på svensk fri-TV och kan streamas via SVT Play och TV4 Play." },
      },
      {
        "@type": "Question",
        name: "När spelar Sverige i VM 2026?",
        acceptedAnswer: { "@type": "Answer", text: `Sverige spelar tre gruppspelsmatcher: ${swedenMatches.map(m => `${m.home}–${m.away} den ${new Date(m.date).toLocaleDateString("sv-SE", { day: "numeric", month: "long" })} kl ${m.time}`).join(", ")}.` },
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs crumbs={[{ label: "Alla VM-matcher 2026" }]} />

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
          Alla VM-matcher <span className="text-[#f5c518]">2026</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Komplett matchschema för fotbolls-VM 2026 med alla {allMatches.length} gruppspelsmatcher, datum, tider i svensk tid och TV-kanaler.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/matcher" className="bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-black px-8 py-3.5 rounded-full text-lg transition-colors">
            Interaktivt matchschema →
          </Link>
          <Link href="/tippa-vm" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-full text-lg transition-colors">
            Tippa VM gratis
          </Link>
        </div>
      </div>

      {/* Sveriges matcher highlight */}
      <div className="bg-[#f5c518]/10 border border-[#f5c518]/30 rounded-2xl p-6 mb-12">
        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">🇸🇪 Sveriges matcher i VM 2026</h2>
        <div className="space-y-3">
          {swedenMatches.map((m, i) => (
            <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-lg">{getFlag(m.home)}</span>
                <span className={`font-bold ${m.home === "Sverige" ? "text-[#f5c518]" : "text-white"}`}>{m.home}</span>
                <span className="text-gray-500">vs</span>
                <span className={`font-bold ${m.away === "Sverige" ? "text-[#f5c518]" : "text-white"}`}>{m.away}</span>
                <span className="text-lg">{getFlag(m.away)}</span>
              </div>
              <div className="text-right text-sm">
                <p className="text-white font-semibold">{new Date(m.date).toLocaleDateString("sv-SE", { day: "numeric", month: "short" })} · {m.time}</p>
                <p className="text-gray-500">{m.channel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All matches by date */}
      <h2 className="text-2xl font-bold text-white mb-6">Alla gruppspelsmatcher dag för dag</h2>
      <div className="space-y-8 mb-16">
        {dates.map(date => (
          <div key={date}>
            <h3 className="text-[#f5c518] font-bold capitalize mb-3 sticky top-16 bg-[#0a1628]/95 backdrop-blur py-2 z-10">
              {formatDate(date)} · {byDate[date].length} matcher
            </h3>
            <div className="space-y-2">
              {byDate[date].map((m, i) => {
                const isSwe = m.home === "Sverige" || m.away === "Sverige";
                return (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-lg border text-sm ${isSwe ? "bg-[#f5c518]/10 border-[#f5c518]/30" : "bg-white/5 border-white/10"}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-[#f5c518]/10 text-[#f5c518] font-bold px-1.5 py-0.5 rounded">Gr {m.groupId}</span>
                      <span className="text-lg">{getFlag(m.home)}</span>
                      <span className={`font-semibold ${m.home === "Sverige" ? "text-[#f5c518]" : "text-white"}`}>{m.home}</span>
                      <span className="text-gray-600">–</span>
                      <span className={`font-semibold ${m.away === "Sverige" ? "text-[#f5c518]" : "text-white"}`}>{m.away}</span>
                      <span className="text-lg">{getFlag(m.away)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs shrink-0">
                      <span className="text-gray-400">{m.time}</span>
                      <span className={`font-bold px-2 py-0.5 rounded-full ${m.channel === "SVT" ? "bg-blue-600 text-white" : "bg-red-600 text-white"}`}>{m.channel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* SEO content */}
      <div className="prose prose-invert max-w-none mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Om VM-schemat 2026</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Fotbolls-VM 2026 är det största någonsin med 48 lag uppdelade i 12 grupper. Gruppspelet pågår från 11 juni till 27 juni, följt av slutspelet som avslutas med finalen den 19 juli på MetLife Stadium i New York.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Alla matcher sänds gratis på SVT och TV4. Du kan också streama via SVT Play och TV4 Play. Kolla vår guide om <Link href="/artiklar/vem-sander-vm-2026-svt-tv4" className="text-[#f5c518] hover:underline">vilka kanaler som sänder VM 2026</Link> för mer info.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Vill du göra matcherna extra spännande? <Link href="/tippa-vm" className="text-[#f5c518] hover:underline">Tippa VM 2026 gratis</Link> på KollaVM och tävla mot dina vänner om vem som tippar bäst.
        </p>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Vanliga frågor om VM-matcherna</h2>
        <div className="space-y-3 max-w-2xl mx-auto">
          {[
            { q: "Hur många matcher spelas i VM 2026?", a: "104 matcher totalt – 72 gruppspelsmatcher och 32 slutspelsmatcher inklusive bronsmatch och final." },
            { q: "När spelas VM-matcherna svensk tid?", a: "Avspark varierar mellan 18:00 och 06:00 CEST beroende på vilken arena i Nordamerika matchen spelas på." },
            { q: "Vilken kanal visar VM 2026?", a: "SVT och TV4 delar på alla matcher. Gratis att se via TV eller streaming (SVT Play, TV4 Play)." },
            { q: "Var spelas VM-finalen?", a: "Finalen spelas den 19 juli 2026 på MetLife Stadium i New York/New Jersey." },
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
        <h2 className="text-2xl font-black text-[#0a1628] mb-2">Tippa alla VM-matcher gratis!</h2>
        <p className="text-[#0a1628]/70 mb-6">Skapa ett konto och tippa matchresultat, gruppvinnare och slutspelet.</p>
        <Link href="/tippa-vm" className="bg-[#0a1628] text-[#f5c518] font-bold px-8 py-3 rounded-full hover:bg-[#0d1f3c] transition-colors inline-block">
          Börja tippa →
        </Link>
      </div>
    </div>
  );
}
