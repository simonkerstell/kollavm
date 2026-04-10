import { supabase } from "./supabase";
import { Prediction, League, LeagueMember, Comment, GroupPrediction, AvatarConfig, DEFAULT_AVATAR, QuizResult, SpecialPrediction } from "./tippa-types";

export const GLOBAL_LEAGUE_ID = "00000000-0000-0000-0000-000000000001";

export const GLOBAL_LEAGUE: League = {
  id: GLOBAL_LEAGUE_ID,
  name: "KollaVM Global",
  inviteCode: "GLOBAL",
  adminId: "system",
  createdAt: "2026-01-01T00:00:00.000Z",
};

// --- Predictions ---

export async function savePrediction(pred: Prediction) {
  const { error } = await supabase
    .from("predictions")
    .upsert(
      {
        user_id: pred.userId,
        match_id: pred.matchId,
        home_goals: pred.homeGoals,
        away_goals: pred.awayGoals,
      },
      { onConflict: "user_id,match_id" }
    );
  if (error) throw new Error(error.message);
}

export async function getPrediction(userId: string, matchId: string): Promise<Prediction | undefined> {
  const { data } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", userId)
    .eq("match_id", matchId)
    .maybeSingle();
  if (!data) return undefined;
  return {
    userId: data.user_id,
    matchId: data.match_id,
    homeGoals: data.home_goals,
    awayGoals: data.away_goals,
    points: data.points ?? undefined,
  };
}

export async function getUserPredictions(userId: string): Promise<Prediction[]> {
  const { data } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", userId);
  return (data ?? []).map((d) => ({
    userId: d.user_id,
    matchId: d.match_id,
    homeGoals: d.home_goals,
    awayGoals: d.away_goals,
    points: d.points ?? undefined,
  }));
}

// --- Leagues ---

export async function ensureGlobalLeague(userId: string) {
  // Make sure the user is a member of the global league
  await supabase
    .from("league_members")
    .upsert({ league_id: GLOBAL_LEAGUE_ID, user_id: userId }, { onConflict: "league_id,user_id" });
}

export async function createLeague(name: string, adminId: string): Promise<League> {
  const inviteCode = Math.random().toString(36).slice(2, 8).toUpperCase();
  const { data, error } = await supabase
    .from("leagues")
    .insert({ name, invite_code: inviteCode, admin_id: adminId })
    .select()
    .single();
  if (error) throw new Error(error.message);

  // Auto-join the creator
  await supabase
    .from("league_members")
    .insert({ league_id: data.id, user_id: adminId });

  return {
    id: data.id,
    name: data.name,
    inviteCode: data.invite_code,
    adminId: data.admin_id,
    createdAt: data.created_at,
  };
}

export async function joinLeague(inviteCode: string, userId: string): Promise<League> {
  const { data: league, error: findError } = await supabase
    .from("leagues")
    .select("*")
    .eq("invite_code", inviteCode.toUpperCase())
    .maybeSingle();

  if (findError) throw new Error(findError.message);
  if (!league) throw new Error("Ogiltig inbjudningskod");

  const { error: joinError } = await supabase
    .from("league_members")
    .upsert({ league_id: league.id, user_id: userId }, { onConflict: "league_id,user_id" });

  if (joinError) throw new Error(joinError.message);

  return {
    id: league.id,
    name: league.name,
    inviteCode: league.invite_code,
    adminId: league.admin_id,
    createdAt: league.created_at,
  };
}

export async function getUserLeagues(userId: string): Promise<League[]> {
  const { data } = await supabase
    .from("league_members")
    .select("league_id, leagues(*)")
    .eq("user_id", userId);

  return (data ?? []).map((d) => {
    const l = d.leagues as unknown as Record<string, string>;
    return {
      id: l.id,
      name: l.name,
      inviteCode: l.invite_code,
      adminId: l.admin_id,
      createdAt: l.created_at,
    };
  });
}

