"use client";

import { useState } from "react";
import { restaurants } from "@/data/mock-data";
import { Monitor, Sun, MapPin } from "lucide-react";

export default function RestaurangerPage() {
  const [cityFilter, setCityFilter] = useState("Alla");
  const [formData, setFormData] = useState({ name: "", city: "", link: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const cities = ["Alla", ...Array.from(new Set(restaurants.map((r) => r.city)))];
  const filtered = cityFilter === "Alla" ? restaurants : restaurants.filter((r) => r.city === cityFilter);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white mb-2">
          Restaurang<span className="text-[#f5c518]">tips</span>
        </h1>
        <p className="text-gray-400">Hitta bästa stället att se VM-matchen – med pubkänsla och bra skärmar.</p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setCityFilter(city)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              cityFilter === city
                ? "bg-[#f5c518] text-[#0a1628]"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Restaurant grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#f5c518]/30 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-white text-lg">{r.name}</h3>
                <div className="flex items-center gap-1 text-gray-400 text-sm mt-0.5">
                  <MapPin size={12} />
                  {r.city}
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">{r.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-gray-300">
                <Monitor size={14} className="text-[#f5c518]" />
                {r.screens} skärmar
              </div>
              {r.hasOutdoor && (
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Sun size={14} className="text-[#f5c518]" />
                  Uteplats
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tip form */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">Tips om en restaurang</h2>
        <p className="text-gray-400 text-sm mb-6">Vet du om ett ställe som visar VM? Dela med dig!</p>

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-400">
            Tack för ditt tips! Vi granskar det och lägger till det snart.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Restaurangnamn *</label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#f5c518]/50"
                  placeholder="T.ex. O'Learys"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Stad *</label>
                <input
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#f5c518]/50"
                  placeholder="T.ex. Stockholm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Webbplats (valfri)</label>
              <input
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#f5c518]/50"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Meddelande</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#f5c518]/50 resize-none"
                placeholder="Berätta mer om stället..."
              />
            </div>
            <button
              type="submit"
              className="bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-bold px-6 py-2.5 rounded-full text-sm transition-colors"
            >
              Skicka tips
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
