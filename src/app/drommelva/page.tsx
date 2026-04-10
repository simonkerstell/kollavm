"use client";
import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import { swedenSquad, formationPositions, positionSlots } from "@/data/sweden-squad";
import { ChevronDown, Download, Share2, Lock } from "lucide-react";

type Lineup = Record<string, string>; // slot -> player name

const positionFilter: Record<string, string[]> = {
  gk: ["GK"],
  lb: ["DF"], cb1: ["DF"], cb2: ["DF"], rb: ["DF"],
  cm1: ["MF"], cm2: ["MF"], cm3: ["MF"],
  lw: ["FW", "MF"], st: ["FW"], rw: ["FW", "MF"],
};

export default function DrommelvaPage() {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [lineup, setLineup] = useState<Lineup>({});
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const pitchRef = useRef<HTMLDivElement>(null);

  const filledCount = Object.keys(lineup).length;
  const isComplete = filledCount === 11;

  function selectPlayer(slot: string, playerName: string) {
    setLineup(prev => ({ ...prev, [slot]: playerName }));
    setActiveSlot(null);
    setSaved(false);
  }

  function clearSlot(slot: string) {
    setLineup(prev => {
      const copy = { ...prev };
      delete copy[slot];
      return copy;
    });
    setSaved(false);
  }

  const usedPlayers = new Set(Object.values(lineup));

  function getAvailablePlayers(slot: string) {
    const positions = positionFilter[slot] ?? [];
    return swedenSquad.filter(p =>
      positions.includes(p.position) && !usedPlayers.has(p.name)
    );
  }

  async function handleShare() {
    const text = `Min drömelva för Sverige i VM 2026:\n\n${positionSlots.map(s => {
      const pos = formationPositions[s];
      const player = lineup[s];
      return `${pos.label}: ${player || "?"}`;
    }).join("\n")}\n\nBygg din egen på kollavm.se/drommelva`;

    if (navigator.share) {
      await navigator.share({ title: "Min Sverige-elva – KollaVM", text });
    } else {
      await navigator.clipboard.writeText(text);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  // Teaser for non-logged-in users
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-white mb-2">
            Bygg din <span className="text-[#f5c518]">drömelva</span>
          </h1>
          <p className="text-gray-400">Välj din drömstartelva för Sverige i VM 2026</p>
        </div>

        {/* Blurred teaser */}
        <div className="relative">
          <div className="blur-sm pointer-events-none select-none">
            <div className="relative w-full aspect-[3/4] max-w-lg mx-auto bg-gradient-to-b from-green-800 to-green-900 rounded-2xl border border-green-700/50 overflow-hidden">
              {/* Field markings */}
              <div className="absolute inset-x-[10%] top-[5%] bottom-[5%] border-2 border-white/20 rounded-lg" />
              <div className="absolute inset-x-[25%] bottom-[5%] h-[20%] border-2 border-white/20 rounded-t-lg" />
              <div className="absolute inset-x-[25%] top-[5%] h-[20%] border-2 border-white/20 rounded-b-lg" />
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/20 rounded-full" />
              <div className="absolute left-0 right-0 top-1/2 border-t-2 border-white/20" />

              {positionSlots.map(slot => {
                const pos = formationPositions[slot];
                return (
                  <div key={slot} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}>
                    <div className="w-12 h-12 rounded-full bg-[#f5c518] flex items-center justify-center">
                      <span className="text-[#0a1628] font-black text-xs">{pos.label}</span>
                    </div>
                    <p className="text-white text-[10px] font-semibold text-center mt-1 bg-black/50 rounded px-1">Spelare</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#0d1f3c]/95 border border-[#f5c518]/30 rounded-2xl p-8 text-center max-w-sm mx-4">
              <Lock size={32} className="text-[#f5c518] mx-auto mb-3" />
              <h3 className="text-white font-black text-xl mb-2">Logga in för att bygga din elva</h3>
              <p className="text-gray-400 text-sm mb-4">Skapa ett konto och välj dina 11 drömspelare för Sverige i VM 2026.</p>
              <button onClick={() => setShowAuth(true)} className="bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-black px-8 py-3 rounded-full transition-colors">
                Skapa konto
              </button>
            </div>
          </div>
        </div>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black text-white mb-2">
          Bygg din <span className="text-[#f5c518]">drömelva</span>
        </h1>
        <p className="text-gray-400">Klicka på en position och välj spelare. Formation: 4-3-3</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pitch */}
        <div className="lg:col-span-2">
          <div ref={pitchRef} className="relative w-full aspect-[3/4] bg-gradient-to-b from-green-800 to-green-900 rounded-2xl border border-green-700/50 overflow-hidden">
            {/* Field markings */}
            <div className="absolute inset-x-[10%] top-[5%] bottom-[5%] border-2 border-white/20 rounded-lg" />
            <div className="absolute inset-x-[25%] bottom-[5%] h-[20%] border-2 border-white/20 rounded-t-lg" />
            <div className="absolute inset-x-[25%] top-[5%] h-[20%] border-2 border-white/20 rounded-b-lg" />
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/20 rounded-full" />
            <div className="absolute left-0 right-0 top-1/2 border-t-2 border-white/20" />

            {/* Sweden badge */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 text-center">
              <span className="text-3xl">🇸🇪</span>
              <p className="text-white/60 text-[10px] font-bold mt-0.5">SVERIGE VM 2026</p>
            </div>

            {/* Player positions */}
            {positionSlots.map(slot => {
              const pos = formationPositions[slot];
              const player = lineup[slot];
              const isActive = activeSlot === slot;

              return (
                <button
                  key={slot}
                  onClick={() => {
                    if (player) {
                      clearSlot(slot);
                    } else {
                      setActiveSlot(isActive ? null : slot);
                    }
                  }}
                  className="absolute group"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${
                    player
                      ? "bg-[#f5c518] shadow-lg shadow-[#f5c518]/30"
                      : isActive
                      ? "bg-white/30 border-2 border-[#f5c518] animate-pulse"
                      : "bg-white/20 border-2 border-white/30 hover:border-[#f5c518]/50"
                  }`}>
                    {player ? (
                      <span className="text-[#0a1628] font-black text-[10px] sm:text-xs text-center leading-tight px-0.5">
                        {player.split(" ").pop()}
                      </span>
                    ) : (
                      <span className="text-white/60 font-bold text-xs">{pos.label}</span>
                    )}
                  </div>
                  {player && (
                    <p className="text-white text-[9px] sm:text-[10px] font-semibold text-center mt-1 bg-black/60 rounded px-1.5 py-0.5 whitespace-nowrap">
                      {player}
                    </p>
                  )}
                </button>
              );
            })}

            {/* Title overlay */}
            {isComplete && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 rounded-full px-4 py-1.5">
                <p className="text-[#f5c518] text-xs font-black">MIN DRÖMELVA – {user.name.toUpperCase()}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          {isComplete && (
            <div className="flex gap-3 mt-4 justify-center">
              <button
                onClick={handleShare}
                className={`inline-flex items-center gap-2 font-bold px-6 py-3 rounded-full text-sm transition-all ${saved ? "bg-green-500 text-white" : "bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628]"}`}
              >
                {saved ? "Kopierad!" : <><Share2 size={16} /> Dela din elva</>}
              </button>
            </div>
          )}
        </div>

        {/* Player picker sidebar */}
        <div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sticky top-20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold">Välj spelare</h3>
              <span className="text-[#f5c518] text-sm font-bold">{filledCount}/11</span>
            </div>

            {activeSlot ? (
              <>
                <p className="text-gray-400 text-xs mb-3">
                  Position: <span className="text-[#f5c518] font-bold">{formationPositions[activeSlot].label}</span>
                </p>
                <div className="space-y-1 max-h-80 overflow-y-auto">
                  {getAvailablePlayers(activeSlot).map(player => (
                    <button
                      key={player.name}
                      onClick={() => selectPlayer(activeSlot, player.name)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left text-gray-300 hover:bg-[#f5c518]/10 hover:text-[#f5c518] transition-all"
                    >
                      <div>
                        <span className="font-semibold text-white">{player.name}</span>
                        <span className="text-gray-500 text-xs block">{player.club}</span>
                      </div>
                      <span className="text-[10px] text-gray-600 font-mono">{player.position}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setActiveSlot(null)} className="mt-3 text-xs text-gray-500 hover:text-white transition-colors">
                  Avbryt
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-400 text-xs mb-4">
                  {isComplete ? "Din elva är klar! Dela den med vänner." : "Klicka på en position på planen för att välja spelare."}
                </p>

                {/* Current lineup list */}
                <div className="space-y-1">
                  {positionSlots.map(slot => {
                    const pos = formationPositions[slot];
                    const player = lineup[slot];
                    return (
                      <div key={slot} className="flex items-center justify-between px-2 py-1.5 text-xs rounded-lg">
                        <span className="text-gray-500 font-mono w-6">{pos.label}</span>
                        {player ? (
                          <>
                            <span className="text-white font-semibold flex-1 ml-2">{player}</span>
                            <button onClick={() => clearSlot(slot)} className="text-gray-600 hover:text-red-400 text-[10px]">Ta bort</button>
                          </>
                        ) : (
                          <span className="text-gray-600 flex-1 ml-2">Ej vald</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {filledCount > 0 && !isComplete && (
                  <button onClick={() => setLineup({})} className="mt-4 text-xs text-gray-500 hover:text-red-400 transition-colors">
                    Rensa alla
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
