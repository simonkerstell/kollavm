-- Migration 004: Check if username is taken

create or replace function is_username_taken(username text)
returns boolean
language sql
security definer
as $$
  select exists(
    select 1 from auth.users
    where lower(raw_user_meta_data->>'name') = lower(username)
  );
$$;
