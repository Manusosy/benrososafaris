-- Seed draft: Severin Safari Camp (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'severin-safari-camp'
  ) then
    return;
  end if;

  select d.id
  into v_destination_id
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'tsavo-west-national-park'
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
    'Tsavo West National Park',
    v_destination_id,
    'Luxury Tented Safari Camp',
    'luxury',
    'on_request',
    null,
    '[
      "Luxury en-suite safari tents",
      "Private verandas",
      "Restaurant",
      "Bar and lounge",
      "Outdoor swimming pool",
      "Spa and wellness facilities",
      "Garden and outdoor seating areas",
      "Free Wi-Fi in selected areas",
      "Private parking",
      "Room service",
      "Laundry service",
      "Family-friendly accommodation",
      "Full-board meal options",
      "Guided game drives",
      "Birdwatching opportunities",
      "Scenic Tsavo wilderness views",
      "Transfer arrangements",
      "Reception support",
      "Tsavo West National Park access",
      "Safari planning support"
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
    'severin-safari-camp',
    'Severin Safari Camp',
    'Severin Safari Camp is a luxury tented camp in Tsavo West, offering elegant tents, dining, a pool, wellness facilities, and access to game drives, volcanic scenery, wildlife, and classic Tsavo wilderness.',
    jsonb_build_object(
      'html',
      $description$<p>Severin Safari Camp is a beautiful choice for travelers who want a peaceful and comfortable tented safari stay in Tsavo West National Park. The camp offers a classic wilderness atmosphere with open landscapes, natural scenery, and easy access to the wildlife and dramatic volcanic features that make Tsavo West one of Kenya’s most rewarding safari destinations.</p><p>For guests booking with Benroso Safaris, Severin Safari Camp works well for luxury Tsavo West safari packages, honeymoon safaris, private Kenya safaris, family trips, and combined Tsavo itineraries from Nairobi, Mombasa, or Diani. It is especially suitable for travelers who want to enjoy elephants, lions, buffaloes, birdlife, Mzima Springs, Shetani Lava Flow, and the wide, quiet beauty of Tsavo.</p><p>The camp combines tented safari charm with modern comfort, offering spacious en-suite tents, dining areas, outdoor relaxation spaces, a swimming pool, and wellness facilities. With Benroso Safaris, Severin Safari Camp can be included in 2-day, 3-day, or longer Tsavo safari itineraries linking Tsavo West with Tsavo East, Amboseli, Nairobi, or the Kenya coast.</p>$description$
    ),
    'Severin Safari Camp',
    'Book Severin Safari Camp with Benroso Safaris for a luxury Tsavo West tented stay with game drives, pool, wellness, and wilderness views.',
    'Severin Safari Camp',
    '["Severin Safari Camp Kenya","luxury Tsavo West camp","Tsavo West tented camp","Kenya safari accommodation","Tsavo safari lodge"]'::jsonb,
    null,
    v_now
  );
end $$;
