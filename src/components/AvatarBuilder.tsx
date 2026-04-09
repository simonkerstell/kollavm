"use client";
import { useState } from "react";
import { AvatarConfig } from "@/lib/tippa-types";
import { SKIN_TONES, HAIR_COLORS, HAIR_STYLES, JERSEY_PRESETS, ACCESSORIES } from "@/lib/avatar-options";
import { saveAvatar } from "@/lib/tippa-store";
import { useAuth } from "@/context/AuthContext";
import Avatar from "./Avatar";
import { Check } from "lucide-react";

export default function AvatarBuilder({ initial, onSaved }: { initial: AvatarConfig; onSaved: (config: AvatarConfig) => void }) {
  const { user } = useAuth();
  const [config, setConfig] = useState<AvatarConfig>(initial);
  const [saving, setSaving] = useState(false);

  function update(partial: Partial<AvatarConfig>) {
    setConfig(prev => ({ ...prev, ...partial }));
  }

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    try {
      await saveAvatar(user.id, config);
      onSaved(config);
    } catch { /* ignore */ }
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="flex justify-center">
        <div className="bg-white/5 rounded-2xl p-6 inline-block">
          <Avatar config={config} size={140} />
        </div>
      </div>

      {/* Skin tone */}
      <div>
        <label className="text-xs text-gray-400 mb-2 block font-semibold uppercase tracking-wider">Hudfärg</label>
        <div className="flex gap-2">
          {SKIN_TONES.map(tone => (
            <button key={tone} onClick={() => update({ skinTone: tone })} className={`w-10 h-10 rounded-full border-2 transition-all ${config.skinTone === tone ? "border-[#f5c518] scale-110" : "border-transparent hover:border-white/30"}`} style={{ backgroundColor: tone }} />
          ))}
        </div>
      </div>

      {/* Hair style */}
      <div>
        <label className="text-xs text-gray-400 mb-2 block font-semibold uppercase tracking-wider">Frisyr</label>
        <div className="flex flex-wrap gap-2">
          {HAIR_STYLES.map(style => (
            <button key={style.id} onClick={() => update({ hairStyle: style.id })} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${config.hairStyle === style.id ? "bg-[#f5c518] text-[#0a1628] font-bold" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}>
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hair color */}
      {config.hairStyle !== "bald" && (
        <div>
          <label className="text-xs text-gray-400 mb-2 block font-semibold uppercase tracking-wider">Hårfärg</label>
          <div className="flex gap-2">
            {HAIR_COLORS.map(color => (
              <button key={color} onClick={() => update({ hairColor: color })} className={`w-10 h-10 rounded-full border-2 transition-all ${config.hairColor === color ? "border-[#f5c518] scale-110" : "border-transparent hover:border-white/30"}`} style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
      )}

      {/* Jersey color */}
      <div>
        <label className="text-xs text-gray-400 mb-2 block font-semibold uppercase tracking-wider">Tröjfärg</label>
        <div className="flex flex-wrap gap-2">
          {JERSEY_PRESETS.map(preset => (
            <button key={preset.country} onClick={() => update({ jerseyColor: preset.color })} className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all ${config.jerseyColor === preset.color ? "bg-[#f5c518] text-[#0a1628] font-bold" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}>
              <span>{preset.flag}</span>
              <span>{preset.country}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accessories */}
      <div>
        <label className="text-xs text-gray-400 mb-2 block font-semibold uppercase tracking-wider">Accessoar</label>
        <div className="flex flex-wrap gap-2">
          {ACCESSORIES.map(acc => (
            <button key={acc.id} onClick={() => update({ accessory: acc.id })} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${config.accessory === acc.id ? "bg-[#f5c518] text-[#0a1628] font-bold" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}>
              {acc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Save */}
      <button onClick={handleSave} disabled={saving} className="w-full bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-black py-3 rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
        {saving ? "Sparar..." : <><Check size={18} /> Spara avatar</>}
      </button>
    </div>
  );
}
