-- Migration 007: Special predictions (MVP & Golden Boot)

create table if not exists special_predictions (
  user_id uuid not null references auth.users(id),
  type text not null, -- 'mvp' or 'golden_boot'
  player_name text not null,
  points int,
  primary key (user_id, type)
);

alter table special_predictions enable row level security;

create policy "special_pred_select" on special_predictions for select to authenticated using (true);
create policy "special_pred_insert" on special_predictions for insert to authenticated with check (auth.uid() = user_id);
create policy "special_pred_update" on special_predictions for update to authenticated using (auth.uid() = user_id);
