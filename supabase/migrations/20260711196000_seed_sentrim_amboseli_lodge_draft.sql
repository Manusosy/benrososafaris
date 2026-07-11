-- Seed draft: Sentrim Amboseli Lodge (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'sentrim-amboseli-lodge'
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
    'Economy Safari Lodge / Tented Safari Camp',
    'economy',
    'on_request',
    null,
    '[
      "En-suite tented rooms",
      "Private verandas",
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
      "Amboseli National Park access"
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
    'sentrim-amboseli-lodge',
    'Sentrim Amboseli Lodge',
    'Sentrim Amboseli Lodge is an affordable safari lodge near Amboseli National Park, offering tented rooms, dining, a pool, and easy access to elephant sightings, birdlife, game drives, and Mount Kilimanjaro views.',
    jsonb_build_object(
      'html',
      $description$<p>Sentrim Amboseli Lodge is a good option for travelers looking for a comfortable and budget-conscious stay near Amboseli National Park. The lodge offers a classic safari atmosphere with tented accommodation and easy access to one of Kenya’s most loved wildlife destinations, famous for its large elephant herds and dramatic Mount Kilimanjaro backdrop.</p><p>For guests booking with Benroso Safaris, Sentrim Amboseli Lodge works well for economy Amboseli safari packages, group joining safaris, family trips, student tours, and private Kenya road safaris from Nairobi. It is especially suitable for travelers who want a simple but enjoyable safari stay close to Amboseli’s game drive routes.</p><p>The lodge provides a relaxed setting with en-suite tents, dining facilities, outdoor areas, and a swimming pool where guests can unwind between safari activities. With Benroso Safaris, Sentrim Amboseli Lodge can be included in short Amboseli getaways or longer Kenya safari circuits connecting Amboseli with Tsavo, Lake Naivasha, Lake Nakuru, or Maasai Mara.</p>$description$
    ),
    'Sentrim Amboseli Lodge',
    'Book Sentrim Amboseli Lodge with Benroso Safaris for affordable Amboseli accommodation near elephants, Kilimanjaro views, and game drives.',
    'Sentrim Amboseli Lodge',
    '["Sentrim Amboseli Lodge Kenya","budget Amboseli accommodation","Amboseli safari lodge","Kenya tented safari camp","accommodation near Amboseli National Park"]'::jsonb,
    null,
    v_now
  );
end $$;
