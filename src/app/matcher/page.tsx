"use client";

import { useState, useMemo } from "react";
import { groups, Group } from "@/data/groups";
import { Calendar, MapPin, ChevronLeft } from "lucide-react";
import MatchComments from "@/components/MatchComments";

const allTeams = groups.flatMap(g => g.teams);
function getFlag(name: string) {
  return allTeams.find(t => t.name === name)?.flag ?? "";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function formatDateShort(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "short",
  });
}

type Tab = "kronologiskt" | "grupper";

// --- Match Row (used in both views) ---

function MatchRow({ match, matchId, showGroup }: { match: Group["matches"][0]; matchId: string; showGroup?: string }) {
  const channelStyle = match.channel === "SVT"
    ? "bg-blue-600 text-white"
    : "bg-red-600 text-white";

  const isSwedenMatch = match.home === "Sverige" || match.away === "Sverige";

  return (
    <div className={`border rounded-xl p-4 transition-all ${isSwedenMatch ? "bg-[#f5c518]/10 border-[#f5c518]/30" : "bg-white/5 border-white/10 hover:border-[#f5c518]/20"}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {showGroup && (
            <span className="bg-[#f5c518]/10 text-[#f5c518] font-bold px-2 py-0.5 rounded-full text-[10px]">
              Grupp {showGroup}
            </span>
          )}
          <Calendar size={12} />
          <span>{match.time}</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:flex items-center gap-1"><MapPin size={12} />{match.venue}</span>
        </div>
        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0 ml-2 ${channelStyle}`}>
          {match.channel}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-end gap-2">
          <span className={`font-bold text-sm sm:text-base ${match.home === "Sverige" ? "text-[#f5c518]" : "text-white"}`}>{match.home}</span>
          <span className="text-lg">{getFlag(match.home)}</span>
        </div>
        <div className="shrink-0 px-3">
          <span className="text-gray-500 font-bold text-sm">vs</span>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <span className="text-lg">{getFlag(match.away)}</span>
          <span className={`font-bold text-sm sm:text-base ${match.away === "Sverige" ? "text-[#f5c518]" : "text-white"}`}>{match.away}</span>
        </div>
      </div>
      <MatchComments matchId={matchId} />
    </div>
  );
}

// --- Group Card ---

