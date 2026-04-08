import { articles } from "@/data/mock-data";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";

const categoryColors: Record<string, string> = {
  "Hemma-tips": "bg-blue-500/20 text-blue-300",
  "VM-guide": "bg-green-500/20 text-green-300",
  "Produkttips": "bg-purple-500/20 text-purple-300",
  "Affiliate": "bg-[#f5c518]/20 text-[#f5c518]",
};

export default function ArtikklarPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white mb-2">
          Artiklar <span className="text-[#f5c518]">& tips</span>
        </h1>
        <p className="text-gray-400">Guider, produkttips och allt du behöver veta inför VM 2026.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/artiklar/${article.slug}`}
            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#f5c518]/30 transition-all"
          >
            <div className="aspect-[16/9] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.heroImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[article.category]}`}>
                  <Tag size={10} />
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-gray-500 text-xs">
                  <Calendar size={10} />
                  {new Date(article.date).toLocaleDateString("sv-SE")}
                </span>
              </div>
              <h2 className="font-bold text-white text-lg mb-2 group-hover:text-[#f5c518] transition-colors leading-tight">
                {article.title}
              </h2>
              <p className="text-gray-400 text-sm line-clamp-2">{article.excerpt}</p>
              <span className="inline-block mt-4 text-[#f5c518] text-sm font-semibold">Läs mer →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
