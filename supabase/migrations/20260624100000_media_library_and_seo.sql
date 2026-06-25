-- Media library + SEO fields
--
-- 1. A public Storage bucket ('media') backs the WordPress-style media library.
--    Uploaded objects are publicly readable (so the public site can render them)
--    but only staff editors can write/replace/delete them.
-- 2. Gallery + SEO keyword columns for destinations.

-- ---------------------------------------------------------------------------
-- Storage bucket
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  10485760, -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml']
)
on conflict (id) do nothing;

-- Storage object policies (RLS is already enabled on storage.objects by Supabase).
create policy "public read media bucket" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'media');

create policy "staff upload media bucket" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'media' and public.staff_has_role(array['owner', 'admin', 'editor'])
  );

create policy "staff update media bucket" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and public.staff_has_role(array['owner', 'admin', 'editor']))
  with check (bucket_id = 'media' and public.staff_has_role(array['owner', 'admin', 'editor']));

create policy "staff delete media bucket" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and public.staff_has_role(array['owner', 'admin', 'editor']));

-- ---------------------------------------------------------------------------
-- Destination gallery + SEO keyword columns
-- ---------------------------------------------------------------------------
-- gallery: ordered array of media_assets ids selected for this destination.
alter table public.destinations
  add column if not exists gallery jsonb not null default '[]'::jsonb;

-- focus_keyword: the primary phrase the page should rank for.
-- keywords: up to 5 supporting phrases (array of text).
alter table public.destination_translations
  add column if not exists focus_keyword text,
  add column if not exists keywords jsonb not null default '[]'::jsonb;
