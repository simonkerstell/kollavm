-- Migration 003: Avatar table

create table if not exists avatars (
  user_id uuid primary key references auth.users(id) on delete cascade,
  skin_tone text not null default '#F5D0A9',
  hair_style text not null default 'short',
  hair_color text not null default '#3B2F2F',
  jersey_color text not null default '#F5C518',
  accessory text not null default 'none',
  updated_at timestamptz default now()
);

alter table avatars enable row level security;

create policy "avatars_select" on avatars for select using (true);
create policy "avatars_insert" on avatars for insert to authenticated with check (auth.uid() = user_id);
create policy "avatars_update" on avatars for update to authenticated using (auth.uid() = user_id);
