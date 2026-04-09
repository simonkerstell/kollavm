"use client";

import { useState } from "react";
import { groups, Group } from "@/data/groups";
import { Calendar, MapPin, ChevronLeft } from "lucide-react";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

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

function MatchRow({ match }: { match: Group["matches"][0] }) {
  const channelStyle = match.channel === "SVT"
    ? "bg-blue-600 text-white"
    : "bg-red-600 text-white";

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#f5c518]/20 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={12} />
          <span className="capitalize">{formatDate(match.date)}</span>
          <span>·</span>
          <span>{match.time}</span>
          <span>·</span>
          <MapPin size={12} />
          <span className="truncate">{match.venue}</span>
        </div>
        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0 ml-2 ${channelStyle}`}>
          {match.channel}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-end gap-2">
          <span className="font-bold text-white text-sm sm:text-base">{match.home}</span>
          <span className="text-lg">
            {groups.flatMap(g => g.teams).find(t => t.name === match.home)?.flag ?? ""}
          </span>
        </div>
        <div className="shrink-0 px-3">
          <span className="text-gray-500 font-bold text-sm">vs</span>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <span className="text-lg">
            {groups.flatMap(g => g.teams).find(t => t.name === match.away)?.flag ?? ""}
          </span>
          <span className="font-bold text-white text-sm sm:text-base">{match.away}</span>
        </div>
      </div>
    </div>
  );
}

function GroupDetail({ group, onBack }: { group: Group; onBack: () => void }) {
  // Group matches by date
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

      {/* Teams */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {group.teams.map((team) => (
          <div
            key={team.name}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
          >
            <span className="text-4xl block mb-2">{team.flag}</span>
            <span className="text-white font-semibold text-sm">{team.name}</span>
          </div>
        ))}
      </div>

      {/* Matches */}
      <h3 className="text-lg font-bold text-white mb-4">Matcher</h3>
      <div className="space-y-6">
        {Object.entries(byDate).map(([date, matches]) => (
          <div key={date}>
            <p className="text-sm text-[#f5c518] font-semibold capitalize mb-2">{formatDate(date)}</p>
            <div className="space-y-2">
              {matches.map((m, i) => (
                <MatchRow key={i} match={m} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MatcherPage() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!selectedGroup ? (
        <>
          <div className="mb-10">
            <h1 className="text-4xl font-black text-white mb-2">
              Matchschema <span className="text-[#f5c518]">VM 2026</span>
            </h1>
            <p className="text-gray-400">Välj en grupp för att se matcher och lag.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onClick={() => setSelectedGroup(group)}
              />
            ))}
          </div>
        </>
      ) : (
        <GroupDetail group={selectedGroup} onBack={() => setSelectedGroup(null)} />
      )}
    </div>
  );
}
