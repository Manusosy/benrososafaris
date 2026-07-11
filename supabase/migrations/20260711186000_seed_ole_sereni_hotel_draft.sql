-- Seed draft: Ole Sereni Hotel (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'ole-sereni-hotel'
  ) then
    return;
  end if;

  select d.id
  into v_destination_id
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'nairobi-national-park'
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
    'Nairobi',
    v_destination_id,
    'Luxury City Hotel / Safari Stopover Hotel',
    'luxury',
    'on_request',
    null,
    '[
      "Modern en-suite rooms",
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
      "Nairobi National Park views",
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
    'ole-sereni-hotel',
    'Ole Sereni Hotel',
    'Ole Sereni Hotel is a luxury Nairobi hotel overlooking Nairobi National Park, offering stylish rooms, dining, a pool, wellness facilities, and easy access to JKIA, Wilson Airport, city tours, and Kenya safari departures.',
    jsonb_build_object(
      'html',
      $description$<p>Ole Sereni Hotel is a strong choice for travelers who want a Nairobi stay that still feels connected to safari. Its setting near Nairobi National Park gives guests a rare city-and-wilderness atmosphere, making it ideal for those who want comfort, convenience, and a scenic introduction to Kenya before heading out on safari.</p><p>For guests booking with Benroso Safaris, Ole Sereni Hotel works well for luxury Nairobi accommodation, pre-safari nights, post-safari relaxation, airport transfer plans, honeymoon stopovers, business travel, and Nairobi city excursions. It is especially suitable for travelers connecting to JKIA, Wilson Airport, Nairobi National Park, Maasai Mara fly-in safaris, Amboseli, Samburu, Lake Nakuru, Tsavo, or the Kenya coast.</p><p>The hotel offers modern rooms, multiple dining spaces, relaxed lounges, wellness facilities, and outdoor areas where guests can unwind after a long flight or safari drive. With Benroso Safaris, Ole Sereni Hotel can be included in Nairobi stopover packages, airport arrival itineraries, city tours, and longer Kenya safari plans for guests who want a comfortable and well-positioned city base.</p>$description$
    ),
    'Ole Sereni Hotel Nairobi',
    'Book Ole Sereni Hotel with Benroso Safaris for a luxury Nairobi stay near airports, Nairobi National Park, and Kenya safari departures.',
    'Ole Sereni Hotel Nairobi',
    '["Ole Sereni Hotel Kenya","luxury Nairobi hotel","hotel near Nairobi National Park","Nairobi safari hotel","Kenya safari stopover hotel"]'::jsonb,
    null,
    v_now
  );
end $$;
