"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import { groups } from "@/data/groups";
import { savePrediction, getPrediction } from "@/lib/tippa-store";
import { ChevronLeft, Trophy, Check, Users, Share2, Clock } from "lucide-react";
import Link from "next/link";

function MatchTipCard({ groupId, matchIndex, match }: { groupId: string; matchIndex: number; match: typeof groups[0]["matches"][0] }) {
  const { user } = useAuth();
  const matchId = `${groupId}-${matchIndex}`;
  const existing = user ? getPrediction(user.id, matchId) : undefined;
  const [home, setHome] = useState(existing?.homeGoals?.toString() ?? "");
  const [away, setAway] = useState(existing?.awayGoals?.toString() ?? "");
  const [saved, setSaved] = useState(false);

  const allTeams = groups.flatMap(g => g.teams);
  const homeFlag = allTeams.find(t => t.name === match.home)?.flag ?? "";
  const awayFlag = allTeams.find(t => t.name === match.away)?.flag ?? "";

  function handleSave() {
    if (!user || home === "" || away === "") return;
    savePrediction({ userId: user.id, matchId, homeGoals: parseInt(home), awayGoals: parseInt(away) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className={`bg-white/5 border rounded-xl p-4 transition-all ${existing ? "border-[#f5c518]/30" : "border-white/10"}`}>
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex-1 text-right">
          <p className="text-2xl">{homeFlag}</p>
          <p className="font-bold text-white text-sm">{match.home}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <input type="number" min="0" max="20" value={home} onChange={e => setHome(e.target.value)} className="w-12 text-center bg-white/10 border border-white/20 rounded-lg py-2 text-white font-black text-lg focus:outline-none focus:border-[#f5c518]/50" placeholder="–" />
          <span className="text-gray-500 font-bold">–</span>
          <input type="number" min="0" max="20" value={away} onChange={e => setAway(e.target.value)} className="w-12 text-center bg-white/10 border border-white/20 rounded-lg py-2 text-white font-black text-lg focus:outline-none focus:border-[#f5c518]/50" placeholder="–" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-2xl">{awayFlag}</p>
          <p className="font-bold text-white text-sm">{match.away}</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{match.date} · {match.time}</span>
        <button onClick={handleSave} disabled={home === "" || away === ""} className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-semibold transition-all text-xs ${saved ? "bg-green-500/20 text-green-400" : home !== "" && away !== "" ? "bg-[#f5c518] text-[#0a1628] hover:bg-[#d4a017]" : "bg-white/5 text-gray-600 cursor-not-allowed"}`}>
          {saved ? <><Check size={12} /> Sparat</> : "Spara"}
        </button>
      </div>
    </div>
  );
}

export default function TippaPage() {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<typeof groups[0] | null>(null);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400">Laddar...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Trophy className="text-[#f5c518] mx-auto mb-4" size={48} />
        <h1 className="text-4xl font-black text-white mb-3">Tippa VM 2026</h1>
        <p className="text-gray-400 mb-8">Skapa ett konto för att tippa alla matcher och tävla mot dina vänner i privata ligor.</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left max-w-sm mx-auto">
          <h3 className="font-bold text-white mb-3">Hur poängen räknas</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-3"><span className="bg-[#f5c518] text-[#0a1628] font-black px-2 py-0.5 rounded text-xs">3p</span> Exakt rätt resultat</div>
            <div className="flex items-center gap-3"><span className="bg-white/20 text-white font-black px-2 py-0.5 rounded text-xs">1p</span> Rätt utfall (hemma/oavgjort/borta)</div>
            <div className="flex items-center gap-3"><span className="bg-white/10 text-gray-400 font-black px-2 py-0.5 rounded text-xs">0p</span> Fel utfall</div>
          </div>
        </div>
        <button onClick={() => setShowAuth(true)} className="bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-black px-8 py-3 rounded-full text-lg transition-colors">
          Skapa konto &amp; börja tippa
        </button>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!selectedGroup ? (
        <>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-white mb-1">Tippa <span className="text-[#f5c518]">VM 2026</span></h1>
              <p className="text-gray-400">Hej, {user.name}! Välj en grupp och tippa matcherna.</p>
            </div>
            <Link href="/tippa/ligor" className="flex items-center gap-2 bg-[#f5c518]/10 hover:bg-[#f5c518]/20 border border-[#f5c518]/30 text-[#f5c518] px-4 py-2 rounded-full text-sm font-semibold transition-colors">
              <Trophy size={14} /> Mina ligor
            </Link>
          </div>

          {/* Info & regler */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
              <Trophy size={18} className="text-[#f5c518] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-sm">Poängsystem</p>
                <p className="text-gray-400 text-xs mt-0.5"><span className="text-[#f5c518] font-bold">3p</span> exakt resultat · <span className="font-bold text-white">1p</span> rätt utfall · <span className="text-gray-500 font-bold">0p</span> fel</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
              <Clock size={18} className="text-[#f5c518] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-sm">Ändra tips</p>
                <p className="text-gray-400 text-xs mt-0.5">Du kan ändra ditt tips fram till 5 min innan matchstart</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
              <Users size={18} className="text-[#f5c518] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-sm">Tävla med vänner</p>
                <p className="text-gray-400 text-xs mt-0.5">Skapa en liga och bjud in dina kompisar</p>
              </div>
            </div>
          </div>

          {/* Bjud in vänner CTA */}
          <div className="bg-[#f5c518]/10 border border-[#f5c518]/30 rounded-xl p-4 mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Share2 size={20} className="text-[#f5c518] shrink-0" />
              <p className="text-sm text-gray-200"><span className="font-bold text-white">Bjud in en vän!</span> Skapa en liga, dela koden och tävla om vem som tippar bäst.</p>
            </div>
            <Link href="/tippa/ligor" className="shrink-0 bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-bold px-5 py-2 rounded-full text-sm transition-colors">
              Skapa liga
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map(group => {
              const tipped = group.matches.filter((_, i) => getPrediction(user.id, `${group.id}-${i}`)).length;
              const all = group.matches.length;
              return (
                <button key={group.id} onClick={() => setSelectedGroup(group)} className="w-full text-left bg-white/5 hover:bg-[#f5c518]/5 border border-white/10 hover:border-[#f5c518]/40 rounded-2xl p-6 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-[#f5c518] text-[#0a1628] font-black text-lg flex items-center justify-center">{group.id}</span>
                      <span className="text-white font-bold text-lg group-hover:text-[#f5c518] transition-colors">Grupp {group.id}</span>
                    </div>
                    <span className="text-xs text-gray-500">{tipped}/{all}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 mb-3">
                    {group.teams.map(team => (
                      <div key={team.name} className="flex items-center gap-1.5 text-sm text-gray-300">
                        <span>{team.flag}</span><span>{team.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1">
                    <div className="bg-[#f5c518] h-1 rounded-full transition-all" style={{ width: `${(tipped / all) * 100}%` }} />
                  </div>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <button onClick={() => setSelectedGroup(null)} className="flex items-center gap-2 text-gray-400 hover:text-[#f5c518] transition-colors mb-8 text-sm font-medium">
            <ChevronLeft size={16} /> Tillbaka till grupper
          </button>
          <div className="flex items-center gap-4 mb-8">
            <span className="w-14 h-14 rounded-full bg-[#f5c518] text-[#0a1628] font-black text-2xl flex items-center justify-center">{selectedGroup.id}</span>
            <div>
              <h2 className="text-3xl font-black text-white">Grupp {selectedGroup.id}</h2>
              <p className="text-gray-400 text-sm">3p för exakt resultat · 1p för rätt utfall</p>
            </div>
          </div>
          <div className="space-y-3">
            {selectedGroup.matches.map((match, i) => (
              <MatchTipCard key={i} groupId={selectedGroup.id} matchIndex={i} match={match} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
