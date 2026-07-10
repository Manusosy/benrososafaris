-- Experience layout variants for public page rendering.
-- safari: package tables + filtered trip explorer (default)
-- mountain: per-route tables on linked tours, no package table or filters

alter table public.experiences
  add column if not exists layout_variant text not null default 'safari'
  check (layout_variant in ('safari', 'mountain'));

comment on column public.experiences.layout_variant is
  'Public page layout: safari uses package tables + filtered trips; mountain uses per-route tables.';

update public.experiences
set
  layout_variant = 'mountain',
  package_pricing = '[]'::jsonb,
  updated_at = now()
where id in (
  select experience_id
  from public.experience_translations
  where locale = 'en' and slug = 'mountain-climbing'
);
