-- Experience gallery, category, highlights and SEO keyword columns.
--
-- Mirrors the destinations layout so the Experiences wizard can persist a flat
-- form across the base `experiences` row and its English
-- `experience_translations` row.

-- gallery: ordered array of media_assets ids selected for this experience.
-- category: the experience type (e.g. Game drive, Hot air balloon).
-- highlights: short bullet list of standout moments (array of text).
-- updated_at/deleted_at: parity with destinations for save + soft-delete.
alter table public.experiences
  add column if not exists gallery jsonb not null default '[]'::jsonb,
  add column if not exists category text,
  add column if not exists highlights jsonb not null default '[]'::jsonb,
  add column if not exists updated_at timestamptz not null default now(),
  add column if not exists deleted_at timestamptz;

-- focus_keyword: the primary phrase the page should rank for.
-- keywords: up to 5 supporting phrases (array of text).
-- created_at/updated_at: parity with destination_translations.
alter table public.experience_translations
  add column if not exists focus_keyword text,
  add column if not exists keywords jsonb not null default '[]'::jsonb,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();
