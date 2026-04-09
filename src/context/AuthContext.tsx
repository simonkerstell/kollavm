"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@/lib/tippa-types";
import { getCurrentUser, setCurrentUser } from "@/lib/tippa-store";

interface AuthContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, setUser: () => {}, logout: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  useEffect(() => { setUserState(getCurrentUser()); }, []);
  function setUser(u: User | null) { setCurrentUser(u); setUserState(u); }
  function logout() { setCurrentUser(null); setUserState(null); }
  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