export async function getLeagueMembers(leagueId: string): Promise<(LeagueMember & { name: string })[]> {
  const { data: members } = await supabase
    .from("league_members")
    .select("league_id, user_id")
    .eq("league_id", leagueId);

  if (!members || members.length === 0) return [];

  const userIds = members.map((m) => m.user_id);

  // Get all types of predictions for all members
  const { data: preds } = await supabase
    .from("predictions")
    .select("user_id, points")
    .in("user_id", userIds)
    .not("points", "is", null);

  const { data: groupPreds } = await supabase
    .from("group_predictions")
    .select("user_id, points")
    .in("user_id", userIds)
    .not("points", "is", null);

  const { data: bracketPreds } = await supabase
    .from("bracket_predictions")
    .select("user_id, points")
    .in("user_id", userIds)
    .not("points", "is", null);

  // Get names via the database function
  const namesMap: Record<string, string> = {};
  for (const uid of userIds) {
    const { data } = await supabase.rpc("get_user_name", { uid });
    namesMap[uid] = (data as string) ?? "Okänd";
  }

  // Calculate total points per user (match + group + bracket)
  const pointsMap: Record<string, number> = {};
  for (const list of [preds, groupPreds, bracketPreds]) {
    for (const p of list ?? []) {
      pointsMap[p.user_id] = (pointsMap[p.user_id] ?? 0) + (p.points ?? 0);
    }
  }

  return members
    .map((m) => ({
      leagueId: m.league_id,
      userId: m.user_id,
      totalPoints: pointsMap[m.user_id] ?? 0,
      name: namesMap[m.user_id] ?? "Okänd",
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints);
}

// --- Group Predictions ---

export async function saveGroupPrediction(pred: GroupPrediction) {
  const { error } = await supabase
    .from("group_predictions")
    .upsert(
      {
        user_id: pred.userId,
        group_id: pred.groupId,
        first_place: pred.firstPlace,
        second_place: pred.secondPlace,
      },
      { onConflict: "user_id,group_id" }
    );
  if (error) throw new Error(error.message);
}

export async function getUserGroupPredictions(userId: string): Promise<GroupPrediction[]> {
  const { data } = await supabase
    .from("group_predictions")
    .select("*")
    .eq("user_id", userId);
  return (data ?? []).map((d) => ({
    userId: d.user_id,
    groupId: d.group_id,
    firstPlace: d.first_place,
    secondPlace: d.second_place,
    points: d.points ?? undefined,
  }));
}

// --- Bracket Predictions ---

export async function saveBracketPick(userId: string, matchId: string, winner: string) {
  // Delete existing pick for this match
  await supabase
    .from("bracket_predictions")
    .delete()
    .eq("user_id", userId)
    .eq("stage", matchId);

  // Only insert if there's a winner (empty = undo)
  if (winner) {
    const { error } = await supabase
      .from("bracket_predictions")
      .insert({ user_id: userId, stage: matchId, team_name: winner });
    if (error) throw new Error(error.message);
  }
}

export async function getUserBracketPredictions(userId: string): Promise<Record<string, string>> {
  const { data } = await supabase
    .from("bracket_predictions")
    .select("*")
    .eq("user_id", userId);
  const picks: Record<string, string> = {};
  for (const d of data ?? []) {
    picks[d.stage] = d.team_name;
  }
  return picks;
}

// --- Avatars ---

export async function getAvatar(userId: string): Promise<AvatarConfig> {
  const { data } = await supabase
    .from("avatars")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (!data) return DEFAULT_AVATAR;
  return {
    skinTone: data.skin_tone,
    hairStyle: data.hair_style,
    hairColor: data.hair_color,
    jerseyColor: data.jersey_color,
    accessory: data.accessory,
  };
}

export async function saveAvatar(userId: string, config: AvatarConfig) {
  const { error } = await supabase
    .from("avatars")
    .upsert({
      user_id: userId,
      skin_tone: config.skinTone,
      hair_style: config.hairStyle,
      hair_color: config.hairColor,
      jersey_color: config.jerseyColor,
      accessory: config.accessory,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
  if (error) throw new Error(error.message);
}

export async function getAvatarsBatch(userIds: string[]): Promise<Record<string, AvatarConfig>> {
  if (userIds.length === 0) return {};
  const { data } = await supabase
    .from("avatars")
    .select("*")
    .in("user_id", userIds);
  const result: Record<string, AvatarConfig> = {};
  for (const d of data ?? []) {
    result[d.user_id] = {
      skinTone: d.skin_tone,
      hairStyle: d.hair_style,
      hairColor: d.hair_color,
      jerseyColor: d.jersey_color,
      accessory: d.accessory,
    };
  }
  return result;
}

// --- Quiz ---

export async function saveQuizResult(userId: string, score: number) {
  const { error } = await supabase
    .from("quiz_results")
    .insert({ user_id: userId, score, total_questions: 10 });
  if (error) throw new Error(error.message);
}

export async function getUserQuizResults(userId: string): Promise<QuizResult[]> {
  const { data } = await supabase
    .from("quiz_results")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return (data ?? []).map(d => ({
    userId: d.user_id,
    score: d.score,
    totalQuestions: d.total_questions,
    createdAt: d.created_at,
  }));
}

// --- Special Predictions (MVP & Golden Boot) ---

export async function saveSpecialPrediction(userId: string, type: string, playerName: string) {
  const { error } = await supabase
    .from("special_predictions")
    .upsert({ user_id: userId, type, player_name: playerName }, { onConflict: "user_id,type" });
  if (error) throw new Error(error.message);
}

export async function getUserSpecialPredictions(userId: string): Promise<SpecialPrediction[]> {
  const { data } = await supabase
    .from("special_predictions")
    .select("*")
    .eq("user_id", userId);
  return (data ?? []).map(d => ({
    userId: d.user_id,
    type: d.type,
    playerName: d.player_name,
  }));
}

// --- Comments ---

export async function addComment(comment: Comment) {
  const { error } = await supabase
    .from("comments")
    .insert({
      id: comment.id,
      match_id: comment.matchId,
      user_id: comment.userId,
      user_name: comment.userName,
      text: comment.text,
      created_at: comment.createdAt,
    });
  if (error) throw new Error(error.message);
}

export async function getComments(matchId: string): Promise<Comment[]> {
  const { data } = await supabase
    .from("comments")
    .select("*")
    .eq("match_id", matchId)
    .order("created_at", { ascending: true });
  return (data ?? []).map(d => ({
    id: d.id,
    matchId: d.match_id,
    userId: d.user_id,
    userName: d.user_name,
    text: d.text,
    createdAt: d.created_at,
  }));
}

export async function deleteComment(commentId: string) {
  await supabase.from("comments").delete().eq("id", commentId);
}
