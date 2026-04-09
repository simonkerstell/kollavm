-- Migration 002: Group predictions & bracket predictions

create table if not exists group_predictions (
  user_id uuid not null references auth.users(id),
  group_id text not null,
  first_place text not null,
  second_place text not null,
  points int,
  primary key (user_id, group_id)
);

create table if not exists bracket_predictions (
  user_id uuid not null references auth.users(id),
  stage text not null,
  team_name text not null,
  points int,
  primary key (user_id, stage, team_name)
);

alter table group_predictions enable row level security;
alter table bracket_predictions enable row level security;

create policy "group_pred_select" on group_predictions for select to authenticated using (true);
create policy "group_pred_insert" on group_predictions for insert to authenticated with check (auth.uid() = user_id);
create policy "group_pred_update" on group_predictions for update to authenticated using (auth.uid() = user_id);

create policy "bracket_pred_select" on bracket_predictions for select to authenticated using (true);
create policy "bracket_pred_insert" on bracket_predictions for insert to authenticated with check (auth.uid() = user_id);
create policy "bracket_pred_delete" on bracket_predictions for delete to authenticated using (auth.uid() = user_id);
