"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { addComment, getComments, deleteComment } from "@/lib/tippa-store";
import { isOffensive } from "@/lib/content-filter";
import { v4 as uuidv4 } from "uuid";
import { MessageCircle, Send, Trash2 } from "lucide-react";
import { Comment } from "@/lib/tippa-types";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just nu";
  if (mins < 60) return `${mins} min sedan`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h sedan`;
  const days = Math.floor(hours / 24);
  return `${days}d sedan`;
}

export default function MatchComments({ matchId }: { matchId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      getComments(matchId).then(c => {
        setComments(c);
        setLoading(false);
      });
    }
  }, [matchId, open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !text.trim()) return;
    setError("");

    if (isOffensive(text)) {
      setError("Kommentaren innehåller otillåtet språk och kan inte publiceras.");
      return;
    }

    const comment: Comment = {
      id: uuidv4(),
      matchId,
      userId: user.id,
      userName: user.name,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      await addComment(comment);
      setComments(prev => [...prev, comment]);
      setText("");
    } catch {
      setError("Kunde inte spara kommentaren.");
    }
  }

  async function handleDelete(id: string) {
    await deleteComment(id);
    setComments(prev => prev.filter(c => c.id !== id));
  }

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#f5c518] transition-colors"
      >
        <MessageCircle size={13} />
        <span>{comments.length > 0 ? `${comments.length} kommentarer` : "Kommentera"}</span>
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          {loading ? (
            <p className="text-gray-500 text-xs">Laddar kommentarer...</p>
          ) : comments.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {comments.map((c) => (
                <div key={c.id} className="bg-white/5 rounded-lg px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">{c.userName}</span>
                      <span className="text-[10px] text-gray-600">{timeAgo(c.createdAt)}</span>
                    </div>
                    {user && c.userId === user.id && (
                      <button onClick={() => handleDelete(c.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-300 mt-1">{c.text}</p>
                </div>
              ))}
            </div>
          )}

          {user ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Skriv en kommentar..."
                maxLength={280}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#f5c518]/50"
              />
              <button
                type="submit"
                disabled={!text.trim()}
                className="bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] p-2 rounded-lg transition-colors disabled:opacity-30"
              >
                <Send size={14} />
              </button>
            </form>
          ) : (
            <p className="text-xs text-gray-600">Logga in för att kommentera</p>
          )}
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
      )}
    </div>
  );
}
