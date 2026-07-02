-- Experience package pricing tables.
--
-- Stores the public package-style price tables shown on experience pages
-- such as Honeymoon, Fly-in, Mountain Hiking, Conservation, and similar
-- package themes. Each item is a package level with season rows and fixed
-- pax-band price cells.
alter table public.experiences
  add column if not exists package_pricing jsonb not null default '[]'::jsonb;
