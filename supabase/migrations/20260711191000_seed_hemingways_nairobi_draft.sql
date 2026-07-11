-- Seed draft: Hemingways Nairobi (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'hemingways-nairobi'
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
    'High-End Luxury Boutique Hotel',
    'ultra-luxury',
    'on_request',
    null,
    '[
      "Luxury en-suite suites",
      "Private balconies / terraces",
      "Restaurant",
      "Bar and lounge",
      "Spa and wellness facilities",
      "Outdoor swimming pool",
      "Fitness center",
      "Garden and outdoor seating areas",
      "Free Wi-Fi",
      "Private parking",
      "Room service",
      "Laundry service",
      "Butler-style service",
      "Conference and meeting facilities",
      "Business-friendly services",
      "Family-friendly accommodation",
      "Airport transfer arrangements",
      "Karen and Nairobi excursion access",
      "Wilson Airport access",
      "Luxury safari departure access"
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
    'hemingways-nairobi',
    'Hemingways Nairobi',
    'Hemingways Nairobi is an elegant boutique hotel in Karen, offering spacious suites, fine dining, spa experiences, garden views, and a refined base for Nairobi excursions, airport transfers, and luxury Kenya safaris.',
    jsonb_build_object(
      'html',
      $description$<p>Hemingways Nairobi is a beautiful high-end stay for travelers who want privacy, elegance, and a calm atmosphere away from the busy city centre. Set in the leafy Karen area, the hotel is ideal for guests who want a peaceful Nairobi stopover with easy access to the Giraffe Centre, Karen Blixen Museum, Nairobi National Park, Wilson Airport, and premium safari departures.</p><p>For guests booking with Benroso Safaris, Hemingways Nairobi works perfectly for luxury Nairobi accommodation, honeymoon stopovers, private Kenya safaris, fly-in safari connections, and premium Kenya travel itineraries. It is especially suitable for travelers who want to arrive in Kenya gently, rest well after a long flight, and begin their safari in comfort and style.</p><p>The hotel offers spacious suites, polished service, fine dining, landscaped gardens, wellness facilities, and a quiet residential setting that feels refined and personal. With Benroso Safaris, Hemingways Nairobi can be included in high-end Nairobi stopover packages, city excursions, airport transfer plans, and luxury safari circuits connecting Nairobi with Maasai Mara, Amboseli, Samburu, Ol Pejeta, or the Kenya coast.</p>$description$
    ),
    'Hemingways Nairobi',
    'Book Hemingways Nairobi with Benroso Safaris for a high-end Karen stay with luxury suites, gardens, fine dining, spa, and safari access.',
    'Hemingways Nairobi',
    '["Hemingways Nairobi Kenya","luxury hotel in Karen","Nairobi luxury accommodation","high-end Nairobi hotel","Kenya safari stopover hotel"]'::jsonb,
    null,
    v_now
  );
end $$;
