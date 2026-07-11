-- Seed draft: Ibis Styles Nairobi Westlands (map and gallery left for manual entry).

do $$
declare
  v_accommodation_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.accommodation_translations
    where locale = 'en' and slug = 'ibis-styles-nairobi-westlands'
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
    'Mid-Range City Hotel',
    'mid-range',
    'on_request',
    null,
    '[
      "Modern en-suite rooms",
      "Restaurant",
      "Rooftop bar and lounge",
      "Free Wi-Fi",
      "Fitness center",
      "Meeting and conference facilities",
      "Business-friendly services",
      "Private parking",
      "Room service",
      "Laundry service",
      "Family-friendly accommodation",
      "Breakfast and meal options",
      "Airport transfer arrangements",
      "Westlands access",
      "Nairobi city excursion access",
      "Safari departure access",
      "Reception support",
      "Luggage storage",
      "Travel assistance",
      "Accessible facilities"
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
    'ibis-styles-nairobi-westlands',
    'Ibis Styles Nairobi Westlands',
    'Ibis Styles Nairobi Westlands is a modern Nairobi hotel offering stylish rooms, dining, rooftop views, business facilities, and convenient access to Westlands, city attractions, airport transfers, and Kenya safari departures.',
    jsonb_build_object(
      'html',
      $description$<p>Ibis Styles Nairobi Westlands is a smart and convenient choice for travelers who want a modern city stay before or after their Kenya safari. Located in the Westlands area, the hotel gives guests easy access to Nairobi’s restaurants, shopping, business hubs, nightlife, and main transport routes.</p><p>For guests booking with Benroso Safaris, Ibis Styles Nairobi Westlands works well for mid-range Nairobi accommodation, pre-safari nights, post-safari stays, group tours, business travel, and short city stopovers. It is especially useful for travelers who want a stylish but practical hotel before heading to Maasai Mara, Amboseli, Lake Nakuru, Samburu, Tsavo, or a fly-in safari from Wilson Airport.</p><p>The hotel offers comfortable rooms, casual dining, a rooftop bar atmosphere, meeting spaces, and essential guest services for a smooth Nairobi stay. With Benroso Safaris, Ibis Styles Nairobi Westlands can be included in Nairobi city packages, airport transfer plans, and longer Kenya safari itineraries where guests need a reliable urban base.</p>$description$
    ),
    'Ibis Styles Nairobi Westlands',
    'Book Ibis Styles Nairobi Westlands with Benroso Safaris for a modern Nairobi stay near Westlands, city attractions, and safari departures.',
    'Ibis Styles Nairobi Westlands',
    '["Ibis Styles Nairobi Kenya","mid-range Nairobi hotel","Westlands accommodation","Nairobi safari hotel","Kenya safari stopover hotel"]'::jsonb,
    null,
    v_now
  );
end $$;
