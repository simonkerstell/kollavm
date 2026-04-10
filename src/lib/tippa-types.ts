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

export interface Comment {
  id: string;
  matchId: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

export interface GroupPrediction {
  userId: string;
  groupId: string;
  firstPlace: string;
  secondPlace: string;
  points?: number;
}

export interface BracketMatch {
  id: string;        // "m73" - "m103"
  round: "r32" | "r16" | "qf" | "sf" | "final";
  homeLabel: string;  // e.g. "Etta A" or "Vinnare M73"
  awayLabel: string;
  homeSource?: { matchId: string } | { groupPos: string };
  awaySource?: { matchId: string } | { groupPos: string };
  nextMatchId?: string;
  nextSlot?: "home" | "away";
}

export interface AvatarConfig {
  skinTone: string;
  hairStyle: "short" | "curly" | "long" | "bald" | "mohawk";
  hairColor: string;
  jerseyColor: string;
  accessory: "none" | "sunglasses" | "cap" | "headband";
}

export const DEFAULT_AVATAR: AvatarConfig = {
  skinTone: "#F5D0A9",
  hairStyle: "short",
  hairColor: "#3B2F2F",
  jerseyColor: "#F5C518",
  accessory: "none",
};

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  earned: boolean;
}

export interface QuizResult {
  userId: string;
  score: number;
  totalQuestions: number;
  createdAt: string;
}

export interface SpecialPrediction {
  userId: string;
  type: "golden_boot" | "mvp";
  playerName: string;
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
