-- Tour pricing
--
-- Pricing lives on the Tour and is segmented by comfort tier (Budget / Mid range
-- / Luxury), exactly like the FlashMC reference. Each tier owns a set of seasonal
-- date ranges, and each season carries one price per group-size band. This is the
-- normalized form of the FlashMC "Prices and Seasons" matrix:
--
--   tier (tab)            -> tour_pricing_tiers
--     season (table row)  -> tour_pricing_seasons   (date range)
--       band (column)     -> tour_pricing_cells     (price per group size)
--
-- A package is a comfort-tier variant of a tour, so it simply reuses the tour's
-- pricing tier that matches its comfort level — no separate pricing model needed.

-- One row per (tour, tier). `label`/`blurb` mirror FlashMC's
-- "Mid range options" / "Comfortable lodges · private rooms" headings.
create table public.tour_pricing_tiers (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid not null references public.tours(id) on delete cascade,
  tier text not null check (tier in ('budget', 'mid_range', 'luxury')),
  label text,
  blurb text,
  -- Free-text footnotes, e.g. child-pricing rules shown beneath the matrix.
  notes text,
  currency text not null default 'USD',
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tour_id, tier)
);

-- Seasonal date ranges within a tier (the rows of the matrix).
create table public.tour_pricing_seasons (
  id uuid primary key default gen_random_uuid(),
  tier_id uuid not null references public.tour_pricing_tiers(id) on delete cascade,
  -- Human label as displayed, e.g. "Jan 3 - Mar 31, 2026".
  label text not null,
  date_start date,
  date_end date,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

-- Price per group-size band within a season (the cells of the matrix).
-- `group_band` is free text ("1", "2-3", "4-5", "6+") so columns stay flexible;
-- `band_position` preserves column order across seasons.
create table public.tour_pricing_cells (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references public.tour_pricing_seasons(id) on delete cascade,
  group_band text not null,
  band_position integer not null default 0,
  price numeric not null,
  created_at timestamptz not null default now(),
  unique (season_id, group_band)
);

create index tour_pricing_tiers_tour_id_idx on public.tour_pricing_tiers (tour_id);
create index tour_pricing_seasons_tier_id_idx on public.tour_pricing_seasons (tier_id);
create index tour_pricing_cells_season_id_idx on public.tour_pricing_cells (season_id);

alter table public.tour_pricing_tiers enable row level security;
alter table public.tour_pricing_seasons enable row level security;
alter table public.tour_pricing_cells enable row level security;

-- Public read: pricing is visible only while its owning tour is published.
-- The visibility check walks up the hierarchy (cell -> season -> tier -> tour).
create policy "public read pricing tiers of published tours" on public.tour_pricing_tiers
  for select to anon, authenticated
  using (exists (
    select 1 from public.tours t where t.id = tour_id and t.status = 'published'
  ));

create policy "public read pricing seasons of published tours" on public.tour_pricing_seasons
  for select to anon, authenticated
  using (exists (
    select 1
    from public.tour_pricing_tiers ti
    join public.tours t on t.id = ti.tour_id
    where ti.id = tier_id and t.status = 'published'
  ));

create policy "public read pricing cells of published tours" on public.tour_pricing_cells
  for select to anon, authenticated
  using (exists (
    select 1
    from public.tour_pricing_seasons s
    join public.tour_pricing_tiers ti on ti.id = s.tier_id
    join public.tours t on t.id = ti.tour_id
    where s.id = season_id and t.status = 'published'
  ));

-- Staff read (all active roles) and editor/super-admin write.
create policy "staff read pricing tiers" on public.tour_pricing_tiers
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));
create policy "staff read pricing seasons" on public.tour_pricing_seasons
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));
create policy "staff read pricing cells" on public.tour_pricing_cells
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "editors manage pricing tiers" on public.tour_pricing_tiers
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));
create policy "editors manage pricing seasons" on public.tour_pricing_seasons
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));
create policy "editors manage pricing cells" on public.tour_pricing_cells
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

grant select, insert, update, delete on public.tour_pricing_tiers to authenticated;
grant select, insert, update, delete on public.tour_pricing_seasons to authenticated;
grant select, insert, update, delete on public.tour_pricing_cells to authenticated;
grant select on public.tour_pricing_tiers to anon;
grant select on public.tour_pricing_seasons to anon;
grant select on public.tour_pricing_cells to anon;
