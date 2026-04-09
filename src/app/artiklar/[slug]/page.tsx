import { articles, products } from "@/data/mock-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Tag, Share2, Globe, Link as LinkIcon, ExternalLink } from "lucide-react";

const internalLinks: { pattern: RegExp; href: string }[] = [
  { pattern: /utemöbler och paviljonger|utemöbler för sittplatser|bekväma utemöbler|utemöbler/gi, href: "/artiklar/basta-utemobler-vm-2026" },
  { pattern: /dryckeskylar(?:na)? och öltappar(?:na)?|dryckeskylar(?:na)?|kalla drycker/gi, href: "/artiklar/basta-dryckeskylare-oltappar-vm-2026" },
  { pattern: /TV och TV-stativ|TV-stativ och projektorer|TV med rätt stativ|bra TV/gi, href: "/artiklar/basta-tv-projektor-vm-2026" },
  { pattern: /soundbar för (?:kristallklart )?matchljudet|soundbar/gi, href: "/artiklar/basta-soundbar-ljud-vm-2026" },
  { pattern: /dekorationer och supporterprylar|VM-dekorationer|dekorationer/gi, href: "/artiklar/basta-vm-dekorationer-supporterprylar-2026" },
  { pattern: /vilka kanaler som sänder VM 2026|vilka kanaler som visar/gi, href: "/artiklar/vem-sander-vm-2026-svt-tv4" },
  { pattern: /Sveriges VM-grupp 2026|Sveriges grupp F/gi, href: "/artiklar/sveriges-vm-grupp-2026" },
  { pattern: /när Sveriges matcher spelas|Sveriges matcher i VM/gi, href: "/artiklar/nar-spelar-sverige-vm-2026" },
  { pattern: /var VM 2026 spelas|var fotbolls-VM spelas/gi, href: "/artiklar/var-spelas-fotbolls-vm-2026" },
  { pattern: /matchschema(?:t)?/gi, href: "/matcher" },
  { pattern: /restaurangtips/gi, href: "/restauranger" },
  { pattern: /tippa (?:matcherna|resultaten)/gi, href: "/tippa" },
];

function renderTextWithLinks(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let earliest: { index: number; length: number; href: string } | null = null;

    for (const link of internalLinks) {
      link.pattern.lastIndex = 0;
      const match = link.pattern.exec(remaining);
      if (match && (!earliest || match.index < earliest.index)) {
        earliest = { index: match.index, length: match[0].length, href: link.href };
      }
    }

    if (!earliest) {
      parts.push(remaining);
      break;
    }

    if (earliest.index > 0) {
      parts.push(remaining.slice(0, earliest.index));
    }

    const matchedText = remaining.slice(earliest.index, earliest.index + earliest.length);
    parts.push(
      <Link key={key++} href={earliest.href} className="text-[#f5c518] hover:underline font-medium">
        {matchedText}
      </Link>
    );

    remaining = remaining.slice(earliest.index + earliest.length);
  }

  return parts;
}

const categoryColors: Record<string, string> = {
  "Hemma-tips": "bg-blue-500/20 text-blue-300",
  "VM-guide": "bg-green-500/20 text-green-300",
  "Produkttips": "bg-purple-500/20 text-purple-300",
  "Affiliate": "bg-[#f5c518]/20 text-[#f5c518]",
};

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.id !== article.id);
  const featuredProducts = article.categoryKey
    ? products.filter((p) => p.categoryKey === article.categoryKey)
    : products.slice(0, 3);

  const paragraphs = article.content
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main */}
        <article className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[article.category]}`}>
                <Tag size={10} />
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-gray-500 text-sm">
                <Calendar size={12} />
                {new Date(article.date).toLocaleDateString("sv-SE")}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">{article.title}</h1>
            <p className="text-gray-400 text-lg">{article.excerpt}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            {paragraphs.map((para, i) => {
              if (para.startsWith("# ")) return <h1 key={i} className="text-3xl font-black text-white mt-8 mb-4">{para.slice(2)}</h1>;
              if (para.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-3">{para.slice(3)}</h2>;
              if (para.startsWith("### ")) return <h3 key={i} className="text-xl font-bold text-[#f5c518] mt-6 mb-2">{para.slice(4)}</h3>;
              if (para.startsWith("**") && para.endsWith("**")) return <p key={i} className="font-bold text-white my-2">{para.slice(2, -2)}</p>;
              if (para.startsWith("- ")) return <li key={i} className="text-gray-300 ml-4 list-disc my-1">{renderTextWithLinks(para.slice(2))}</li>;
              return <p key={i} className="text-gray-300 leading-relaxed my-3">{renderTextWithLinks(para)}</p>;
            })}
          </div>

          {/* Share */}
          <div className="flex items-center gap-3 mt-10 pt-8 border-t border-white/10">
            <span className="text-gray-400 text-sm">Dela:</span>
            <a href="#" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-3 py-1.5 rounded-full text-sm transition-colors">
              <Share2 size={14} /> Twitter/X
            </a>
            <a href="#" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-3 py-1.5 rounded-full text-sm transition-colors">
              <Globe size={14} /> Facebook
            </a>
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-3 py-1.5 rounded-full text-sm transition-colors">
              <LinkIcon size={14} /> Kopiera länk
            </button>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Related */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Relaterade artiklar</h3>
            <div className="space-y-4">
              {related.map((rel) => (
                <Link key={rel.id} href={`/artiklar/${rel.slug}`} className="block group bg-white/5 border border-white/10 rounded-xl p-3 hover:border-[#f5c518]/30 transition-all">
                  <p className="text-sm font-semibold text-gray-200 group-hover:text-[#f5c518] transition-colors leading-tight">{rel.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(rel.date).toLocaleDateString("sv-SE")}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Affiliate products */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Utvalda produkter</h3>
            <div className="space-y-3">
              {featuredProducts.map((product) => (
                <a
                  key={product.id}
                  href={product.affiliateLink}
                  className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:border-[#f5c518]/30 transition-all group"
                >
                  <div className="w-16 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-200 leading-tight line-clamp-2">{product.name}</p>
                    <span className="inline-flex items-center gap-1 mt-1.5 text-[#f5c518] text-xs font-semibold">
                      Köp här <ExternalLink size={10} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-3">Som affiliate-partner kan vi tjäna provision på köp via våra länkar.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
