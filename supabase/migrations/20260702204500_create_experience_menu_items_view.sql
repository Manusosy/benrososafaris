create or replace view public.experience_menu_items
with (security_barrier = true, security_invoker = true) as
select distinct on (source.locale, source.label)
  source.experience_id,
  source.locale,
  source.label,
  source.slug,
  source.menu_group,
  source.menu_position
from (
  select
    e.id as experience_id,
    et.locale,
    coalesce(nullif(btrim(e.category), ''), nullif(btrim(et.title), '')) as label,
    et.slug,
    e.menu_group,
    e.menu_position
  from public.experience_translations et
  join public.experiences e on e.id = et.experience_id
  where
    e.deleted_at is null
    and e.status = 'published'
    and et.published_at is not null
) source
where source.label is not null
order by
  source.locale,
  source.label,
  source.menu_position,
  source.experience_id;

grant select on public.experience_menu_items to anon, authenticated;

notify pgrst, 'reload schema';
