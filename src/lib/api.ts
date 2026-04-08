const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY;
const BASE_URL = "https://api.football-data.org/v4";

export interface Match {
  id: number;
  utcDate: string;
  status: "SCHEDULED" | "LIVE" | "IN_PLAY" | "PAUSED" | "FINISHED" | "POSTPONED";
  matchday: number;
  stage: string;
  group: string | null;
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  score: {
    winner: string | null;
    fullTime: { home: number | null; away: number | null };
    halfTime: { home: number | null; away: number | null };
  };
}

export interface MatchesResponse {
  matches: Match[];
}

export async function getWorldCupMatches(): Promise<Match[]> {
  if (!API_KEY || API_KEY === "din_nyckel_här") {
    return getMockMatches();
  }

  try {
    const res = await fetch(`${BASE_URL}/competitions/WC/matches?season=2026`, {
      headers: { "X-Auth-Token": API_KEY },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return getMockMatches();
    }

    const data: MatchesResponse = await res.json();
    return data.matches;
  } catch {
    return getMockMatches();
  }
}

function getMockMatches(): Match[] {
  const teams = [
    { id: 1, name: "Sverige", shortName: "Sverige", tla: "SWE", crest: "" },
    { id: 2, name: "Brasil", shortName: "Brasil", tla: "BRA", crest: "" },
    { id: 3, name: "Frankrike", shortName: "Frankrike", tla: "FRA", crest: "" },
    { id: 4, name: "Argentina", shortName: "Argentina", tla: "ARG", crest: "" },
    { id: 5, name: "England", shortName: "England", tla: "ENG", crest: "" },
    { id: 6, name: "Spanien", shortName: "Spanien", tla: "ESP", crest: "" },
    { id: 7, name: "Tyskland", shortName: "Tyskland", tla: "GER", crest: "" },
    { id: 8, name: "Portugal", shortName: "Portugal", tla: "POR", crest: "" },
  ];

  const matches: Match[] = [
    {
      id: 1, utcDate: "2026-06-11T20:00:00Z", status: "SCHEDULED",
      matchday: 1, stage: "GROUP_STAGE", group: "Grupp A",
      homeTeam: teams[0], awayTeam: teams[1],
      score: { winner: null, fullTime: { home: null, away: null }, halfTime: { home: null, away: null } }
    },
    {
      id: 2, utcDate: "2026-06-12T17:00:00Z", status: "SCHEDULED",
      matchday: 1, stage: "GROUP_STAGE", group: "Grupp A",
      homeTeam: teams[2], awayTeam: teams[3],
      score: { winner: null, fullTime: { home: null, away: null }, halfTime: { home: null, away: null } }
    },
    {
      id: 3, utcDate: "2026-06-12T20:00:00Z", status: "SCHEDULED",
      matchday: 1, stage: "GROUP_STAGE", group: "Grupp B",
      homeTeam: teams[4], awayTeam: teams[5],
      score: { winner: null, fullTime: { home: null, away: null }, halfTime: { home: null, away: null } }
    },
    {
      id: 4, utcDate: "2026-06-13T17:00:00Z", status: "SCHEDULED",
      matchday: 1, stage: "GROUP_STAGE", group: "Grupp B",
      homeTeam: teams[6], awayTeam: teams[7],
      score: { winner: null, fullTime: { home: null, away: null }, halfTime: { home: null, away: null } }
    },
    {
      id: 5, utcDate: "2026-06-15T17:00:00Z", status: "SCHEDULED",
      matchday: 2, stage: "GROUP_STAGE", group: "Grupp A",
      homeTeam: teams[1], awayTeam: teams[2],
      score: { winner: null, fullTime: { home: null, away: null }, halfTime: { home: null, away: null } }
    },
    {
      id: 6, utcDate: "2026-06-15T20:00:00Z", status: "SCHEDULED",
      matchday: 2, stage: "GROUP_STAGE", group: "Grupp A",
      homeTeam: teams[3], awayTeam: teams[0],
      score: { winner: null, fullTime: { home: null, away: null }, halfTime: { home: null, away: null } }
    },
    {
      id: 7, utcDate: "2026-07-15T20:00:00Z", status: "SCHEDULED",
      matchday: 1, stage: "FINAL", group: null,
      homeTeam: teams[0], awayTeam: teams[2],
      score: { winner: null, fullTime: { home: null, away: null }, halfTime: { home: null, away: null } }
    },
  ];

  return matches;
}
