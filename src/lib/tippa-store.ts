"use client";
import { User, Prediction, League, LeagueMember, Comment } from "./tippa-types";
import { v4 as uuidv4 } from "uuid";

function get<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(key) ?? "[]"); } catch { return []; }
}
function set<T>(key: string, data: T[]) {
  if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(data));
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem("kollavm_user") ?? "null"); } catch { return null; }
}
export function setCurrentUser(user: User | null) {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem("kollavm_user", JSON.stringify(user));
  else localStorage.removeItem("kollavm_user");
}
export function register(name: string, email: string, password: string): User {
  const users = get<User & { password: string }>("kollavm_users");
  if (users.find(u => u.email === email)) throw new Error("E-postadressen används redan");
  const user: User = { id: uuidv4(), name, email, createdAt: new Date().toISOString() };
  set("kollavm_users", [...users, { ...user, password }]);
  setCurrentUser(user);
  return user;
}
export function login(email: string, password: string): User {
  const users = get<User & { password: string }>("kollavm_users");
  const found = users.find(u => u.email === email && u.password === password);
  if (!found) throw new Error("Fel e-post eller lösenord");
  const user: User = { id: found.id, name: found.name, email: found.email, createdAt: found.createdAt };
  setCurrentUser(user);
  return user;
}
export function logout() { setCurrentUser(null); }

export function savePrediction(pred: Prediction) {
  const all = get<Prediction>("kollavm_predictions");
  const filtered = all.filter(p => !(p.userId === pred.userId && p.matchId === pred.matchId));
  set("kollavm_predictions", [...filtered, pred]);
}
export function getPrediction(userId: string, matchId: string): Prediction | undefined {
  return get<Prediction>("kollavm_predictions").find(p => p.userId === userId && p.matchId === matchId);
}
export function getAllPredictions(): Prediction[] {
  return get<Prediction>("kollavm_predictions");
}

export const GLOBAL_LEAGUE: League = {
  id: "global",
  name: "KollaVM Global",
  inviteCode: "GLOBAL",
  adminId: "system",
  createdAt: "2026-01-01T00:00:00.000Z",
};

export function ensureGlobalLeague(userId: string) {
  const leagues = get<League>("kollavm_leagues");
  if (!leagues.find(l => l.id === GLOBAL_LEAGUE.id)) {
    set("kollavm_leagues", [...leagues, GLOBAL_LEAGUE]);
  }
  const members = get<LeagueMember>("kollavm_league_members");
  if (!members.find(m => m.leagueId === GLOBAL_LEAGUE.id && m.userId === userId)) {
    set("kollavm_league_members", [...members, { leagueId: GLOBAL_LEAGUE.id, userId, totalPoints: 0 }]);
  }
}

export function createLeague(name: string, adminId: string): League {
  const leagues = get<League>("kollavm_leagues");
  const league: League = {
    id: uuidv4(),
    name,
    inviteCode: Math.random().toString(36).slice(2, 8).toUpperCase(),
    adminId,
    createdAt: new Date().toISOString(),
  };
  set("kollavm_leagues", [...leagues, league]);
  joinLeague(league.inviteCode, adminId);
  return league;
}
export function joinLeague(inviteCode: string, userId: string): League {
  const leagues = get<League>("kollavm_leagues");
  const league = leagues.find(l => l.inviteCode === inviteCode.toUpperCase());
  if (!league) throw new Error("Ogiltig inbjudningskod");
  const members = get<LeagueMember>("kollavm_league_members");
  if (!members.find(m => m.leagueId === league.id && m.userId === userId)) {
    set("kollavm_league_members", [...members, { leagueId: league.id, userId, totalPoints: 0 }]);
  }
  return league;
}
export function getUserLeagues(userId: string): League[] {
  const members = get<LeagueMember>("kollavm_league_members").filter(m => m.userId === userId);
  const leagues = get<League>("kollavm_leagues");
  return leagues.filter(l => members.find(m => m.leagueId === l.id));
}
export function getLeagueMembers(leagueId: string): (LeagueMember & { name: string })[] {
  const members = get<LeagueMember>("kollavm_league_members").filter(m => m.leagueId === leagueId);
  const users = get<User & { password: string }>("kollavm_users");
  const preds = get<Prediction>("kollavm_predictions");
  return members.map(m => {
    const user = users.find(u => u.id === m.userId);
    const points = preds.filter(p => p.userId === m.userId && p.points !== undefined).reduce((sum, p) => sum + (p.points ?? 0), 0);
    return { ...m, totalPoints: points, name: user?.name ?? "Okänd" };
  }).sort((a, b) => b.totalPoints - a.totalPoints);
}

// Comments
export function addComment(comment: Comment) {
  const all = get<Comment>("kollavm_comments");
  set("kollavm_comments", [...all, comment]);
}
export function getComments(matchId: string): Comment[] {
  return get<Comment>("kollavm_comments")
    .filter(c => c.matchId === matchId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}
export function deleteComment(commentId: string) {
  const all = get<Comment>("kollavm_comments");
  set("kollavm_comments", all.filter(c => c.id !== commentId));
}
