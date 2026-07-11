-- Seed draft: Four Points by Sheraton Nairobi Airport (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'four-points-by-sheraton-nairobi-airport'
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
      "Modern en-suite rooms",
      "Restaurant",
      "Bar and lounge",
      "Rooftop swimming pool",
      "Fitness center",
      "Spa and wellness facilities",
      "Free Wi-Fi",
      "Airport shuttle arrangements",
      "Private parking",
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
      "Luggage storage"
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
    'four-points-by-sheraton-nairobi-airport',
    'Four Points by Sheraton Nairobi Airport',
    'Four Points by Sheraton Nairobi Airport is a luxury airport hotel offering modern rooms, dining, rooftop pool, wellness facilities, and easy access to JKIA, Nairobi city tours, and Kenya safari departures.',
    jsonb_build_object(
      'html',
      $description$<p>Four Points by Sheraton Nairobi Airport is an excellent choice for travelers who want comfort and convenience immediately before or after a Kenya safari. Its location near Jomo Kenyatta International Airport makes it ideal for international arrivals, late-night flights, early departures, and guests who want a smooth overnight stay before continuing to Maasai Mara, Amboseli, Samburu, Tsavo, Lake Nakuru, or the coast.</p><p>For guests booking with Benroso Safaris, Four Points by Sheraton Nairobi Airport works well for luxury Nairobi accommodation, airport stopovers, pre-safari nights, post-safari relaxation, business travel, and fly-in safari connections. It is especially suitable for guests who want a reliable hotel with polished service, modern facilities, and minimal transfer time after a long flight.</p><p>The hotel offers a refined city-stay experience with stylish rooms, dining spaces, rooftop relaxation, wellness facilities, and business-friendly services. With Benroso Safaris, Four Points by Sheraton Nairobi Airport can be included in Nairobi arrival packages, airport transfer plans, city excursions, and longer Kenya safari itineraries where comfort and timing are important.</p>$description$
    ),
    'Four Points by Sheraton Nairobi Airport',
    'Book Four Points Nairobi Airport with Benroso Safaris for a luxury airport hotel stay near JKIA, Nairobi tours, and Kenya safari departures.',
    'Four Points by Sheraton Nairobi Airport',
    '["Four Points Nairobi Airport","luxury airport hotel Nairobi","hotel near JKIA","Nairobi safari stopover hotel","Kenya safari accommodation"]'::jsonb,
    null,
    v_now
  );
end $$;
