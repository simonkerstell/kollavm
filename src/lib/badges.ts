import { Badge, Prediction, GroupPrediction, QuizResult } from "./tippa-types";
import { League } from "./tippa-types";

interface BadgeData {
  predictions: Prediction[];
  groupPredictions: GroupPrediction[];
  bracketPickCount: number;
  leagues: League[];
  hasAvatar: boolean;
  quizResults: QuizResult[];
}

const BADGE_DEFS: { id: string; name: string; emoji: string; description: string; check: (d: BadgeData) => boolean }[] = [
  {
    id: "first_tip",
    name: "Nykomling",
    emoji: "🌟",
    description: "Lade ditt allra första tips",
    check: (d) => d.predictions.length >= 1,
  },
  {
    id: "tippa_10",
    name: "Tipsaren",
    emoji: "🎯",
    description: "Tippade 10 matcher",
    check: (d) => d.predictions.length >= 10,
  },
  {
    id: "all_group_matches",
    name: "Gruppspelsmästaren",
    emoji: "📋",
    description: "Tippade alla 72 gruppspelsmatcher",
    check: (d) => d.predictions.length >= 72,
  },
  {
    id: "all_groups_tipped",
    name: "Gruppspanaren",
    emoji: "🔮",
    description: "Tippade etta och tvåa i alla 12 grupper",
    check: (d) => d.groupPredictions.length >= 12,
  },
  {
    id: "bracket_complete",
    name: "Slutspelsstrategen",
    emoji: "🏆",
    description: "Fyllde i hela slutspelsträdet",
    check: (d) => d.bracketPickCount >= 31,
  },
  {
    id: "perfect_match",
    name: "Spikaren",
    emoji: "⚽",
    description: "Fick exakt rätt resultat på en match",
    check: (d) => d.predictions.some(p => p.points === 3),
  },
  {
    id: "five_perfect",
    name: "Skarpskyttaren",
    emoji: "🎖️",
    description: "Fick exakt rätt på 5 matcher",
    check: (d) => d.predictions.filter(p => p.points === 3).length >= 5,
  },
  {
    id: "league_creator",
    name: "Ligagrundaren",
    emoji: "👑",
    description: "Skapade en egen liga",
    check: (d) => d.leagues.length > 0,
  },
  {
    id: "avatar_customized",
    name: "Stilikonen",
    emoji: "🎨",
    description: "Anpassade sin avatar",
    check: (d) => d.hasAvatar,
  },
  {
    id: "quiz_perfect",
    name: "VM-experten",
    emoji: "🧠",
    description: "Fick 10 av 10 rätt på VM-quizet",
    check: (d) => d.quizResults.some(r => r.score === 10),
  },
];

export function computeBadges(data: BadgeData): Badge[] {
  return BADGE_DEFS.map(def => ({
    id: def.id,
    name: def.name,
    emoji: def.emoji,
    description: def.description,
    earned: def.check(data),
  }));
}
