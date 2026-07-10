-- Seed draft: 9 Days Masai Mara, Amboseli, Tsavo and Mombasa Safari (no pricing; ready for images + publish).

do $$
declare
  v_tour_id uuid := gen_random_uuid();
  v_exp_beach uuid;
  v_exp_big5 uuid;
  v_park_mara uuid;
  v_park_hells uuid;
  v_park_amboseli uuid;
  v_dest_mara uuid;
  v_dest_naivasha uuid;
  v_dest_hells uuid;
  v_dest_amboseli uuid;
  v_dest_tsavo_west uuid;
  v_now timestamptz := now();
  v_pos int := 0;
begin
  if exists (
    select 1
    from public.tour_translations
    where locale = 'en' and slug = '9-days-masai-mara-amboseli-tsavo-and-mombasa-safari'
  ) then
    return;
  end if;

  select e.id into v_exp_beach
  from public.experiences e
  join public.experience_translations et on et.experience_id = e.id
  where et.locale = 'en' and et.slug = 'safari-beach-holidays' limit 1;

  select e.id into v_exp_big5
  from public.experiences e
  join public.experience_translations et on et.experience_id = e.id
  where et.locale = 'en' and et.slug = 'big-5-safaris' limit 1;

  select np.id into v_park_mara
  from public.national_parks np
  join public.national_park_translations npt on npt.park_id = np.id
  where npt.locale = 'en' and npt.slug = 'maasai-mara' limit 1;

  select np.id into v_park_hells
  from public.national_parks np
  join public.national_park_translations npt on npt.park_id = np.id
  where npt.locale = 'en' and npt.slug = 'hells-gate-national-park' limit 1;

  select np.id into v_park_amboseli
  from public.national_parks np
  join public.national_park_translations npt on npt.park_id = np.id
  where npt.locale = 'en' and npt.slug = 'amboseli-national-park' limit 1;

  select d.id into v_dest_mara
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'maasai-mara' limit 1;

  select d.id into v_dest_naivasha
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'lake-naivasha' limit 1;

  select d.id into v_dest_hells
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'hells-gate-national-park' limit 1;

  select d.id into v_dest_amboseli
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'amboseli-national-park' limit 1;

  select d.id into v_dest_tsavo_west
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'tsavo-west-national-park' limit 1;

  insert into public.tours (
    id, status, days, nights, countries,
    start_location, end_location, route_waypoints,
    important_notice, inclusions, exclusions, itinerary_days,
    gallery, pricing_table_keys, updated_at
  ) values (
    v_tour_id,
    'draft',
    9,
    8,
    array['kenya']::text[],
    'Nairobi / Jomo Kenyatta International Airport',
    'Nairobi / Jomo Kenyatta International Airport',
    '[
      {"from":"Nairobi","to":"Masai Mara"},
      {"from":"Masai Mara","to":"Lake Naivasha and Hell’s Gate"},
      {"from":"Lake Naivasha and Hell’s Gate","to":"Amboseli National Park"},
      {"from":"Amboseli National Park","to":"Tsavo West National Park"},
      {"from":"Tsavo West National Park","to":"Voi SGR Station"},
      {"from":"Voi SGR Station","to":"Mombasa"},
      {"from":"Mombasa","to":"Nairobi"}
    ]'::jsonb,
    $notice$Wildlife sightings are natural and cannot be guaranteed. Mt Kilimanjaro views depend on weather and cloud cover. The Lake Naivasha boat ride should be confirmed as included or optional before publishing. Accommodation names are not stated and should be confirmed based on the selected package. Park and reserve fees should be confirmed before the final price is published. SGR train schedules and seat availability are subject to confirmation. The source title mentions Lake Nakuru, but the detailed itinerary does not include a Lake Nakuru visit. It should not be marketed as part of the route unless the itinerary is revised. The Day 9 method of transport from Mombasa to Nairobi is not specified and should be confirmed before booking.$notice$,
    '[
      "Pick-up from Jomo Kenyatta International Airport or a Nairobi hotel",
      "Road transport between the destinations listed in the itinerary",
      "Accommodation at selected lodges, camps, resorts or hotels",
      "Meals indicated in the itinerary",
      "Afternoon game drive in Masai Mara",
      "Full-day Masai Mara game drive",
      "Picnic lunch near the hippo pool",
      "Hell’s Gate National Park game drive",
      "Evening boat ride opportunity at Lake Naivasha",
      "Afternoon game drive in Amboseli",
      "Evening game drive in Tsavo West",
      "Full-day Tsavo West game drive",
      "Visit to Mzima Springs",
      "Picnic lunch in Tsavo West",
      "Transfer to Voi SGR Station",
      "SGR train journey from Voi to Mombasa",
      "Transfer from Mombasa station to the selected hotel",
      "Beach leisure activities mentioned in the itinerary",
      "Final transfer and drop-off at Jomo Kenyatta International Airport"
    ]'::jsonb,
    '[
      "International and domestic flights",
      "Visa fees",
      "Travel insurance",
      "Park and reserve entry fees unless included in the selected package",
      "Lake Naivasha boat ride if not included in the final quotation",
      "Drinks and personal expenses",
      "Tips and gratuities",
      "Optional activities not listed in the itinerary",
      "Any item not specifically mentioned under \"What Is Included\""
    ]'::jsonb,
    $itinerary$[
      {
        "day": 1,
        "title": "Nairobi to Masai Mara",
        "description": "<p><strong>Activity:</strong> Airport or hotel pick-up, scenic transfer, lunch, check-in and afternoon game drive</p><p>Your journey begins with pick-up from Jomo Kenyatta International Airport or your Nairobi hotel. Travel toward Masai Mara through the Maai Mahiu route, enjoying views of the Great Rift Valley escarpment along the way.</p><p>Upon arrival, check in at your selected lodge and enjoy lunch. After a short rest, head into the reserve for an afternoon game drive before returning to the lodge.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/hotel, to be confirmed based on package selection"],
        "mealPlan": "Lunch & Dinner"
      },
      {
        "day": 2,
        "title": "Full-Day Masai Mara Experience",
        "description": "<p><strong>Activity:</strong> Full-day game drive, Big Five tracking, picnic lunch and hippo pool visit</p><p>After breakfast, depart for a full-day game drive across the Masai Mara’s open savannahs and rolling hills. The reserve offers opportunities to observe and track a wide variety of wildlife and birdlife.</p><p>The itinerary highlights possible sightings of the Big Five, including elephants, lions, rhinos, leopards and buffaloes. Enjoy a picnic lunch near the hippo pool, where hippos and crocodiles may be seen, before continuing the afternoon game drive.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/hotel, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Picnic Lunch & Dinner"
      },
      {
        "day": 3,
        "title": "Masai Mara to Lake Naivasha",
        "description": "<p><strong>Activity:</strong> Breakfast, road transfer, Hell’s Gate game drive, lunch and optional evening boat ride</p><p>After breakfast, leave Masai Mara and travel toward Lake Naivasha. The day includes a visit to Hell’s Gate National Park, where you will enjoy a game drive through the park.</p><p>Wildlife mentioned in the itinerary includes zebras, buffaloes, elands, Defassa waterbucks, olive baboons and Masai giraffes. Around lunchtime, check in at your selected resort and enjoy lunch. An evening boat ride may be arranged before returning to the resort.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/resort, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 4,
        "title": "Lake Naivasha to Amboseli",
        "description": "<p><strong>Activity:</strong> Breakfast, road transfer, lunch, check-in and afternoon game drive</p><p>Enjoy breakfast before departing for Amboseli National Park, an approximately 5.5-hour drive from Lake Naivasha.</p><p>Upon arrival, check in and have lunch before heading out for an afternoon game drive. The itinerary offers an opportunity to see Mt Kilimanjaro, depending on weather and visibility.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected camp/lodge, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 5,
        "title": "Amboseli to Tsavo West",
        "description": "<p><strong>Activity:</strong> Breakfast, road transfer, lunch, check-in and evening game drive</p><p>After breakfast, leave Amboseli and travel to Tsavo West National Park. The journey takes approximately 1.5 hours.</p><p>Arrive in time for lunch and check-in at your selected lodge. After refreshing, depart for an evening game drive before returning to the lodge for dinner.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/hotel, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 6,
        "title": "Full-Day Tsavo West Experience",
        "description": "<p><strong>Activity:</strong> Full-day game drive, Mzima Springs visit, wildlife viewing and picnic lunch</p><p>After breakfast, depart from the lodge for a full-day safari in Tsavo West National Park. The itinerary highlights possible sightings of elephants, lions, giraffes and zebras.</p><p>Visit Mzima Springs for an underwater view of hippos and crocodiles. Enjoy a picnic lunch surrounded by the park’s natural scenery before continuing the game drive.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/hotel, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Picnic Lunch & Dinner"
      },
      {
        "day": 7,
        "title": "Tsavo West to Mombasa",
        "description": "<p><strong>Activity:</strong> Breakfast, transfer to Voi, SGR train journey, hotel transfer, lunch and beach swimming</p><p>After breakfast, leave Tsavo West and travel to Voi, where you will board the SGR train to Mombasa.</p><p>On arrival, a Benroso Safaris driver will meet you and transfer you to your selected coastal hotel. Check in, have lunch and freshen up before enjoying an evening swim at the beach.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected hotel/resort, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 8,
        "title": "Full Day in Mombasa",
        "description": "<p><strong>Activity:</strong> Hotel relaxation, lunch, beach swimming, games and sundowner experience</p><p>Begin the day with breakfast and spend the morning relaxing at the hotel. Lunch will be served before you enjoy the rest of the afternoon at the beach.</p><p>The itinerary allows time for swimming, games and a coastal sundowner experience. Later, return to the hotel for dinner.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected hotel/resort, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 9,
        "title": "Mombasa to Nairobi",
        "description": "<p><strong>Activity:</strong> Breakfast, check-out, return journey and airport drop-off</p><p>Enjoy an early breakfast before checking out of the hotel and beginning the journey back to Nairobi.</p><p>The safari concludes with drop-off at Jomo Kenyatta International Airport.</p>",
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
    '9-days-masai-mara-amboseli-tsavo-and-mombasa-safari',
    '9 Days Masai Mara, Amboseli, Tsavo and Mombasa Safari',
    'Explore Masai Mara, Lake Naivasha, Amboseli, Tsavo West and Mombasa on a 9-day safari with Benroso Safaris. Enjoy Big Five game drives, Hell’s Gate, Mzima Springs, Mt Kilimanjaro views and relaxing beach time.',
    jsonb_build_object(
      'html',
      $overview$<p>The 9 Days Masai Mara, Amboseli, Tsavo and Mombasa Safari begins in Nairobi and follows a varied route through some of Kenya’s leading wildlife destinations before ending with time at the coast. The journey starts in Masai Mara, where guests enjoy an afternoon game drive and a full-day safari with opportunities to search for the Big Five and visit the hippo pool.</p><p>The route continues to Lake Naivasha and Hell’s Gate National Park, where the itinerary includes a game drive and an evening boat ride opportunity. From there, guests travel to Amboseli for wildlife viewing and a chance to see Mt Kilimanjaro when weather conditions allow.</p><p>The safari then enters Tsavo West National Park for an evening game drive and a full day of exploration, including a visit to Mzima Springs. After the bush section, guests travel by SGR train from Voi to Mombasa for beach relaxation, swimming and a full leisure day by the coast.</p><p>Benroso Safaris recommends this itinerary for travelers seeking a comprehensive Kenya safari that combines the Masai Mara, Rift Valley scenery, southern parks and a coastal stay. It is ideal for couples, families, small groups and first-time visitors with enough time to experience several distinct regions.</p><h2>Experiences Associated With This Trip</h2><ul><li><p>Masai Mara game drives</p></li><li><p>Big Five wildlife viewing</p></li><li><p>Great Rift Valley scenery</p></li><li><p>Hippo pool picnic</p></li><li><p>Hell’s Gate game drive</p></li><li><p>Lake Naivasha boat ride</p></li><li><p>Amboseli wildlife viewing</p></li><li><p>Mt Kilimanjaro views</p></li><li><p>Tsavo West game drives</p></li><li><p>Mzima Springs visit</p></li><li><p>Hippo and crocodile viewing</p></li><li><p>SGR train journey</p></li><li><p>Mombasa beach stay</p></li></ul><h2>This Is Suitable For</h2><ul><li><p>First-time visitors seeking a comprehensive Kenya safari</p></li><li><p>Couples and honeymoon travelers</p></li><li><p>Families and small private groups</p></li><li><p>Big Five wildlife enthusiasts</p></li><li><p>Nature and landscape photographers</p></li><li><p>Travelers wanting both safari and beach relaxation</p></li></ul>$overview$
    ),
    '[
      {"question":"Which destinations are included in this safari?","answer":"The itinerary includes Masai Mara, Hell’s Gate, Lake Naivasha, Amboseli, Tsavo West and Mombasa."},
      {"question":"Does the safari visit Lake Nakuru?","answer":"No. Although Lake Nakuru appears in the source title, it is not included in the detailed day-by-day itinerary."},
      {"question":"Are Big Five game drives included?","answer":"Yes. The itinerary includes game drives in Masai Mara, where guests may have opportunities to see the Big Five."},
      {"question":"Is the Lake Naivasha boat ride included?","answer":"The itinerary mentions an evening boat ride opportunity, but its inclusion and cost should be confirmed before booking."},
      {"question":"How do guests travel from Tsavo West to Mombasa?","answer":"Guests are transferred to Voi SGR Station and travel by train to Mombasa."},
      {"question":"Is this safari suitable for families?","answer":"Yes. The varied wildlife, scenery and beach section make it suitable for families, subject to suitable accommodation and travel arrangements."}
    ]'::jsonb,
    '9 Days Masai Mara, Amboseli, Tsavo and Mombasa Safari',
    '9-day Masai Mara, Amboseli, Tsavo and Mombasa safari with Benroso Safaris, featuring Big Five game drives, Mzima Springs and beach time.',
    '9 Days Masai Mara, Amboseli, Tsavo and Mombasa Safari',
    '["Masai Mara and Mombasa safari","Amboseli Tsavo safari","Kenya bush and beach tour","Mzima Springs safari","Benroso Safaris"]'::jsonb,
    null,
    v_now
  );

  if v_exp_beach is not null then
    insert into public.tour_experiences (tour_id, experience_id, position) values (v_tour_id, v_exp_beach, v_pos);
    v_pos := v_pos + 1;
  end if;
  if v_exp_big5 is not null then
    insert into public.tour_experiences (tour_id, experience_id, position) values (v_tour_id, v_exp_big5, v_pos);
  end if;

  v_pos := 0;
  if v_park_mara is not null then
    insert into public.tour_national_parks (tour_id, park_id, position) values (v_tour_id, v_park_mara, v_pos);
    v_pos := v_pos + 1;
  end if;
  if v_park_hells is not null then
    insert into public.tour_national_parks (tour_id, park_id, position) values (v_tour_id, v_park_hells, v_pos);
    v_pos := v_pos + 1;
  end if;
  if v_park_amboseli is not null then
    insert into public.tour_national_parks (tour_id, park_id, position) values (v_tour_id, v_park_amboseli, v_pos);
  end if;

  v_pos := 0;
  if v_dest_mara is not null then
    insert into public.tour_destinations (tour_id, destination_id, position) values (v_tour_id, v_dest_mara, v_pos);
    v_pos := v_pos + 1;
  end if;
  if v_dest_naivasha is not null then
    insert into public.tour_destinations (tour_id, destination_id, position) values (v_tour_id, v_dest_naivasha, v_pos);
    v_pos := v_pos + 1;
  end if;
  if v_dest_hells is not null then
    insert into public.tour_destinations (tour_id, destination_id, position) values (v_tour_id, v_dest_hells, v_pos);
    v_pos := v_pos + 1;
  end if;
  if v_dest_amboseli is not null then
    insert into public.tour_destinations (tour_id, destination_id, position) values (v_tour_id, v_dest_amboseli, v_pos);
    v_pos := v_pos + 1;
  end if;
  if v_dest_tsavo_west is not null then
    insert into public.tour_destinations (tour_id, destination_id, position) values (v_tour_id, v_dest_tsavo_west, v_pos);
  end if;
end $$;
