"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import { groups } from "@/data/groups";
import {
  savePrediction, getUserPredictions,
  saveGroupPrediction, getUserGroupPredictions,
  saveBracketPredictions, getUserBracketPredictions,
} from "@/lib/tippa-store";
import { Prediction, GroupPrediction, BracketPrediction } from "@/lib/tippa-types";
import { ChevronLeft, Trophy, Check, Users, Clock, Pencil, Copy, ChevronDown } from "lucide-react";
import Link from "next/link";

const allTeams = groups.flatMap(g => g.teams);
function getFlag(name: string) {
  return allTeams.find(t => t.name === name)?.flag ?? "";
}

type Tab = "matcher" | "gruppspel" | "slutspel";

const BRACKET_STAGES = [
  { key: "qf", label: "Kvartsfinal", count: 8, points: "2p" },
  { key: "sf", label: "Semifinal", count: 4, points: "3p" },
  { key: "final", label: "Final", count: 2, points: "5p" },
  { key: "champion", label: "VM-vinnare", count: 1, points: "10p" },
] as const;

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

// --- Bracket Stage Picker ---

function BracketStagePicker({
  stage,
  label,
  count,
  pointsLabel,
  availableTeams,
  selected,
  onToggle,
  onSave,
  saved,
  saving,
}: {
  stage: string;
  label: string;
  count: number;
  pointsLabel: string;
  availableTeams: string[];
  selected: string[];
  onToggle: (team: string) => void;
  onSave: () => void;
  saved: boolean;
  saving: boolean;
}) {
  return (
    <div className={`bg-white/5 border rounded-2xl p-5 transition-all ${saved ? "border-green-500/30" : "border-white/10"}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-black text-lg">{label}</h3>
          <p className="text-gray-400 text-xs">Välj {count} lag · <span className="text-[#f5c518] font-bold">{pointsLabel}</span> per rätt lag</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${selected.length === count ? "text-green-400" : "text-gray-500"}`}>{selected.length}/{count}</span>
          {saved && <span className="flex items-center gap-1 text-xs text-green-400 font-semibold"><Check size={12} /> Sparat</span>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {availableTeams.map(team => {
          const isSelected = selected.includes(team);
          return (
            <button
              key={team}
              onClick={() => onToggle(team)}
              disabled={!isSelected && selected.length >= count}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? "bg-[#f5c518] text-[#0a1628] font-bold"
                  : selected.length >= count
                  ? "bg-white/5 text-gray-600 cursor-not-allowed"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white cursor-pointer"
              }`}
            >
              <span>{getFlag(team)}</span>
              <span>{team}</span>
            </button>
          );
        })}
      </div>

      {!saved && (
        <button onClick={onSave} disabled={selected.length !== count || saving} className={`w-full py-2.5 rounded-full font-bold text-sm transition-all ${selected.length === count && !saving ? "bg-[#f5c518] text-[#0a1628] hover:bg-[#d4a017]" : "bg-white/5 text-gray-600 cursor-not-allowed"}`}>
          {saving ? "Sparar..." : "Spara"}
        </button>
      )}
    </div>
  );
}

// --- Main Page ---

export default function TippaPage() {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [tab, setTab] = useState<Tab>("matcher");
  const [selectedGroup, setSelectedGroup] = useState<typeof groups[0] | null>(null);

  // Match predictions
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  // Group predictions
  const [groupPreds, setGroupPreds] = useState<GroupPrediction[]>([]);
  // Bracket predictions
  const [bracketPreds, setBracketPreds] = useState<BracketPrediction[]>([]);
  const [bracketSelections, setBracketSelections] = useState<Record<string, string[]>>({ qf: [], sf: [], final: [], champion: [] });
  const [bracketSaved, setBracketSaved] = useState<Record<string, boolean>>({ qf: false, sf: false, final: false, champion: false });
  const [bracketSaving, setBracketSaving] = useState<Record<string, boolean>>({ qf: false, sf: false, final: false, champion: false });

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
    ]).then(([preds, gPreds, bPreds]) => {
      setPredictions(preds);
      setGroupPreds(gPreds);
      setBracketPreds(bPreds);

      // Populate bracket selections from existing predictions
      const selections: Record<string, string[]> = { qf: [], sf: [], final: [], champion: [] };
      const savedState: Record<string, boolean> = { qf: false, sf: false, final: false, champion: false };
      for (const bp of bPreds) {
        if (selections[bp.stage]) {
          selections[bp.stage].push(bp.teamName);
          savedState[bp.stage] = true;
        }
      }
      setBracketSelections(selections);
      setBracketSaved(savedState);
      setLoadingData(false);
    });
  }, [user]);

  function getPred(matchId: string) {
    return predictions.find(p => p.matchId === matchId);
  }

  function getGroupPred(groupId: string) {
    return groupPreds.find(p => p.groupId === groupId);
  }

  async function refreshGroupPreds() {
    if (!user) return;
    const gp = await getUserGroupPredictions(user.id);
    setGroupPreds(gp);
  }

  function toggleBracketTeam(stage: string, team: string) {
    setBracketSelections(prev => {
      const current = prev[stage] ?? [];
      const updated = current.includes(team) ? current.filter(t => t !== team) : [...current, team];
      return { ...prev, [stage]: updated };
    });
    setBracketSaved(prev => ({ ...prev, [stage]: false }));
  }

  async function saveBracketStage(stage: string) {
    if (!user) return;
    setBracketSaving(prev => ({ ...prev, [stage]: true }));
    try {
      await saveBracketPredictions(user.id, stage, bracketSelections[stage]);
      setBracketSaved(prev => ({ ...prev, [stage]: true }));
    } catch { /* ignore */ }
    setBracketSaving(prev => ({ ...prev, [stage]: false }));
  }

  // All team names for bracket picking
  const allTeamNames = groups.flatMap(g => g.teams.map(t => t.name));

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
            <h2 className="text-xl font-bold text-white mb-1">Tippa slutspelet</h2>
            <p className="text-gray-400 text-sm">Vilka lag tar sig till varje steg? Poängen ökar ju längre in i turneringen.</p>
          </div>

          <div className="space-y-6">
            {BRACKET_STAGES.map(stage => (
              <BracketStagePicker
                key={stage.key}
                stage={stage.key}
                label={stage.label}
                count={stage.count}
                pointsLabel={stage.points}
                availableTeams={allTeamNames}
                selected={bracketSelections[stage.key] ?? []}
                onToggle={(team) => toggleBracketTeam(stage.key, team)}
                onSave={() => saveBracketStage(stage.key)}
                saved={bracketSaved[stage.key] ?? false}
                saving={bracketSaving[stage.key] ?? false}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
