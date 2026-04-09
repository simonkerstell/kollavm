"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@/lib/tippa-types";
import { supabase } from "@/lib/supabase";
import { ensureGlobalLeague } from "@/lib/tippa-store";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, logout: async () => {} });

function mapUser(supaUser: { id: string; email?: string; user_metadata?: Record<string, string>; created_at?: string }): User {
  return {
    id: supaUser.id,
    name: supaUser.user_metadata?.name ?? supaUser.email?.split("@")[0] ?? "Användare",
    email: supaUser.email ?? "",
    createdAt: supaUser.created_at ?? new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const mapped = session?.user ? mapUser(session.user) : null;
      setUser(mapped);
      if (mapped) ensureGlobalLeague(mapped.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const mapped = session?.user ? mapUser(session.user) : null;
      setUser(mapped);
      if (mapped) ensureGlobalLeague(mapped.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
