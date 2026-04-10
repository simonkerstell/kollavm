import Link from "next/link";

export default function OddsBanner() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded">18+</span>
          <span className="text-gray-500 text-xs">Spela ansvarsfullt</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-gray-600">
          <Link href="https://www.stodlinjen.se" target="_blank" rel="noopener noreferrer" className="hover:text-[#f5c518] transition-colors underline">
            Stodlinjen.se
          </Link>
          <Link href="https://www.spelinspektionen.se" target="_blank" rel="noopener noreferrer" className="hover:text-[#f5c518] transition-colors underline">
            Spelinspektionen
          </Link>
        </div>
      </div>
    </div>
  );
}
