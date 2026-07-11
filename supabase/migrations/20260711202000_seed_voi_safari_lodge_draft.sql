-- Seed draft: Voi Safari Lodge (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_destination_id uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'voi-safari-lodge'
  ) then
    return;
  end if;

  select d.id
  into v_destination_id
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'tsavo-east-national-park'
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
    'Tsavo East National Park',
    v_destination_id,
    'Economy Safari Lodge',
    'economy',
    'on_request',
    null,
    '[
      "Comfortable en-suite rooms",
      "Restaurant",
      "Bar and lounge",
      "Outdoor swimming pool",
      "Garden and outdoor seating areas",
      "Free Wi-Fi in selected areas",
      "Private parking",
      "Room service",
      "Laundry service",
      "Family-friendly accommodation",
      "Conference and event facilities",
      "Breakfast and meal options",
      "Full-board meal options",
      "Game drive access",
      "Birdwatching opportunities",
      "Tsavo red elephant viewing",
      "Scenic park views",
      "Transfer arrangements",
      "Reception support",
      "Tsavo East National Park access"
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
    'voi-safari-lodge',
    'Voi Safari Lodge',
    'Voi Safari Lodge is an affordable safari lodge in Tsavo East, offering comfortable rooms, dining, a pool, and sweeping views over Tsavo’s red-earth landscapes, wildlife plains, and classic game drive routes.',
    jsonb_build_object(
      'html',
      $description$<p>Voi Safari Lodge is a practical and scenic stay for travelers exploring Tsavo East National Park, one of Kenya’s largest and most iconic safari destinations. The lodge is well suited for guests who want affordable comfort, easy park access, and beautiful views across Tsavo’s open wilderness.</p><p>For guests booking with Benroso Safaris, Voi Safari Lodge works well for economy Tsavo East safari packages, family safaris, group tours, short safaris from Mombasa or Nairobi, and Kenya road safari itineraries linking Tsavo East with Amboseli, Tsavo West, Diani, or the Kenya coast. It is especially suitable for travelers hoping to see red elephants, lions, buffaloes, giraffes, zebras, antelopes, and rich birdlife.</p><p>The lodge offers a relaxed safari setting with comfortable accommodation, dining spaces, outdoor areas, and a swimming pool where guests can unwind after game drives. With Benroso Safaris, Voi Safari Lodge can be included in 2-day, 3-day, or longer Tsavo safari itineraries designed for guests who want value, wildlife, and a true Kenya safari atmosphere.</p>$description$
    ),
    'Voi Safari Lodge',
    'Book Voi Safari Lodge with Benroso Safaris for affordable Tsavo East accommodation with game drives, scenic views, dining, and pool access.',
    'Voi Safari Lodge',
    '["Voi Safari Lodge Kenya","budget Tsavo East lodge","Tsavo East accommodation","Kenya safari lodge","safari lodge near Voi"]'::jsonb,
    null,
    v_now
  );
end $$;
