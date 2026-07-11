-- Seed draft: Blue Springs Hotel (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'blue-springs-hotel'
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
      "Comfortable guest rooms",
      "En-suite bathrooms",
      "Restaurant",
      "Bar and lounge",
      "Free Wi-Fi in selected areas",
      "Private parking",
      "Room service",
      "Laundry service",
      "Conference and meeting facilities",
      "Business-friendly services",
      "Family-friendly accommodation",
      "Breakfast and meal options",
      "Airport transfer arrangements",
      "Nairobi city excursion access",
      "Safari departure access",
      "Reception support",
      "Luggage storage",
      "Travel assistance",
      "Group accommodation support",
      "Convenient city access"
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
    'blue-springs-hotel',
    'Blue Springs Hotel',
    'Blue Springs Hotel is a convenient Nairobi stay offering comfortable rooms, dining, conference facilities, and easy access to city services, airport transfers, Nairobi excursions, and Kenya safari departures.',
    jsonb_build_object(
      'html',
      $description$<p>Blue Springs Hotel is a practical Nairobi accommodation option for travelers who need a comfortable city base before or after their Kenya safari. It is well suited for guests looking for value, accessibility, and a straightforward hotel experience within Nairobi’s busy travel and business environment.</p><p>For guests booking with Benroso Safaris, Blue Springs Hotel works well for mid-range Nairobi accommodation, pre-safari overnights, post-safari stays, group tours, business travel, and short city stopovers. It can be included in itineraries connecting Nairobi with Maasai Mara, Amboseli, Lake Nakuru, Samburu, Tsavo, or the Kenyan coast.</p><p>The hotel offers a simple and reliable stay with guest rooms, dining areas, meeting spaces, and essential guest services. With Benroso Safaris, Blue Springs Hotel can support Nairobi city excursions, airport transfer plans, and longer Kenya safari packages where guests need a comfortable overnight stay before continuing their journey.</p>$description$
    ),
    'Blue Springs Hotel Nairobi',
    'Book Blue Springs Hotel with Benroso Safaris for a comfortable Nairobi stay near city attractions, transfers, and Kenya safari departures.',
    'Blue Springs Hotel Nairobi',
    '["Blue Springs Hotel Kenya","mid-range Nairobi hotel","Nairobi safari hotel","Kenya safari stopover hotel","Nairobi accommodation"]'::jsonb,
    null,
    v_now
  );
end $$;
