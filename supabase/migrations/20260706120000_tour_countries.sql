alter table public.tours
  add column if not exists countries text[] not null default '{}';

create index if not exists tours_countries_gin_idx
  on public.tours using gin (countries);

-- Prefer linked experience operating countries (same ids as the experience wizard).
update public.tours t
set countries = src.countries
from (
  select distinct on (te.tour_id)
    te.tour_id,
    e.countries
  from public.tour_experiences te
  join public.experiences e on e.id = te.experience_id
  where cardinality(e.countries) > 0
  order by te.tour_id, te.position
) src
where t.id = src.tour_id
  and t.countries = '{}';

-- Sensible default for any remaining active tours.
update public.tours
set countries = array['kenya']::text[]
where countries = '{}'
  and status != 'archived';
