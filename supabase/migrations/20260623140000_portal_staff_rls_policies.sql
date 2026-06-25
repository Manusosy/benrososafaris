-- Staff role helpers (security invoker, used in RLS policies)
create or replace function public.staff_has_role(allowed_roles text[])
returns boolean
language sql
stable
security invoker
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid())
      and p.status = 'active'
      and p.role = any (allowed_roles)
  );
$$;

-- Profiles: super admins manage team; everyone reads own row
create policy "super admins read all profiles"
  on public.profiles for select to authenticated
  using (
    (select auth.uid()) = id
    or public.staff_has_role(array['owner', 'admin'])
  );

create policy "super admins manage profiles"
  on public.profiles for all to authenticated
  using (public.staff_has_role(array['owner', 'admin']))
  with check (public.staff_has_role(array['owner', 'admin']));

-- Content tables: staff read
create policy "staff read blog posts" on public.blog_posts
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read blog translations" on public.blog_translations
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read destinations" on public.destinations
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read destination translations" on public.destination_translations
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read tours" on public.tours
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read tour translations" on public.tour_translations
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read packages" on public.packages
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read package translations" on public.package_translations
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read experiences" on public.experiences
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read experience translations" on public.experience_translations
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read accommodations" on public.accommodations
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read accommodation translations" on public.accommodation_translations
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read fleet" on public.fleet_vehicles
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read fleet translations" on public.fleet_vehicle_translations
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read media" on public.media_assets
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read redirects" on public.redirects
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'viewer']));

create policy "staff read enquiries" on public.enquiries
  for select to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor', 'sales', 'viewer']));

-- Content write: editors and super admins
create policy "editors manage blog posts" on public.blog_posts
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage blog translations" on public.blog_translations
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage destinations" on public.destinations
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage destination translations" on public.destination_translations
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage tours" on public.tours
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage tour translations" on public.tour_translations
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage packages" on public.packages
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage package translations" on public.package_translations
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage experiences" on public.experiences
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage experience translations" on public.experience_translations
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage accommodations" on public.accommodations
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage accommodation translations" on public.accommodation_translations
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage fleet" on public.fleet_vehicles
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage fleet translations" on public.fleet_vehicle_translations
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage media" on public.media_assets
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "editors manage redirects" on public.redirects
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (public.staff_has_role(array['owner', 'admin', 'editor']));

-- Enquiries: sales + super admins can update
create policy "sales manage enquiries" on public.enquiries
  for update to authenticated
  using (public.staff_has_role(array['owner', 'admin', 'sales']))
  with check (public.staff_has_role(array['owner', 'admin', 'sales']));

-- Site settings: super admins only
create policy "super admins manage site settings" on public.site_settings
  for all to authenticated
  using (public.staff_has_role(array['owner', 'admin']))
  with check (public.staff_has_role(array['owner', 'admin']));
