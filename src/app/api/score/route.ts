import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { calcPoints } from "@/lib/tippa-types";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "kollavm-admin-2026";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { secret, action } = body;

  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Score a single match result
  if (action === "score_match") {
    const { matchId, homeGoals, awayGoals } = body;
    if (!matchId || homeGoals === undefined || awayGoals === undefined) {
      return NextResponse.json({ error: "Missing matchId, homeGoals, or awayGoals" }, { status: 400 });
    }

    // Get all predictions for this match
    const { data: predictions } = await getSupabaseAdmin()
      .from("predictions")
      .select("user_id, home_goals, away_goals")
      .eq("match_id", matchId);

    let updated = 0;
    for (const pred of predictions ?? []) {
      const points = calcPoints(
        { homeGoals: pred.home_goals, awayGoals: pred.away_goals },
        { homeGoals, awayGoals }
      );
      await getSupabaseAdmin()
        .from("predictions")
        .update({ points })
        .eq("user_id", pred.user_id)
        .eq("match_id", matchId);
      updated++;
    }

    return NextResponse.json({ ok: true, updated, matchId });
  }

  // Score group predictions (who finished 1st and 2nd)
  if (action === "score_group") {
    const { groupId, firstPlace, secondPlace } = body;
    if (!groupId || !firstPlace || !secondPlace) {
      return NextResponse.json({ error: "Missing groupId, firstPlace, or secondPlace" }, { status: 400 });
    }

    const { data: predictions } = await getSupabaseAdmin()
      .from("group_predictions")
      .select("user_id, first_place, second_place")
      .eq("group_id", groupId);

    let updated = 0;
    for (const pred of predictions ?? []) {
      let points = 0;
      if (pred.first_place === firstPlace) points += 3;
      if (pred.second_place === secondPlace) points += 2;
      // Bonus: if they picked the right team but wrong position
      if (pred.first_place === secondPlace && pred.second_place !== secondPlace) points += 1;
      if (pred.second_place === firstPlace && pred.first_place !== firstPlace) points += 1;

      await getSupabaseAdmin()
        .from("group_predictions")
        .update({ points })
        .eq("user_id", pred.user_id)
        .eq("group_id", groupId);
      updated++;
    }

    return NextResponse.json({ ok: true, updated, groupId });
  }

  // Score a bracket match (who won)
  if (action === "score_bracket") {
    const { matchId, winner } = body;
    if (!matchId || !winner) {
      return NextResponse.json({ error: "Missing matchId or winner" }, { status: 400 });
    }

    // Points per round
    const pointsMap: Record<string, number> = {};
    // R32: matches 65-80 → 2p
    for (let i = 65; i <= 80; i++) pointsMap[`m${i}`] = 2;
    // R16: matches 81-88 → 3p
    for (let i = 81; i <= 88; i++) pointsMap[`m${i}`] = 3;
    // QF: matches 89-92 → 5p
    for (let i = 89; i <= 92; i++) pointsMap[`m${i}`] = 5;
    // SF: matches 93-94 → 7p
    for (let i = 93; i <= 94; i++) pointsMap[`m${i}`] = 7;
    // Final: match 95 → 10p
    pointsMap["m95"] = 10;

    const maxPoints = pointsMap[matchId] ?? 2;

    const { data: predictions } = await getSupabaseAdmin()
      .from("bracket_predictions")
      .select("user_id, team_name")
      .eq("stage", matchId);

    let updated = 0;
    for (const pred of predictions ?? []) {
      const points = pred.team_name === winner ? maxPoints : 0;
      await getSupabaseAdmin()
        .from("bracket_predictions")
        .update({ points })
        .eq("user_id", pred.user_id)
        .eq("stage", matchId);
      updated++;
    }

    return NextResponse.json({ ok: true, updated, matchId });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
