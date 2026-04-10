import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { groups } from "@/data/groups";
import { calcPoints } from "@/lib/tippa-types";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "kollavm-admin-2026";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
const FOOTBALL_API_KEY = process.env.FOOTBALL_DATA_API_KEY || "";

// football-data.org competition ID for World Cup 2026
const WC_2026_ID = 2000; // Will need to verify this when API is live

interface ApiMatch {
  status: string;
  matchday: number;
  homeTeam: { name: string };
  awayTeam: { name: string };
  score: {
    fullTime: { home: number | null; away: number | null };
  };
}

// Map football-data.org team names to our team names
const teamNameMap: Record<string, string> = {
  "Mexico": "Mexiko",
  "South Africa": "Sydafrika",
  "South Korea": "Sydkorea",
  "Czech Republic": "Tjeckien",
  "Czechia": "Tjeckien",
  "Canada": "Kanada",
  "Bosnia and Herzegovina": "Bosnien och Hercegovina",
  "Bosnia-Herzegovina": "Bosnien och Hercegovina",
  "Switzerland": "Schweiz",
  "Brazil": "Brasilien",
  "Morocco": "Marocko",
  "Scotland": "Skottland",
  "Australia": "Australien",
  "Turkey": "Turkiet",
  "Germany": "Tyskland",
  "Ivory Coast": "Elfenbenskusten",
  "Côte d'Ivoire": "Elfenbenskusten",
  "Netherlands": "Nederländerna",
  "Japan": "Japan",
  "Sweden": "Sverige",
  "Tunisia": "Tunisien",
  "Belgium": "Belgien",
  "Egypt": "Egypten",
  "Iran": "Iran",
  "New Zealand": "Nya Zeeland",
  "Spain": "Spanien",
  "Cape Verde": "Kap Verde",
  "Saudi Arabia": "Saudiarabien",
  "France": "Frankrike",
  "Senegal": "Senegal",
  "Iraq": "Irak",
  "Norway": "Norge",
  "Argentina": "Argentina",
  "Algeria": "Algeriet",
  "Austria": "Österrike",
  "Jordan": "Jordanien",
  "Portugal": "Portugal",
  "DR Congo": "DR Kongo",
  "Uzbekistan": "Uzbekistan",
  "Colombia": "Colombia",
  "England": "England",
  "Croatia": "Kroatien",
  "Ghana": "Ghana",
  "Panama": "Panama",
  "Paraguay": "Paraguay",
  "Ecuador": "Ecuador",
  "Curaçao": "Curaçao",
  "Uruguay": "Uruguay",
};

function mapTeamName(apiName: string): string {
  return teamNameMap[apiName] ?? apiName;
}

function findMatchId(homeName: string, awayName: string): string | null {
  for (const group of groups) {
    for (let i = 0; i < group.matches.length; i++) {
      const m = group.matches[i];
      if (m.home === homeName && m.away === awayName) {
        return `${group.id}-${i}`;
      }
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!FOOTBALL_API_KEY) {
    return NextResponse.json({ error: "FOOTBALL_DATA_API_KEY not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.football-data.org/v4/competitions/${WC_2026_ID}/matches?status=FINISHED`, {
      headers: { "X-Auth-Token": FOOTBALL_API_KEY },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `API error: ${res.status}` }, { status: 502 });
    }

    const data = await res.json();
    const matches: ApiMatch[] = data.matches ?? [];

    let scored = 0;
    let skipped = 0;

    for (const apiMatch of matches) {
      const homeGoals = apiMatch.score.fullTime.home;
      const awayGoals = apiMatch.score.fullTime.away;
      if (homeGoals === null || awayGoals === null) { skipped++; continue; }

      const homeName = mapTeamName(apiMatch.homeTeam.name);
      const awayName = mapTeamName(apiMatch.awayTeam.name);
      const matchId = findMatchId(homeName, awayName);

      if (!matchId) { skipped++; continue; }

      // Get all predictions for this match
      const { data: predictions } = await getSupabaseAdmin()
        .from("predictions")
        .select("user_id, home_goals, away_goals, points")
        .eq("match_id", matchId);

      for (const pred of predictions ?? []) {
        const points = calcPoints(
          { homeGoals: pred.home_goals, awayGoals: pred.away_goals },
          { homeGoals, awayGoals }
        );

        // Only update if points changed (avoid unnecessary writes)
        if (pred.points !== points) {
          await getSupabaseAdmin()
            .from("predictions")
            .update({ points })
            .eq("user_id", pred.user_id)
            .eq("match_id", matchId);
        }
      }
      scored++;
    }

    return NextResponse.json({ ok: true, scored, skipped, total: matches.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
