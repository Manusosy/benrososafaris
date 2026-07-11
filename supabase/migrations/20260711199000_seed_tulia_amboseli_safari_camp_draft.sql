-- Seed draft: Tulia Amboseli Safari Camp (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'tulia-amboseli-safari-camp'
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
    'Luxury Tented Safari Camp',
    'luxury',
    'on_request',
    null,
    '[
      "Luxury en-suite safari tents",
      "Private verandas",
      "Restaurant",
      "Bar and lounge",
      "Outdoor swimming pool",
      "Garden and outdoor seating areas",
      "Free Wi-Fi in selected areas",
      "Private parking",
      "Room service",
      "Laundry service",
      "Family-friendly accommodation",
      "Breakfast and meal options",
      "Full-board meal options",
      "Game drive access",
      "Birdwatching opportunities",
      "Mount Kilimanjaro views nearby",
      "Transfer arrangements",
      "Reception support",
      "Amboseli National Park access",
      "Safari planning support"
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
    'tulia-amboseli-safari-camp',
    'Tulia Amboseli Safari Camp',
    'Tulia Amboseli Safari Camp is a luxury tented camp near Amboseli National Park, offering stylish safari tents, dining, a pool, peaceful views, and easy access to elephants, game drives, birdlife, and Mount Kilimanjaro scenery.',
    jsonb_build_object(
      'html',
      $description$<p>Tulia Amboseli Safari Camp is a beautiful choice for travelers who want a more intimate tented safari experience near Amboseli National Park. The camp offers a relaxed atmosphere with wide-open landscapes, safari-style comfort, and convenient access to one of Kenya’s most photogenic wildlife destinations.</p><p>For guests booking with Benroso Safaris, Tulia Amboseli Safari Camp works well for luxury Amboseli safari packages, honeymoon safaris, family getaways, private Kenya safaris, and photography-focused itineraries. It is especially suitable for travelers who want to enjoy Amboseli’s elephants, wetlands, birdlife, and Mount Kilimanjaro views while staying in a quieter camp setting.</p><p>The camp offers comfortable tented accommodation, outdoor relaxation areas, dining spaces, and a swimming pool where guests can unwind after game drives. With Benroso Safaris, Tulia Amboseli Safari Camp can be included in short Amboseli safaris, luxury Kenya road safaris, and combined itineraries linking Amboseli with Tsavo, Lake Naivasha, Lake Nakuru, Maasai Mara, or the Kenya coast.</p>$description$
    ),
    'Tulia Amboseli Safari Camp',
    'Book Tulia Amboseli Safari Camp with Benroso Safaris for a luxury tented stay near Amboseli, elephants, game drives, and Kilimanjaro views.',
    'Tulia Amboseli Safari Camp',
    '["Tulia Amboseli Safari Camp Kenya","luxury Amboseli camp","Amboseli tented camp","Kenya safari accommodation","accommodation near Amboseli National Park"]'::jsonb,
    null,
    v_now
  );
end $$;
