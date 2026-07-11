-- Seed draft: Tamarind Tree Hotel (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'tamarind-tree-hotel'
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
      "Modern en-suite rooms",
      "Restaurant",
      "Bar and lounge",
      "Outdoor swimming pool",
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
      "Wilson Airport access",
      "Nairobi National Park access",
      "Nairobi city excursion access",
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
    'tamarind-tree-hotel',
    'Tamarind Tree Hotel',
    'Tamarind Tree Hotel is a stylish Nairobi hotel offering modern rooms, dining, a pool, business facilities, and convenient access to Wilson Airport, Nairobi National Park, city excursions, and Kenya safari departures.',
    jsonb_build_object(
      'html',
      $description$<p>Tamarind Tree Hotel is a comfortable and modern Nairobi stay for travelers who want a well-connected hotel before or after their Kenya safari. Its location near Wilson Airport makes it especially convenient for guests connecting to fly-in safaris to Maasai Mara, Amboseli, Samburu, Lewa, or other safari destinations.</p><p>For guests booking with Benroso Safaris, Tamarind Tree Hotel works well for mid-range Nairobi accommodation, pre-safari nights, post-safari relaxation, airport transfer plans, business travel, and Nairobi city stopovers. It is also a good choice for travelers visiting Nairobi National Park, the Giraffe Centre, Karen Blixen Museum, David Sheldrick Wildlife Trust, or other nearby attractions.</p><p>The hotel offers a polished city-hotel experience with spacious rooms, dining options, a swimming pool, meeting spaces, and relaxed lounges where guests can rest before heading into the bush. With Benroso Safaris, Tamarind Tree Hotel can be included in Nairobi safari packages, fly-in safari itineraries, city excursions, and longer Kenya travel plans that need a smooth and comfortable Nairobi base.</p>$description$
    ),
    'Tamarind Tree Hotel Nairobi',
    'Book Tamarind Tree Hotel with Benroso Safaris for a modern Nairobi stay near Wilson Airport, city attractions, and Kenya safari departures.',
    'Tamarind Tree Hotel Nairobi',
    '["Tamarind Tree Hotel Kenya","mid-range Nairobi hotel","Nairobi safari hotel","hotel near Wilson Airport","Kenya safari stopover hotel"]'::jsonb,
    null,
    v_now
  );
end $$;
