-- Seed draft: Ngulia Safari Lodge (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'ngulia-safari-lodge'
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
    'Economy Safari Lodge',
    'economy',
    'on_request',
    null,
    '[
      "Comfortable en-suite rooms",
      "Restaurant",
      "Bar and lounge",
      "Outdoor swimming pool",
      "Garden and outdoor seating areas",
      "Free Wi-Fi in selected areas",
      "Private parking",
      "Room service",
      "Laundry service",
      "Gift shop",
      "Family-friendly accommodation",
      "Breakfast and meal options",
      "Full-board meal options",
      "Game drive access",
      "Birdwatching opportunities",
      "Rhino viewing opportunities nearby",
      "Scenic hill views",
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
    'ngulia-safari-lodge',
    'Ngulia Safari Lodge',
    'Ngulia Safari Lodge is an affordable safari lodge in Tsavo West, offering comfortable rooms, dining, dramatic views, and easy access to game drives, rhino territory, volcanic landscapes, and classic Tsavo wildlife.',
    jsonb_build_object(
      'html',
      $description$<p>Ngulia Safari Lodge is a practical and scenic stay for travelers exploring Tsavo West National Park, a destination known for rugged hills, lava flows, springs, wildlife, and beautiful wilderness views. The lodge is well suited for guests who want affordable comfort inside the Tsavo safari circuit without losing the feeling of being close to nature.</p><p>For guests booking with Benroso Safaris, Ngulia Safari Lodge works well for economy Tsavo West safari packages, family safaris, group tours, short safaris from Mombasa, Diani, or Nairobi, and Kenya road safari itineraries connecting Tsavo West with Tsavo East, Amboseli, or the coast. It is especially suitable for travelers interested in rhinos, elephants, leopards, buffaloes, birdlife, and the dramatic scenery that makes Tsavo West different from other Kenya parks.</p><p>The lodge offers comfortable accommodation, dining areas, outdoor relaxation spaces, and wide views over the surrounding landscape. With Benroso Safaris, Ngulia Safari Lodge can be included in 2-day, 3-day, or longer Tsavo safari itineraries for guests who want value, scenery, and rewarding wildlife experiences.</p>$description$
    ),
    'Ngulia Safari Lodge',
    'Book Ngulia Safari Lodge with Benroso Safaris for affordable Tsavo West accommodation with scenic views, game drives, and wildlife access.',
    'Ngulia Safari Lodge',
    '["Ngulia Safari Lodge Kenya","budget Tsavo West lodge","Tsavo West accommodation","Kenya safari lodge","Tsavo safari accommodation"]'::jsonb,
    null,
    v_now
  );
end $$;
