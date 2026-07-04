alter table public.experiences
  add column if not exists countries text[] not null default '{}';

create index if not exists experiences_countries_gin_idx
  on public.experiences using gin (countries);
