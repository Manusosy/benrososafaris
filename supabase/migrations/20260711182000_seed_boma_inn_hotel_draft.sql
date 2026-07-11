-- Seed draft: Boma Inn Hotel (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'boma-inn-hotel'
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
    'Economy City Hotel',
    'economy',
    'on_request',
    null,
    '[
      "Comfortable guest rooms",
      "En-suite bathrooms",
      "Restaurant",
      "Bar and lounge",
      "Free Wi-Fi in selected areas",
      "Room service",
      "Laundry service",
      "Reception support",
      "Breakfast and meal options",
      "Conference and meeting facilities",
      "Business-friendly services",
      "Family-friendly accommodation",
      "Airport transfer arrangements",
      "Private parking",
      "Gym access nearby or on request",
      "Nairobi city excursion access",
      "Nairobi National Park access",
      "Safari departure access",
      "Luggage storage",
      "Travel assistance"
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
    'boma-inn-hotel',
    'Boma Inn Hotel',
    'Boma Inn Hotel is an affordable Nairobi hotel offering comfortable rooms, dining, business facilities, and convenient access to Wilson Airport, JKIA, Nairobi National Park, and Kenya safari departures.',
    jsonb_build_object(
      'html',
      $description$<p>Boma Inn Hotel is a practical Nairobi stay for travelers who need comfort, convenience, and value before or after a Kenya safari. Its location within the wider Boma hospitality complex makes it suitable for guests looking for a quieter city hotel with easy access to key transport routes, Nairobi excursions, and safari departure points.</p><p>For guests booking with Benroso Safaris, Boma Inn Hotel works well for economy Nairobi accommodation, pre-safari overnights, post-safari stays, airport transfer plans, business travel, and short city stopovers. It is especially useful for travelers connecting to Nairobi National Park, Wilson Airport flights, JKIA arrivals, or road safaris to Maasai Mara, Amboseli, Lake Nakuru, Samburu, and Tsavo.</p><p>The hotel offers a simple but comfortable setting with guest rooms, dining options, meeting facilities, and essential services for a smooth Nairobi stay. With Benroso Safaris, Boma Inn Hotel can be included in Nairobi city packages, airport arrival plans, and longer Kenya safari itineraries where guests need a reliable and affordable city base.</p>$description$
    ),
    'Boma Inn Hotel Nairobi',
    'Book Boma Inn Hotel with Benroso Safaris for affordable Nairobi accommodation near airports, city attractions, and Kenya safari departures.',
    'Boma Inn Hotel Nairobi',
    '["Boma Inn Hotel Kenya","budget hotel in Nairobi","Nairobi safari hotel","affordable Nairobi accommodation","Kenya safari stopover hotel"]'::jsonb,
    null,
    v_now
  );
end $$;
