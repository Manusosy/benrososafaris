-- Seed draft: Kilaguni Serena Safari Lodge (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'kilaguni-serena-safari-lodge'
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
    'Mid-Range Safari Lodge',
    'mid-range',
    'on_request',
    null,
    '[
      "Comfortable en-suite rooms",
      "Private balconies / verandas",
      "Restaurant",
      "Bar and lounge",
      "Outdoor swimming pool",
      "Garden and outdoor seating areas",
      "Waterhole views",
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
      "Scenic Tsavo West views",
      "Transfer arrangements",
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
    'kilaguni-serena-safari-lodge',
    'Kilaguni Serena Safari Lodge',
    'Kilaguni Serena Safari Lodge is a scenic Tsavo West safari lodge offering comfortable rooms, dining, a pool, waterhole views, and easy access to game drives, volcanic landscapes, wildlife, and Mount Kilimanjaro scenery.',
    jsonb_build_object(
      'html',
      $description$<p>Kilaguni Serena Safari Lodge is a beautiful stay for travelers exploring Tsavo West National Park, a destination known for dramatic lava flows, rolling hills, springs, wildlife, and wide wilderness views. The lodge is especially appealing for guests who want comfort, scenery, and the chance to enjoy wildlife activity around the lodge’s waterhole.</p><p>For guests booking with Benroso Safaris, Kilaguni Serena Safari Lodge works well for mid-range Tsavo West safari packages, family safaris, private Kenya safaris, photography trips, and road safari itineraries connecting Tsavo West with Tsavo East, Amboseli, Mombasa, Diani, or Nairobi. It is especially suitable for travelers interested in elephants, buffaloes, lions, leopards, birdlife, Mzima Springs, Shetani Lava Flow, and the wider Tsavo wilderness.</p><p>The lodge offers a calm safari atmosphere with comfortable rooms, dining spaces, outdoor relaxation areas, and scenic views that make it easy to unwind between game drives. With Benroso Safaris, Kilaguni Serena Safari Lodge can be included in 2-day, 3-day, or longer Tsavo safari itineraries for guests who want a smooth mix of wildlife, comfort, and classic Kenya safari scenery.</p>$description$
    ),
    'Kilaguni Serena Safari Lodge',
    'Book Kilaguni Serena Safari Lodge with Benroso Safaris for a scenic Tsavo West stay with waterhole views, dining, pool, and game drives.',
    'Kilaguni Serena Safari Lodge',
    '["Kilaguni Serena Safari Lodge Kenya","Tsavo West safari lodge","mid-range Tsavo accommodation","Kenya safari lodge","Tsavo safari accommodation"]'::jsonb,
    null,
    v_now
  );
end $$;
