"use client";
import { useState } from "react";
import { groups } from "@/data/groups";
import { Check, AlertTriangle } from "lucide-react";

const allTeams = groups.flatMap(g => g.teams);
function getFlag(name: string) {
  return allTeams.find(t => t.name === name)?.flag ?? "";
}

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Match scoring
  const [selectedGroup, setSelectedGroup] = useState("A");
  const [selectedMatchIndex, setSelectedMatchIndex] = useState(0);
  const [homeGoals, setHomeGoals] = useState("");
  const [awayGoals, setAwayGoals] = useState("");

  // Group scoring
  const [scoreGroupId, setScoreGroupId] = useState("A");
  const [firstPlace, setFirstPlace] = useState("");
  const [secondPlace, setSecondPlace] = useState("");

  // Bracket scoring
  const [bracketMatchId, setBracketMatchId] = useState("m65");
  const [bracketWinner, setBracketWinner] = useState("");

  function addLog(msg: string) {
    setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  }

  async function apiCall(body: Record<string, unknown>) {
    setLoading(true);
    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, secret }),
      });
      const data = await res.json();
      if (data.ok) {
        addLog(`OK: ${JSON.stringify(data)}`);
      } else {
        addLog(`FEL: ${data.error}`);
      }
    } catch (err) {
      addLog(`FEL: ${err}`);
    }
    setLoading(false);
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-black text-white mb-6">Admin</h1>
        <input
          type="password"
          value={secret}
          onChange={e => setSecret(e.target.value)}
          placeholder="Admin-lösenord"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-[#f5c518]/50"
        />
        <button onClick={() => setAuthenticated(true)} className="w-full bg-[#f5c518] text-[#0a1628] font-black py-3 rounded-full">
          Logga in
        </button>
      </div>
    );
  }

  const group = groups.find(g => g.id === selectedGroup)!;
  const match = group.matches[selectedMatchIndex];
  const scoreGroup = groups.find(g => g.id === scoreGroupId)!;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black text-white mb-2">Admin – Resultathantering</h1>
      <p className="text-gray-400 text-sm mb-8">Mata in matchresultat för att beräkna poäng automatiskt.</p>

      {/* Auto-fetch */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-6">
        <h2 className="font-bold text-white text-lg mb-2">Hämta resultat automatiskt</h2>
        <p className="text-gray-400 text-sm mb-4">Hämtar färdigspelade matcher från football-data.org och beräknar poäng för alla tips.</p>
        <button
          onClick={() => fetch("/api/fetch-results", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ secret }) }).then(r => r.json()).then(d => { if (d.ok) addLog(`Auto-scoring klar: ${d.scored} matcher poängsatta, ${d.skipped} överhoppade`); else addLog(`FEL: ${d.error}`); }).catch(e => addLog(`FEL: ${e}`))}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors disabled:opacity-50"
        >
          Hämta & poängsätt automatiskt
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score match */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
            <Check size={18} className="text-[#f5c518]" /> Registrera matchresultat
          </h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Grupp</label>
                <select value={selectedGroup} onChange={e => { setSelectedGroup(e.target.value); setSelectedMatchIndex(0); }} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm">
                  {groups.map(g => <option key={g.id} value={g.id} className="bg-[#0d1f3c]">Grupp {g.id}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Match</label>
                <select value={selectedMatchIndex} onChange={e => setSelectedMatchIndex(Number(e.target.value))} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm">
                  {group.matches.map((m, i) => <option key={i} value={i} className="bg-[#0d1f3c]">{m.home} – {m.away}</option>)}
                </select>
              </div>
            </div>

            {match && (
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500 mb-2">{match.date} · {match.time}</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-white font-bold">{getFlag(match.home)} {match.home}</span>
                  <div className="flex items-center gap-2">
                    <input type="number" min="0" max="20" value={homeGoals} onChange={e => setHomeGoals(e.target.value)} className="w-12 text-center bg-white/10 border border-white/20 rounded-lg py-2 text-white font-black" placeholder="-" />
                    <span className="text-gray-500">–</span>
                    <input type="number" min="0" max="20" value={awayGoals} onChange={e => setAwayGoals(e.target.value)} className="w-12 text-center bg-white/10 border border-white/20 rounded-lg py-2 text-white font-black" placeholder="-" />
                  </div>
                  <span className="text-white font-bold">{match.away} {getFlag(match.away)}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => apiCall({ action: "score_match", matchId: `${selectedGroup}-${selectedMatchIndex}`, homeGoals: Number(homeGoals), awayGoals: Number(awayGoals) })}
              disabled={loading || homeGoals === "" || awayGoals === ""}
              className="w-full bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-bold py-2.5 rounded-full text-sm transition-colors disabled:opacity-50"
            >
              {loading ? "Sparar..." : "Registrera resultat & beräkna poäng"}
            </button>
          </div>
        </div>

        {/* Score group */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
            <Check size={18} className="text-[#f5c518]" /> Registrera gruppresultat
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Grupp</label>
              <select value={scoreGroupId} onChange={e => { setScoreGroupId(e.target.value); setFirstPlace(""); setSecondPlace(""); }} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm">
                {groups.map(g => <option key={g.id} value={g.id} className="bg-[#0d1f3c]">Grupp {g.id}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Gruppsegrare</label>
              <select value={firstPlace} onChange={e => setFirstPlace(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm">
                <option value="" className="bg-[#0d1f3c]">Välj...</option>
                {scoreGroup.teams.filter(t => t.name !== secondPlace).map(t => <option key={t.name} value={t.name} className="bg-[#0d1f3c]">{t.flag} {t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Tvåa</label>
              <select value={secondPlace} onChange={e => setSecondPlace(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm">
                <option value="" className="bg-[#0d1f3c]">Välj...</option>
                {scoreGroup.teams.filter(t => t.name !== firstPlace).map(t => <option key={t.name} value={t.name} className="bg-[#0d1f3c]">{t.flag} {t.name}</option>)}
              </select>
            </div>
            <button
              onClick={() => apiCall({ action: "score_group", groupId: scoreGroupId, firstPlace, secondPlace })}
              disabled={loading || !firstPlace || !secondPlace}
              className="w-full bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-bold py-2.5 rounded-full text-sm transition-colors disabled:opacity-50"
            >
              {loading ? "Sparar..." : "Registrera gruppresultat & beräkna poäng"}
            </button>
          </div>
        </div>

        {/* Score bracket */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
            <Check size={18} className="text-[#f5c518]" /> Registrera slutspelsresultat
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Match-ID (t.ex. m65, m81, m89)</label>
              <input value={bracketMatchId} onChange={e => setBracketMatchId(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm" placeholder="m65" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Vinnare</label>
              <select value={bracketWinner} onChange={e => setBracketWinner(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm">
                <option value="" className="bg-[#0d1f3c]">Välj lag...</option>
                {allTeams.map(t => <option key={t.name} value={t.name} className="bg-[#0d1f3c]">{t.flag} {t.name}</option>)}
              </select>
            </div>
            <button
              onClick={() => apiCall({ action: "score_bracket", matchId: bracketMatchId, winner: bracketWinner })}
              disabled={loading || !bracketMatchId || !bracketWinner}
              className="w-full bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-bold py-2.5 rounded-full text-sm transition-colors disabled:opacity-50"
            >
              {loading ? "Sparar..." : "Registrera vinnare & beräkna poäng"}
            </button>
          </div>
        </div>

        {/* Log */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-[#f5c518]" /> Logg
          </h2>
          <div className="bg-black/30 rounded-lg p-3 h-64 overflow-y-auto font-mono text-xs space-y-1">
            {log.length === 0 && <p className="text-gray-600">Inga händelser ännu...</p>}
            {log.map((entry, i) => (
              <p key={i} className={entry.includes("FEL") ? "text-red-400" : "text-green-400"}>{entry}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
