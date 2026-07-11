-- Seed draft: Amboseli Serena Safari Lodge (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'amboseli-serena-safari-lodge'
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
      "Transfer arrangements",
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
    'amboseli-serena-safari-lodge',
    'Amboseli Serena Safari Lodge',
    'Amboseli Serena Safari Lodge is a luxury lodge inside Amboseli National Park, offering elegant rooms, dining, a pool, gardens, and excellent access to elephants, wildlife, birdlife, and Mount Kilimanjaro views.',
    jsonb_build_object(
      'html',
      $description$<p>Amboseli Serena Safari Lodge is a beautiful choice for travelers who want a refined safari stay within Amboseli National Park. The lodge places guests close to Amboseli’s famous wildlife areas, where large elephant herds, open plains, wetlands, birdlife, and the dramatic backdrop of Mount Kilimanjaro create one of Kenya’s most iconic safari experiences.</p><p>For guests booking with Benroso Safaris, Amboseli Serena Safari Lodge works well for luxury Amboseli safari packages, honeymoon safaris, family holidays, photography trips, and Kenya road safari itineraries connecting Amboseli with Nairobi, Tsavo, Lake Naivasha, Lake Nakuru, or Maasai Mara. It is especially suitable for travelers who want comfort, reliable service, and strong access to Amboseli’s best game drive routes.</p><p>The lodge offers a warm safari atmosphere with beautifully designed rooms, landscaped gardens, dining spaces, a swimming pool, and outdoor areas where guests can relax after game drives. With Benroso Safaris, Amboseli Serena Safari Lodge can be included in short Amboseli getaways, luxury Kenya safari circuits, and Kilimanjaro-view safari itineraries for guests who want scenery, wildlife, and comfort in one place.</p>$description$
    ),
    'Amboseli Serena Safari Lodge',
    'Book Amboseli Serena Safari Lodge with Benroso Safaris for a luxury Amboseli stay with elephants, Kilimanjaro views, dining, and game drives.',
    'Amboseli Serena Safari Lodge',
    '["Amboseli Serena Safari Lodge Kenya","luxury Amboseli lodge","Amboseli safari accommodation","Kenya safari lodge","accommodation in Amboseli National Park"]'::jsonb,
    null,
    v_now
  );
end $$;
