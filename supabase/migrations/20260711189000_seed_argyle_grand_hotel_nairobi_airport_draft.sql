-- Seed draft: Argyle Grand Hotel Nairobi Airport (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'argyle-grand-hotel-nairobi-airport'
  ) then
    return;
  end if;

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
    'Nairobi',
    null,
    'Luxury Airport Hotel / City Safari Stopover Hotel',
    'luxury',
    'on_request',
    null,
    '[
      "Elegant en-suite rooms",
      "Restaurant",
      "Bar and lounge",
      "Outdoor swimming pool",
      "Spa and wellness facilities",
      "Fitness center",
      "Free Wi-Fi",
      "Private parking",
      "Airport transfer arrangements",
      "Room service",
      "Laundry service",
      "Conference and meeting facilities",
      "Business-friendly services",
      "Family-friendly accommodation",
      "Breakfast and meal options",
      "JKIA access",
      "Nairobi city excursion access",
      "Nairobi National Park access",
      "Safari departure access",
      "Reception support"
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
    'argyle-grand-hotel-nairobi-airport',
    'Argyle Grand Hotel Nairobi Airport',
    'Argyle Grand Hotel Nairobi Airport is a luxury airport hotel offering elegant rooms, dining, wellness facilities, a pool, and convenient access to JKIA, Nairobi city excursions, and Kenya safari departures.',
    jsonb_build_object(
      'html',
      $description$<p>Argyle Grand Hotel Nairobi Airport is a polished accommodation choice for travelers who want a comfortable Nairobi stay close to Jomo Kenyatta International Airport. It is ideal for guests arriving in Kenya before safari, connecting between flights, or spending a relaxing night in Nairobi after a long journey.</p><p>For guests booking with Benroso Safaris, Argyle Grand Hotel Nairobi Airport works well for luxury Nairobi accommodation, pre-safari overnights, post-safari stays, airport transfer plans, business travel, and Kenya safari itineraries connecting to Maasai Mara, Amboseli, Samburu, Lake Nakuru, Tsavo, or the coast. It is especially suitable for travelers who want modern comfort, reliable service, and smooth airport access.</p><p>The hotel offers spacious rooms, dining spaces, leisure facilities, meeting areas, and a calm atmosphere for guests who want to rest before continuing their journey. With Benroso Safaris, Argyle Grand Hotel Nairobi Airport can be included in Nairobi arrival packages, airport stopovers, city excursions, and longer Kenya safari programs where comfort and convenience matter.</p>$description$
    ),
    'Argyle Grand Hotel Nairobi Airport',
    'Book Argyle Grand Hotel Nairobi Airport with Benroso Safaris for a luxury Nairobi airport stay near JKIA and Kenya safari departures.',
    'Argyle Grand Hotel Nairobi Airport',
    '["Argyle Grand Hotel Nairobi","luxury airport hotel Nairobi","hotel near JKIA","Nairobi safari stopover hotel","Kenya safari accommodation"]'::jsonb,
    null,
    v_now
  );
end $$;
