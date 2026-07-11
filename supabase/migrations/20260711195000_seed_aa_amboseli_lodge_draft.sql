-- Seed draft: AA Amboseli Lodge (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'aa-amboseli-lodge'
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
      "Family-friendly accommodation",
      "Conference and event facilities",
      "Breakfast and meal options",
      "Full-board meal options",
      "Game drive access",
      "Birdwatching opportunities",
      "Mount Kilimanjaro views nearby",
      "Transfer arrangements",
      "Reception support",
      "Amboseli National Park access",
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
    'aa-amboseli-lodge',
    'AA Amboseli Lodge',
    'AA Amboseli Lodge is an affordable safari lodge near Amboseli National Park, offering comfortable rooms, dining, a pool, and easy access to game drives, elephant sightings, and Mount Kilimanjaro views.',
    jsonb_build_object(
      'html',
      $description$<p>AA Amboseli Lodge is a practical choice for travelers who want a comfortable and budget-friendly stay near Amboseli National Park. The lodge offers easy access to one of Kenya’s most scenic safari destinations, famous for large elephant herds, open plains, swamp wildlife, birdlife, and beautiful views of Mount Kilimanjaro on clear days.</p><p>For guests booking with Benroso Safaris, AA Amboseli Lodge works well for economy Amboseli safari packages, family safaris, group tours, private Kenya road safaris, and short trips from Nairobi. It is especially suitable for travelers who want to experience Amboseli’s wildlife without choosing a high-end lodge.</p><p>The lodge offers a relaxed safari atmosphere with comfortable accommodation, dining areas, outdoor spaces, and a swimming pool where guests can unwind after morning and afternoon game drives. With Benroso Safaris, AA Amboseli Lodge can be included in 2-day, 3-day, or longer Kenya safari itineraries connecting Amboseli with Tsavo, Lake Naivasha, Lake Nakuru, or Maasai Mara.</p>$description$
    ),
    'AA Amboseli Lodge',
    'Book AA Amboseli Lodge with Benroso Safaris for affordable Amboseli accommodation near game drives, elephants, and Kilimanjaro views.',
    'AA Amboseli Lodge',
    '["AA Amboseli Lodge Kenya","budget Amboseli lodge","Amboseli safari accommodation","Kenya safari lodge","accommodation near Amboseli National Park"]'::jsonb,
    null,
    v_now
  );
end $$;
