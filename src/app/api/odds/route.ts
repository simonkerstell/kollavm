import { NextResponse } from "next/server";

// In-memory cache (persists across requests within same function instance)
let cachedOdds: Record<string, unknown> | null = null;
let cacheTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

const ODDS_API_KEY = process.env.ODDS_API_KEY || "";

// The Odds API sport key for FIFA World Cup
const SPORT_KEY = "soccer_fifa_world_cup";

export async function GET() {
  if (!ODDS_API_KEY) {
    return NextResponse.json({ error: "ODDS_API_KEY not configured", odds: [] }, { status: 200 });
  }

  // Return cached odds if still fresh
  if (cachedOdds && Date.now() - cacheTime < CACHE_DURATION) {
    return NextResponse.json({ odds: cachedOdds, cached: true });
  }

  try {
    const res = await fetch(
      `https://api.the-odds-api.com/v4/sports/${SPORT_KEY}/odds/?apiKey=${ODDS_API_KEY}&regions=eu&markets=h2h&oddsFormat=decimal&bookmakers=unibet_eu`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: `Odds API error: ${res.status}`, odds: [] }, { status: 200 });
    }

    const data = await res.json();

    // Transform to our format
    const odds: Record<string, { home: string; draw: string; away: string; bookmaker: string; updatedAt: string }> = {};

    for (const event of data) {
      if (!event.bookmakers?.length) continue;
      const bookmaker = event.bookmakers[0];
      const market = bookmaker.markets?.find((m: { key: string }) => m.key === "h2h");
      if (!market?.outcomes) continue;

      const homeOdds = market.outcomes.find((o: { name: string }) => o.name === event.home_team);
      const awayOdds = market.outcomes.find((o: { name: string }) => o.name === event.away_team);
      const drawOdds = market.outcomes.find((o: { name: string }) => o.name === "Draw");

      if (homeOdds && awayOdds && drawOdds) {
        odds[`${event.home_team}_${event.away_team}`] = {
          home: homeOdds.price.toFixed(2),
          draw: drawOdds.price.toFixed(2),
          away: awayOdds.price.toFixed(2),
          bookmaker: bookmaker.title,
          updatedAt: new Date().toISOString(),
        };
      }
    }

    cachedOdds = odds;
    cacheTime = Date.now();

    return NextResponse.json({ odds, cached: false });
  } catch (err) {
    return NextResponse.json({ error: String(err), odds: [] }, { status: 200 });
  }
}
