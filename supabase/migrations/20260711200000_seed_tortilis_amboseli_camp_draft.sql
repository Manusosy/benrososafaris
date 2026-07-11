-- Seed draft: Tortilis Amboseli Camp (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'tortilis-amboseli-camp'
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
      "Garden and outdoor relaxation areas",
      "Free Wi-Fi in selected areas",
      "Private parking",
      "Room service",
      "Laundry service",
      "Family-friendly accommodation",
      "Full-board meal options",
      "Guided game drives",
      "Walking safari arrangements",
      "Birdwatching opportunities",
      "Mount Kilimanjaro views",
      "Elephant viewing opportunities",
      "Transfer arrangements",
      "Reception support",
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
    'tortilis-amboseli-camp',
    'Tortilis Amboseli Camp',
    'Tortilis Amboseli Camp is a luxury tented camp near Amboseli National Park, offering elegant tents, fine dining, a pool, guided safari activities, and breathtaking views of Mount Kilimanjaro and Amboseli wildlife.',
    jsonb_build_object(
      'html',
      $description$<p>Tortilis Amboseli Camp is a refined safari stay for travelers who want comfort, scenery, and a more intimate Amboseli experience. Set in the Amboseli ecosystem, the camp offers a peaceful base for exploring the park’s famous elephant herds, open plains, seasonal wetlands, birdlife, and the iconic Mount Kilimanjaro backdrop.</p><p>For guests booking with Benroso Safaris, Tortilis Amboseli Camp works beautifully for luxury Amboseli safari packages, honeymoon safaris, family holidays, photography safaris, and private Kenya safari itineraries. It is especially suitable for travelers who want a quieter tented camp atmosphere with strong wildlife access and beautiful natural surroundings.</p><p>The camp offers elegant en-suite safari tents, relaxing outdoor spaces, dining areas, and a swimming pool where guests can unwind between game drives. With Benroso Safaris, Tortilis Amboseli Camp can be included in premium Amboseli itineraries and longer Kenya safari circuits connecting Amboseli with Tsavo, Lake Naivasha, Lake Nakuru, Maasai Mara, or the Kenya coast.</p>$description$
    ),
    'Tortilis Amboseli Camp',
    'Book Tortilis Amboseli Camp with Benroso Safaris for a luxury Amboseli tented stay with Kilimanjaro views, elephants, and game drives.',
    'Tortilis Amboseli Camp',
    '["Tortilis Amboseli Camp Kenya","luxury Amboseli camp","Amboseli tented camp","Mount Kilimanjaro safari lodge","Kenya safari accommodation"]'::jsonb,
    null,
    v_now
  );
end $$;
