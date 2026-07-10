-- Seed Mt Kenya climbing routes linked to the mountain-climbing experience.

do $$
declare
  v_experience_id uuid;
  v_tour1_id uuid := gen_random_uuid();
  v_tour2_id uuid := gen_random_uuid();
  v_tour3_id uuid := gen_random_uuid();
  v_tier1_id uuid;
  v_tier2_id uuid;
  v_tier3_id uuid;
  v_season1_id uuid;
  v_season2_id uuid;
  v_season3_id uuid;
  v_now timestamptz := now();
begin
  select e.id
  into v_experience_id
  from public.experiences e
  join public.experience_translations et on et.experience_id = e.id
  where et.locale = 'en' and et.slug = 'mountain-climbing'
  limit 1;

  if v_experience_id is null then
    raise exception 'mountain-climbing experience not found';
  end if;

  if exists (
    select 1
    from public.tour_translations
    where locale = 'en' and slug = 'mt-kenya-burguret-chogoria-8-days'
  ) then
    return;
  end if;

  insert into public.tours (
    id,
    status,
    days,
    nights,
    price_from,
    countries,
    start_location,
    end_location,
    important_notice,
    inclusions,
    exclusions,
    itinerary_days,
    updated_at
  ) values
  (
    v_tour1_id,
    'published',
    8,
    7,
    1480,
    array['kenya']::text[],
    'Nairobi',
    'Nairobi',
    'Note: Solo travellers attract extra cost.',
    '["Guarantee trek on confirmation","Transport in public shared shuttle van","Meals whilst on the mountain","Accommodation in the tent as per the itinerary","All park entrance fees to include government taxes","Service of an English speaking guide, porters and skilled cook","Start and finish in Nairobi"]'::jsonb,
    '["Tips","All hiking gear including sleeping bag","Items of personal nature","Any other extras not detailed in the above itinerary"]'::jsonb,
    '[
      {"day":1,"title":"Nairobi - Nanyuki","description":"Transfer to Nanyuki for acclimatization at the base of Mt Kenya.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":2,"title":"Nanyuki - Giant Bamboo Camp","description":"Hiking distance 10km. Height 2000m - 2600m. Trek through dense forest and bamboo.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":3,"title":"Giant Bamboo Camp - Highland Castle","description":"Hiking distance 10km. Height 2600m - 3700m. Climb through podocarpus and rosewood zones.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":4,"title":"Highland Castle - Mackinder''s Camp","description":"Trek to Mackinder''s Camp at 4314m with views of the volcanic peaks.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":5,"title":"Mackinder''s Camp - Top Camp","description":"Ascend to Top Camp at 4790m for summit acclimatization.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":6,"title":"Top Camp - Lenana Summit - Lake Michaelson","description":"Summit Point Lenana at 4985m, then descend to Lake Michaelson.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":7,"title":"Lake Michaelson - Chogoria Anabas","description":"Hike down to Chogoria Anabas campsite at 2950m.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":8,"title":"Chogoria - Nairobi","description":"Walk to transfer point and return to Nairobi.","imageId":"","accommodationOptions":[],"mealPlan":""}
    ]'::jsonb,
    v_now
  ),
  (
    v_tour2_id,
    'published',
    5,
    4,
    925,
    array['kenya']::text[],
    'Nairobi',
    'Nairobi',
    'Note: Solo travellers attract extra cost.',
    '["Guarantee trek on confirmation","Transport in a comfortable public van","Meals whilst on the mountain","Accommodation in the tent as per the itinerary","All park entrance fees to include government taxes","Service of English speaking guide, porters and skilled cook","Start and finish in Nairobi"]'::jsonb,
    '["Tips","All hiking gear including sleeping bag","Items of personal nature","Any other extras not detailed in the above itinerary"]'::jsonb,
    '[
      {"day":1,"title":"Nanyuki - Sirimon Gate - Old Moses","description":"Hiking distance 9km. Height 2650m - 3300m. Trek from Sirimon gate through indigenous forest.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":2,"title":"Old Moses - Shipton''s Camp","description":"Hiking distance 14km. Height 3300m - 4200m. Long trek to Shipton''s camp below Batian and Nelion.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":3,"title":"Shipton''s Camp acclimatization","description":"Hiking distance 2km. Height 4200m - 4585m. Hike to Shipton''s col and return.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":4,"title":"Shipton''s - Lenana Summit - Chogoria Anabas","description":"Hiking distance 24km. Height 4200m - 4985m - 2950m. Summit then descend to Chogoria Anabas.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":5,"title":"Chogoria - Nairobi","description":"Drive through Chogoria forest to town and return to Nairobi.","imageId":"","accommodationOptions":[],"mealPlan":""}
    ]'::jsonb,
    v_now
  ),
  (
    v_tour3_id,
    'published',
    5,
    4,
    925,
    array['kenya']::text[],
    'Nairobi',
    'Nairobi',
    'Note: Solo travellers attract extra cost.',
    '["Guarantee trek on confirmation","Transport in a comfortable public van","Meals whilst on the mountain","Accommodation in the tent as per the itinerary","All park entrance fees to include government taxes","Service of English speaking guide, porters and skilled cook","Start and finish in Nairobi"]'::jsonb,
    '["Tips","All hiking gear including sleeping bag","Items of personal nature","Any other extras not detailed in the above itinerary"]'::jsonb,
    '[
      {"day":1,"title":"Nanyuki - Sirimon Gate - Old Moses","description":"Hiking distance 9km. Height 2650m - 3300m. Trek from Sirimon gate through indigenous forest.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":2,"title":"Old Moses - Shipton''s Camp","description":"Hiking distance 14km. Height 3300m - 4200m. Trek to Shipton''s camp below the highest peaks.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":3,"title":"Shipton''s - Lenana Summit - Hall''s Tarn","description":"Summit Point Lenana, then descend to Hall''s Tarn campsite.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":4,"title":"Hall''s Tarn - Chogoria Anabas","description":"Hiking distance 16km. Descend through gorges and valleys to Chogoria Anabas.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":5,"title":"Chogoria - Nairobi","description":"Drive through Chogoria forest to town and return to Nairobi.","imageId":"","accommodationOptions":[],"mealPlan":""}
    ]'::jsonb,
    v_now
  );

  insert into public.tour_translations (
    tour_id,
    locale,
    slug,
    title,
    excerpt,
    overview,
    seo_title,
    seo_description,
    published_at,
    updated_at
  ) values
  (
    v_tour1_id,
    'en',
    'mt-kenya-burguret-chogoria-8-days',
    '8 Days Mt Kenya: Burguret Route down Chogoria',
    'A classic 8-day traverse from the Burguret forest approach to the Chogoria descent, with summit night on Point Lenana.',
    '{"html":"<p>An 8-day Mt Kenya hiking itinerary via the Burguret route and Chogoria descent, with camping or hut accommodation options.</p>"}'::jsonb,
    '8 Days Mt Kenya Burguret to Chogoria | Benroso Safaris',
    'Hike Mt Kenya on the 8-day Burguret to Chogoria route with camping or hut prices, guided support, and park fees included.',
    v_now,
    v_now
  ),
  (
    v_tour2_id,
    'en',
    'mt-kenya-sirimon-chogoria-acclimatization-5-days',
    '5 Days Mt Kenya: Sirimon to Chogoria with Acclimatization',
    'The Sirimon approach with a dedicated acclimatization day at Shipton''s camp before the Lenana summit and Chogoria descent.',
    '{"html":"<p>A 5-day Sirimon to Chogoria route with an acclimatization day at Shipton''s camp for safer summit pacing.</p>"}'::jsonb,
    '5 Days Mt Kenya Sirimon Chogoria with Acclimatization | Benroso Safaris',
    '5-day Mt Kenya trek up Sirimon and down Chogoria with acclimatization day. Camping and hut prices per person.',
    v_now,
    v_now
  ),
  (
    v_tour3_id,
    'en',
    'mt-kenya-sirimon-chogoria-5-days',
    '5 Days Mt Kenya: Sirimon to Chogoria without Acclimatization',
    'A faster 5-day Sirimon to Chogoria traverse with summit push from Shipton''s and overnight at Hall''s Tarn.',
    '{"html":"<p>A 5-day Sirimon to Chogoria route without a separate acclimatization day, ideal for fit trekkers.</p>"}'::jsonb,
    '5 Days Mt Kenya Sirimon Chogoria | Benroso Safaris',
    '5-day Mt Kenya Sirimon to Chogoria trek without acclimatization day. Camping and hut prices per person.',
    v_now,
    v_now
  );

  insert into public.tour_experiences (tour_id, experience_id, position)
  values
    (v_tour1_id, v_experience_id, 0),
    (v_tour2_id, v_experience_id, 1),
    (v_tour3_id, v_experience_id, 2)
  on conflict do nothing;

  insert into public.tour_pricing_tiers (tour_id, tier, label, blurb, notes, currency, position)
  values
    (v_tour1_id, 'custom', 'Route pricing', 'Camping and hut prices for this climbing route.', 'Solo travellers attract extra cost.', 'USD', 0),
    (v_tour2_id, 'custom', 'Route pricing', 'Camping and hut prices for this climbing route.', 'Solo travellers attract extra cost.', 'USD', 0),
    (v_tour3_id, 'custom', 'Route pricing', 'Camping and hut prices for this climbing route.', 'Solo travellers attract extra cost.', 'USD', 0);

  select id into v_tier1_id from public.tour_pricing_tiers where tour_id = v_tour1_id;
  select id into v_tier2_id from public.tour_pricing_tiers where tour_id = v_tour2_id;
  select id into v_tier3_id from public.tour_pricing_tiers where tour_id = v_tour3_id;

  insert into public.tour_pricing_seasons (tier_id, label, position)
  values
    (v_tier1_id, 'Per person', 0),
    (v_tier2_id, 'Per person', 0),
    (v_tier3_id, 'Per person', 0);

  select id into v_season1_id from public.tour_pricing_seasons where tier_id = v_tier1_id;
  select id into v_season2_id from public.tour_pricing_seasons where tier_id = v_tier2_id;
  select id into v_season3_id from public.tour_pricing_seasons where tier_id = v_tier3_id;

  insert into public.tour_pricing_cells (season_id, group_band, band_position, price)
  values
    (v_season1_id, 'Camping', 0, 1480),
    (v_season1_id, 'Sleeping at hut', 1, 1600),
    (v_season2_id, 'Camping', 0, 925),
    (v_season2_id, 'Sleeping at hut', 1, 1000),
    (v_season3_id, 'Camping', 0, 925),
    (v_season3_id, 'Sleeping at hut', 1, 1000);
end $$;
