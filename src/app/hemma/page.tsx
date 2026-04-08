import { products } from "@/data/mock-data";
import { ExternalLink } from "lucide-react";

export default function HemmaPage() {
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white mb-2">
          VM-känsla <span className="text-[#f5c518]">hemma</span>
        </h1>
        <p className="text-gray-400 max-w-xl">
          Allt du behöver för att skapa den perfekta VM-upplevelsen – oavsett om det är i vardagsrummet eller på uteplatsen.
        </p>
      </div>

      <div className="bg-[#f5c518]/10 border border-[#f5c518]/20 rounded-xl p-4 mb-10 text-sm text-[#f5c518]">
        ℹ️ Som affiliate-partner kan vi tjäna provision på köp via våra länkar. Detta påverkar inte vår redaktionella bedömning.
      </div>

      <div className="space-y-16">
        {categories.map((category) => {
          const catProducts = products.filter((p) => p.category === category);
          const emoji = catProducts[0]?.emoji;
          return (
            <section key={category}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>{emoji}</span> {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catProducts.map((product) => (
                  <div key={product.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#f5c518]/30 transition-all group flex flex-col">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.retailer && (
                        <span className="absolute top-3 left-3 bg-[#0a1628]/90 text-white text-xs font-bold px-2 py-1 rounded-full border border-white/10">
                          {product.retailer}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-white mb-1">{product.name}</h3>
                      <p className="text-gray-400 text-sm mb-4 flex-1">{product.description}</p>
                      <div className="flex items-center justify-between gap-3 mt-auto">
                        {product.price && (
                          <span className="text-[#f5c518] font-black text-lg">{product.price}</span>
                        )}
                        <a
                          href={product.affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-bold px-4 py-2 rounded-full text-sm transition-colors whitespace-nowrap"
                        >
                          Köp här <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
