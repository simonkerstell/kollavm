-- Migration 006: Comments table

create table if not exists comments (
  id uuid primary key,
  match_id text not null,
  user_id uuid not null references auth.users(id),
  user_name text not null,
  text text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_comments_match_id on comments(match_id);

alter table comments enable row level security;

-- Anyone can read comments
create policy "comments_select" on comments for select using (true);
-- Logged in users can add comments
create policy "comments_insert" on comments for insert to authenticated with check (auth.uid() = user_id);
-- Users can delete their own comments
create policy "comments_delete" on comments for delete to authenticated using (auth.uid() = user_id);