function GroupCard({ group, onClick }: { group: Group; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white/5 hover:bg-[#f5c518]/5 border border-white/10 hover:border-[#f5c518]/40 rounded-2xl p-6 transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-[#f5c518] text-[#0a1628] font-black text-lg flex items-center justify-center">
            {group.id}
          </span>
          <span className="text-white font-bold text-lg group-hover:text-[#f5c518] transition-colors">
            Grupp {group.id}
          </span>
        </div>
        <span className="text-gray-500 text-sm group-hover:text-[#f5c518] transition-colors">
          Se matcher →
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {group.teams.map((team) => (
          <div key={team.name} className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-base">{team.flag}</span>
            <span>{team.name}</span>
          </div>
        ))}
      </div>
    </button>
  );
}

// --- Group Detail ---

function GroupDetail({ group, onBack }: { group: Group; onBack: () => void }) {
  const byDate: Record<string, typeof group.matches> = {};
  for (const match of group.matches) {
    if (!byDate[match.date]) byDate[match.date] = [];
    byDate[match.date].push(match);
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-[#f5c518] transition-colors mb-8 text-sm font-medium"
      >
        <ChevronLeft size={16} />
        Tillbaka till alla grupper
      </button>

      <div className="flex items-center gap-4 mb-8">
        <span className="w-14 h-14 rounded-full bg-[#f5c518] text-[#0a1628] font-black text-2xl flex items-center justify-center">
          {group.id}
        </span>
        <div>
          <h2 className="text-3xl font-black text-white">Grupp {group.id}</h2>
          <p className="text-gray-400 text-sm mt-0.5">{group.teams.length} lag · {group.matches.length} matcher</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {group.teams.map((team) => (
          <div key={team.name} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <span className="text-4xl block mb-2">{team.flag}</span>
            <span className="text-white font-semibold text-sm">{team.name}</span>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-bold text-white mb-4">Matcher</h3>
      <div className="space-y-6">
        {Object.entries(byDate).map(([date, matches]) => (
          <div key={date}>
            <p className="text-sm text-[#f5c518] font-semibold capitalize mb-2">{formatDate(date)}</p>
            <div className="space-y-2">
              {matches.map((m, i) => (
                <MatchRow key={i} match={m} matchId={`${group.id}-${m.home}-${m.away}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Chronological View ---

function ChronologicalView({ filter }: { filter: string }) {
  const allMatches = useMemo(() => {
    return groups.flatMap(g =>
      g.matches.map((m, i) => ({
        ...m,
        groupId: g.id,
        matchId: `${g.id}-${m.home}-${m.away}`,
        sortKey: `${m.date}T${m.time}`,
      }))
    ).sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  }, []);

  const filtered = useMemo(() => {
    if (filter === "alla") return allMatches;
    if (filter === "sverige") return allMatches.filter(m => m.home === "Sverige" || m.away === "Sverige");
    if (filter === "svt") return allMatches.filter(m => m.channel === "SVT");
    if (filter === "tv4") return allMatches.filter(m => m.channel === "TV4");
    return allMatches;
  }, [allMatches, filter]);

  // Group by date
  const byDate: Record<string, typeof filtered> = {};
  for (const match of filtered) {
    if (!byDate[match.date]) byDate[match.date] = [];
    byDate[match.date].push(match);
  }

  const dates = Object.keys(byDate).sort();

  if (filtered.length === 0) {
    return <p className="text-gray-500 text-center py-10">Inga matcher matchar filtret.</p>;
  }

  return (
    <div className="space-y-8">
      {dates.map(date => (
        <div key={date}>
          <div className="sticky top-16 z-10 bg-[#0a1628]/95 backdrop-blur py-2 mb-3">
            <div className="flex items-center gap-3">
              <span className="bg-[#f5c518] text-[#0a1628] font-black text-sm px-3 py-1 rounded-full">
                {formatDateShort(date)}
              </span>
              <span className="text-gray-400 text-sm capitalize">{formatDate(date)}</span>
              <span className="text-gray-600 text-xs">{byDate[date].length} matcher</span>
            </div>
          </div>
          <div className="space-y-2">
            {byDate[date].map((m) => (
              <MatchRow key={m.matchId} match={m} matchId={m.matchId} showGroup={m.groupId} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Main Page ---

export default function MatcherPage() {
  const [tab, setTab] = useState<Tab>("kronologiskt");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [filter, setFilter] = useState("alla");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2">
          Matchschema <span className="text-[#f5c518]">VM 2026</span>
        </h1>
        <p className="text-gray-400">Alla 72 gruppspelsmatcher med datum, tider och kanaler.</p>
      </div>

      {/* Tabs */}
      {!selectedGroup && (
        <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-6">
          <button
            onClick={() => setTab("kronologiskt")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === "kronologiskt" ? "bg-[#f5c518] text-[#0a1628]" : "text-gray-400 hover:text-white"}`}
          >
            📅 Kronologiskt
          </button>
          <button
            onClick={() => setTab("grupper")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === "grupper" ? "bg-[#f5c518] text-[#0a1628]" : "text-gray-400 hover:text-white"}`}
          >
            🏆 Per grupp
          </button>
        </div>
      )}

      {/* Chronological view */}
      {tab === "kronologiskt" && !selectedGroup && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: "alla", label: "Alla matcher" },
              { key: "sverige", label: "🇸🇪 Sverige" },
              { key: "svt", label: "SVT" },
              { key: "tv4", label: "TV4" },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f.key ? "bg-[#f5c518] text-[#0a1628] font-bold" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <ChronologicalView filter={filter} />
        </>
      )}

      {/* Group view */}
      {tab === "grupper" && !selectedGroup && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onClick={() => setSelectedGroup(group)}
            />
          ))}
        </div>
      )}

      {/* Group detail */}
      {selectedGroup && (
        <GroupDetail group={selectedGroup} onBack={() => setSelectedGroup(null)} />
      )}
    </div>
  );
}
