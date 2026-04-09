"use client";
import { useState, useEffect } from "react";
import { X, Pencil, ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AvatarConfig, DEFAULT_AVATAR } from "@/lib/tippa-types";
import { getAvatar, getUserPredictions, getUserGroupPredictions, getUserBracketPredictions } from "@/lib/tippa-store";
import Avatar from "./Avatar";
import AvatarBuilder from "./AvatarBuilder";

export default function ProfileModal({ onClose, onAvatarChange }: { onClose: () => void; onAvatarChange: (config: AvatarConfig) => void }) {
  const { user } = useAuth();
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [editing, setEditing] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [tipsCount, setTipsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      getAvatar(user.id),
      getUserPredictions(user.id),
      getUserGroupPredictions(user.id),
      getUserBracketPredictions(user.id),
    ]).then(([avatar, preds, groupPreds, bracketPicks]) => {
      setAvatarConfig(avatar);
      const matchPoints = preds.reduce((sum, p) => sum + (p.points ?? 0), 0);
      const groupPoints = groupPreds.reduce((sum, p) => sum + (p.points ?? 0), 0);
      setTotalPoints(matchPoints + groupPoints);
      setTipsCount(preds.length + groupPreds.length + Object.keys(bracketPicks).length);
      setLoading(false);
    });
  }, [user]);

  function handleAvatarSaved(config: AvatarConfig) {
    setAvatarConfig(config);
    onAvatarChange(config);
    setEditing(false);
  }

  if (!user) return null;

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

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-[#f5c518] font-black text-2xl">{totalPoints}</p>
                    <p className="text-gray-400 text-xs mt-1">Poäng</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-white font-black text-2xl">{tipsCount}</p>
                    <p className="text-gray-400 text-xs mt-1">Tips lagda</p>
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
