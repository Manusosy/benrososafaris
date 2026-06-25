-- Public read access for the *base* content tables.
--
-- The initial schema only granted anon/authenticated read access to the
-- `*_translations` tables. Public listing/detail pages, however, join the base
-- record (e.g. `tour_translations` -> `tours!inner(...)`) to read structured,
-- non-translated fields such as `days`, `price_from`, and `status`. Without a
-- SELECT policy on the base table the inner join resolves to NULL for anon
-- visitors, so published content silently fails to render.
--
-- Each policy exposes only rows whose lifecycle `status` is 'published'. Draft
-- and archived records remain invisible to the public and are reachable only by
-- authenticated staff via the staff_has_role() policies.

create policy "public can read published tour bases" on public.tours
  for select to anon, authenticated
  using (status = 'published');

create policy "public can read published destination bases" on public.destinations
  for select to anon, authenticated
  using (status = 'published');

create policy "public can read published package bases" on public.packages
  for select to anon, authenticated
  using (status = 'published');

create policy "public can read published experience bases" on public.experiences
  for select to anon, authenticated
  using (status = 'published');

create policy "public can read published accommodation bases" on public.accommodations
  for select to anon, authenticated
  using (status = 'published');

create policy "public can read published fleet bases" on public.fleet_vehicles
  for select to anon, authenticated
  using (status = 'published');

-- Translation tables for packages / experiences / accommodations / fleet were
-- never given a public read policy in the initial schema (only blog,
-- destinations, and tours were). Add them so their public pages can render.
create policy "public can read published package translations" on public.package_translations
  for select to anon, authenticated
  using (published_at is not null and exists (
    select 1 from public.packages p where p.id = package_id and p.status = 'published'
  ));

create policy "public can read published experience translations" on public.experience_translations
  for select to anon, authenticated
  using (published_at is not null and exists (
    select 1 from public.experiences e where e.id = experience_id and e.status = 'published'
  ));

create policy "public can read published accommodation translations" on public.accommodation_translations
  for select to anon, authenticated
  using (published_at is not null and exists (
    select 1 from public.accommodations a where a.id = accommodation_id and a.status = 'published'
  ));

create policy "public can read published fleet translations" on public.fleet_vehicle_translations
  for select to anon, authenticated
  using (published_at is not null and exists (
    select 1 from public.fleet_vehicles v where v.id = vehicle_id and v.status = 'published'
  ));
