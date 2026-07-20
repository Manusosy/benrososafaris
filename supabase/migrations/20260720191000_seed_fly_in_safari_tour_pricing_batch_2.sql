-- Seed Kenya seasonal PAX pricing for the remaining Fly-In Safari itineraries.

do $$
declare
  v_tour_id uuid;
  v_tier_id uuid;
begin
  -- 4 Days Masai Mara Fly In Safari From Nairobi
  select t.id, pt.id
  into v_tour_id, v_tier_id
  from public.tours t
  join public.tour_translations tt on tt.tour_id = t.id and tt.locale = 'en'
  join public.tour_pricing_tiers pt on pt.tour_id = t.id and pt.tier = 'mid_range'
  where tt.slug = '4-days-masai-mara-fly-in-safari-from-nairobi'
  limit 1;

  if v_tour_id is not null and v_tier_id is not null then
    update public.tour_pricing_cells c
    set price = v.price
    from public.tour_pricing_seasons s
    join (
      values
        (0, 0, 2905), (0, 1, 2055), (0, 2, 1710), (0, 3, 1805),
        (1, 0, 2905), (1, 1, 2055), (1, 2, 1710), (1, 3, 1805),
        (2, 0, 2905), (2, 1, 2055), (2, 2, 1710), (2, 3, 1805),
        (3, 0, 4005), (3, 1, 2885), (3, 2, 2495), (3, 3, 2365),
        (4, 0, 4005), (4, 1, 2885), (4, 2, 2495), (4, 3, 2365),
        (5, 0, 3350), (5, 1, 2432), (5, 2, 2040), (5, 3, 1915),
        (6, 0, 3755), (6, 1, 2755), (6, 2, 2360), (6, 3, 2230)
    ) as v(season_pos, band_pos, price)
      on s.position = v.season_pos
    where s.tier_id = v_tier_id
      and c.season_id = s.id
      and c.band_position = v.band_pos;

    update public.tours
    set
      pricing_table_keys = '["mid_range"]'::jsonb,
      price_from = 1710,
      updated_at = now()
    where id = v_tour_id;
  end if;

  -- 5 Days Fly In Great Migration Safari To Masai Mara
  select t.id, pt.id
  into v_tour_id, v_tier_id
  from public.tours t
  join public.tour_translations tt on tt.tour_id = t.id and tt.locale = 'en'
  join public.tour_pricing_tiers pt on pt.tour_id = t.id and pt.tier = 'mid_range'
  where tt.slug = '5-days-luxury-fly-in-great-migration-safari-to-maasai-mara'
  limit 1;

  if v_tour_id is not null and v_tier_id is not null then
    update public.tour_pricing_cells c
    set price = v.price
    from public.tour_pricing_seasons s
    join (
      values
        (0, 0, 3500), (0, 1, 2465), (0, 2, 2045), (0, 3, 2160),
        (1, 0, 3500), (1, 1, 2465), (1, 2, 2045), (1, 3, 2160),
        (2, 0, 3500), (2, 1, 2465), (2, 2, 2045), (2, 3, 2160),
        (3, 0, 4950), (3, 1, 3560), (3, 2, 3090), (3, 3, 2935),
        (4, 0, 4950), (4, 1, 3560), (4, 2, 3090), (4, 3, 2935),
        (5, 0, 4075), (5, 1, 2955), (5, 2, 2485), (5, 3, 2330),
        (6, 0, 4610), (6, 1, 3380), (6, 2, 2910), (6, 3, 2755)
    ) as v(season_pos, band_pos, price)
      on s.position = v.season_pos
    where s.tier_id = v_tier_id
      and c.season_id = s.id
      and c.band_position = v.band_pos;

    update public.tours
    set
      pricing_table_keys = '["mid_range"]'::jsonb,
      price_from = 2045,
      updated_at = now()
    where id = v_tour_id;
  end if;

  -- 6 Days Lewa & Maasai Mara Fly In Safari (Luxury — matches Lewa package tier)
  select t.id, pt.id
  into v_tour_id, v_tier_id
  from public.tours t
  join public.tour_translations tt on tt.tour_id = t.id and tt.locale = 'en'
  join public.tour_pricing_tiers pt on pt.tour_id = t.id
  where tt.slug = '6-days-lewa-and-maasai-mara-fly-in-safari'
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
        (0, 0, 9885), (0, 1, 5975), (0, 2, 5630), (0, 3, 5755),
        (1, 0, 9815), (1, 1, 5925), (1, 2, 5580), (1, 3, 5710),
        (2, 0, 10870), (2, 1, 6625), (2, 2, 6275), (2, 3, 6405),
        (3, 0, 10735), (3, 1, 8190), (3, 2, 7800), (3, 3, 7945),
        (4, 0, 11440), (4, 1, 7060), (4, 2, 6665), (4, 3, 6815),
        (5, 0, 10365), (5, 1, 6350), (5, 2, 5960), (5, 3, 6105),
        (6, 0, 10735), (6, 1, 8190), (6, 2, 7800), (6, 3, 7945)
    ) as v(season_pos, band_pos, price)
      on s.position = v.season_pos
    where s.tier_id = v_tier_id
      and c.season_id = s.id
      and c.band_position = v.band_pos;

    update public.tours
    set
      pricing_table_keys = '["luxury"]'::jsonb,
      price_from = 5580,
      updated_at = now()
    where id = v_tour_id;
  end if;

  -- 7 Days Masai Mara & Diani Fly In Safari
  select t.id, pt.id
  into v_tour_id, v_tier_id
  from public.tours t
  join public.tour_translations tt on tt.tour_id = t.id and tt.locale = 'en'
  join public.tour_pricing_tiers pt on pt.tour_id = t.id and pt.tier = 'mid_range'
  where tt.slug = '7-days-maasai-mara-and-diani-fly-in-safari'
  limit 1;

  if v_tour_id is not null and v_tier_id is not null then
    update public.tour_pricing_cells c
    set price = v.price
    from public.tour_pricing_seasons s
    join (
      values
        (0, 0, 4290), (0, 1, 3205), (0, 2, 2860), (0, 3, 2740),
        (1, 0, 4290), (1, 1, 3205), (1, 2, 2860), (1, 3, 2740),
        (2, 0, 4125), (2, 1, 3050), (2, 2, 2705), (2, 3, 2585),
        (3, 0, 5610), (3, 1, 3950), (3, 2, 3555), (3, 3, 3430),
        (4, 0, 5610), (4, 1, 3950), (4, 2, 3555), (4, 3, 3430),
        (5, 0, 4720), (5, 1, 3550), (5, 2, 3140), (5, 3, 3030),
        (6, 0, 5415), (6, 1, 4125), (6, 2, 3735), (6, 3, 3605)
    ) as v(season_pos, band_pos, price)
      on s.position = v.season_pos
    where s.tier_id = v_tier_id
      and c.season_id = s.id
      and c.band_position = v.band_pos;

    update public.tours
    set
      pricing_table_keys = '["mid_range"]'::jsonb,
      price_from = 2585,
      updated_at = now()
    where id = v_tour_id;
  end if;
end $$;
