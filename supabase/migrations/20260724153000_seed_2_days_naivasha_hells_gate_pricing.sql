-- Seed Kenya seasonal pricing for 2 Days Lake Naivasha & Hell's Gate Adventure Safari.

do $$
declare
  v_tour_id uuid;
  v_tier_id uuid;
  v_exp_short_id uuid;
  v_now timestamptz := now();
begin
  select t.id, pt.id
  into v_tour_id, v_tier_id
  from public.tours t
  join public.tour_translations tt on tt.tour_id = t.id and tt.locale = 'en'
  join public.tour_pricing_tiers pt on pt.tour_id = t.id and pt.tier = 'mid_range'
  where tt.slug = '2-days-lake-naivasha-and-hells-gate-safari'
  limit 1;

  if v_tour_id is null or v_tier_id is null then
    return;
  end if;

  update public.tour_pricing_cells c
  set price = v.price
  from public.tour_pricing_seasons s
  join (
    values
      (0, 0, 990), (0, 1, 620), (0, 2, 450), (0, 3, 435),
      (1, 0, 885), (1, 1, 575), (1, 2, 440), (1, 3, 390),
      (2, 0, 1020), (2, 1, 645), (2, 2, 505), (2, 3, 460),
      (3, 0, 1035), (3, 1, 635), (3, 2, 480), (3, 3, 430),
      (4, 0, 1035), (4, 1, 635), (4, 2, 480), (4, 3, 430),
      (5, 0, 1035), (5, 1, 635), (5, 2, 480), (5, 3, 430),
      (6, 0, 1035), (6, 1, 635), (6, 2, 480), (6, 3, 430)
  ) as v(season_pos, band_pos, price)
    on s.position = v.season_pos
  where s.tier_id = v_tier_id
    and c.season_id = s.id
    and c.band_position = v.band_pos;

  update public.tours
  set
    pricing_table_keys = '["mid_range"]'::jsonb,
    price_from = 390,
    updated_at = v_now
  where id = v_tour_id;

  update public.tour_translations
  set
    title = '2 Days Lake Naivasha & Hell''s Gate Adventure Safari',
    updated_at = v_now
  where tour_id = v_tour_id and locale = 'en';

  select e.id
  into v_exp_short_id
  from public.experiences e
  join public.experience_translations et on et.experience_id = e.id
  where et.locale = 'en' and et.slug = 'short-safaris'
  limit 1;

  if v_exp_short_id is not null then
    insert into public.tour_experiences (tour_id, experience_id, position)
    values (v_tour_id, v_exp_short_id, 0)
    on conflict (tour_id, experience_id) do nothing;
  end if;
end $$;
