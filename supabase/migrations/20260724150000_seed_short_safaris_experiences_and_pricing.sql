-- Add Short Safaris + Budget Camping Safaris to the Experiences dropdown,
-- seed Kenya seasonal pricing for four published 2-day short safaris,
-- and link those tours to Short Safaris.

do $$
declare
  v_exp_short_id uuid;
  v_exp_camping_id uuid;
  v_tour_id uuid;
  v_tier_id uuid;
  v_now timestamptz := now();
begin
  -- ---------------------------------------------------------------------------
  -- Experiences (nav dropdown via experience_menu_items view)
  -- ---------------------------------------------------------------------------
  if not exists (
    select 1 from public.experience_translations where locale = 'en' and slug = 'short-safaris'
  ) then
    v_exp_short_id := gen_random_uuid();

    insert into public.experiences (
      id, status, category, highlights, package_pricing, menu_group, menu_position,
      countries, layout_variant, updated_at
    ) values (
      v_exp_short_id,
      'published',
      'Short Safaris',
      '[
        "Compact 2 to 4 day Kenya safari itineraries",
        "Ideal for first-time visitors with limited time",
        "Lake Nakuru, Naivasha, Maasai Mara and Amboseli options",
        "Private 4x4 game drives with a driver-guide",
        "Mid-range lodge and tented camp stays",
        "Easy departures from Nairobi"
      ]'::jsonb,
      '[]'::jsonb,
      'wildlife_safari',
      2,
      array['kenya']::text[],
      'safari',
      v_now
    );

    insert into public.experience_translations (
      experience_id, locale, slug, title, summary, content,
      seo_title, seo_description, faqs, focus_keyword, keywords, published_at, updated_at
    ) values (
      v_exp_short_id,
      'en',
      'short-safaris',
      'Short Safaris',
      'Make the most of a short stay with Benroso Safaris short Kenya safaris. Choose compact 2 to 4 day itineraries to Lake Nakuru, Lake Naivasha, Maasai Mara, or Amboseli without long itineraries.',
      jsonb_build_object(
        'html',
        $html$<p>Short safaris are designed for travellers who want a focused wildlife experience in a limited amount of time. These compact itineraries typically run for two to four days and concentrate on one or two parks close enough to Nairobi for an efficient road safari.</p><p>Popular short safari options include Lake Nakuru, Lake Naivasha, Maasai Mara, and Amboseli. Each route balances travel time with game drives so guests spend more of their holiday watching wildlife rather than transferring between destinations.</p><p>Benroso Safaris plans short safaris around private 4x4 game drives, carefully timed departures from Nairobi, and comfortable mid-range lodges or tented camps. They work well for first-time visitors, couples, families, and guests adding a safari to a Kenya city or beach holiday.</p>$html$
      ),
      'Short Safaris Kenya | 2 to 4 Day Wildlife Trips',
      'Book short Kenya safaris with Benroso Safaris. Compact 2 to 4 day trips to Lake Nakuru, Naivasha, Maasai Mara, and Amboseli.',
      '[
        {"question":"How long is a short safari?","answer":"Most short safaris run for 2 to 4 days, depending on the parks included and your travel pace."},
        {"question":"Which parks work best for short safaris?","answer":"Lake Nakuru, Lake Naivasha, Maasai Mara, and Amboseli are the most popular short safari destinations from Nairobi."},
        {"question":"Are short safaris private?","answer":"Yes. Benroso Safaris short safari packages are arranged as private guided experiences unless a shared departure is specifically requested."}
      ]'::jsonb,
      'Short Safaris',
      '["short Kenya safari","2 day safari Kenya","weekend safari Nairobi","Lake Nakuru short safari","Maasai Mara short safari"]'::jsonb,
      v_now,
      v_now
    );
  else
    select e.id into v_exp_short_id
    from public.experiences e
    join public.experience_translations et on et.experience_id = e.id
    where et.locale = 'en' and et.slug = 'short-safaris'
    limit 1;

    update public.experiences
    set
      status = 'published',
      category = 'Short Safaris',
      menu_group = 'wildlife_safari',
      menu_position = 2,
      countries = array['kenya']::text[],
      updated_at = v_now
    where id = v_exp_short_id;

    update public.experience_translations
    set published_at = coalesce(published_at, v_now), updated_at = v_now
    where experience_id = v_exp_short_id and locale = 'en';
  end if;

  if not exists (
    select 1 from public.experience_translations where locale = 'en' and slug = 'budget-camping-safaris'
  ) then
    v_exp_camping_id := gen_random_uuid();

    insert into public.experiences (
      id, status, category, highlights, package_pricing, menu_group, menu_position,
      countries, layout_variant, updated_at
    ) values (
      v_exp_camping_id,
      'published',
      'Budget Camping Safaris',
      '[
        "Affordable camping safari options across Kenya",
        "Shared or private budget camping departures",
        "Classic parks such as Maasai Mara, Amboseli and Nakuru",
        "Experienced driver-guides and safari cook support",
        "Ideal for backpackers and value-focused travellers",
        "Custom budget camping itineraries available"
      ]'::jsonb,
      '[]'::jsonb,
      'wildlife_safari',
      4,
      array['kenya']::text[],
      'safari',
      v_now
    );

    insert into public.experience_translations (
      experience_id, locale, slug, title, summary, content,
      seo_title, seo_description, faqs, focus_keyword, keywords, published_at, updated_at
    ) values (
      v_exp_camping_id,
      'en',
      'budget-camping-safaris',
      'Budget Camping Safaris',
      'Explore Kenya on a budget with Benroso Safaris camping safaris. Enjoy classic wildlife parks, campfire evenings, and affordable guided game drives without sacrificing the adventure.',
      jsonb_build_object(
        'html',
        $html$<p>Budget camping safaris are a practical way to experience Kenya’s national parks while keeping costs lower than lodge-based itineraries. Guests stay in tents at designated campsites, travel with an experienced driver-guide, and enjoy game drives in parks such as Maasai Mara, Amboseli, Lake Nakuru, and Tsavo.</p><p>These safaris suit backpackers, student groups, adventure travellers, and anyone who wants a classic camping safari atmosphere with good value. Meals are usually prepared by a safari cook, and itineraries can be arranged as shared departures or private camping trips.</p><p>Benroso Safaris helps match the right parks, camping style, and travel pace so your budget safari still feels well organised, safe, and wildlife-focused.</p>$html$
      ),
      'Budget Camping Safaris Kenya | Affordable Wildlife Trips',
      'Book budget camping safaris in Kenya with Benroso Safaris. Affordable camping itineraries to Maasai Mara, Amboseli, Nakuru, and more.',
      '[
        {"question":"What is included in a budget camping safari?","answer":"Typical inclusions are transport in a safari vehicle, camping equipment, a cook, meals on safari, park fees where stated, and guided game drives. Exact inclusions depend on the package."},
        {"question":"Are budget camping safaris comfortable?","answer":"Camping is simpler than lodge stays, but tents, mattresses, and camp meals keep the experience practical. It suits travellers who prioritise wildlife time and value."},
        {"question":"Can budget camping safaris be private?","answer":"Yes. Benroso Safaris can arrange private camping safaris or advise on shared budget camping departures when available."}
      ]'::jsonb,
      'Budget Camping Safaris',
      '["budget camping safari Kenya","cheap Kenya safari camping","Maasai Mara camping safari","affordable Kenya safari","camping safari from Nairobi"]'::jsonb,
      v_now,
      v_now
    );
  else
    select e.id into v_exp_camping_id
    from public.experiences e
    join public.experience_translations et on et.experience_id = e.id
    where et.locale = 'en' and et.slug = 'budget-camping-safaris'
    limit 1;

    update public.experiences
    set
      status = 'published',
      category = 'Budget Camping Safaris',
      menu_group = 'wildlife_safari',
      menu_position = 4,
      countries = array['kenya']::text[],
      updated_at = v_now
    where id = v_exp_camping_id;

    update public.experience_translations
    set published_at = coalesce(published_at, v_now), updated_at = v_now
    where experience_id = v_exp_camping_id and locale = 'en';
  end if;

  if v_exp_short_id is null then
    select e.id into v_exp_short_id
    from public.experiences e
    join public.experience_translations et on et.experience_id = e.id
    where et.locale = 'en' and et.slug = 'short-safaris'
    limit 1;
  end if;

  -- ---------------------------------------------------------------------------
  -- Pricing: 2 Days Lake Nakuru and Lake Naivasha Safari
  -- ---------------------------------------------------------------------------
  select t.id, pt.id
  into v_tour_id, v_tier_id
  from public.tours t
  join public.tour_translations tt on tt.tour_id = t.id and tt.locale = 'en'
  join public.tour_pricing_tiers pt on pt.tour_id = t.id and pt.tier = 'mid_range'
  where tt.slug = '2-days-lake-nakuru-and-lake-naivasha-safari'
  limit 1;

  if v_tour_id is not null and v_tier_id is not null then
    update public.tour_pricing_cells c
    set price = v.price
    from public.tour_pricing_seasons s
    join (
      values
        (0, 0, 1055), (0, 1, 680), (0, 2, 545), (0, 3, 495),
        (1, 0, 945), (1, 1, 640), (1, 2, 500), (1, 3, 450),
        (2, 0, 1080), (2, 1, 705), (2, 2, 565), (2, 3, 520),
        (3, 0, 1095), (3, 1, 700), (3, 2, 540), (3, 3, 490),
        (4, 0, 1095), (4, 1, 700), (4, 2, 540), (4, 3, 490),
        (5, 0, 1095), (5, 1, 700), (5, 2, 540), (5, 3, 490),
        (6, 0, 1095), (6, 1, 700), (6, 2, 540), (6, 3, 490)
    ) as v(season_pos, band_pos, price)
      on s.position = v.season_pos
    where s.tier_id = v_tier_id
      and c.season_id = s.id
      and c.band_position = v.band_pos;

    update public.tours
    set pricing_table_keys = '["mid_range"]'::jsonb, price_from = 450, updated_at = v_now
    where id = v_tour_id;

    update public.tour_translations
    set
      title = '2 Days Lake Nakuru & Lake Naivasha Safari – Rift Valley Adventure',
      updated_at = v_now
    where tour_id = v_tour_id and locale = 'en';

    if v_exp_short_id is not null then
      insert into public.tour_experiences (tour_id, experience_id, position)
      values (v_tour_id, v_exp_short_id, 0)
      on conflict (tour_id, experience_id) do nothing;
    end if;
  end if;

  -- ---------------------------------------------------------------------------
  -- Pricing: 2 Days Lake Nakuru Wildlife Safari
  -- ---------------------------------------------------------------------------
  select t.id, pt.id
  into v_tour_id, v_tier_id
  from public.tours t
  join public.tour_translations tt on tt.tour_id = t.id and tt.locale = 'en'
  join public.tour_pricing_tiers pt on pt.tour_id = t.id and pt.tier = 'mid_range'
  where tt.slug = '2-days-lake-nakuru-wildlife-safari'
  limit 1;

  if v_tour_id is not null and v_tier_id is not null then
    update public.tour_pricing_cells c
    set price = v.price
    from public.tour_pricing_seasons s
    join (
      values
        (0, 0, 1105), (0, 1, 730), (0, 2, 590), (0, 3, 540),
        (1, 0, 970), (1, 1, 660), (1, 2, 520), (1, 3, 475),
        (2, 0, 970), (2, 1, 660), (2, 2, 520), (2, 3, 475),
        (3, 0, 1160), (3, 1, 755), (3, 2, 595), (3, 3, 545),
        (4, 0, 1145), (4, 1, 745), (4, 2, 585), (4, 3, 535),
        (5, 0, 1145), (5, 1, 745), (5, 2, 585), (5, 3, 535),
        (6, 0, 1205), (6, 1, 795), (6, 2, 635), (6, 3, 585)
    ) as v(season_pos, band_pos, price)
      on s.position = v.season_pos
    where s.tier_id = v_tier_id
      and c.season_id = s.id
      and c.band_position = v.band_pos;

    update public.tours
    set pricing_table_keys = '["mid_range"]'::jsonb, price_from = 475, updated_at = v_now
    where id = v_tour_id;

    update public.tour_translations
    set
      title = '2 Days Lake Nakuru Wildlife Safari – Rhino & Birding Experience',
      updated_at = v_now
    where tour_id = v_tour_id and locale = 'en';

    if v_exp_short_id is not null then
      insert into public.tour_experiences (tour_id, experience_id, position)
      values (v_tour_id, v_exp_short_id, 0)
      on conflict (tour_id, experience_id) do nothing;
    end if;
  end if;

  -- ---------------------------------------------------------------------------
  -- Pricing: 2 Days Maasai Mara Safari from Nairobi
  -- ---------------------------------------------------------------------------
  select t.id, pt.id
  into v_tour_id, v_tier_id
  from public.tours t
  join public.tour_translations tt on tt.tour_id = t.id and tt.locale = 'en'
  join public.tour_pricing_tiers pt on pt.tour_id = t.id and pt.tier = 'mid_range'
  where tt.slug = '2-days-maasai-mara-safari-from-nairobi'
  limit 1;

  if v_tour_id is not null and v_tier_id is not null then
    update public.tour_pricing_cells c
    set price = v.price
    from public.tour_pricing_seasons s
    join (
      values
        (0, 0, 1225), (0, 1, 785), (0, 2, 590), (0, 3, 525),
        (1, 0, 1165), (1, 1, 740), (1, 2, 545), (1, 3, 485),
        (2, 0, 1165), (2, 1, 740), (2, 2, 545), (2, 3, 485),
        (3, 0, 1510), (3, 1, 1070), (3, 2, 875), (3, 3, 810),
        (4, 0, 1430), (4, 1, 995), (4, 2, 800), (4, 3, 735),
        (5, 0, 1375), (5, 1, 955), (5, 2, 760), (5, 3, 700),
        (6, 0, 1430), (6, 1, 995), (6, 2, 800), (6, 3, 740)
    ) as v(season_pos, band_pos, price)
      on s.position = v.season_pos
    where s.tier_id = v_tier_id
      and c.season_id = s.id
      and c.band_position = v.band_pos;

    update public.tours
    set pricing_table_keys = '["mid_range"]'::jsonb, price_from = 485, updated_at = v_now
    where id = v_tour_id;

    update public.tour_translations
    set
      title = '2 Days Maasai Mara Safari – Big Five Experience',
      updated_at = v_now
    where tour_id = v_tour_id and locale = 'en';

    if v_exp_short_id is not null then
      insert into public.tour_experiences (tour_id, experience_id, position)
      values (v_tour_id, v_exp_short_id, 0)
      on conflict (tour_id, experience_id) do nothing;
    end if;
  end if;

  -- ---------------------------------------------------------------------------
  -- Pricing: 2 Days Amboseli Safari from Nairobi
  -- ---------------------------------------------------------------------------
  select t.id, pt.id
  into v_tour_id, v_tier_id
  from public.tours t
  join public.tour_translations tt on tt.tour_id = t.id and tt.locale = 'en'
  join public.tour_pricing_tiers pt on pt.tour_id = t.id and pt.tier = 'mid_range'
  where tt.slug = '2-days-amboseli-safari-from-nairobi'
  limit 1;

  if v_tour_id is not null and v_tier_id is not null then
    update public.tour_pricing_cells c
    set price = v.price
    from public.tour_pricing_seasons s
    join (
      values
        (0, 0, 995), (0, 1, 620), (0, 2, 480), (0, 3, 430),
        (1, 0, 945), (1, 1, 585), (1, 2, 445), (1, 3, 400),
        (2, 0, 1075), (2, 1, 675), (2, 2, 535), (2, 3, 485),
        (3, 0, 1075), (3, 1, 675), (3, 2, 535), (3, 3, 485),
        (4, 0, 1075), (4, 1, 675), (4, 2, 535), (4, 3, 485),
        (5, 0, 1035), (5, 1, 635), (5, 2, 475), (5, 3, 425),
        (6, 0, 1110), (6, 1, 685), (6, 2, 530), (6, 3, 475)
    ) as v(season_pos, band_pos, price)
      on s.position = v.season_pos
    where s.tier_id = v_tier_id
      and c.season_id = s.id
      and c.band_position = v.band_pos;

    update public.tours
    set pricing_table_keys = '["mid_range"]'::jsonb, price_from = 400, updated_at = v_now
    where id = v_tour_id;

    update public.tour_translations
    set
      title = '2 Days Amboseli Safari – Kilimanjaro Views & Elephants',
      updated_at = v_now
    where tour_id = v_tour_id and locale = 'en';

    if v_exp_short_id is not null then
      insert into public.tour_experiences (tour_id, experience_id, position)
      values (v_tour_id, v_exp_short_id, 0)
      on conflict (tour_id, experience_id) do nothing;
    end if;
  end if;
end $$;
