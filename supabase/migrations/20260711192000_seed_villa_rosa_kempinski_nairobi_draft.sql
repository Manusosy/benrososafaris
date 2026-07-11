-- Seed draft: Villa Rosa Kempinski Nairobi (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'villa-rosa-kempinski-nairobi'
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
      "Multiple restaurants",
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
      "Nairobi city excursion access",
      "Nairobi National Park access",
      "Safari departure access",
      "Concierge service",
      "Luxury travel support"
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
    'villa-rosa-kempinski-nairobi',
    'Villa Rosa Kempinski Nairobi',
    'Villa Rosa Kempinski Nairobi is a high-end luxury hotel offering elegant rooms, fine dining, spa facilities, a pool, and a polished city base before or after a Kenya safari.',
    jsonb_build_object(
      'html',
      $description$<p>Villa Rosa Kempinski Nairobi is a refined luxury hotel for travelers who want a stylish and comfortable stay in the capital before or after their safari. Its city location makes it convenient for Nairobi excursions, airport transfers, business travel, and safari connections to Maasai Mara, Amboseli, Samburu, Lake Nakuru, Tsavo, or the Kenya coast.</p><p>For guests booking with Benroso Safaris, Villa Rosa Kempinski works well for luxury Nairobi accommodation, honeymoon stopovers, private Kenya safaris, executive travel, city tours, and premium safari itineraries. It is especially suitable for guests who want excellent service, elegant interiors, strong dining options, and a calm place to relax after long flights or safari drives.</p><p>The hotel offers spacious rooms and suites, multiple restaurants, wellness facilities, a swimming pool, meeting spaces, and polished hospitality. With Benroso Safaris, Villa Rosa Kempinski Nairobi can be included in luxury Kenya safari packages, Nairobi stopover plans, airport arrival arrangements, and longer safari circuits where comfort and smooth travel matter.</p>$description$
    ),
    'Villa Rosa Kempinski Nairobi',
    'Book Villa Rosa Kempinski with Benroso Safaris for a luxury Nairobi stay with fine dining, spa, pool, city access, and safari connections.',
    'Villa Rosa Kempinski Nairobi',
    '["Villa Rosa Kempinski Kenya","luxury hotel in Nairobi","Nairobi safari hotel","high-end Nairobi accommodation","Kenya safari stopover hotel"]'::jsonb,
    null,
    v_now
  );
end $$;
