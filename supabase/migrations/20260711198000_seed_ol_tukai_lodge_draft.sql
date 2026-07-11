-- Seed draft: Ol Tukai Lodge (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'ol-tukai-lodge'
  ) then
    return;
  end if;

  select d.id
  into v_destination_id
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'amboseli-national-park'
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
    'Amboseli National Park',
    v_destination_id,
    'Luxury Safari Lodge',
    'luxury',
    'on_request',
    null,
    '[
      "Elegant en-suite rooms",
      "Private terraces / verandas",
      "Restaurant",
      "Bar and lounge",
      "Outdoor swimming pool",
      "Garden and outdoor seating areas",
      "Free Wi-Fi in selected areas",
      "Private parking",
      "Room service",
      "Laundry service",
      "Gift shop",
      "Conference facilities",
      "Family-friendly accommodation",
      "Children''s activities",
      "Breakfast and meal options",
      "Full-board meal options",
      "Game drive access",
      "Birdwatching opportunities",
      "Mount Kilimanjaro views",
      "Amboseli National Park access"
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
    'ol-tukai-lodge',
    'Ol Tukai Lodge',
    'Ol Tukai Lodge is a luxury safari lodge in Amboseli National Park, offering elegant rooms, dining, a pool, landscaped grounds, and remarkable views of elephants, open plains, and Mount Kilimanjaro.',
    jsonb_build_object(
      'html',
      $description$<p>Ol Tukai Lodge is one of Amboseli’s most loved safari stays, offering guests a beautiful blend of comfort, scenery, and close access to wildlife. Set within Amboseli National Park, the lodge places travelers in the heart of a landscape known for large elephant herds, open savannah plains, wetland habitats, birdlife, and unforgettable views of Mount Kilimanjaro.</p><p>For guests booking with Benroso Safaris, Ol Tukai Lodge works perfectly for luxury Amboseli safari packages, honeymoon safaris, family holidays, photography trips, and Kenya road safari itineraries from Nairobi. It is especially suitable for travelers who want a well-positioned lodge where wildlife viewing begins almost as soon as they arrive.</p><p>The lodge offers stylish rooms, beautiful gardens, dining spaces, a swimming pool, and outdoor relaxation areas where guests can enjoy the calm beauty of Amboseli between game drives. With Benroso Safaris, Ol Tukai Lodge can be included in short Amboseli getaways, luxury Kenya safari circuits, and combined itineraries linking Amboseli with Tsavo, Lake Naivasha, Lake Nakuru, Maasai Mara, or the Kenya coast.</p>$description$
    ),
    'Ol Tukai Lodge',
    'Book Ol Tukai Lodge with Benroso Safaris for a luxury Amboseli stay with elephants, Kilimanjaro views, dining, pool, and game drives.',
    'Ol Tukai Lodge',
    '["Ol Tukai Lodge Kenya","luxury Amboseli lodge","Amboseli safari accommodation","Mount Kilimanjaro view lodge","Kenya safari lodge"]'::jsonb,
    null,
    v_now
  );
end $$;
