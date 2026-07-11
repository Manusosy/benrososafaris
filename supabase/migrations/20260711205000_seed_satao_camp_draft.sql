-- Seed draft: Satao Camp (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'satao-camp'
  ) then
    return;
  end if;

  select d.id
  into v_destination_id
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'tsavo-east-national-park'
  limit 1;

  insert into public.accommodations (
    id,
    status,
    country,
    region,
    destination_id,
    property_type,
    comfort_level,
    availability,
    price_per_night,
    amenities,
    gallery,
    map_query,
    updated_at
  ) values (
    v_accommodation_id,
    'draft',
    'Kenya',
    'Tsavo East National Park',
    v_destination_id,
    'Luxury Tented Safari Camp',
    'luxury',
    'on_request',
    null,
    '[
      "Luxury en-suite safari tents",
      "Private verandas",
      "Waterhole views",
      "Restaurant",
      "Bar and lounge",
      "Outdoor seating areas",
      "Campfire area",
      "Free Wi-Fi in selected areas",
      "Private parking",
      "Room service",
      "Laundry service",
      "Family-friendly accommodation",
      "Full-board meal options",
      "Guided game drives",
      "Birdwatching opportunities",
      "Tsavo red elephant viewing",
      "Photography-friendly setting",
      "Transfer arrangements",
      "Reception support",
      "Tsavo East National Park access"
    ]'::jsonb,
    '[]'::jsonb,
    null,
    v_now
  );

  insert into public.accommodation_translations (
    accommodation_id,
    locale,
    slug,
    name,
    summary,
    description,
    seo_title,
    seo_description,
    focus_keyword,
    keywords,
    published_at,
    updated_at
  ) values (
    v_accommodation_id,
    'en',
    'satao-camp',
    'Satao Camp',
    'Satao Camp is a luxury tented safari camp in Tsavo East, offering spacious tents, waterhole views, dining, guided game drives, and a classic wilderness experience among Tsavo’s red elephants and open plains.',
    jsonb_build_object(
      'html',
      $description$<p>Satao Camp is a beautiful choice for travelers who want a deeper and more natural safari experience in Tsavo East National Park. Set in a quiet wilderness area, the camp is known for its classic tented atmosphere, peaceful surroundings, and rewarding wildlife viewing, especially around the camp’s waterhole where animals may gather during the day.</p><p>For guests booking with Benroso Safaris, Satao Camp works well for luxury Tsavo East safari packages, honeymoon safaris, photography trips, private Kenya safaris, and short safaris from Mombasa, Diani, or Nairobi. It is especially suitable for travelers who want to experience Tsavo’s red elephants, lions, buffaloes, giraffes, zebras, antelopes, birdlife, and wide-open landscapes in a more intimate camp setting.</p><p>The camp offers spacious en-suite tents, dining spaces, outdoor relaxation areas, and a warm safari atmosphere that keeps guests close to nature without losing comfort. With Benroso Safaris, Satao Camp can be included in 2-day, 3-day, or longer Tsavo itineraries connecting Tsavo East with Tsavo West, Amboseli, Taita Hills, or the Kenya coast.</p>$description$
    ),
    'Satao Camp',
    'Book Satao Camp with Benroso Safaris for a luxury Tsavo East tented safari stay with waterhole views, red elephants, and game drives.',
    'Satao Camp',
    '["Satao Camp Kenya","luxury Tsavo East camp","Tsavo East tented camp","Kenya safari accommodation","Tsavo safari lodge"]'::jsonb,
    null,
    v_now
  );
end $$;
