-- Seed draft: Salt Lick Safari Lodge (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'salt-lick-safari-lodge'
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
    'Mid-Range Safari Lodge / Elevated Wildlife Lodge',
    'mid-range',
    'on_request',
    null,
    '[
      "Elevated en-suite rooms",
      "Wildlife waterhole views",
      "Restaurant",
      "Bar and lounge",
      "Viewing decks",
      "Outdoor seating areas",
      "Free Wi-Fi in selected areas",
      "Private parking",
      "Room service",
      "Laundry service",
      "Gift shop",
      "Family-friendly accommodation",
      "Breakfast and meal options",
      "Full-board meal options",
      "Game drive access",
      "Birdwatching opportunities",
      "Photography-friendly setting",
      "Transfer arrangements",
      "Reception support",
      "Tsavo safari access"
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
    'salt-lick-safari-lodge',
    'Salt Lick Safari Lodge',
    'Salt Lick Safari Lodge is a unique elevated safari lodge in the Taita Hills wildlife area, offering raised rooms, waterhole views, dining, and easy access to Tsavo East, Tsavo West, and classic Kenya wildlife experiences.',
    jsonb_build_object(
      'html',
      $description$<p>Salt Lick Safari Lodge is one of Kenya’s most memorable safari stays, known for its elevated design and wildlife-viewing experience. The lodge is set within the Taita Hills wildlife area, where guests can enjoy views of animals gathering around the nearby waterhole and surrounding plains.</p><p>For guests booking with Benroso Safaris, Salt Lick Safari Lodge works well for mid-range Tsavo East safari packages, Tsavo West combinations, family safaris, photography trips, and short safaris from Mombasa, Diani, or Nairobi. It is especially suitable for travelers who want a lodge that feels different from the usual safari accommodation, with wildlife often visible from the property itself.</p><p>The lodge offers comfortable rooms raised above the ground, dining facilities, viewing areas, and a relaxed safari atmosphere that makes it ideal for guests looking for both value and experience. With Benroso Safaris, Salt Lick Safari Lodge can be included in 2-day, 3-day, or longer Tsavo safari itineraries connecting Tsavo East, Tsavo West, Amboseli, or the Kenya coast.</p>$description$
    ),
    'Salt Lick Safari Lodge',
    'Book Salt Lick Safari Lodge with Benroso Safaris for a unique Tsavo safari stay with elevated rooms, waterhole views, and game drives.',
    'Salt Lick Safari Lodge',
    '["Salt Lick Safari Lodge Kenya","Tsavo safari accommodation","Taita Hills safari lodge","mid-range Tsavo lodge","Kenya safari lodge"]'::jsonb,
    null,
    v_now
  );
end $$;
