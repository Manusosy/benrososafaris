-- Auto-translation backfill runs with the Supabase service role (server-side).
-- Translation tables were granted to authenticated editors only; service_role
-- could not read or upsert locale rows, so backfill silently returned 0.

grant select, insert, update, delete on public.blog_translations to service_role;
grant select, insert, update, delete on public.tour_translations to service_role;
grant select, insert, update, delete on public.destination_translations to service_role;
grant select, insert, update, delete on public.experience_translations to service_role;
grant select, insert, update, delete on public.package_translations to service_role;
grant select, insert, update, delete on public.accommodation_translations to service_role;
grant select, insert, update, delete on public.national_park_translations to service_role;
grant select, insert, update, delete on public.fleet_vehicle_translations to service_role;
