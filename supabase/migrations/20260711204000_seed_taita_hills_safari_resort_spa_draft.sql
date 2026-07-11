-- Seed draft: Taita Hills Safari Resort & Spa (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'taita-hills-safari-resort-spa'
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
    'Taita Hills',
    null,
    'Mid-Range Safari Lodge / Wildlife Sanctuary Resort',
    'mid-range',
    'on_request',
    null,
    '[
      "Comfortable en-suite rooms",
      "Restaurant",
      "Bar and lounge",
      "Outdoor swimming pool",
      "Spa and wellness facilities",
      "Garden and outdoor seating areas",
      "Free Wi-Fi in selected areas",
      "Private parking",
      "Room service",
      "Laundry service",
      "Gift shop",
      "Conference and event facilities",
      "Family-friendly accommodation",
      "Breakfast and meal options",
      "Full-board meal options",
      "Game drive access",
      "Birdwatching opportunities",
      "Transfer arrangements",
      "Reception support",
      "Tsavo and Taita Hills safari access"
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
    'taita-hills-safari-resort-spa',
    'Taita Hills Safari Resort & Spa',
    'Taita Hills Safari Resort & Spa is a comfortable lodge in the Taita Hills wildlife area, offering scenic rooms, dining, a pool, spa facilities, and easy access to Tsavo East, Tsavo West, and Taita Hills game drives.',
    jsonb_build_object(
      'html',
      $description$<p>Taita Hills Safari Resort & Spa is a convenient and scenic safari stay for travelers exploring the Tsavo and Taita Hills region. Set within a private wildlife sanctuary, the resort gives guests a relaxed base for game drives, birdwatching, photography, and wildlife viewing in one of Kenya’s most accessible safari areas from the coast.</p><p>For guests booking with Benroso Safaris, Taita Hills Safari Resort & Spa works well for mid-range Tsavo East safari packages, Tsavo West combinations, family safaris, group tours, and short safaris from Mombasa, Diani, or Nairobi. It is especially suitable for travelers who want comfort, good facilities, and a smooth connection between Tsavo East, Tsavo West, Amboseli, and the Kenya coast.</p><p>The resort offers comfortable accommodation, dining spaces, outdoor areas, wellness facilities, and access to the wider Taita Hills wildlife experience. With Benroso Safaris, Taita Hills Safari Resort & Spa can be included in 2-day, 3-day, or longer Tsavo safari itineraries for guests who want a balanced mix of wildlife, scenery, and relaxation.</p>$description$
    ),
    'Taita Hills Safari Resort & Spa',
    'Book Taita Hills Safari Resort & Spa with Benroso Safaris for a mid-range Tsavo safari stay with game drives, dining, pool, and spa.',
    'Taita Hills Safari Resort & Spa',
    '["Taita Hills Safari Resort Kenya","Tsavo safari accommodation","Taita Hills lodge","mid-range Tsavo lodge","Kenya safari accommodation"]'::jsonb,
    null,
    v_now
  );
end $$;
