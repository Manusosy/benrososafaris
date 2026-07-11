-- Seed draft: Angama Amboseli (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'angama-amboseli'
  ) then
    return;
  end if;

  select d.id
  into v_destination_id
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'amboseli-national-park'
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
    'Amboseli National Park',
    v_destination_id,
    'High-End Luxury Safari Lodge / Private Conservancy Camp',
    'ultra-luxury',
    'on_request',
    null,
    '[
      "Luxury en-suite suites",
      "Private verandas / viewing decks",
      "Restaurant",
      "Bar and lounge",
      "Outdoor swimming pool",
      "Garden and outdoor relaxation areas",
      "Fine dining experiences",
      "Free Wi-Fi in selected areas",
      "Private parking",
      "Room service",
      "Laundry service",
      "Full-board meal options",
      "Guided game drives",
      "Walking safari arrangements",
      "Birdwatching opportunities",
      "Photography-friendly setting",
      "Mount Kilimanjaro views",
      "Elephant viewing opportunities",
      "Transfer arrangements",
      "Private conservancy safari access"
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
    'angama-amboseli',
    'Angama Amboseli',
    'Angama Amboseli is a high-end luxury safari lodge in the Amboseli ecosystem, offering elegant suites, private conservancy access, fine dining, guided activities, and exceptional views of Mount Kilimanjaro.',
    jsonb_build_object(
      'html',
      $description$<p>Angama Amboseli is an exclusive safari stay for travelers who want privacy, elegance, and a deeper connection to the Amboseli landscape. Set within the wider Amboseli ecosystem, the lodge offers a refined wilderness experience with sweeping views of Mount Kilimanjaro, open plains, and access to some of Kenya’s most iconic elephant country.</p><p>For guests booking with Benroso Safaris, Angama Amboseli is ideal for high-end Amboseli safari packages, honeymoon safaris, luxury fly-in safaris, private Kenya safaris, photography trips, and premium Kenya itineraries. It is especially suitable for travelers who want a more intimate setting, polished service, and a quieter safari rhythm away from the busiest lodge areas.</p><p>The lodge combines modern safari design with warm hospitality, offering spacious suites, beautiful outdoor spaces, dining experiences, and guided activities that make the stay feel personal and memorable. With Benroso Safaris, Angama Amboseli can be included in luxury Kenya safari circuits connecting Amboseli with Nairobi, Maasai Mara, Tsavo, Lake Naivasha, Lake Nakuru, or the Kenya coast.</p>$description$
    ),
    'Angama Amboseli',
    'Book Angama Amboseli with Benroso Safaris for a high-end Amboseli safari stay with Kilimanjaro views, elephants, luxury suites, and guided activities.',
    'Angama Amboseli',
    '["Angama Amboseli Kenya","high-end Amboseli lodge","luxury Amboseli safari","Mount Kilimanjaro safari lodge","Kenya luxury safari accommodation"]'::jsonb,
    null,
    v_now
  );
end $$;
