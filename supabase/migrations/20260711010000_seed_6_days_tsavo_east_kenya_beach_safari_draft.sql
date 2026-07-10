-- Seed draft: 6 Days Tsavo East and Kenya Beach Safari (no pricing; ready for images + publish).

do $$
declare
  v_tour_id uuid := gen_random_uuid();
  v_experience_id uuid;
  v_dest_tsavo uuid;
  v_dest_diani uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.tour_translations
    where locale = 'en' and slug = '6-days-tsavo-east-and-kenya-beach-safari'
  ) then
    return;
  end if;

  select e.id
  into v_experience_id
  from public.experiences e
  join public.experience_translations et on et.experience_id = e.id
  where et.locale = 'en' and et.slug = 'safari-beach-holidays'
  limit 1;

  select d.id
  into v_dest_tsavo
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'tsavo-east-national-park'
  limit 1;

  select d.id
  into v_dest_diani
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'diani-beach'
  limit 1;

  insert into public.tours (
    id,
    status,
    days,
    nights,
    countries,
    start_location,
    end_location,
    route_waypoints,
    important_notice,
    inclusions,
    exclusions,
    itinerary_days,
    gallery,
    pricing_table_keys,
    updated_at
  ) values (
    v_tour_id,
    'draft',
    6,
    5,
    array['kenya']::text[],
    'Nairobi',
    'Nairobi',
    '[
      {"from":"Nairobi","to":"Tsavo East National Park"},
      {"from":"Tsavo East National Park","to":"Voi SGR Station"},
      {"from":"Voi SGR Station","to":"Mombasa"},
      {"from":"Mombasa","to":"Diani or Watamu"},
      {"from":"Diani or Watamu","to":"Nairobi"}
    ]'::jsonb,
    $notice$Wildlife sightings occur naturally and cannot be guaranteed. Guests must select either Diani or Watamu before the final booking is confirmed. Accommodation names are not provided in the source document and should be confirmed according to the selected package. Park fees should be confirmed before publishing the final package price. Train and flight schedules are subject to availability and operational changes. Sundowner activities and beach games may depend on hotel arrangements and weather conditions. The Day 3 meal plan should be reconfirmed because the itinerary mentions breakfast and dinner but does not specifically mention lunch.$notice$,
    '[
      "Pick-up from your location in Nairobi",
      "Road transport from Nairobi to Tsavo East National Park",
      "Services of a safari guide during the safari section",
      "Accommodation at selected lodges or hotels",
      "Meals indicated in the day-by-day itinerary",
      "Afternoon game drive on Day 1",
      "Full-day Tsavo East game drive on Day 2",
      "Visit to Mudanda Rock",
      "Transfer to Voi SGR Station",
      "SGR train journey from Voi to Mombasa",
      "Transfer from Mombasa to the selected coastal hotel",
      "Beach leisure activities mentioned in the itinerary",
      "Airport transfer on the final day",
      "Flight from the coast to Nairobi"
    ]'::jsonb,
    '[
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Park entry fees unless included in the selected package",
      "Drinks and personal expenses",
      "Tips and gratuities",
      "Optional coastal excursions not mentioned in the itinerary",
      "Additional beach activities charged by the hotel or local operators",
      "Any item not specifically mentioned under \"What Is Included\""
    ]'::jsonb,
    $itinerary$[
      {
        "day": 1,
        "title": "Nairobi to Tsavo East National Park",
        "description": "<p><strong>Activity:</strong> Pick-up, road transfer, lunch, check-in and afternoon game drive</p><p>Your safari begins with a morning pick-up from your location in Nairobi, followed by an approximately 4.5-hour drive to Tsavo East National Park. Your safari guide will accompany you throughout the journey and share helpful information about the route and destination.</p><p>After arriving at your selected lodge or hotel, you will check in and enjoy lunch. Later, head out for an afternoon game drive in search of Tsavo East’s famous red elephants and other wildlife before returning for dinner.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/hotel, to be confirmed based on package selection"],
        "mealPlan": "Lunch & Dinner"
      },
      {
        "day": 2,
        "title": "Full-Day Tsavo East Game Drive",
        "description": "<p><strong>Activity:</strong> Full-day game drive, wildlife viewing and Mudanda Rock visit</p><p>After breakfast, depart for a full-day game drive across Tsavo East National Park. The day offers another opportunity to observe the park’s renowned red elephants and the variety of wildlife found across its open landscapes.</p><p>The itinerary also includes a visit to Mudanda Rock, a striking natural formation overlooking a seasonal dam that attracts wildlife. After the day’s exploration, return to your accommodation for dinner and rest.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/hotel, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 3,
        "title": "Tsavo East to Diani or Watamu",
        "description": "<p><strong>Activity:</strong> Breakfast, transfer to Voi SGR Station, train journey and coastal hotel transfer</p><p>After breakfast, check out and travel to Voi SGR Station for the train journey to Mombasa. The train journey takes approximately 3 hours and 47 minutes.</p><p>On arrival in Mombasa, a Benroso Safaris driver will meet you and transfer you to your selected hotel in Diani or Watamu. After check-in, spend the remainder of the day resting in your room or relaxing by the beach.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/hotel, to be confirmed based on package selection"],
        "mealPlan": "Breakfast & Dinner"
      },
      {
        "day": 4,
        "title": "Diani or Watamu Beach Experience",
        "description": "<p><strong>Activity:</strong> Hotel relaxation, beach swimming, games and sundowner experience</p><p>Begin the day with breakfast before enjoying a relaxed morning at the hotel. Lunch will be served before you spend the afternoon at the beach.</p><p>You may swim, relax by the ocean, enjoy beach games or take in the coastal atmosphere during a sundowner experience. Return to the hotel later in the evening for dinner.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/hotel, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 5,
        "title": "Diani or Watamu Beach Experience",
        "description": "<p><strong>Activity:</strong> Hotel relaxation, lunch, swimming, beach games and sundowner experience</p><p>After breakfast, enjoy another leisurely day at your coastal hotel. The itinerary allows plenty of time to rest and enjoy the hotel facilities before lunch.</p><p>Later in the afternoon, return to the beach for swimming, games, relaxation and a sundowner experience. End the day with dinner at the hotel.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/hotel, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 6,
        "title": "Diani to Nairobi",
        "description": "<p><strong>Activity:</strong> Breakfast, airport transfer and flight to Nairobi</p><p>Enjoy an early breakfast before checking out and transferring to the airport for your approximately 1-hour and 15-minute flight back to Nairobi.</p><p>Your arrival in Nairobi marks the end of the 6-day Tsavo East and Kenya beach safari.</p>",
        "imageId": "",
        "accommodationOptions": [],
        "mealPlan": "Breakfast"
      }
    ]$itinerary$::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    v_now
  );

  insert into public.tour_translations (
    tour_id,
    locale,
    slug,
    title,
    excerpt,
    overview,
    faqs,
    seo_title,
    seo_description,
    focus_keyword,
    keywords,
    published_at,
    updated_at
  ) values (
    v_tour_id,
    'en',
    '6-days-tsavo-east-and-kenya-beach-safari',
    '6 Days Tsavo East and Kenya Beach Safari',
    'Explore Tsavo East and the Kenyan coast on a 6-day safari with Benroso Safaris. See red elephants, visit Mudanda Rock, enjoy rewarding game drives, then relax on the beaches of Diani or Watamu before flying back to Nairobi.',
    jsonb_build_object(
      'html',
      $overview$<p>The 6 Days Tsavo East and Kenya Beach Safari begins in Nairobi and combines two of Kenya’s most appealing travel experiences: wildlife viewing and coastal relaxation. The journey first travels to Tsavo East National Park, where guests enjoy an afternoon game drive followed by a full day of wildlife exploration.</p><p>Tsavo East is especially known for its red elephants, open landscapes and landmarks such as Mudanda Rock. After two nights in the park, the route continues to Voi SGR Station for a train journey to Mombasa. From there, guests are transferred to a selected coastal hotel in either Diani or Watamu.</p><p>The beach section provides time to rest after the safari, with opportunities for swimming, hotel relaxation, beach games and evening sundowner experiences. Meals and accommodation are arranged according to the selected package, while the final flight to Nairobi provides a convenient conclusion to the journey.</p><p>Benroso Safaris recommends this itinerary for couples, families, small groups and first-time visitors seeking a balanced Kenya bush and beach holiday. It is especially suitable for travelers who want meaningful wildlife experiences without sacrificing time for relaxation along the Indian Ocean coast.</p><h2>Experiences Associated With This Trip</h2><ul><li><p>Tsavo East game drives</p></li><li><p>Red elephant sightings</p></li><li><p>Mudanda Rock visit</p></li><li><p>Wildlife viewing</p></li><li><p>Scenic road travel</p></li><li><p>SGR train experience</p></li><li><p>Diani or Watamu beach stay</p></li><li><p>Swimming and beach games</p></li><li><p>Coastal sundowner experience</p></li><li><p>Flight back to Nairobi</p></li></ul><h2>This Is Suitable For</h2><ul><li><p>Couples seeking a bush and beach holiday</p></li><li><p>Families traveling with children</p></li><li><p>Small private groups</p></li><li><p>First-time visitors to Kenya</p></li><li><p>Wildlife lovers interested in Tsavo East</p></li><li><p>Travelers seeking safari and beach relaxation in one itinerary</p></li></ul>$overview$
    ),
    '[
      {"question":"What destinations are included in this safari?","answer":"The itinerary includes Tsavo East National Park and a beach stay in either Diani or Watamu."},
      {"question":"Where does the safari start and end?","answer":"The safari starts in Nairobi and ends in Nairobi after the return flight from the coast."},
      {"question":"Are game drives included?","answer":"Yes. The itinerary includes an afternoon game drive on Day 1 and a full-day game drive in Tsavo East on Day 2."},
      {"question":"What wildlife may be seen in Tsavo East?","answer":"The itinerary particularly highlights Tsavo East’s famous red elephants and other wildlife found within the park."},
      {"question":"Is the train journey included?","answer":"The itinerary includes an SGR train journey from Voi Station to Mombasa, subject to final package confirmation and availability."},
      {"question":"Can guests choose between Diani and Watamu?","answer":"Yes. The source itinerary presents Diani or Watamu as the coastal destination. The final destination should be selected during booking."}
    ]'::jsonb,
    '6 Days Tsavo East and Kenya Beach Safari',
    '6-day Tsavo East and Kenya beach safari with Benroso Safaris, featuring red elephants, Mudanda Rock, game drives and Diani or Watamu.',
    '6 Days Tsavo East and Kenya Beach Safari',
    '["Tsavo East beach safari","Kenya bush and beach safari","Diani safari package","Watamu beach safari","Benroso Safaris"]'::jsonb,
    null,
    v_now
  );

  if v_experience_id is not null then
    insert into public.tour_experiences (tour_id, experience_id, position)
    values (v_tour_id, v_experience_id, 0);
  end if;

  if v_dest_tsavo is not null then
    insert into public.tour_destinations (tour_id, destination_id, position)
    values (v_tour_id, v_dest_tsavo, 0);
  end if;

  if v_dest_diani is not null then
    insert into public.tour_destinations (tour_id, destination_id, position)
    values (v_tour_id, v_dest_diani, 1);
  end if;
end $$;
