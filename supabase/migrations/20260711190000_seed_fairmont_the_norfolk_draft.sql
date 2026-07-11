-- Seed draft: Fairmont The Norfolk (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'fairmont-the-norfolk'
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
    'Luxury Heritage Hotel / City Safari Stopover Hotel',
    'luxury',
    'on_request',
    null,
    '[
      "Elegant en-suite rooms and suites",
      "Restaurant",
      "Bar and lounge",
      "Garden and courtyard areas",
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
    'fairmont-the-norfolk',
    'Fairmont The Norfolk',
    'Fairmont The Norfolk is a historic luxury hotel in Nairobi, offering elegant rooms, fine dining, gardens, wellness facilities, and a refined base before or after a Kenya safari.',
    jsonb_build_object(
      'html',
      $description$<p>Fairmont The Norfolk is one of Nairobi’s most iconic hotels, known for its heritage charm, elegant architecture, and calm city atmosphere. It is a strong choice for travelers who want a more classic and refined Nairobi stay before beginning their safari or after returning from the wild.</p><p>For guests booking with Benroso Safaris, Fairmont The Norfolk works well for luxury Nairobi accommodation, honeymoon stopovers, private Kenya safaris, business travel, city excursions, and safari itineraries connecting Nairobi with Maasai Mara, Amboseli, Samburu, Lake Nakuru, Tsavo, or the Kenya coast. It is especially suitable for guests who appreciate history, comfort, service, and a peaceful hotel environment within the capital.</p><p>The hotel offers stylish rooms and suites, beautiful courtyard spaces, dining options, wellness facilities, and a relaxing setting for guests who want to ease into or out of their safari experience. With Benroso Safaris, Fairmont The Norfolk can be included in premium Nairobi stopover packages, city tours, airport transfer plans, and longer Kenya safari itineraries.</p>$description$
    ),
    'Fairmont The Norfolk Nairobi',
    'Book Fairmont The Norfolk with Benroso Safaris for a luxury Nairobi heritage stay before or after your Kenya safari or city excursion.',
    'Fairmont The Norfolk Nairobi',
    '["Fairmont The Norfolk Kenya","luxury hotel in Nairobi","Nairobi safari hotel","heritage hotel Nairobi","Kenya safari stopover hotel"]'::jsonb,
    null,
    v_now
  );
end $$;
