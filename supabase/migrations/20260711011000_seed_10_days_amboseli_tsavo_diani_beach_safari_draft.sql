-- Seed draft: 10 Days Amboseli, Tsavo and Diani Beach Safari (no pricing; ready for images + publish).

do $$
declare
  v_tour_id uuid := gen_random_uuid();
  v_experience_id uuid;
  v_park_amboseli uuid;
  v_dest_amboseli uuid;
  v_dest_tsavo_east uuid;
  v_dest_tsavo_west uuid;
  v_dest_diani uuid;
  v_now timestamptz := now();
begin
  if exists (
    select 1
    from public.tour_translations
    where locale = 'en' and slug = '10-days-amboseli-tsavo-and-diani-beach-safari'
  ) then
    return;
  end if;

  select e.id
  into v_experience_id
  from public.experiences e
  join public.experience_translations et on et.experience_id = e.id
  where et.locale = 'en' and et.slug = 'safari-beach-holidays'
  limit 1;

  select np.id
  into v_park_amboseli
  from public.national_parks np
  join public.national_park_translations npt on npt.park_id = np.id
  where npt.locale = 'en' and npt.slug = 'amboseli-national-park'
  limit 1;

  select d.id
  into v_dest_amboseli
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'amboseli-national-park'
  limit 1;

  select d.id
  into v_dest_tsavo_east
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'tsavo-east-national-park'
  limit 1;

  select d.id
  into v_dest_tsavo_west
  from public.destinations d
  join public.destination_translations dt on dt.destination_id = d.id
  where dt.locale = 'en' and dt.slug = 'tsavo-west-national-park'
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
    10,
    9,
    array['kenya']::text[],
    'Nairobi / Jomo Kenyatta International Airport',
    'Mombasa / Moi International Airport',
    '[
      {"from":"Nairobi","to":"Amboseli National Park"},
      {"from":"Amboseli National Park","to":"Tsavo East National Park"},
      {"from":"Tsavo East National Park","to":"Tsavo West National Park"},
      {"from":"Tsavo West National Park","to":"Diani Beach"},
      {"from":"Diani Beach","to":"Mombasa"}
    ]'::jsonb,
    $notice$Wildlife sightings are natural and cannot be guaranteed. Views of Mt Kilimanjaro depend on weather and cloud conditions. Accommodation names are not listed and should be confirmed according to the selected package. Park entry fees should be confirmed before publishing the final price. Diving, snorkeling, surfing and canoe rides appear as optional excursions and should not be presented as included unless confirmed. Beach activities depend on local weather, sea conditions and operator availability. The source groups Days 7, 8 and 9 together, so the daily activity schedule may be adjusted during final booking.$notice$,
    '[
      "Pick-up from Nairobi airport",
      "Road transport between all destinations listed in the itinerary",
      "Accommodation at selected camps, lodges or resorts",
      "Meals indicated in the day-by-day itinerary",
      "Afternoon game drive in Amboseli on Day 1",
      "Full-day Amboseli game drive",
      "Packed or picnic lunch where mentioned",
      "Game drives in Tsavo East",
      "En-route game viewing between safari destinations",
      "Visit to Mzima Springs",
      "Game drive in Tsavo West",
      "Transfer from Tsavo West to Diani Beach",
      "Beach stay in Diani",
      "Use of hotel facilities mentioned in the itinerary",
      "Transfer from Diani to Mombasa",
      "Drop-off at Moi International Airport"
    ]'::jsonb,
    '[
      "International and domestic flights",
      "Visa fees",
      "Travel insurance",
      "Park entry fees unless included in the selected package",
      "Diving and snorkeling",
      "Surfing activities",
      "Sunset canoe rides",
      "Beach sports or excursions charged separately",
      "Drinks and personal expenses",
      "Tips and gratuities",
      "Optional activities not included in the final package",
      "Any item not specifically mentioned under \"What Is Included\""
    ]'::jsonb,
    $itinerary$[
      {
        "day": 1,
        "title": "Nairobi to Amboseli",
        "description": "<p><strong>Activity:</strong> Airport pick-up, road transfer, lunch, check-in and afternoon game drive</p><p>Your 10-day bush and beach safari begins with a pick-up from Nairobi airport. You will then travel to Amboseli, arriving in time for lunch and check-in at your selected camp or lodge.</p><p>After lunch, head into the park for an afternoon game drive that continues until sunset. This first safari experience introduces you to Amboseli’s open landscapes and wildlife before you return to your accommodation.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/camp, to be confirmed based on package selection"],
        "mealPlan": "Lunch & Dinner"
      },
      {
        "day": 2,
        "title": "Full-Day Amboseli Game Drive",
        "description": "<p><strong>Activity:</strong> Mt Kilimanjaro viewing, full-day game drive, picnic lunch and wildlife viewing</p><p>Rise early for a chance to see Mt Kilimanjaro from the camp, weather permitting. After breakfast, depart with a packed lunch and enter Amboseli National Park for a full day of game viewing.</p><p>The itinerary highlights possible sightings of elephants, lions, cheetahs, leopards, zebras, antelopes, warthogs, wildebeest and several bird species. A picnic lunch will be served inside the park before the safari continues.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/camp, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Picnic Lunch & Dinner"
      },
      {
        "day": 3,
        "title": "Amboseli to Tsavo East",
        "description": "<p><strong>Activity:</strong> Breakfast, road transfer, en-route game drive, lunch and afternoon game drive</p><p>After an early breakfast, check out and travel to Tsavo East National Park. The park is noted in the itinerary for its large elephant population and historical association with the man-eating lions of Tsavo.</p><p>Enjoy game viewing on the way to your lodge, then check in and have lunch. Later in the afternoon, return to the park for another game drive before heading back to the lodge.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/hotel, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 4,
        "title": "Full-Day Tsavo East Game Drive",
        "description": "<p><strong>Activity:</strong> Full-day game drive and wildlife viewing</p><p>Begin the day with breakfast before setting out for a full-day game drive in Tsavo East National Park. The day provides more time to explore the park’s wildlife areas and varied landscapes.</p><p>Lunch and dinner will be served at the lodge according to the source itinerary.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/hotel, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 5,
        "title": "Tsavo East to Tsavo West",
        "description": "<p><strong>Activity:</strong> Breakfast, check-out, game drive, Mzima Springs visit, lunch and afternoon game drive</p><p>After an early breakfast, check out and begin the journey toward Tsavo West. The day includes game viewing and a visit to Mzima Springs, where the itinerary highlights possible sightings of hippos, crocodiles and birdlife.</p><p>Continue to your lodge, check in and enjoy lunch. Later, head out for another game drive before returning for the evening.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/camp, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 6,
        "title": "Tsavo West to Diani Beach",
        "description": "<p><strong>Activity:</strong> Breakfast, en-route game drive, road transfer, packed lunch and beach relaxation</p><p>After an early breakfast, check out and leave Tsavo West with a game drive along the way. Continue toward Diani Beach with a packed lunch for the journey.</p><p>On arrival, check in at your selected lodge or resort. The evening may be spent relaxing at the property or enjoying beach picnic-style activities mentioned in the itinerary.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/resort, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Packed Lunch & Dinner"
      },
      {
        "day": 7,
        "title": "Full Day in Diani",
        "description": "<p><strong>Activity:</strong> Beach relaxation, hotel facilities and optional excursions</p><p>Enjoy breakfast before spending time along Diani’s shoreline and using the hotel facilities. Activities mentioned in the itinerary include swimming, sandcastle building and exploring rock pools.</p><p>After lunch, optional excursions may include diving, snorkeling, surfing, beach sports or a sunset canoe ride. These activities should be confirmed separately before booking.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/resort, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 8,
        "title": "Full Day in Diani",
        "description": "<p><strong>Activity:</strong> Beach relaxation, swimming, hotel activities and optional coastal excursions</p><p>Begin the day with breakfast and enjoy another relaxed day at Diani Beach. Spend time swimming, relaxing by the ocean or enjoying the facilities available at your selected resort.</p><p>After lunch, you may take part in available optional activities or enjoy beach games such as volleyball and table tennis before an evening walk along Diani’s white-sand beaches.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/resort, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 9,
        "title": "Full Day in Diani",
        "description": "<p><strong>Activity:</strong> Beach leisure, hotel facilities and optional activities</p><p>After breakfast, enjoy your final full day at the coast. You may relax along the beach, swim or make use of the hotel facilities at your own pace.</p><p>Optional excursions and activities may be arranged depending on availability, weather conditions and the selected package. Return to the resort for dinner and your final overnight stay.</p>",
        "imageId": "",
        "accommodationOptions": ["Selected lodge/resort, to be confirmed based on package selection"],
        "mealPlan": "Breakfast, Lunch & Dinner"
      },
      {
        "day": 10,
        "title": "Diani to Mombasa",
        "description": "<p><strong>Activity:</strong> Breakfast, check-out, transfer to Mombasa and airport drop-off</p><p>Enjoy an early breakfast at the beach before checking out of the resort. You will then be transferred from Diani to Mombasa.</p><p>The safari ends with drop-off at Moi International Airport.</p>",
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
    '10-days-amboseli-tsavo-and-diani-beach-safari',
    '10 Days Amboseli, Tsavo and Diani Beach Safari',
    'Explore Amboseli, Tsavo East, Tsavo West and Diani on a 10-day bush and beach safari with Benroso Safaris. Enjoy game drives, Mt Kilimanjaro views, Mzima Springs, wildlife encounters and relaxing days along Kenya’s coast.',
    jsonb_build_object(
      'html',
      $overview$<p>The 10 Days Amboseli, Tsavo and Diani Beach Safari begins at Nairobi airport and travels through Kenya’s southern wildlife circuit before ending on the Indian Ocean coast. The journey starts in Amboseli National Park, where guests enjoy game drives, a picnic lunch in the park and a chance to view Mt Kilimanjaro when weather conditions are favorable.</p><p>The route then continues to Tsavo East, a park widely associated with large elephant populations and expansive safari landscapes. Guests enjoy en-route wildlife viewing, an afternoon game drive and a full day exploring the park. The safari then moves into Tsavo West, where the itinerary includes a visit to Mzima Springs and further game drives.</p><p>After the wildlife section, the journey continues to Diani Beach for four nights of coastal relaxation. Guests can enjoy swimming, beach walks, hotel facilities and optional activities such as snorkeling, diving, surfing and canoe rides. The tour concludes with a transfer to Moi International Airport in Mombasa.</p><p>Benroso Safaris recommends this itinerary for couples, families and small groups looking for a balanced Kenya bush and beach holiday. It is particularly suitable for travelers who want to combine several national parks with a longer, relaxed stay along the coast.</p><h2>Experiences Associated With This Trip</h2><ul><li><p>Amboseli game drives</p></li><li><p>Mt Kilimanjaro views</p></li><li><p>Elephant sightings</p></li><li><p>Picnic lunch in Amboseli</p></li><li><p>Tsavo East game drives</p></li><li><p>Tsavo West game drives</p></li><li><p>Mzima Springs visit</p></li><li><p>Hippo and crocodile viewing</p></li><li><p>Diani Beach stay</p></li><li><p>Swimming and beach walks</p></li><li><p>Optional snorkeling and diving</p></li><li><p>Optional sunset canoe ride</p></li></ul><h2>This Is Suitable For</h2><ul><li><p>Couples seeking a longer Kenya safari</p></li><li><p>Families looking for wildlife and beach experiences</p></li><li><p>Small private groups</p></li><li><p>First-time visitors to Kenya</p></li><li><p>Wildlife and bird-watching enthusiasts</p></li><li><p>Travelers who want several beach relaxation days</p></li></ul>$overview$
    ),
    '[
      {"question":"Which destinations are included in this safari?","answer":"The itinerary covers Amboseli National Park, Tsavo East National Park, Tsavo West National Park and Diani Beach."},
      {"question":"Where does the tour start and end?","answer":"The safari starts at Nairobi airport and ends with drop-off at Moi International Airport in Mombasa."},
      {"question":"Are full-day game drives included?","answer":"Yes. The itinerary includes full-day game drives in Amboseli and Tsavo East, plus additional game drives in Tsavo West."},
      {"question":"Can guests see Mt Kilimanjaro?","answer":"Guests may see Mt Kilimanjaro from Amboseli, but visibility depends on weather conditions."},
      {"question":"Is Mzima Springs included?","answer":"Yes. The itinerary includes a visit to Mzima Springs while traveling through Tsavo West."},
      {"question":"Are the Diani excursions included?","answer":"Activities such as diving, snorkeling, surfing and sunset canoe rides are presented as optional and should be confirmed separately."}
    ]'::jsonb,
    '10 Days Amboseli, Tsavo and Diani Beach Safari',
    '10-day Amboseli, Tsavo and Diani safari with Benroso Safaris, featuring game drives, Mzima Springs, Kilimanjaro views and beach days.',
    '10 Days Amboseli, Tsavo and Diani Beach Safari',
    '["Amboseli Tsavo safari","Kenya bush and beach safari","Diani beach safari","Mzima Springs tour","Benroso Safaris"]'::jsonb,
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

  if v_dest_tsavo_east is not null then
    insert into public.tour_destinations (tour_id, destination_id, position)
    values (v_tour_id, v_dest_tsavo_east, 1);
  end if;

  if v_dest_tsavo_west is not null then
    insert into public.tour_destinations (tour_id, destination_id, position)
    values (v_tour_id, v_dest_tsavo_west, 2);
  end if;

  if v_dest_diani is not null then
    insert into public.tour_destinations (tour_id, destination_id, position)
    values (v_tour_id, v_dest_diani, 3);
  end if;
end $$;
