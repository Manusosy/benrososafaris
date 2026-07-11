-- Seed draft: 680 Hotel (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = '680-hotel'
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
      "Reception support",
      "Room service",
      "Laundry service",
      "Breakfast and meal options",
      "Conference and meeting facilities",
      "Business-friendly services",
      "Family-friendly accommodation",
      "Airport transfer arrangements",
      "Private parking nearby or on request",
      "Nairobi city excursion access",
      "Safari departure access",
      "Central business district access",
      "Lift / elevator access",
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
    '680-hotel',
    '680 Hotel',
    '680 Hotel is an affordable city hotel in Nairobi, offering simple comfort, dining, business-friendly facilities, and convenient access to the city centre, Nairobi excursions, airport transfers, and Kenya safari departures.',
    jsonb_build_object(
      'html',
      $description$<p>680 Hotel is a practical accommodation choice for travelers who need an affordable and central stay in Nairobi before or after their Kenya safari. Its city setting makes it convenient for guests arriving in Nairobi, preparing for early safari departures, attending meetings, or spending a night in the capital before continuing to destinations such as Maasai Mara, Amboseli, Lake Nakuru, Samburu, or Tsavo.</p><p>For guests booking with Benroso Safaris, 680 Hotel works well for economy Nairobi accommodation, pre-safari overnights, post-safari stays, group tours, business travel, and short Nairobi stopovers. It is especially suitable for travelers who want a simple, accessible, and budget-friendly hotel without moving far from the city’s main services and transport links.</p><p>The hotel offers straightforward comfort with guest rooms, dining facilities, reception support, and essential services for a smooth stay. With Benroso Safaris, 680 Hotel can be included in Nairobi safari packages, airport arrival plans, city excursions, and longer Kenya itineraries where guests need a convenient city base before heading into the wild.</p>$description$
    ),
    '680 Hotel Nairobi',
    'Book 680 Hotel with Benroso Safaris for affordable Nairobi accommodation before or after your Kenya safari, city tour, or airport transfer.',
    '680 Hotel Nairobi',
    '["680 Hotel Kenya","budget hotel in Nairobi","Nairobi safari hotel","affordable Nairobi accommodation","Kenya safari stopover hotel"]'::jsonb,
    null,
    v_now
  );
end $$;
