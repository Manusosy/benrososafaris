-- National Parks
--
-- Parks are a first-class content type (their own table + wizard) rather than a
-- typed subset of destinations. A park MAY belong to a destination (e.g. "Masai
-- Mara" within the "Kenya" destination) via `destination_id`, but is authored,
-- published, and linked to tours independently.
--
-- Mirrors the established base + `*_translations` pattern: structured / locale
-- agnostic data lives on `national_parks`; all human-readable, translatable copy
-- lives on `national_park_translations`, keyed by (locale, slug).

create table public.national_parks (
  id uuid primary key default gen_random_uuid(),
  -- Optional parent destination for grouping (e.g. country hub pages).
  destination_id uuid references public.destinations(id) on delete set null,
  country text,
  region text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  latitude numeric,
  longitude numeric,
  -- Park facts surfaced on the public detail page.
  park_size_km2 numeric,
  established_year integer,
  -- best_time: { months: text[], summary: text }; wildlife/activities: text[] of slugs/labels.
  best_time jsonb not null default '{}'::jsonb,
  wildlife jsonb not null default '[]'::jsonb,
  activities jsonb not null default '[]'::jsonb,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.national_park_translations (
  id uuid primary key default gen_random_uuid(),
  park_id uuid not null references public.national_parks(id) on delete cascade,
  locale text not null,
  slug text not null,
  name text not null,
  summary text,
  description jsonb,
  seo_title text,
  seo_description text,
  og_image_id uuid references public.media_assets(id),
  canonical_override text,
  faqs jsonb not null default '[]'::jsonb,
  direct_answers jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, slug)
);

create index national_park_translations_park_id_idx
  on public.national_park_translations (park_id);
create index national_parks_destination_id_idx
  on public.national_parks (destination_id);

alter table public.national_parks enable row level security;
alter table public.national_park_translations enable row level security;

-- Public: only published parks and their published translations are visible.
create policy "public can read published national parks" on public.national_parks
  for select to anon, authenticated
  using (status = 'published');

create policy "public can read published national park translations" on public.national_park_translations
  for select to anon, authenticated
  using (published_at is not null and exists (
    select 1 from public.national_parks p where p.id = park_id and p.status = 'published'
  ));

-- Staff: read for all active staff roles.
create policy "staff read national parks" on public.national_parks
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read national park translations" on public.national_park_translations
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

-- Staff: full write for editors and super admins.
create policy "editors manage national parks" on public.national_parks
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage national park translations" on public.national_park_translations
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

-- Expose to the Data API roles (RLS above still governs row visibility).
grant select, insert, update, delete on public.national_parks to authenticated;
grant select, insert, update, delete on public.national_park_translations to authenticated;
grant select on public.national_parks to anon;
grant select on public.national_park_translations to anon;
