"use client";
import { useState, useEffect } from "react";
import { X, Pencil, ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AvatarConfig, DEFAULT_AVATAR, Badge } from "@/lib/tippa-types";
import { getAvatar, getUserPredictions, getUserGroupPredictions, getUserBracketPredictions, getUserLeagues, getUserQuizResults } from "@/lib/tippa-store";
import { computeBadges } from "@/lib/badges";
import Avatar from "./Avatar";
import AvatarBuilder from "./AvatarBuilder";

export default function ProfileModal({ onClose, onAvatarChange }: { onClose: () => void; onAvatarChange: (config: AvatarConfig) => void }) {
  const { user } = useAuth();
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [editing, setEditing] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [tipsCount, setTipsCount] = useState(0);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      getAvatar(user.id),
      getUserPredictions(user.id),
      getUserGroupPredictions(user.id),
      getUserBracketPredictions(user.id),
      getUserLeagues(user.id),
      getUserQuizResults(user.id),
    ]).then(([avatar, preds, groupPreds, bracketPicks, leagues, quizResults]) => {
      setAvatarConfig(avatar);
      const matchPoints = preds.reduce((sum, p) => sum + (p.points ?? 0), 0);
      const groupPoints = groupPreds.reduce((sum, p) => sum + (p.points ?? 0), 0);
      setTotalPoints(matchPoints + groupPoints);
      setTipsCount(preds.length + groupPreds.length + Object.keys(bracketPicks).length);

      const computed = computeBadges({
        predictions: preds,
        groupPredictions: groupPreds,
        bracketPickCount: Object.keys(bracketPicks).length,
        leagues,
        hasAvatar: avatar !== DEFAULT_AVATAR,
        quizResults,
      });
      setBadges(computed);
      setLoading(false);
    });
  }, [user]);

  function handleAvatarSaved(config: AvatarConfig) {
    setAvatarConfig(config);
    onAvatarChange(config);
    setEditing(false);
  }

  if (!user) return null;

  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={onClose}>
      <div className="bg-[#0d1f3c] border border-[#f5c518]/20 rounded-2xl p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>

        {editing ? (
          <>
            <button onClick={() => setEditing(false)} className="flex items-center gap-1 text-gray-400 hover:text-[#f5c518] text-sm font-medium mb-4">
              <ChevronLeft size={14} /> Tillbaka
            </button>
            <h2 className="text-2xl font-black text-white mb-6">Redigera avatar</h2>
            <AvatarBuilder initial={avatarConfig} onSaved={handleAvatarSaved} />
          </>
        ) : (
          <>
            {loading ? (
              <div className="text-center py-10"><p className="text-gray-400">Laddar...</p></div>
            ) : (
              <>
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <Avatar config={avatarConfig} size={120} />
                    <button
                      onClick={() => setEditing(true)}
                      className="absolute -bottom-1 -right-1 bg-[#f5c518] text-[#0a1628] p-1.5 rounded-full hover:bg-[#d4a017] transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                  </div>
                  <h2 className="text-2xl font-black text-white">{user.name}</h2>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <p className="text-[#f5c518] font-black text-xl">{totalPoints}</p>
                    <p className="text-gray-400 text-[10px] mt-0.5">Poäng</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <p className="text-white font-black text-xl">{tipsCount}</p>
                    <p className="text-gray-400 text-[10px] mt-0.5">Tips</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <p className="text-white font-black text-xl">{earnedCount}/{badges.length}</p>
                    <p className="text-gray-400 text-[10px] mt-0.5">Utmärkelser</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="mb-6">
                  <h3 className="font-bold text-white text-sm mb-3">Utmärkelser</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {badges.map(badge => (
                      <div
                        key={badge.id}
                        className={`relative group flex flex-col items-center p-2 rounded-xl transition-all ${badge.earned ? "bg-[#f5c518]/10 border border-[#f5c518]/30" : "bg-white/5 border border-white/10 opacity-40"}`}
                      >
                        <span className="text-2xl">{badge.emoji}</span>
                        <span className={`text-[9px] font-semibold mt-1 text-center leading-tight ${badge.earned ? "text-white" : "text-gray-500"}`}>{badge.name}</span>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                          <div className="bg-[#0a1628] border border-white/20 rounded-lg px-3 py-2 text-xs text-gray-300 whitespace-nowrap shadow-xl">
                            {badge.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setEditing(true)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-full text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Pencil size={16} /> Redigera avatar
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
