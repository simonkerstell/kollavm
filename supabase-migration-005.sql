-- Migration 005: Quiz results table

create table if not exists quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  score integer not null,
  total_questions integer not null default 10,
  created_at timestamptz not null default now()
);

alter table quiz_results enable row level security;

create policy "quiz_select" on quiz_results for select to authenticated using (auth.uid() = user_id);
create policy "quiz_insert" on quiz_results for insert to authenticated with check (auth.uid() = user_id);
