"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import { groups } from "@/data/groups";
import { bracketRounds, allBracketMatches } from "@/data/bracket";
import {
  savePrediction, getUserPredictions,
  saveGroupPrediction, getUserGroupPredictions,
  saveBracketPick, getUserBracketPredictions,
} from "@/lib/tippa-store";
import { Prediction, GroupPrediction } from "@/lib/tippa-types";
import { ChevronLeft, Trophy, Check, Users, Pencil, Copy, ChevronDown, Undo2 } from "lucide-react";
import Link from "next/link";

const allTeams = groups.flatMap(g => g.teams);
function getFlag(name: string) {
  return allTeams.find(t => t.name === name)?.flag ?? "";
}

type Tab = "matcher" | "gruppspel" | "slutspel";

// --- Match Tip Card ---

function MatchTipCard({ groupId, matchIndex, match, existingPred }: { groupId: string; matchIndex: number; match: typeof groups[0]["matches"][0]; existingPred?: Prediction }) {
  const { user } = useAuth();
  const [home, setHome] = useState(existingPred?.homeGoals?.toString() ?? "");
  const [away, setAway] = useState(existingPred?.awayGoals?.toString() ?? "");
  const [saved, setSaved] = useState(!!existingPred);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const homeFlag = getFlag(match.home);
  const awayFlag = getFlag(match.away);
  const isLocked = saved && !editing;

  async function handleSave() {
    if (!user || home === "" || away === "") return;
    setSaving(true);
    try {
      await savePrediction({ userId: user.id, matchId: `${groupId}-${matchIndex}`, homeGoals: parseInt(home), awayGoals: parseInt(away) });
      setSaved(true);
      setEditing(false);
    } catch { /* ignore */ }
    setSaving(false);
  }

  return (
    <div className={`bg-white/5 border rounded-xl p-4 transition-all ${saved ? "border-green-500/30" : "border-white/10"}`}>
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex-1 text-right">
          <p className="text-2xl">{homeFlag}</p>
          <p className="font-bold text-white text-sm">{match.home}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <input type="number" min="0" max="20" value={home} onChange={e => { setHome(e.target.value); if (!editing && saved) setEditing(true); }} disabled={isLocked} className={`w-12 text-center border rounded-lg py-2 font-black text-lg focus:outline-none focus:border-[#f5c518]/50 ${isLocked ? "bg-white/5 border-white/10 text-green-400" : "bg-white/10 border-white/20 text-white"}`} placeholder="–" />
          <span className="text-gray-500 font-bold">–</span>
          <input type="number" min="0" max="20" value={away} onChange={e => { setAway(e.target.value); if (!editing && saved) setEditing(true); }} disabled={isLocked} className={`w-12 text-center border rounded-lg py-2 font-black text-lg focus:outline-none focus:border-[#f5c518]/50 ${isLocked ? "bg-white/5 border-white/10 text-green-400" : "bg-white/10 border-white/20 text-white"}`} placeholder="–" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-2xl">{awayFlag}</p>
          <p className="font-bold text-white text-sm">{match.away}</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{match.date} · {match.time}</span>
        <div className="flex items-center gap-2">
          {isLocked ? (
            <>
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-full font-semibold text-xs bg-green-500/20 text-green-400">
                <Check size={12} /> Sparat
              </span>
              <button onClick={() => setEditing(true)} className="flex items-center gap-1 px-3 py-1.5 rounded-full font-semibold text-xs bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-colors">
                <Pencil size={12} /> Ändra
              </button>
            </>
          ) : (
            <button onClick={handleSave} disabled={home === "" || away === "" || saving} className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-semibold transition-all text-xs ${home !== "" && away !== "" && !saving ? "bg-[#f5c518] text-[#0a1628] hover:bg-[#d4a017]" : "bg-white/5 text-gray-600 cursor-not-allowed"}`}>
              {saving ? "Sparar..." : "Spara"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Group Prediction Card ---

function GroupPredCard({ group, existing, onSaved }: { group: typeof groups[0]; existing?: GroupPrediction; onSaved: () => void }) {
  const { user } = useAuth();
  const [first, setFirst] = useState(existing?.firstPlace ?? "");
  const [second, setSecond] = useState(existing?.secondPlace ?? "");
  const [saved, setSaved] = useState(!!existing);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!user || !first || !second) return;
    setSaving(true);
    try {
      await saveGroupPrediction({ userId: user.id, groupId: group.id, firstPlace: first, secondPlace: second });
      setSaved(true);
      onSaved();
    } catch { /* ignore */ }
    setSaving(false);
  }

  const teamOptions = group.teams.map(t => t.name);
  const firstOptions = teamOptions.filter(t => t !== second);
  const secondOptions = teamOptions.filter(t => t !== first);

  return (
    <div className={`bg-white/5 border rounded-2xl p-5 transition-all ${saved ? "border-green-500/30" : "border-white/10"}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-full bg-[#f5c518] text-[#0a1628] font-black text-lg flex items-center justify-center">{group.id}</span>
        <span className="text-white font-bold text-lg">Grupp {group.id}</span>
        {saved && <span className="ml-auto flex items-center gap-1 text-xs text-green-400 font-semibold"><Check size={12} /> Sparat</span>}
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">🥇 Gruppsegrare</label>
          <div className="relative">
            <select value={first} onChange={e => { setFirst(e.target.value); if (saved) setSaved(false); }} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#f5c518]/50 appearance-none cursor-pointer">
              <option value="" className="bg-[#0d1f3c]">Välj lag...</option>
              {firstOptions.map(t => <option key={t} value={t} className="bg-[#0d1f3c]">{getFlag(t)} {t}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">🥈 Tvåa i gruppen</label>
          <div className="relative">
            <select value={second} onChange={e => { setSecond(e.target.value); if (saved) setSaved(false); }} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#f5c518]/50 appearance-none cursor-pointer">
              <option value="" className="bg-[#0d1f3c]">Välj lag...</option>
              {secondOptions.map(t => <option key={t} value={t} className="bg-[#0d1f3c]">{getFlag(t)} {t}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {!saved && (
        <button onClick={handleSave} disabled={!first || !second || saving} className={`w-full py-2.5 rounded-full font-bold text-sm transition-all ${first && second && !saving ? "bg-[#f5c518] text-[#0a1628] hover:bg-[#d4a017]" : "bg-white/5 text-gray-600 cursor-not-allowed"}`}>
          {saving ? "Sparar..." : "Spara grupptips"}
        </button>
      )}
    </div>
  );
}

// --- Bracket Match Card ---

function BracketMatchCard({
  matchDef,
  picks,
  onPick,
}: {
  matchDef: typeof allBracketMatches[0];
  picks: Record<string, string>;
  onPick: (matchId: string, winner: string) => void;
}) {
  const homeResolved = matchDef.homeFrom ? (picks[matchDef.homeFrom] ?? null) : null;
  const awayResolved = matchDef.awayFrom ? (picks[matchDef.awayFrom] ?? null) : null;
  const currentPick = picks[matchDef.id];
  const isR32 = matchDef.round === "r32";
  const homeClickable = isR32 || !!homeResolved;
  const awayClickable = isR32 || !!awayResolved;

  if (isR32) {
    // Filter teams to only those from eligible groups
    const eligibleGroups = new Set([...(matchDef.homeGroups ?? []), ...(matchDef.awayGroups ?? [])]);
    const eligibleTeams = groups
      .filter(g => eligibleGroups.has(g.id))
      .flatMap(g => g.teams.map(t => t.name));

    return (
      <div className={`bg-white/5 border rounded-xl p-3 transition-all ${currentPick ? "border-green-500/30" : "border-white/10"}`}>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] text-gray-600 font-mono">{matchDef.id.toUpperCase()}</span>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{matchDef.homeLabel}</span>
            <span className="text-gray-700">vs</span>
            <span>{matchDef.awayLabel}</span>
          </div>
        </div>
        <div className="relative">
          <select
            value={currentPick ?? ""}
            onChange={e => onPick(matchDef.id, e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#f5c518]/50 appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#0d1f3c]">Välj vinnare...</option>
            {eligibleTeams.map(t => <option key={t} value={t} className="bg-[#0d1f3c]">{getFlag(t)} {t}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        {currentPick && (
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-green-400 font-semibold">
              <Check size={10} /> {getFlag(currentPick)} {currentPick}
            </div>
            <button onClick={() => onPick(matchDef.id, "")} className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-red-400 transition-colors">
              <Undo2 size={10} /> Ångra
            </button>
          </div>
        )}
      </div>
    );
  }

  // For later rounds: show two team buttons, click to pick winner
  return (
    <div className={`bg-white/5 border rounded-xl p-3 transition-all ${currentPick ? "border-green-500/30" : "border-white/10"}`}>
      <div className="flex items-center gap-1 mb-2">
        <span className="text-[10px] text-gray-600 font-mono">{matchDef.id.toUpperCase()}</span>
        {currentPick && (
          <button onClick={() => onPick(matchDef.id, "")} className="ml-auto flex items-center gap-1 text-[10px] text-gray-500 hover:text-red-400 transition-colors">
            <Undo2 size={8} /> Ångra
          </button>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => homeResolved && onPick(matchDef.id, homeResolved)}
          disabled={!homeClickable}
          className={`flex-1 py-2.5 px-2 rounded-lg text-sm font-semibold transition-all text-center ${
            currentPick === homeResolved && homeResolved
              ? "bg-[#f5c518] text-[#0a1628] font-black"
              : homeClickable
              ? "bg-white/10 text-white hover:bg-[#f5c518]/20 hover:text-[#f5c518] cursor-pointer"
              : "bg-white/5 text-gray-600 cursor-not-allowed"
          }`}
        >
          {homeResolved ? <><span className="mr-1">{getFlag(homeResolved)}</span>{homeResolved}</> : <span className="text-gray-600 text-xs">{matchDef.homeLabel}</span>}
        </button>
        <span className="text-gray-700 self-center text-xs font-bold">vs</span>
        <button
          onClick={() => awayResolved && onPick(matchDef.id, awayResolved)}
          disabled={!awayClickable}
          className={`flex-1 py-2.5 px-2 rounded-lg text-sm font-semibold transition-all text-center ${
            currentPick === awayResolved && awayResolved
              ? "bg-[#f5c518] text-[#0a1628] font-black"
              : awayClickable
              ? "bg-white/10 text-white hover:bg-[#f5c518]/20 hover:text-[#f5c518] cursor-pointer"
              : "bg-white/5 text-gray-600 cursor-not-allowed"
          }`}
        >
          {awayResolved ? <><span className="mr-1">{getFlag(awayResolved)}</span>{awayResolved}</> : <span className="text-gray-600 text-xs">{matchDef.awayLabel}</span>}
        </button>
      </div>
    </div>
  );
}

// --- Main Page ---

export default function TippaPage() {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [tab, setTab] = useState<Tab>("matcher");
  const [selectedGroup, setSelectedGroup] = useState<typeof groups[0] | null>(null);

  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [groupPreds, setGroupPreds] = useState<GroupPrediction[]>([]);
  const [bracketPicks, setBracketPicks] = useState<Record<string, string>>({});

  const [loadingData, setLoadingData] = useState(false);
  const [copied, setCopied] = useState(false);

  function copyInviteLink() {
    navigator.clipboard.writeText("https://kollavm.se/tippa");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  useEffect(() => {
    if (!user) return;
    setLoadingData(true);
    Promise.all([
      getUserPredictions(user.id),
      getUserGroupPredictions(user.id),
      getUserBracketPredictions(user.id),
    ]).then(([preds, gPreds, bPicks]) => {
      setPredictions(preds);
      setGroupPreds(gPreds);
      setBracketPicks(bPicks);
      setLoadingData(false);
    });
  }, [user]);

  function getPred(matchId: string) {
    return predictions.find(p => p.matchId === matchId);
  }

  function getGroupPred(groupId: string) {
    return groupPreds.find(p => p.groupId === groupId);
  }

  const refreshGroupPreds = useCallback(async () => {
    if (!user) return;
    const gp = await getUserGroupPredictions(user.id);
    setGroupPreds(gp);
  }, [user]);

  async function handleBracketPick(matchId: string, winner: string) {
    if (!user) return;

    const oldWinner = bracketPicks[matchId];
    const isClearing = !winner;
    const newPicks = { ...bracketPicks };

    if (isClearing) {
      delete newPicks[matchId];
    } else {
      newPicks[matchId] = winner;
    }

    // Clear downstream picks that depended on the old winner
    const toClear: string[] = [];
    if (oldWinner) {
      function clearDownstream(mId: string) {
        for (const m of allBracketMatches) {
          if (m.homeFrom === mId || m.awayFrom === mId) {
            if (newPicks[m.id] && (isClearing || newPicks[m.id] === oldWinner)) {
              toClear.push(m.id);
              delete newPicks[m.id];
              clearDownstream(m.id);
            }
          }
        }
      }
      clearDownstream(matchId);
    }

    setBracketPicks(newPicks);

    // Save to DB
    await saveBracketPick(user.id, matchId, winner);
    for (const id of toClear) {
      await saveBracketPick(user.id, id, "");
    }
  }

  if (loading || loadingData) {
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
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto">
          <h3 className="font-bold text-white mb-3">Hur poängen räknas</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-3"><span className="bg-[#f5c518] text-[#0a1628] font-black px-2 py-0.5 rounded text-xs">3p</span> Exakt rätt matchresultat</div>
            <div className="flex items-center gap-3"><span className="bg-white/20 text-white font-black px-2 py-0.5 rounded text-xs">1p</span> Rätt utfall (hemma/oavgjort/borta)</div>
            <div className="flex items-center gap-3"><span className="bg-[#f5c518] text-[#0a1628] font-black px-2 py-0.5 rounded text-xs">3p</span> Rätt gruppsegrare</div>
            <div className="flex items-center gap-3"><span className="bg-white/20 text-white font-black px-2 py-0.5 rounded text-xs">2p</span> Rätt grupptvåa</div>
            <div className="flex items-center gap-3"><span className="bg-[#f5c518] text-[#0a1628] font-black px-2 py-0.5 rounded text-xs">2–10p</span> Rätt lag i slutspelet</div>
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
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-black text-white mb-1">Tippa <span className="text-[#f5c518]">VM 2026</span></h1>
          <p className="text-gray-400">Hej, {user.name}!</p>
        </div>
        <Link href="/tippa/ligor" className="flex items-center gap-2 bg-[#f5c518]/10 hover:bg-[#f5c518]/20 border border-[#f5c518]/30 text-[#f5c518] px-4 py-2 rounded-full text-sm font-semibold transition-colors">
          <Trophy size={14} /> Mina ligor
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-8">
        {([
          { key: "matcher" as Tab, label: "⚽ Matcher" },
          { key: "gruppspel" as Tab, label: "🏆 Gruppspel" },
          { key: "slutspel" as Tab, label: "🏅 Slutspel" },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setSelectedGroup(null); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === t.key ? "bg-[#f5c518] text-[#0a1628]" : "text-gray-400 hover:text-white"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Bjud in vänner CTA */}
      <div className="bg-gradient-to-r from-[#f5c518]/15 to-[#f5c518]/5 border border-[#f5c518]/40 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#f5c518]/20 flex items-center justify-center shrink-0">
            <Users size={24} className="text-[#f5c518]" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-black text-lg mb-1">Bjud in dina vänner och tävla!</h3>
            <p className="text-gray-300 text-sm mb-4">Skicka länken till en kompis så kan de skapa konto och börja tippa. Skapa sedan en liga och tävla om vem som tippar bäst under VM 2026.</p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={copyInviteLink}
                className={`inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-full text-sm transition-all ${copied ? "bg-green-500 text-white" : "bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628]"}`}
              >
                {copied ? <><Check size={16} /> Länk kopierad!</> : <><Copy size={16} /> Kopiera inbjudningslänk</>}
              </button>
              <Link href="/tippa/ligor" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors">
                <Trophy size={14} /> Skapa liga
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* TAB: Matcher */}
      {tab === "matcher" && (
        <>
          {!selectedGroup ? (
            <>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-1">Tippa matchresultat</h2>
                <p className="text-gray-400 text-sm">3p för exakt resultat · 1p för rätt utfall</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups.map(group => {
                  const tipped = group.matches.filter((_, i) => getPred(`${group.id}-${i}`)).length;
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
                  <MatchTipCard key={i} groupId={selectedGroup.id} matchIndex={i} match={match} existingPred={getPred(`${selectedGroup.id}-${i}`)} />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* TAB: Gruppspel */}
      {tab === "gruppspel" && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-1">Tippa gruppspelet</h2>
            <p className="text-gray-400 text-sm">Vem vinner varje grupp och vem blir tvåa? <span className="text-[#f5c518] font-bold">3p</span> för rätt gruppsegrare · <span className="text-white font-bold">2p</span> för rätt tvåa</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {groups.map(group => (
              <GroupPredCard key={group.id} group={group} existing={getGroupPred(group.id)} onSaved={refreshGroupPreds} />
            ))}
          </div>
        </>
      )}

      {/* TAB: Slutspel */}
      {tab === "slutspel" && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-1">Tippa slutspelsträdet</h2>
            <p className="text-gray-400 text-sm">Välj vinnare i varje match. Vinnarna flyter vidare till nästa omgång automatiskt.</p>
          </div>

          {/* Champion display */}
          {bracketPicks["m103"] && (
            <div className="bg-gradient-to-r from-[#f5c518]/20 to-[#f5c518]/5 border border-[#f5c518]/40 rounded-2xl p-6 mb-8 text-center">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Din VM-vinnare</p>
              <p className="text-4xl mb-1">{getFlag(bracketPicks["m103"])}</p>
              <p className="text-white font-black text-2xl">{bracketPicks["m103"]}</p>
              <p className="text-[#f5c518] text-sm font-bold mt-1">🏆 10p om rätt</p>
            </div>
          )}

          <div className="space-y-8">
            {bracketRounds.map(round => {
              const pickedCount = round.matches.filter(m => bracketPicks[m.id]).length;
              return (
                <div key={round.key}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-white font-black text-lg">{round.label}</h3>
                      <p className="text-gray-500 text-xs">{round.points} per rätt</p>
                    </div>
                    <span className={`text-sm font-bold ${pickedCount === round.matches.length ? "text-green-400" : "text-gray-500"}`}>
                      {pickedCount}/{round.matches.length}
                    </span>
                  </div>
                  <div className={`grid gap-3 ${round.matches.length >= 8 ? "grid-cols-1 sm:grid-cols-2" : round.matches.length >= 4 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 max-w-lg mx-auto"}`}>
                    {round.matches.map(m => (
                      <BracketMatchCard
                        key={m.id}
                        matchDef={m}
                        picks={bracketPicks}
                        onPick={handleBracketPick}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
