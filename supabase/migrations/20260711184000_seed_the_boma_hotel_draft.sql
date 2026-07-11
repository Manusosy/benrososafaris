-- Seed draft: The Boma Hotel (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'the-boma-hotel'
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
    'Mid-Range City Hotel',
    'mid-range',
    'on_request',
    null,
    '[
      "Spacious en-suite rooms",
      "Restaurant",
      "Bar and lounge",
      "Outdoor swimming pool",
      "Spa and wellness facilities",
      "Fitness center",
      "Free Wi-Fi",
      "Private parking",
      "Room service",
      "Laundry service",
      "Conference and meeting facilities",
      "Business-friendly services",
      "Family-friendly accommodation",
      "Breakfast and meal options",
      "Airport transfer arrangements",
      "JKIA access",
      "Wilson Airport access",
      "Nairobi National Park access",
      "Nairobi city excursion access",
      "Safari departure access"
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
    'the-boma-hotel',
    'The Boma Hotel',
    'The Boma Hotel is a comfortable Nairobi hotel offering spacious rooms, dining, wellness facilities, a pool, and convenient access to JKIA, Wilson Airport, Nairobi National Park, and Kenya safari departures.',
    jsonb_build_object(
      'html',
      $description$<p>The Boma Hotel is a well-rounded Nairobi accommodation choice for travelers who want comfort, convenience, and reliable city-hotel service before or after their Kenya safari. Its location offers good access to Nairobi’s main airports, city attractions, business districts, and safari departure routes, making it a practical base for both leisure and corporate travelers.</p><p>For guests booking with Benroso Safaris, The Boma Hotel works well for mid-range Nairobi accommodation, pre-safari nights, post-safari relaxation, airport transfer plans, Nairobi excursions, and Kenya safari itineraries connecting to Maasai Mara, Amboseli, Samburu, Lake Nakuru, Tsavo, or the coast. It is especially suitable for travelers who want a calm hotel environment with more facilities than a basic stopover hotel.</p><p>The hotel offers spacious guest rooms, dining options, meeting spaces, wellness facilities, and areas where guests can rest after long flights or safari drives. With Benroso Safaris, The Boma Hotel can be included in Nairobi city packages, airport arrival plans, fly-in safari connections, and longer Kenya travel programs that need a comfortable Nairobi base.</p>$description$
    ),
    'The Boma Hotel Nairobi',
    'Book The Boma Hotel with Benroso Safaris for a comfortable Nairobi stay near airports, city attractions, and Kenya safari departures.',
    'The Boma Hotel Nairobi',
    '["The Boma Hotel Kenya","mid-range Nairobi hotel","Nairobi safari hotel","hotel near JKIA","Kenya safari stopover hotel"]'::jsonb,
    null,
    v_now
  );
end $$;
