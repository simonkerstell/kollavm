"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AuthModal({ onClose, initialMode = "login" }: { onClose: () => void; initialMode?: "login" | "register" }) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailConsent, setEmailConsent] = useState(true);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "register") {
      // Check if username is taken
      const { data: taken } = await supabase.rpc("is_username_taken", { username: name.trim() });
      if (taken) {
        setError("Användarnamnet är redan taget, välj ett annat.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name: name.trim(), email_reminders: emailConsent } },
      });
      if (error) {
        setError(error.message);
      } else {
        onClose();
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message === "Invalid login credentials" ? "Fel e-post eller lösenord" : error.message);
      } else {
        onClose();
      }
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-[#0d1f3c] border border-[#f5c518]/20 rounded-2xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
        <h2 className="text-2xl font-black text-white mb-1">{mode === "register" ? "Skapa konto" : "Logga in"}</h2>
        <p className="text-gray-400 text-sm mb-6">{mode === "register" ? "Registrera dig för att tippa och tävla" : "Välkommen tillbaka!"}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Namn</label>
              <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#f5c518]/50" placeholder="Ditt namn" />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-400 mb-1">E-post</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#f5c518]/50" placeholder="din@email.se" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Lösenord</label>
            <input required type="password" minLength={6} value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#f5c518]/50" placeholder="••••••••" />
          </div>
          {mode === "register" && (
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailConsent}
                onChange={e => setEmailConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-[#f5c518] focus:ring-[#f5c518]/50 cursor-pointer"
              />
              <span className="text-xs text-gray-400 leading-relaxed">
                Ja, skicka mig en påminnelse via e-post dagen innan VM startar så jag inte missar att tippa.
              </span>
            </label>
          )}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-black py-3 rounded-full transition-colors disabled:opacity-50">
            {loading ? "Laddar..." : mode === "register" ? "Skapa konto" : "Logga in"}
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-4">
          {mode === "register" ? "Har du redan ett konto?" : "Inget konto?"}{" "}
          <button onClick={() => { setMode(mode === "register" ? "login" : "register"); setError(""); }} className="text-[#f5c518] font-semibold hover:underline">
            {mode === "register" ? "Logga in" : "Registrera dig"}
          </button>
        </p>
      </div>
    </div>
  );
}
