export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Prediction {
  userId: string;
  matchId: string; // "GroupId-matchIndex" e.g. "A-0"
  homeGoals: number;
  awayGoals: number;
  points?: number; // set after match is played
}

export interface League {
  id: string;
  name: string;
  inviteCode: string;
  adminId: string;
  createdAt: string;
}

export interface LeagueMember {
  leagueId: string;
  userId: string;
  totalPoints: number;
}

export type MatchOutcome = "home" | "draw" | "away";

export function getOutcome(home: number, away: number): MatchOutcome {
  if (home > away) return "home";
  if (home < away) return "away";
  return "draw";
}

export function calcPoints(
  pred: { homeGoals: number; awayGoals: number },
  actual: { homeGoals: number; awayGoals: number }
): number {
  if (pred.homeGoals === actual.homeGoals && pred.awayGoals === actual.awayGoals) return 3;
  if (getOutcome(pred.homeGoals, pred.awayGoals) === getOutcome(actual.homeGoals, actual.awayGoals)) return 1;
  return 0;
}
