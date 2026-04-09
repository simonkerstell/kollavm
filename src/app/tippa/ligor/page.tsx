"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import { createLeague, joinLeague, getUserLeagues, getLeagueMembers, GLOBAL_LEAGUE_ID } from "@/lib/tippa-store";
import { League, LeagueMember } from "@/lib/tippa-types";
import { Trophy, Plus, Users, Copy, Check, ChevronLeft } from "lucide-react";

export default function LigorPage() {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [newName, setNewName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [joinError, setJoinError] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [members, setMembers] = useState<(LeagueMember & { name: string })[]>([]);
  const [loadingLeagues, setLoadingLeagues] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoadingLeagues(true);
    getUserLeagues(user.id).then((l) => {
      setLeagues(l);
      setLoadingLeagues(false);
    });
  }, [user]);

  useEffect(() => {
    if (!selectedLeague) return;
    setLoadingMembers(true);
    getLeagueMembers(selectedLeague.id).then((m) => {
      setMembers(m);
      setLoadingMembers(false);
    });
  }, [selectedLeague]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !newName.trim()) return;
    const league = await createLeague(newName.trim(), user.id);
    const updated = await getUserLeagues(user.id);
    setLeagues(updated);
    setNewName("");
    setSelectedLeague(league);
  }

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !inviteCode.trim()) return;
    setJoinError("");
    try {
      await joinLeague(inviteCode.trim(), user.id);
      const updated = await getUserLeagues(user.id);
      setLeagues(updated);
      setInviteCode("");
    } catch (err: unknown) {
      setJoinError(err instanceof Error ? err.message : "Ogiltig kod");
    }
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  if (loading) {
    return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><p className="text-gray-400">Laddar...</p></div>;
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Trophy className="text-[#f5c518] mx-auto mb-4" size={48} />
        <h1 className="text-3xl font-black text-white mb-3">Mina ligor</h1>
        <p className="text-gray-400 mb-6">Logga in för att skapa och gå med i ligor.</p>
        <button onClick={() => setShowAuth(true)} className="bg-[#f5c518] text-[#0a1628] font-black px-8 py-3 rounded-full">Logga in</button>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    );
  }

  if (selectedLeague) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <button onClick={() => setSelectedLeague(null)} className="text-gray-400 hover:text-[#f5c518] text-sm font-medium mb-8 flex items-center gap-1"><ChevronLeft size={14} /> Tillbaka</button>
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white">{selectedLeague.name}</h1>
          <p className="text-gray-400 text-sm mt-1">{members.length} deltagare</p>
        </div>
        {selectedLeague.id !== GLOBAL_LEAGUE_ID && (
          <div className="bg-white/5 border border-[#f5c518]/20 rounded-xl p-4 mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Inbjudningskod – dela med dina vänner</p>
              <p className="font-black text-[#f5c518] text-2xl tracking-widest">{selectedLeague.inviteCode}</p>
            </div>
            <button onClick={() => copyCode(selectedLeague.inviteCode)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-colors">
              {copiedCode === selectedLeague.inviteCode ? <><Check size={14} /> Kopierad</> : <><Copy size={14} /> Kopiera</>}
            </button>
          </div>
        )}
        {selectedLeague.id === GLOBAL_LEAGUE_ID && (
          <div className="bg-[#f5c518]/10 border border-[#f5c518]/20 rounded-xl p-4 mb-8 text-sm text-gray-300">
            Alla registrerade användare tävlar automatiskt i den globala ligan. Tippa matcher för att klättra på listan!
          </div>
        )}
        <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2"><Users size={18} className="text-[#f5c518]" /> Tabell</h2>
        {loadingMembers ? (
          <p className="text-gray-400 text-sm">Laddar...</p>
        ) : (
          <div className="space-y-2">
            {members.length === 0 && <p className="text-gray-500 text-sm">Inga poäng ännu – matcherna har inte spelats.</p>}
            {members.map((m, i) => (
              <div key={m.userId} className={`flex items-center gap-4 p-4 rounded-xl border ${m.userId === user.id ? "bg-[#f5c518]/10 border-[#f5c518]/30" : "bg-white/5 border-white/10"}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${i === 0 ? "bg-[#f5c518] text-[#0a1628]" : "bg-white/10 text-gray-300"}`}>{i + 1}</span>
                <span className="flex-1 font-semibold text-white">{m.name}{m.userId === user.id && <span className="text-xs text-[#f5c518] ml-2">(du)</span>}</span>
                <span className="font-black text-[#f5c518] text-lg">{m.totalPoints}p</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white mb-1">Mina <span className="text-[#f5c518]">ligor</span></h1>
        <p className="text-gray-400">Tävla mot dina vänner om vem som tippar bäst.</p>
      </div>
      {loadingLeagues ? (
        <p className="text-gray-400 text-sm mb-10">Laddar ligor...</p>
      ) : leagues.length > 0 && (
        <div className="mb-10">
          <h2 className="font-bold text-white mb-3">Dina ligor</h2>
          <div className="space-y-3">
            {leagues.map(l => {
              const isGlobal = l.id === GLOBAL_LEAGUE_ID;
              return (
                <button key={l.id} onClick={() => setSelectedLeague(l)} className={`w-full flex items-center justify-between hover:bg-white/10 border hover:border-[#f5c518]/30 rounded-xl p-4 transition-all ${isGlobal ? "bg-[#f5c518]/5 border-[#f5c518]/20" : "bg-white/5 border-white/10"}`}>
                  <div className="flex items-center gap-3">
                    <Trophy size={18} className="text-[#f5c518]" />
                    <span className="font-semibold text-white">{l.name}</span>
                    {isGlobal && <span className="text-[10px] font-bold bg-[#f5c518] text-[#0a1628] px-1.5 py-0.5 rounded-full">ALLA</span>}
                  </div>
                  <span className="text-gray-400 text-sm">Se tabell →</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="font-bold text-white mb-1 flex items-center gap-2"><Plus size={16} className="text-[#f5c518]" /> Skapa liga</h2>
          <p className="text-gray-400 text-xs mb-4">Skapa en ny liga och bjud in dina vänner</p>
          <form onSubmit={handleCreate} className="space-y-3">
            <input required value={newName} onChange={e => setNewName(e.target.value)} placeholder="Ligans namn" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#f5c518]/50" />
            <button type="submit" className="w-full bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-bold py-2.5 rounded-full text-sm transition-colors">Skapa liga</button>
          </form>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="font-bold text-white mb-1 flex items-center gap-2"><Users size={16} className="text-[#f5c518]" /> Gå med i liga</h2>
          <p className="text-gray-400 text-xs mb-4">Ange inbjudningskoden du fick av en kompis</p>
          <form onSubmit={handleJoin} className="space-y-3">
            <input required value={inviteCode} onChange={e => setInviteCode(e.target.value.toUpperCase())} placeholder="T.EX. AB12CD" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono tracking-widest focus:outline-none focus:border-[#f5c518]/50 uppercase" maxLength={6} />
            {joinError && <p className="text-red-400 text-xs">{joinError}</p>}
            <button type="submit" className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 rounded-full text-sm transition-colors">Gå med</button>
          </form>
        </div>
      </div>
    </div>
  );
}
