-- Editable display name/title for media assets (WordPress-style title field,
-- independent of the stored file path).
alter table public.media_assets
  add column if not exists title text;
