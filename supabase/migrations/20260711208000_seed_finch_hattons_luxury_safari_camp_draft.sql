-- Seed draft: Finch Hattons Luxury Safari Camp (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'finch-hattons-luxury-safari-camp'
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
    'High-End Luxury Tented Safari Camp',
    'ultra-luxury',
    'on_request',
    null,
    '[
      "Luxury en-suite tented suites",
      "Private viewing decks",
      "Restaurant",
      "Bar and lounge",
      "Outdoor swimming pool",
      "Spa and wellness facilities",
      "Yoga and relaxation spaces",
      "Fine dining experiences",
      "Garden and outdoor seating areas",
      "Free Wi-Fi in selected areas",
      "Room service",
      "Laundry service",
      "Family-friendly accommodation",
      "Full-board meal options",
      "Guided game drives",
      "Birdwatching opportunities",
      "Scenic spring and wilderness views",
      "Transfer arrangements",
      "Reception support",
      "Tsavo West National Park access"
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
    'finch-hattons-luxury-safari-camp',
    'Finch Hattons Luxury Safari Camp',
    'Finch Hattons Luxury Safari Camp is an exclusive tented camp in Tsavo West, offering elegant suites, fine dining, wellness experiences, scenic views, and premium access to Tsavo’s wildlife, springs, and volcanic landscapes.',
    jsonb_build_object(
      'html',
      $description$<p>Finch Hattons Luxury Safari Camp is one of Tsavo West’s most refined safari stays, created for travelers who want privacy, elegance, and a deeper wilderness experience. Set within the dramatic landscapes of Tsavo West National Park, the camp offers a peaceful setting surrounded by natural springs, open bush, wildlife, and views that capture the wild beauty of southern Kenya.</p><p>For guests booking with Benroso Safaris, Finch Hattons works beautifully for high-end Tsavo West safari packages, honeymoon safaris, private Kenya safaris, luxury fly-in safaris, and premium safari circuits connecting Tsavo West with Tsavo East, Amboseli, Nairobi, Mombasa, or Diani. It is especially suitable for travelers who want a quieter and more exclusive alternative to the busier safari routes.</p><p>The camp blends classic safari charm with modern luxury, offering spacious tented suites, refined dining, wellness facilities, guided activities, and serene outdoor spaces where guests can relax between game drives. With Benroso Safaris, Finch Hattons Luxury Safari Camp can be included in luxury Tsavo itineraries for guests who want comfort, scenery, wildlife, and a truly polished safari experience.</p>$description$
    ),
    'Finch Hattons Luxury Safari Camp',
    'Book Finch Hattons with Benroso Safaris for a high-end Tsavo West safari stay with luxury tents, fine dining, wellness, and game drives.',
    'Finch Hattons Luxury Safari Camp',
    '["Finch Hattons Kenya","luxury Tsavo West camp","high-end Tsavo safari accommodation","Tsavo West tented camp","Kenya luxury safari lodge"]'::jsonb,
    null,
    v_now
  );
end $$;
