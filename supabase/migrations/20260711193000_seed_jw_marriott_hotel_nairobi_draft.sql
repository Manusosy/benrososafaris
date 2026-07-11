-- Seed draft: JW Marriott Hotel Nairobi (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'jw-marriott-hotel-nairobi'
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
    'High-End Luxury City Hotel',
    'ultra-luxury',
    'on_request',
    null,
    '[
      "Luxury en-suite rooms and suites",
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
      "Westlands access",
      "Nairobi city excursion access",
      "Nairobi National Park access",
      "Safari departure access",
      "Concierge and travel support"
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
    'jw-marriott-hotel-nairobi',
    'JW Marriott Hotel Nairobi',
    'JW Marriott Hotel Nairobi is a high-end luxury hotel in Westlands, offering elegant rooms, fine dining, wellness facilities, city views, and a refined base for Nairobi stays before or after a Kenya safari.',
    jsonb_build_object(
      'html',
      $description$<p>JW Marriott Hotel Nairobi is a polished luxury stay for travelers who want modern comfort, premium service, and a strong city base before or after their Kenya safari. Set in the Westlands area, the hotel is well positioned for guests who want access to Nairobi’s business districts, restaurants, shopping, airport transfers, and city excursions.</p><p>For guests booking with Benroso Safaris, JW Marriott Hotel Nairobi works beautifully for high-end Nairobi accommodation, honeymoon stopovers, executive travel, private Kenya safaris, luxury fly-in safari connections, and post-safari relaxation. It is especially suitable for guests who want a stylish urban stay before heading to Maasai Mara, Amboseli, Samburu, Ol Pejeta, Lake Nakuru, Tsavo, or the Kenya coast.</p><p>The hotel offers elegant rooms and suites, refined dining spaces, wellness facilities, a pool, and thoughtful hospitality designed for comfort and ease. With Benroso Safaris, JW Marriott Hotel Nairobi can be included in luxury Kenya safari packages, Nairobi stopover itineraries, airport arrival plans, and premium city-to-safari travel programs.</p>$description$
    ),
    'JW Marriott Hotel Nairobi',
    'Book JW Marriott Hotel Nairobi with Benroso Safaris for a high-end Nairobi stay with luxury rooms, dining, wellness, and safari access.',
    'JW Marriott Hotel Nairobi',
    '["JW Marriott Nairobi","luxury hotel in Westlands","high-end Nairobi accommodation","Nairobi safari hotel","Kenya safari stopover hotel"]'::jsonb,
    null,
    v_now
  );
end $$;
