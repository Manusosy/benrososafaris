alter table public.experiences
  add column if not exists menu_group text not null default 'top_experiences'
  check (menu_group in ('top_experiences', 'wildlife_safari'));

alter table public.experiences
  add column if not exists menu_position integer not null default 100;

create index if not exists experiences_menu_group_idx
  on public.experiences (menu_group, menu_position)
  where deleted_at is null;
