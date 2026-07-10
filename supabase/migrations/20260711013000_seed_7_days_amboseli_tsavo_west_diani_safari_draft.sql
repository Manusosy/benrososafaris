-- Seed draft: 7 Days Amboseli, Tsavo West and Diani Safari (no pricing; ready for images + publish).

do $$
declare
  v_tour_id uuid := gen_random_uuid();
  v_experience_id uuid;
  v_park_amboseli uuid;
  v_dest_amboseli uuid;
  v_dest_tsavo_west uuid;
  v_dest_diani uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.tour_translations
    where locale = 'en' and slug = '7-days-amboseli-tsavo-west-and-diani-safari'
  ) then
    return;
  end if;

  select e.id into v_experience_id
  from public.experiences e
  join public.experience_translations et on et.experience_id = e.id
  where et.locale = 'en' and et.slug = 'safari-beach-holidays' limit 1;

  select np.id into v_park_amboseli
  from public.national_parks np
  join public.national_park_translations npt on npt.park_id = np.id
  where npt.locale = 'en' and npt.slug = 'amboseli-national-park' limit 1;

  select d.id into v_dest_amboseli
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'amboseli-national-park' limit 1;

  select d.id into v_dest_tsavo_west
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'tsavo-west-national-park' limit 1;

  select d.id into v_dest_diani
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'diani-beach' limit 1;

  insert into public.tours (
    id, status, days, nights, countries,
    start_location, end_location, route_waypoints,
    important_notice, inclusions, exclusions, itinerary_days,
    gallery, pricing_table_keys, updated_at
  ) values (
    v_tour_id,
    'draft',
    7,
    6,
    array['kenya']::text[],
    'Nairobi / Jomo Kenyatta International Airport',
    'Nairobi / Jomo Kenyatta International Airport',
    '[
      {"from":"Nairobi","to":"Amboseli National Park"},
      {"from":"Amboseli National Park","to":"Tsavo West National Park"},
      {"from":"Tsavo West National Park","to":"Voi SGR Station"},
      {"from":"Voi SGR Station","to":"Diani"},
      {"from":"Diani","to":"Wasini Island"},
      {"from":"Wasini Island","to":"Nairobi"}
    ]'::jsonb,
    $notice$Wildlife and dolphin sightings occur naturally and cannot be guaranteed. Mt Kilimanjaro views depend on weather and visibility. Accommodation names are not provided and should be confirmed based on the selected package. Park and marine park fees should be confirmed before publishing the final price. Snorkeling, scuba diving and other marine activities depend on weather and sea conditions. The itinerary lists Wasini Island on both Day 5 and Day 6. This duplication should be clarified before publishing. Lunch is not mentioned on Day 5 and should be confirmed before booking. Train and flight arrangements are subject to availability and schedule changes.$notice$,
    '[
      "Pick-up at Jomo Kenyatta International Airport",
      "Road transfer from Nairobi to Amboseli",
      "Accommodation at selected lodges, hotels or resorts",
      "Meals indicated in the day-by-day itinerary",
      "Afternoon game drive in Amboseli",
      "Transfer from Amboseli to Tsavo West",
      "Afternoon game drive in Tsavo West",
      "Full-day Tsavo West game drive",
      "Visit to Mzima Springs",
      "Picnic lunch in Tsavo West",
      "Transfer to Voi SGR Station",
      "SGR train journey toward the coast",
      "Transfer from the train station to the Diani hotel",
      "Full-day Wasini Island excursion",
      "Dolphin viewing opportunity",
      "Snorkeling experience",
      "Visit to Kisite Marine Park",
      "Flight from Diani to Nairobi",
      "Drop-off at Jomo Kenyatta International Airport"
    ]'::jsonb,
    '[
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Park and marine park entry fees unless included in the selected package",
      "Scuba diving unless confirmed in the package",
      "Additional snorkeling activities",
      "Drinks and personal expenses",
      "Tips and gratuities",
      "Optional beach activities",
      "Any item not specifically mentioned under \"What Is Included\""
    ]'::jsonb,
    $itinerary$[
      {
        "day": 1,
        "title": "Nairobi to Amboseli",
        "description": "<p><strong>Activity:</strong> Airport pick-up, road transfer, lunch, check-in and afternoon game drive</p><p>Your safari begins after arrival at Jomo Kenyatta International Airport, where a representative will meet you after immigration and customs clearance. You will then begin the approximately 3.5-hour road journey to Amboseli.</p><p>Arrive at your selected lodge in time for lunch and check-in. Later in the afternoon, head out for a game drive with opportunities to see elephants, lions, giraffes, zebras and other wildlife mentioned in the itinerary.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/hotel, to be confirmed based on package selection"],
        "mealPlan": "Lunch & Dinner"
      },
      {
        "day": 2,
        "title": "Amboseli to Tsavo West",
        "description": "<p><strong>Activity:</strong> Breakfast, scenic road transfer, lunch, check-in and afternoon game drive</p><p>After an early breakfast, depart Amboseli and begin the approximately 1.5-hour journey to Tsavo West National Park.</p><p>On arrival, check in at your selected lodge and enjoy lunch. Later, head into the park for an afternoon game drive before returning to the lodge for dinner.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/hotel, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 3,
        "title": "Full-Day Tsavo West Safari",
        "description": "<p><strong>Activity:</strong> Full-day game drive, Mzima Springs visit, wildlife viewing and picnic lunch</p><p>Begin the day with breakfast before departing for a full-day safari in Tsavo West National Park. The itinerary highlights possible sightings of elephants, lions, giraffes, zebras and other wildlife.</p><p>Visit Mzima Springs, where you may observe hippos and crocodiles through the underwater viewing area. Enjoy a picnic lunch in the park before continuing the safari.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/hotel, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Picnic Lunch & Dinner"
      },
      {
        "day": 4,
        "title": "Tsavo West to Diani",
        "description": "<p><strong>Activity:</strong> Breakfast, transfer to Voi, SGR train journey, hotel transfer, lunch and beach relaxation</p><p>After breakfast, leave Tsavo West and travel to Voi, where you will board the SGR train toward the coast.</p><p>On arrival, a driver will meet you and transfer you to your selected hotel in Diani. Arrive in time for lunch and check-in, then spend the afternoon resting in your room or relaxing by the beach.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected hotel/resort, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 5,
        "title": "Wasini Island Full-Day Experience",
        "description": "<p><strong>Activity:</strong> Wasini Island excursion, dolphin viewing, snorkeling and Kisite Marine Park visit</p><p>After breakfast, depart from the hotel for a full-day excursion to Wasini Island. The day includes opportunities to see dolphins, explore the underwater environment through snorkeling and visit Kisite Marine Park.</p><p>In the evening, return to your Diani hotel for dinner and rest after the day’s coastal activities.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected hotel/resort, to be confirmed based on package selection"],
        "mealPlan": "Breakfast & Dinner"
      },
      {
        "day": 6,
        "title": "Full Day in Diani",
        "description": "<p><strong>Activity:</strong> Diani tour, coastal relaxation, lunch and optional marine activities</p><p>Begin the day with breakfast before exploring Diani and enjoying the coastal surroundings. The source itinerary also mentions another visit to Wasini Island and a further opportunity to see dolphins.</p><p>Return to the hotel for lunch. In the evening, activities such as scuba diving, snorkeling and other beach experiences may be available, subject to final package confirmation.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected hotel/resort, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 7,
        "title": "Diani to Nairobi",
        "description": "<p><strong>Activity:</strong> Breakfast, airport transfer, flight to Nairobi and JKIA drop-off</p><p>Enjoy an early breakfast before checking out and transferring to the airport for your flight back to Nairobi.</p><p>On arrival, you will be dropped off at Jomo Kenyatta International Airport, marking the end of the safari.</p>",
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
    tour_id, locale, slug, title, excerpt, overview, faqs,
    seo_title, seo_description, focus_keyword, keywords,
    published_at, updated_at
  ) values (
    v_tour_id,
    'en',
    '7-days-amboseli-tsavo-west-and-diani-safari',
    '7 Days Amboseli, Tsavo West and Diani Safari',
    'Explore Amboseli, Tsavo West, Diani and Wasini Island on a 7-day safari with Benroso Safaris. Enjoy wildlife game drives, Mzima Springs, Mt Kilimanjaro views, dolphin encounters, snorkeling and relaxing beach time.',
    jsonb_build_object(
      'html',
      $overview$<p>The 7 Days Amboseli, Tsavo West and Diani Safari begins at Jomo Kenyatta International Airport and combines wildlife experiences in southern Kenya with marine adventures along the coast. The journey first travels to Amboseli National Park, where guests enjoy an afternoon game drive and opportunities to observe elephants, lions, giraffes and zebras.</p><p>The route then continues to Tsavo West National Park for an afternoon game drive and a full day of exploration. A key highlight is Mzima Springs, where guests may view hippos and crocodiles from the underwater observation area. After the safari section, the journey continues by SGR train from Voi toward the coast, followed by a transfer to Diani.</p><p>The beach portion includes a full-day Wasini Island excursion with dolphin-viewing opportunities, snorkeling and a visit to Kisite Marine Park. Guests also have time to explore Diani, relax by the beach and consider additional marine activities such as scuba diving.</p><p>Benroso Safaris recommends this itinerary for couples, families, small groups and travelers looking for a compact bush and beach holiday. It offers a practical balance of game drives, scenic travel, marine life and coastal relaxation within one week.</p><h2>Experiences Associated With This Trip</h2><ul><li><p>Amboseli game drive</p></li><li><p>Mt Kilimanjaro views</p></li><li><p>Elephant sightings</p></li><li><p>Tsavo West game drives</p></li><li><p>Mzima Springs visit</p></li><li><p>Hippo and crocodile viewing</p></li><li><p>SGR train journey</p></li><li><p>Diani Beach stay</p></li><li><p>Wasini Island excursion</p></li><li><p>Dolphin viewing</p></li><li><p>Snorkeling</p></li><li><p>Kisite Marine Park</p></li><li><p>Optional scuba diving</p></li></ul><h2>This Is Suitable For</h2><ul><li><p>Couples seeking a bush and beach holiday</p></li><li><p>Families and small private groups</p></li><li><p>Wildlife and marine-life enthusiasts</p></li><li><p>First-time visitors to Kenya</p></li><li><p>Travelers interested in snorkeling and dolphin viewing</p></li><li><p>Guests with one week available for a Kenya safari</p></li></ul>$overview$
    ),
    '[
      {"question":"Which destinations are included in this safari?","answer":"The itinerary includes Amboseli National Park, Tsavo West National Park, Diani, Wasini Island and Kisite Marine Park."},
      {"question":"Are game drives included?","answer":"Yes. The itinerary includes an afternoon game drive in Amboseli, an afternoon game drive in Tsavo West and a full-day Tsavo West safari."},
      {"question":"Is Mzima Springs included?","answer":"Yes. The full-day Tsavo West itinerary includes a visit to Mzima Springs."},
      {"question":"Is the Wasini Island excursion included?","answer":"Yes. Day 5 includes a full-day Wasini Island excursion with snorkeling, dolphin-viewing opportunities and a visit to Kisite Marine Park."},
      {"question":"Is scuba diving included?","answer":"Scuba diving is mentioned as an evening activity on Day 6, but its cost and inclusion should be confirmed before booking."},
      {"question":"Where does the safari start and end?","answer":"The safari starts and ends at Jomo Kenyatta International Airport in Nairobi."}
    ]'::jsonb,
    '7 Days Amboseli, Tsavo West and Diani Safari',
    '7-day Amboseli, Tsavo West and Diani safari with Benroso Safaris, featuring Mzima Springs, Wasini Island, dolphins and snorkeling.',
    '7 Days Amboseli, Tsavo West and Diani Safari',
    '["Amboseli Diani safari","Tsavo West beach safari","Wasini Island tour","Kisite Marine Park safari","Benroso Safaris"]'::jsonb,
    null,
    v_now
  );

  if v_experience_id is not null then
    insert into public.tour_experiences (tour_id, experience_id, position)
    values (v_tour_id, v_experience_id, 0);
  end if;

  if v_park_amboseli is not null then
    insert into public.tour_national_parks (tour_id, park_id, position)
    values (v_tour_id, v_park_amboseli, 0);
  end if;

  if v_dest_amboseli is not null then
    insert into public.tour_destinations (tour_id, destination_id, position)
    values (v_tour_id, v_dest_amboseli, 0);
  end if;

  if v_dest_tsavo_west is not null then
    insert into public.tour_destinations (tour_id, destination_id, position)
    values (v_tour_id, v_dest_tsavo_west, 1);
  end if;

  if v_dest_diani is not null then
    insert into public.tour_destinations (tour_id, destination_id, position)
    values (v_tour_id, v_dest_diani, 2);
  end if;
end $$;
