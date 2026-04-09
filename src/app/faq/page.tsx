import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vanliga frågor om fotbolls-VM 2026 – FAQ",
  description: "Svar på vanliga frågor om fotbolls-VM 2026. När börjar VM? Var spelas det? Vilken kanal sänder? Hur fungerar tippningen? Allt du behöver veta.",
  openGraph: {
    title: "Vanliga frågor om VM 2026 – KollaVM",
    description: "Svar på de vanligaste frågorna om fotbolls-VM 2026.",
    url: "https://kollavm.se/faq",
  },
};

const faqs = [
  {
    category: "Om VM 2026",
    questions: [
      {
        q: "När börjar fotbolls-VM 2026?",
        a: "Fotbolls-VM 2026 startar den 11 juni 2026 och finalen spelas den 19 juli 2026. Turneringen pågår alltså i drygt fem veckor.",
      },
      {
        q: "Var spelas fotbolls-VM 2026?",
        a: "VM 2026 arrangeras av tre länder: USA, Kanada och Mexiko. Matcher spelas i 16 städer, bland annat New York, Los Angeles, Miami, Mexico City, Toronto och Vancouver. Finalen spelas på MetLife Stadium i New York/New Jersey.",
      },
      {
        q: "Hur många lag deltar i VM 2026?",
        a: "48 lag deltar – en ökning från 32 lag i tidigare mästerskap. Lagen är uppdelade i 12 grupper med 4 lag i varje grupp.",
      },
      {
        q: "Hur fungerar gruppspelet i VM 2026?",
        a: "De 48 lagen delas in i 12 grupper (A–L) med 4 lag i varje. Varje lag spelar 3 gruppspelsmatcher. De 2 bästa i varje grupp går vidare direkt, plus de 8 bästa treorna – totalt 32 lag till slutspelet.",
      },
      {
        q: "Hur ser slutspelet ut i VM 2026?",
        a: "Slutspelet börjar med en sextondelsfinaler (32 lag), följt av åttondelsfinaler (16 lag), kvartsfinaler, semifinaler och final. Alla slutspelsmatcher avgörs med förlängning och straffar vid oavgjort.",
      },
      {
        q: "Vilka länder är med i VM 2026?",
        a: "48 lag från alla kontinenter deltar. Bland de mest kända lagen finns Brasilien, Argentina, Frankrike, Tyskland, Spanien, England och Sverige. Alla lag och grupper hittar du i vårt matchschema.",
      },
      {
        q: "Är det första gången VM spelas i tre länder?",
        a: "Ja, fotbolls-VM 2026 är det första i historien som arrangeras av tre länder samtidigt. USA, Kanada och Mexiko delar på värdskapet.",
      },
    ],
  },
  {
    category: "Sverige i VM",
    questions: [
      {
        q: "Är Sverige med i VM 2026?",
        a: "Ja! Sverige har kvalificerat sig till VM 2026 och spelar i grupp F tillsammans med Nederländerna, Japan och Tunisien.",
      },
      {
        q: "När spelar Sverige i VM 2026?",
        a: "Sveriges gruppspelsmatcher:\n• 14 juni: Nederländerna – Sverige (21:00, TV4)\n• 19 juni: Sverige – Tunisien (00:00, SVT)\n• 22 juni: Sverige – Japan (22:00, SVT)",
      },
      {
        q: "Vilken grupp är Sverige i?",
        a: "Sverige spelar i grupp F med Nederländerna, Japan och Tunisien. Nederländerna är gruppfavorit, men Sverige har goda chanser att avancera.",
      },
      {
        q: "Var spelas Sveriges matcher?",
        a: "Sveriges matcher spelas i USA:\n• Match 1 i Philadelphia (Lincoln Financial Field)\n• Match 2 i San Francisco (Levi's Stadium)\n• Match 3 i Boston (Gillette Stadium)",
      },
      {
        q: "Vilken kanal visar Sveriges matcher?",
        a: "Första matchen mot Nederländerna sänds på TV4. Match 2 mot Tunisien och match 3 mot Japan sänds på SVT. Alla matcher kan streamas gratis via TV4 Play och SVT Play.",
      },
    ],
  },
  {
    category: "TV & streaming",
    questions: [
      {
        q: "Vilken kanal sänder VM 2026?",
        a: "SVT och TV4 delar på sändningarna. Alla matcher visas gratis på svensk fri-TV – ingen betaltjänst krävs.",
      },
      {
        q: "Kan jag streama VM-matcherna?",
        a: "Ja! SVT Play och TV4 Play streamer alla matcher gratis. Du kan se matcherna på dator, mobil, surfplatta eller smart-TV.",
      },
      {
        q: "Vilken tid spelas matcherna svensk tid?",
        a: "De flesta gruppspelsmatcher har avspark mellan 21:00 och 03:00 svensk tid (CEST). Matcher på USA:s östkust visas oftast 21:00–00:00, medan västkustmatcher kan börja så sent som 03:00.",
      },
      {
        q: "Behöver jag betala för att se VM?",
        a: "Nej, alla matcher sänds gratis på SVT och TV4. Du kan se dem via vanlig TV-antenn, kabel-TV, IPTV eller gratis streaming via SVT Play och TV4 Play.",
      },
    ],
  },
  {
    category: "Tippning på KollaVM",
    questions: [
      {
        q: "Hur fungerar tippningen?",
        a: "Du skapar ett gratis konto och kan sedan tippa matchresultat, gruppvinnare och hela slutspelsträdet. Poängen räknas automatiskt och du kan tävla mot vänner i privata ligor.",
      },
      {
        q: "Hur räknas poängen?",
        a: "Matchresultat: 3p för exakt rätt, 1p för rätt utfall. Gruppspel: 3p för rätt etta, 2p för rätt tvåa. Slutspel: 2–10p beroende på omgång (2p i sextondelsfinaler upp till 10p för rätt VM-vinnare).",
      },
      {
        q: "Kostar det att tippa?",
        a: "Nej, tippningen är helt gratis. Skapa ett konto och börja tippa direkt.",
      },
      {
        q: "Hur skapar jag en liga?",
        a: "Gå till Tippa → Mina ligor → Skapa liga. Du får en inbjudningskod som du delar med dina vänner. De anger koden för att gå med i ligan.",
      },
      {
        q: "Kan jag ändra mina tips?",
        a: "Ja, du kan ändra dina tips fram till matchstart. Klicka på 'Ändra' på det tips du vill uppdatera.",
      },
      {
        q: "Hur bjuder jag in vänner?",
        a: "Kopiera inbjudningslänken på tippa-sidan och skicka till dina vänner. De skapar ett konto och kan sedan gå med i din liga med inbjudningskoden.",
      },
    ],
  },
  {
    category: "Praktiskt",
    questions: [
      {
        q: "Vilka arenor används i VM 2026?",
        a: "16 arenor i 16 städer:\n• USA: MetLife Stadium (New York), SoFi Stadium (LA), AT&T Stadium (Dallas), Hard Rock Stadium (Miami), Levi's Stadium (San Francisco), Gillette Stadium (Boston), Lincoln Financial Field (Philadelphia), Lumen Field (Seattle), Arrowhead Stadium (Kansas City), Rose Bowl (LA)\n• Kanada: BC Place (Vancouver), BMO Field (Toronto)\n• Mexiko: Estadio Azteca (Mexico City), Estadio Akron (Guadalajara)",
      },
      {
        q: "Vilken tidszon spelas matcherna i?",
        a: "Matcherna spelas i flera tidszoner: Eastern Time (New York, Miami – 6h efter Sverige), Central Time (Dallas, Kansas City – 7h), Mountain Time, och Pacific Time (LA, San Francisco – 9h efter Sverige).",
      },
      {
        q: "Var spelas VM-finalen 2026?",
        a: "Finalen spelas den 19 juli 2026 på MetLife Stadium i East Rutherford, New Jersey (strax utanför New York City).",
      },
      {
        q: "Hur många matcher spelas totalt i VM 2026?",
        a: "104 matcher totalt: 72 gruppspelsmatcher + 32 slutspelsmatcher (inklusive match om tredjepris).",
      },
    ],
  },
];

