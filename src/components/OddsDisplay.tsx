"use client";
import { ODDS_CONFIG, MatchOdds } from "@/lib/odds-types";
import OddsBanner from "./OddsBanner";

export default function OddsDisplay({ odds }: { odds?: MatchOdds | null }) {
  if (!ODDS_CONFIG.enabled || !odds) return null;

  const affiliateLink = ODDS_CONFIG.affiliateBaseUrl || "#";

  return (
    <div className="mt-3 pt-3 border-t border-white/5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">Odds · {odds.bookmaker}</span>
        <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">18+</span>
      </div>
      <div className="flex gap-2">
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 bg-white/5 hover:bg-[#f5c518]/10 border border-white/10 hover:border-[#f5c518]/30 rounded-lg py-2 text-center transition-all"
        >
          <span className="text-[10px] text-gray-500 block">1</span>
          <span className="text-white font-bold text-sm">{odds.home}</span>
        </a>
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 bg-white/5 hover:bg-[#f5c518]/10 border border-white/10 hover:border-[#f5c518]/30 rounded-lg py-2 text-center transition-all"
        >
          <span className="text-[10px] text-gray-500 block">X</span>
          <span className="text-white font-bold text-sm">{odds.draw}</span>
        </a>
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 bg-white/5 hover:bg-[#f5c518]/10 border border-white/10 hover:border-[#f5c518]/30 rounded-lg py-2 text-center transition-all"
        >
          <span className="text-[10px] text-gray-500 block">2</span>
          <span className="text-white font-bold text-sm">{odds.away}</span>
        </a>
      </div>
      <OddsBanner />
    </div>
  );
}
