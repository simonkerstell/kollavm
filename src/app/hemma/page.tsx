"use client";

import { useState } from "react";
import { products, productCategories, ProductCategory, Product } from "@/data/mock-data";
import { ExternalLink, ChevronLeft } from "lucide-react";

const retailerColors: Record<string, string> = {
  Amazon: "bg-[#f5c518] text-[#0a1628]",
};

function CategoryCard({ cat, count, onClick }: { cat: ProductCategory; count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white/5 hover:bg-[#f5c518]/10 border border-white/10 hover:border-[#f5c518]/40 rounded-2xl p-8 transition-all group flex flex-col items-center text-center gap-4"
    >
      <span className="text-6xl">{cat.emoji}</span>
      <div>
        <h3 className="text-white font-black text-xl group-hover:text-[#f5c518] transition-colors">{cat.label}</h3>
        <p className="text-gray-400 text-sm mt-1">{cat.description}</p>
      </div>
      <span className="text-[#f5c518] text-sm font-semibold group-hover:translate-x-1 transition-transform">
        {count} produkter →
      </span>
    </button>
  );
}

function ProductCard({ product }: { product: Product }) {
  const retailerClass = product.retailer
    ? (retailerColors[product.retailer] ?? "bg-gray-600")
    : "bg-gray-600";
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#f5c518]/30 transition-all group flex flex-col">
      <div className="aspect-[4/3] overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.retailer && (
          <span className={`absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full ${retailerClass}`}>
            {product.retailer}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-white mb-1 leading-tight">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-1">{product.description}</p>
        <div className="flex items-center justify-between gap-3 mt-auto">
          {product.price && (
            <span className="text-[#f5c518] font-black text-xl">{product.price}</span>
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
  );
}

export default function HemmaPage() {
  const [selected, setSelected] = useState<ProductCategory | null>(null);

  const categoryProducts = selected
    ? products.filter((p) => p.categoryKey === selected.key)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!selected ? (
        <>
          <div className="mb-10">
            <h1 className="text-4xl font-black text-white mb-2">
              Kolla VM <span className="text-[#f5c518]">hemma</span>
            </h1>
            <p className="text-gray-400 max-w-xl">
              Välj en kategori för att hitta produkterna du behöver inför VM 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((cat) => {
              const count = products.filter((p) => p.categoryKey === cat.key).length;
              return (
                <CategoryCard
                  key={cat.key}
                  cat={cat}
                  count={count}
                  onClick={() => setSelected(cat)}
                />
              );
            })}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-[#f5c518] transition-colors mb-8 text-sm font-medium"
          >
            <ChevronLeft size={16} />
            Tillbaka till alla kategorier
          </button>

          <div className="flex items-center gap-4 mb-10">
            <span className="text-5xl">{selected.emoji}</span>
            <div>
              <h2 className="text-3xl font-black text-white">{selected.label}</h2>
              <p className="text-gray-400 text-sm mt-0.5">{selected.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