export default function FaqPage() {
  const allQuestions = faqs.flatMap((s) => s.questions);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a.replace(/\n/g, " ") },
    })),
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white mb-2">
          Vanliga frågor <span className="text-[#f5c518]">om VM 2026</span>
        </h1>
        <p className="text-gray-400">Svar på allt du behöver veta om fotbolls-VM 2026, Sveriges matcher, TV-sändningar och KollaVMs tippning.</p>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-2 mb-10">
        {faqs.map((section) => (
          <a
            key={section.category}
            href={`#${section.category.toLowerCase().replace(/\s+/g, "-").replace(/ö/g, "o").replace(/å/g, "a").replace(/ä/g, "a")}`}
            className="bg-white/5 hover:bg-[#f5c518]/10 border border-white/10 hover:border-[#f5c518]/30 text-gray-300 hover:text-[#f5c518] px-4 py-2 rounded-full text-sm font-medium transition-all"
          >
            {section.category}
          </a>
        ))}
      </div>

      <div className="space-y-12">
        {faqs.map((section) => (
          <div
            key={section.category}
            id={section.category.toLowerCase().replace(/\s+/g, "-").replace(/ö/g, "o").replace(/å/g, "a").replace(/ä/g, "a")}
          >
            <h2 className="text-2xl font-bold text-[#f5c518] mb-6">{section.category}</h2>
            <div className="space-y-4">
              {section.questions.map((faq, i) => (
                <details key={i} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-white font-semibold hover:bg-white/5 transition-colors list-none">
                    <span>{faq.q}</span>
                    <span className="text-[#f5c518] text-xl ml-4 shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 pb-4 text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 bg-[#f5c518] rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-black text-[#0a1628] mb-2">Redo för VM 2026?</h2>
        <p className="text-[#0a1628]/70 mb-6">Kolla matchschemat, tippa resultat och tävla mot dina vänner.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/matcher" className="bg-[#0a1628] text-[#f5c518] font-bold px-6 py-3 rounded-full hover:bg-[#0d1f3c] transition-colors">
            Matchschema
          </Link>
          <Link href="/tippa" className="bg-[#0a1628] text-[#f5c518] font-bold px-6 py-3 rounded-full hover:bg-[#0d1f3c] transition-colors">
            Börja tippa
          </Link>
        </div>
      </div>
    </div>
  );
}
