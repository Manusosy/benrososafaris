-- Seed draft: The Emakoko (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'the-emakoko'
  ) then
    return;
  end if;

  select d.id
  into v_destination_id
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'nairobi-national-park'
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
    'Nairobi',
    v_destination_id,
    'High-End Luxury Safari Lodge / Boutique Safari Camp',
    'ultra-luxury',
    'on_request',
    null,
    '[
      "Luxury en-suite rooms",
      "Private verandas / decks",
      "Restaurant",
      "Bar and lounge",
      "Outdoor swimming pool",
      "Garden and outdoor relaxation areas",
      "Free Wi-Fi in selected areas",
      "Private parking",
      "Room service",
      "Laundry service",
      "Fine dining experiences",
      "Family-friendly accommodation",
      "Honeymoon-friendly setting",
      "Nairobi National Park access",
      "Wildlife viewing opportunities",
      "Birdwatching opportunities",
      "Airport transfer arrangements",
      "Nairobi excursion access",
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
    'the-emakoko',
    'The Emakoko',
    'The Emakoko is a high-end boutique safari lodge on the edge of Nairobi National Park, offering elegant rooms, wilderness views, fine dining, a pool, and a rare luxury safari experience close to the city.',
    jsonb_build_object(
      'html',
      $description$<p>The Emakoko is one of Nairobi’s most unique luxury stays, ideal for travelers who want to begin or end their Kenya safari with a real wilderness feel without leaving the capital. Set along the edge of Nairobi National Park, the lodge offers a peaceful escape where guests can enjoy nature, wildlife, and elegant comfort within easy reach of the city and airport routes.</p><p>For guests booking with Benroso Safaris, The Emakoko is perfect for high-end Nairobi accommodation, luxury safari stopovers, honeymoon stays, private Kenya safaris, and Nairobi National Park experiences. It is especially suitable for travelers who want something more memorable than a standard city hotel, with the chance to enjoy wildlife views, quiet surroundings, and a soft landing before continuing to Maasai Mara, Amboseli, Samburu, Ol Pejeta, or the coast.</p><p>The lodge offers beautifully designed rooms, warm hospitality, scenic decks, dining spaces, and a relaxed safari atmosphere that feels personal and exclusive. With Benroso Safaris, The Emakoko can be included in luxury Nairobi stopover packages, airport arrival plans, Nairobi National Park tours, and premium Kenya safari itineraries for guests who want comfort, privacy, and a true safari mood from the very beginning.</p>$description$
    ),
    'The Emakoko Nairobi',
    'Book The Emakoko with Benroso Safaris for a high-end Nairobi safari lodge stay near Nairobi National Park with luxury rooms and wildlife views.',
    'The Emakoko Nairobi',
    '["The Emakoko Kenya","luxury Nairobi safari lodge","Nairobi National Park accommodation","high-end Nairobi lodge","Kenya safari stopover hotel"]'::jsonb,
    null,
    v_now
  );
end $$;
