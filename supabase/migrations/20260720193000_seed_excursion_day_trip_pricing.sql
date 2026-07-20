-- Seed pax-only (no season matrix) pricing for Excursion & Day Trip tours.
-- Also add Entry fees to inclusions and remove conflicting exclusion lines.

do $$
declare
  v_tour record;
  v_tour_id uuid;
  v_tier_id uuid;
  v_season_id uuid;
  v_inclusions jsonb;
  v_exclusions jsonb;
begin
  for v_tour in
    select *
    from (
      values
        ('david-sheldrick-elephant-experience', 260::numeric, 185::numeric, 150::numeric, 135::numeric),
        ('elephant-and-giraffe-conservation-tour-nairobi', 365, 265, 215, 200),
        ('karunguru-coffee-farm-day-tour-from-nairobi', 380, 230, 155, 130),
        ('kiambethu-tea-farm-day-tour-from-nairobi', 350, 200, 125, 100),
        ('lake-naivasha-and-crescent-island-day-trip', 415, 265, 190, 165),
        ('lake-naivasha-and-hells-gate-day-trip', 410, 260, 185, 160),
        ('nairobi-wildlife-and-heritage-day-tour', 530, 355, 270, 240),
        ('nairobi-national-park-half-day-safari', 340, 215, 155, 130),
        ('nairobi-museum-and-city-discovery-tour', 320, 195, 135, 115),
        ('nairobi-wildlife-and-city-day-tour', 465, 315, 240, 215)
    ) as t(slug, pax1, pax2_3, pax4_5, pax6)
  loop
    select t.id
    into v_tour_id
    from public.tours t
    join public.tour_translations tt on tt.tour_id = t.id and tt.locale = 'en'
    where tt.slug = v_tour.slug
    limit 1;

    if v_tour_id is null then
      continue;
    end if;

    delete from public.tour_pricing_tiers where tour_id = v_tour_id;

    insert into public.tour_pricing_tiers (
      tour_id, tier, label, blurb, notes, currency, position
    ) values (
      v_tour_id,
      'mid_range',
      'Per person rates',
      null,
      null,
      'USD',
      0
    )
    returning id into v_tier_id;

    insert into public.tour_pricing_seasons (tier_id, label, date_start, date_end, position)
    values (v_tier_id, 'Day trip', null, null, 0)
    returning id into v_season_id;

    insert into public.tour_pricing_cells (season_id, group_band, band_position, price)
    values
      (v_season_id, '1 PAX', 0, v_tour.pax1),
      (v_season_id, '2-3 PAX', 1, v_tour.pax2_3),
      (v_season_id, '4-5 PAX', 2, v_tour.pax4_5),
      (v_season_id, '6 AND ABOVE', 3, v_tour.pax6);

    select coalesce(inclusions, '[]'::jsonb), coalesce(exclusions, '[]'::jsonb)
    into v_inclusions, v_exclusions
    from public.tours
    where id = v_tour_id;

    if not exists (
      select 1
      from jsonb_array_elements_text(v_inclusions) as incl(value)
      where lower(incl.value) like '%entry fee%'
    ) then
      v_inclusions := v_inclusions || '["Entry fees"]'::jsonb;
    end if;

    select coalesce(jsonb_agg(to_jsonb(filtered.value)), '[]'::jsonb)
    into v_exclusions
    from jsonb_array_elements_text(v_exclusions) as filtered(value)
    where lower(filtered.value) not like '%entry fee%'
      and lower(filtered.value) not like '%donation fee%';

    update public.tours
    set
      pricing_table_keys = '["mid_range"]'::jsonb,
      price_from = v_tour.pax6,
      inclusions = v_inclusions,
      exclusions = v_exclusions,
      updated_at = now()
    where id = v_tour_id;
  end loop;
end $$;
