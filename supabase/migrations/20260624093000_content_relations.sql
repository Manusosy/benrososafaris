-- Content relations, tour extras, and reviews
--
-- Wires tours to the reference content they depend on (the "must exist first"
-- entities), adds the few tour-detail fields the FlashMC layout needs, links a
-- package to its source tour, and introduces customer reviews.

-- ---------------------------------------------------------------------------
-- Tour <-> reference content (many-to-many join tables)
-- ---------------------------------------------------------------------------
-- `position` orders the linked items as displayed on the tour page.

create table public.tour_destinations (
  tour_id uuid not null references public.tours(id) on delete cascade,
  destination_id uuid not null references public.destinations(id) on delete cascade,
  position integer not null default 0,
  primary key (tour_id, destination_id)
);

create table public.tour_national_parks (
  tour_id uuid not null references public.tours(id) on delete cascade,
  park_id uuid not null references public.national_parks(id) on delete cascade,
  position integer not null default 0,
  primary key (tour_id, park_id)
);

create table public.tour_experiences (
  tour_id uuid not null references public.tours(id) on delete cascade,
  experience_id uuid not null references public.experiences(id) on delete cascade,
  position integer not null default 0,
  primary key (tour_id, experience_id)
);

create table public.tour_accommodations (
  tour_id uuid not null references public.tours(id) on delete cascade,
  accommodation_id uuid not null references public.accommodations(id) on delete cascade,
  -- Optional itinerary night this lodge maps to.
  day_number integer,
  position integer not null default 0,
  primary key (tour_id, accommodation_id)
);

create table public.tour_fleet (
  tour_id uuid not null references public.tours(id) on delete cascade,
  vehicle_id uuid not null references public.fleet_vehicles(id) on delete cascade,
  position integer not null default 0,
  primary key (tour_id, vehicle_id)
);

create index tour_national_parks_park_id_idx on public.tour_national_parks (park_id);
create index tour_destinations_destination_id_idx on public.tour_destinations (destination_id);
create index tour_experiences_experience_id_idx on public.tour_experiences (experience_id);
create index tour_accommodations_accommodation_id_idx on public.tour_accommodations (accommodation_id);
create index tour_fleet_vehicle_id_idx on public.tour_fleet (vehicle_id);

-- ---------------------------------------------------------------------------
-- Tour detail extras
-- ---------------------------------------------------------------------------
-- start/end location -> "Starts in Nairobi / Ends in Nairobi".
-- highlights -> array of { icon, title, description } shown as icon blocks.
-- important_notice -> collapsible notice above the itinerary.
alter table public.tours
  add column if not exists start_location text,
  add column if not exists end_location text,
  add column if not exists important_notice text,
  add column if not exists highlights jsonb not null default '[]'::jsonb;

-- ---------------------------------------------------------------------------
-- Package -> source tour
-- ---------------------------------------------------------------------------
-- A package is a comfort-tier variant of a tour; `comfort_tier` (already present)
-- selects which pricing tier of `tour_id` it represents.
alter table public.packages
  add column if not exists tour_id uuid references public.tours(id) on delete set null;
create index if not exists packages_tour_id_idx on public.packages (tour_id);

-- ---------------------------------------------------------------------------
-- Reviews
-- ---------------------------------------------------------------------------
-- Global testimonials, optionally attributed to a specific tour. `featured`
-- surfaces a review in prominent slots; `status` gates public visibility.
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid references public.tours(id) on delete set null,
  author_name text not null,
  author_location text,
  rating integer not null default 5 check (rating between 1 and 5),
  title text,
  body text not null,
  source text,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index reviews_tour_id_idx on public.reviews (tour_id);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.tour_destinations enable row level security;
alter table public.tour_national_parks enable row level security;
alter table public.tour_experiences enable row level security;
alter table public.tour_accommodations enable row level security;
alter table public.tour_fleet enable row level security;
alter table public.reviews enable row level security;

-- Link tables: public can read a link only while its owning tour is published.
create policy "public read tour destinations of published tours" on public.tour_destinations
  for select to anon, authenticated
  using (exists (select 1 from public.tours t where t.id = tour_id and t.status = 'published'));
create policy "public read tour national parks of published tours" on public.tour_national_parks
  for select to anon, authenticated
  using (exists (select 1 from public.tours t where t.id = tour_id and t.status = 'published'));
create policy "public read tour experiences of published tours" on public.tour_experiences
  for select to anon, authenticated
  using (exists (select 1 from public.tours t where t.id = tour_id and t.status = 'published'));
create policy "public read tour accommodations of published tours" on public.tour_accommodations
  for select to anon, authenticated
  using (exists (select 1 from public.tours t where t.id = tour_id and t.status = 'published'));
create policy "public read tour fleet of published tours" on public.tour_fleet
  for select to anon, authenticated
  using (exists (select 1 from public.tours t where t.id = tour_id and t.status = 'published'));

-- Reviews: published rows are public.
create policy "public read published reviews" on public.reviews
  for select to anon, authenticated
  using (status = 'published');

-- Staff read (all active roles).
create policy "staff read tour destinations" on public.tour_destinations
  for select to authenticated using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));
create policy "staff read tour national parks" on public.tour_national_parks
  for select to authenticated using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));
create policy "staff read tour experiences" on public.tour_experiences
  for select to authenticated using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));
create policy "staff read tour accommodations" on public.tour_accommodations
  for select to authenticated using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));
create policy "staff read tour fleet" on public.tour_fleet
  for select to authenticated using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));
create policy "staff read reviews" on public.reviews
  for select to authenticated using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

-- Editor / super-admin write.
create policy "editors manage tour destinations" on public.tour_destinations
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));
create policy "editors manage tour national parks" on public.tour_national_parks
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));
create policy "editors manage tour experiences" on public.tour_experiences
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));
create policy "editors manage tour accommodations" on public.tour_accommodations
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));
create policy "editors manage tour fleet" on public.tour_fleet
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));
create policy "editors manage reviews" on public.reviews
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

-- Expose to the Data API roles.
grant select, insert, update, delete on public.tour_destinations to authenticated;
grant select, insert, update, delete on public.tour_national_parks to authenticated;
grant select, insert, update, delete on public.tour_experiences to authenticated;
grant select, insert, update, delete on public.tour_accommodations to authenticated;
grant select, insert, update, delete on public.tour_fleet to authenticated;
grant select, insert, update, delete on public.reviews to authenticated;
grant select on public.tour_destinations to anon;
grant select on public.tour_national_parks to anon;
grant select on public.tour_experiences to anon;
grant select on public.tour_accommodations to anon;
grant select on public.tour_fleet to anon;
grant select on public.reviews to anon;
