-- Seed draft: Lake Bogoria Spa Resort (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'lake-bogoria-spa-resort'
  ) then
    return;
  end if;

  select d.id
  into v_destination_id
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'lake-bogoria-national-reserve'
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
    'Lake Bogoria National Reserve',
    v_destination_id,
    'Safari Resort / Lakeside Spa Hotel',
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
      "Private parking",
      "Free Wi-Fi in selected areas",
      "Room service",
      "Laundry service",
      "Conference and event facilities",
      "Family-friendly accommodation",
      "Breakfast and meal options",
      "Birdwatching opportunities",
      "Hot spring and geyser access nearby",
      "Lake Bogoria safari access",
      "Cultural visit arrangements nearby",
      "Transfer arrangements",
      "Reception support",
      "Rift Valley scenery"
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
    'lake-bogoria-spa-resort',
    'Lake Bogoria Spa Resort',
    'Lake Bogoria Spa Resort is a comfortable Rift Valley resort near Lake Bogoria, offering relaxing accommodation, natural hot spring experiences, dining, a pool, gardens, and access to flamingos, geysers, and scenic safari landscapes.',
    jsonb_build_object(
      'html',
      $description$<p>Lake Bogoria Spa Resort is a relaxing accommodation choice for travelers visiting the Lake Bogoria and Lake Baringo region. It is well suited for guests who want a peaceful Rift Valley stay close to Lake Bogoria’s famous hot springs, geysers, flamingos, birdlife, and dramatic landscapes.</p><p>For guests booking with Benroso Safaris, Lake Bogoria Spa Resort works well for Lake Bogoria safari packages, birdwatching tours, family trips, wellness stopovers, and Kenya road safari itineraries connecting Lake Nakuru, Lake Naivasha, Maasai Mara, Samburu, or Baringo. It is especially suitable for travelers who want to experience a less-crowded side of Kenya’s Rift Valley while still enjoying comfort and easy access to nature.</p><p>The resort offers a calm setting with comfortable rooms, dining areas, gardens, leisure facilities, and spa-style relaxation. With Benroso Safaris, Lake Bogoria Spa Resort can be included in scenic Rift Valley circuits for guests who want flamingo viewing, hot spring visits, birdwatching, cultural experiences, and a restful stay between safari destinations.</p>$description$
    ),
    'Lake Bogoria Spa Resort',
    'Book Lake Bogoria Spa Resort with Benroso Safaris for a Rift Valley stay near hot springs, flamingos, geysers, and Lake Bogoria scenery.',
    'Lake Bogoria Spa Resort',
    '["Lake Bogoria Spa Resort Kenya","Lake Bogoria accommodation","Rift Valley safari resort","Lake Bogoria hotel","Kenya safari accommodation"]'::jsonb,
    null,
    v_now
  );
end $$;
