-- Leagues
create table if not exists leagues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  invite_code text not null unique,
  admin_id uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

-- League members
create table if not exists league_members (
  league_id uuid not null references leagues(id) on delete cascade,
  user_id uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  primary key (league_id, user_id)
);

-- Predictions
create table if not exists predictions (
  user_id uuid not null references auth.users(id),
  match_id text not null,
  home_goals int not null,
  away_goals int not null,
  points int,
  primary key (user_id, match_id)
);

-- Insert global league (fixed id so it's the same everywhere)
insert into leagues (id, name, invite_code, admin_id, created_at)
values ('00000000-0000-0000-0000-000000000001', 'KollaVM Global', 'GLOBAL', (select id from auth.users limit 1), '2026-01-01T00:00:00Z')
on conflict (id) do nothing;

-- RLS policies
alter table leagues enable row level security;
alter table league_members enable row level security;
alter table predictions enable row level security;

-- Anyone logged in can read leagues
create policy "leagues_select" on leagues for select to authenticated using (true);
-- Anyone logged in can create leagues
create policy "leagues_insert" on leagues for insert to authenticated with check (auth.uid() = admin_id);

-- Members can see all members in their leagues
create policy "members_select" on league_members for select to authenticated using (true);
-- Anyone logged in can join a league
create policy "members_insert" on league_members for insert to authenticated with check (auth.uid() = user_id);

-- Users can read all predictions (for leaderboards)
create policy "predictions_select" on predictions for select to authenticated using (true);
-- Users can insert/update their own predictions
create policy "predictions_insert" on predictions for insert to authenticated with check (auth.uid() = user_id);
create policy "predictions_update" on predictions for update to authenticated using (auth.uid() = user_id);

-- Index for fast invite code lookups
create index if not exists idx_leagues_invite_code on leagues(invite_code);

-- Function to get user display name from auth.users
create or replace function get_user_name(uid uuid)
returns text
language sql
security definer
as $$
  select coalesce(raw_user_meta_data->>'name', split_part(email, '@', 1))
  from auth.users where id = uid;
$$;
