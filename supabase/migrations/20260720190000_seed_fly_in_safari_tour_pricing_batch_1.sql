-- Seed Kenya seasonal PAX pricing for the first four Fly-In Safari itineraries.
-- Lewa is Luxury (not mid_range). Also rename the 5-day Great Migration tour title.

do $$
declare
  v_tour_id uuid;
  v_tier_id uuid;
begin
  -- 2 Days Amboseli Fly In Safari From Nairobi (mid_range)
  select t.id, pt.id
  into v_tour_id, v_tier_id
  from public.tours t
  join public.tour_translations tt on tt.tour_id = t.id and tt.locale = 'en'
  join public.tour_pricing_tiers pt on pt.tour_id = t.id and pt.tier = 'mid_range'
  where tt.slug = '2-days-amboseli-fly-in-safari-from-nairobi'
  limit 1;

  if v_tour_id is not null and v_tier_id is not null then
    update public.tour_pricing_cells c
    set price = v.price
    from public.tour_pricing_seasons s
    join (
      values
        (0, 0, 1835), (0, 1, 1315), (0, 2, 1105), (0, 3, 1160),
        (1, 0, 1730), (1, 1, 1310), (1, 2, 1100), (1, 3, 1155),
        (2, 0, 1915), (2, 1, 1370), (2, 2, 1160), (2, 3, 1215),
        (3, 0, 1980), (3, 1, 1395), (3, 2, 1160), (3, 3, 1085),
        (4, 0, 1980), (4, 1, 1395), (4, 2, 1160), (4, 3, 1085),
        (5, 0, 1905), (5, 1, 1345), (5, 2, 1110), (5, 3, 1035),
        (6, 0, 1980), (6, 1, 1395), (6, 2, 1160), (6, 3, 1085)
    ) as v(season_pos, band_pos, price)
      on s.position = v.season_pos
    where s.tier_id = v_tier_id
      and c.season_id = s.id
      and c.band_position = v.band_pos;

    update public.tours
    set
      pricing_table_keys = '["mid_range"]'::jsonb,
      price_from = 1035,
      updated_at = now()
    where id = v_tour_id;
  end if;

  -- 3 Days Lewa Conservancy Fly In Safari (Luxury)
  select t.id, pt.id
  into v_tour_id, v_tier_id
  from public.tours t
  join public.tour_translations tt on tt.tour_id = t.id and tt.locale = 'en'
  join public.tour_pricing_tiers pt on pt.tour_id = t.id
  where tt.slug = '3-days-lewa-conservancy-fly-in-safari'
  limit 1;

  if v_tour_id is not null and v_tier_id is not null then
    update public.tour_pricing_tiers
    set
      tier = 'luxury',
      label = 'Luxury',
      updated_at = now()
    where id = v_tier_id;

    update public.tour_pricing_cells c
    set price = v.price
    from public.tour_pricing_seasons s
    join (
      values
        (0, 0, 7050), (0, 1, 4035), (0, 2, 3760), (0, 3, 3835),
        (1, 0, 7050), (1, 1, 4035), (1, 2, 3760), (1, 3, 3835),
        (2, 0, 7050), (2, 1, 4035), (2, 2, 3760), (2, 3, 3835),
        (3, 0, 6480), (3, 1, 5235), (3, 2, 4920), (3, 3, 5005),
        (4, 0, 7050), (4, 1, 4035), (4, 2, 3760), (4, 3, 3835),
        (5, 0, 7050), (5, 1, 4035), (5, 2, 3760), (5, 3, 3835),
        (6, 0, 6480), (6, 1, 5235), (6, 2, 4920), (6, 3, 5005)
    ) as v(season_pos, band_pos, price)
      on s.position = v.season_pos
    where s.tier_id = v_tier_id
      and c.season_id = s.id
      and c.band_position = v.band_pos;

    update public.tours
    set
      pricing_table_keys = '["luxury"]'::jsonb,
      price_from = 3760,
      updated_at = now()
    where id = v_tour_id;
  end if;

  -- 3 Days Masai Mara Fly In Safari From Nairobi (mid_range)
  select t.id, pt.id
  into v_tour_id, v_tier_id
  from public.tours t
  join public.tour_translations tt on tt.tour_id = t.id and tt.locale = 'en'
  join public.tour_pricing_tiers pt on pt.tour_id = t.id and pt.tier = 'mid_range'
  where tt.slug = '3-days-masai-mara-fly-in-safari-from-nairobi'
  limit 1;

  if v_tour_id is not null and v_tier_id is not null then
    update public.tour_pricing_cells c
    set price = v.price
    from public.tour_pricing_seasons s
    join (
      values
        (0, 0, 2310), (0, 1, 1650), (0, 2, 1375), (0, 3, 1445),
        (1, 0, 2310), (1, 1, 1650), (1, 2, 1375), (1, 3, 1445),
        (2, 0, 2310), (2, 1, 1650), (2, 2, 1375), (2, 3, 1445),
        (3, 0, 3065), (3, 1, 2215), (3, 2, 1900), (3, 3, 1800),
        (4, 0, 3065), (4, 1, 2215), (4, 2, 1900), (4, 3, 1800),
        (5, 0, 2628), (5, 1, 1915), (5, 2, 1600), (5, 3, 1495),
        (6, 0, 2900), (6, 1, 2125), (6, 2, 1810), (6, 3, 1710)
    ) as v(season_pos, band_pos, price)
      on s.position = v.season_pos
    where s.tier_id = v_tier_id
      and c.season_id = s.id
      and c.band_position = v.band_pos;

    update public.tours
    set
      pricing_table_keys = '["mid_range"]'::jsonb,
      price_from = 1375,
      updated_at = now()
    where id = v_tour_id;
  end if;

  -- 3 Days Solio Ranch Fly In Safari (mid_range)
  select t.id, pt.id
  into v_tour_id, v_tier_id
  from public.tours t
  join public.tour_translations tt on tt.tour_id = t.id and tt.locale = 'en'
  join public.tour_pricing_tiers pt on pt.tour_id = t.id and pt.tier = 'mid_range'
  where tt.slug = '3-days-solio-ranch-fly-in-safari'
  limit 1;

  if v_tour_id is not null and v_tier_id is not null then
    update public.tour_pricing_cells c
    set price = v.price
    from public.tour_pricing_seasons s
    join (
      values
        (0, 0, 2700), (0, 1, 1835), (0, 2, 1560), (0, 3, 1465),
        (1, 0, 2700), (1, 1, 1835), (1, 2, 1560), (1, 3, 1465),
        (2, 0, 2700), (2, 1, 1835), (2, 2, 1560), (2, 3, 1465),
        (3, 0, 2830), (3, 1, 1900), (3, 2, 1590), (3, 3, 1485),
        (4, 0, 2830), (4, 1, 1900), (4, 2, 1590), (4, 3, 1485),
        (5, 0, 2830), (5, 1, 1900), (5, 2, 1590), (5, 3, 1485),
        (6, 0, 2890), (6, 1, 1960), (6, 2, 1645), (6, 3, 1540)
    ) as v(season_pos, band_pos, price)
      on s.position = v.season_pos
    where s.tier_id = v_tier_id
      and c.season_id = s.id
      and c.band_position = v.band_pos;

    update public.tours
    set
      pricing_table_keys = '["mid_range"]'::jsonb,
      price_from = 1465,
      updated_at = now()
    where id = v_tour_id;
  end if;

  -- Rename 5 Days Great Migration title (slug kept for stable URL)
  update public.tour_translations
  set
    title = '5 Days Fly In Great Migration Safari To Masai Mara Fly In Safari',
    seo_title = '5 Days Fly In Great Migration Safari To Masai Mara Fly In Safari',
    updated_at = now()
  where locale = 'en'
    and slug = '5-days-luxury-fly-in-great-migration-safari-to-maasai-mara';
end $$;
