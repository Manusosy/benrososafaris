-- Enrich Mt Kenya climbing routes with full document content, overviews, and SEO.

update public.tours t
set
  itinerary_days = v.itinerary_days,
  inclusions = v.inclusions,
  exclusions = v.exclusions,
  important_notice = 'Note: Solo travellers attract extra cost.',
  updated_at = now()
from public.tour_translations tt
join (
  values
  (
    'mt-kenya-burguret-chogoria-8-days',
    '[
      {"day":1,"title":"Nairobi - Nanyuki","description":"Leave Nairobi at 9:00am for a 4-hour drive to Nanyuki for lunch, dinner, and overnight. Nanyuki sits at the base of Mt Kenya and is ideal for first-day acclimatization. Spend the evening trekking around the Equator marker, or visit local attractions such as the Nanyuki Spinners and Weavers women''s cooperative.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":2,"title":"Nanyuki - Giant Bamboo Camp (2,600m)","description":"Hiking distance: 10km · 4hrs · Elevation: 2,000m–2,600m. After breakfast, briefing, and equipment check, drive to Gathiuru Forest Station (2,000m) and trek through dense forest and towering bamboo to Giant Bamboo Camp. Look out for turacos, monkeys, elephants, and buffalo.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":3,"title":"Giant Bamboo Camp - Highland Castle (3,700m)","description":"Hiking distance: 10km · 5–6hrs · Elevation: 2,600m–3,700m. Bamboo gives way to podocarpus and pencil cedar forest, then the Hagenia (rosewood) zone. Overnight close to the sheer lava cliffs of Highland Castle.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":4,"title":"Highland Castle - Mackinder''s Camp (4,314m)","description":"Trek to the high ridge and follow Mackinder''s trail anti-clockwise with views of jagged volcanic peaks and glaciers. Mackinder''s Camp sits in Tereki Valley with panoramic views of Batian, Nelion, and Point John.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":5,"title":"Mackinder''s Camp - Top Camp (4,790m)","description":"After breakfast, ascend 476m to Top Camp for summit acclimatization before the Lenana attempt the following morning.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":6,"title":"Top Camp - Lenana Summit (4,985m) - Lake Michaelson","description":"Wake at 3:30am, pre-breakfast at 4:00am, and leave at 4:30am for the 1½-hour summit push to Point Lenana — Mt Kenya''s highest trekking peak. On a clear morning you may see Kilimanjaro and the Indian Ocean at sunrise. Descend to Simba Tarn for breakfast, then continue down to Lake Michaelson at the bottom of the gorges for lunch and overnight.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":7,"title":"Lake Michaelson - Chogoria Anabas Campsite (2,950m)","description":"After breakfast, hike sharply to the river junction and descend to Chogoria Gate, arriving in the afternoon for dinner and the last night on the mountain.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":8,"title":"Chogoria Anabas - Chogoria Town - Nairobi","description":"After breakfast at 6:00am, walk 5km to Vailonyi to meet your transfer vehicle, then connect with the shuttle van back to Nairobi where the trek ends.","imageId":"","accommodationOptions":[],"mealPlan":""}
    ]'::jsonb,
    '["Guarantee trek on confirmation","Transport in public shared shuttle van","Meals whilst on the mountain","Accommodation in the tent as per the itinerary","All park entrance fees to include government taxes","Service of an English speaking guide, porters and skilled cook","Start and finish in Nairobi"]'::jsonb,
    '["Tips","All hiking gear including sleeping bag","Items of personal nature","Any other extras not detailed in the above itinerary"]'::jsonb
  ),
  (
    'mt-kenya-sirimon-chogoria-acclimatization-5-days',
    '[
      {"day":1,"title":"Nanyuki - Sirimon Gate (2,650m) - Old Moses Camp (3,300m)","description":"Hiking distance: 9km · 2½–3hrs · Elevation: 2,650m–3,300m. Transfer from Nairobi to Nanyuki by public van for lunch, then drive to Sirimon Gate and trek through indigenous forest to Old Moses Camp for dinner and overnight.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":2,"title":"Old Moses - Shipton''s Camp (4,200m)","description":"Hiking distance: 14km · 6–8hrs · Elevation: 3,300m–4,200m. Leave Old Moses at 7:00am with a picnic lunch for the long trek to Shipton''s Camp at the base of Batian and Nelion. Dinner and overnight in tents.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":3,"title":"Shipton''s Camp acclimatization day","description":"Hiking distance: 2km · 2hrs · Elevation: 4,200m–4,585m. After breakfast, hike to Shipton''s Col for acclimatization, enjoy the views, and descend back to Shipton''s Camp for lunch, dinner, and a third night at altitude.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":4,"title":"Shipton''s - Lenana Summit (4,985m) - Chogoria Anabas","description":"Hiking distance: 24km · 12–14hrs · Elevation: 4,200m–4,985m–2,950m. Leave Shipton''s at 3:00am for the 3-hour summit push to Point Lenana. On clear mornings you may see Kilimanjaro and the Indian Ocean at sunrise. Descend to Mintos Camp for breakfast, then continue to Chogoria Anabas for your last night in the park.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":5,"title":"Chogoria Anabas - Chogoria Town - Nairobi","description":"After breakfast, drive through the dense Chogoria rainforest to Chogoria town and catch the bus back to Nairobi where your trek ends.","imageId":"","accommodationOptions":[],"mealPlan":""}
    ]'::jsonb,
    '["Guarantee trek on confirmation","Transport in a comfortable public van","Meals whilst on the mountain","Accommodation in the tent as per the itinerary","All park entrance fees to include government taxes","Service of English speaking guide, porters and skilled cook","Start and finish in Nairobi"]'::jsonb,
    '["Tips","All hiking gear including sleeping bag","Items of personal nature","Any other extras not detailed in the above itinerary"]'::jsonb
  ),
  (
    'mt-kenya-sirimon-chogoria-5-days',
    '[
      {"day":1,"title":"Nanyuki - Sirimon Gate (2,650m) - Old Moses Camp (3,300m)","description":"Hiking distance: 9km · 2½–3hrs · Elevation: 2,650m–3,300m. Transfer from Nairobi to Nanyuki by public van for lunch, then drive to Sirimon Gate and trek through indigenous forest to Old Moses Camp for dinner and overnight.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":2,"title":"Old Moses - Shipton''s Camp (4,200m)","description":"Hiking distance: 14km · 6–7hrs · Elevation: 3,300m–4,200m. Leave Old Moses at 7:00am with a picnic lunch for the trek to Shipton''s Camp below Batian and Nelion. Dinner and overnight in tents.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":3,"title":"Shipton''s - Lenana Summit - Hall''s Tarn Camp","description":"Leave Shipton''s at 3:00am for the 3-hour summit push to Point Lenana. After sunrise at the peak, descend to Hall''s Tarn — one of Mt Kenya''s finest campsites with views of Chogoria gorges, Lake Michaelson, Delamere peaks, and the three main summits. Optional: summit during daylight if you prefer sunrise from Hall''s Tarn instead.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":4,"title":"Hall''s Tarn - Chogoria Anabas Campsite","description":"Hiking distance: 16km. After breakfast, descend through fascinating gorges and valleys — past Giant''s Billiard Table and Nthakune Hills — to Chogoria Anabas for your last night on the mountain.","imageId":"","accommodationOptions":[],"mealPlan":""},
      {"day":5,"title":"Chogoria Anabas - Chogoria Town - Nairobi","description":"After breakfast, drive through the dense Chogoria rainforest to Chogoria town and catch the bus back to Nairobi where your trek ends.","imageId":"","accommodationOptions":[],"mealPlan":""}
    ]'::jsonb,
    '["Guarantee trek on confirmation","Transport in a comfortable public van","Meals whilst on the mountain","Accommodation in the tent as per the itinerary","All park entrance fees to include government taxes","Service of English speaking guide, porters and skilled cook","Start and finish in Nairobi"]'::jsonb,
    '["Tips","All hiking gear including sleeping bag","Items of personal nature","Any other extras not detailed in the above itinerary"]'::jsonb
  )
) as v(slug, itinerary_days, inclusions, exclusions)
  on tt.slug = v.slug and tt.locale = 'en'
where t.id = tt.tour_id;

update public.tour_translations tt
set
  title = v.title,
  excerpt = v.excerpt,
  overview = jsonb_build_object('html', v.overview_html),
  seo_title = v.seo_title,
  seo_description = v.seo_description,
  focus_keyword = v.focus_keyword,
  keywords = v.keywords::jsonb,
  faqs = v.faqs::jsonb,
  updated_at = now()
from (
  values
  (
    'mt-kenya-burguret-chogoria-8-days',
    '8 Days Mt Kenya: Burguret Route down Chogoria',
    'An 8-day Mt Kenya traverse from the Burguret forest approach to the Chogoria descent, with gradual acclimatization and a pre-dawn summit on Point Lenana.',
    '<p>This classic 8-day route climbs Mt Kenya through the Burguret forest, crosses the high moorlands, and descends the spectacular Chogoria side. It is a full traverse with time built in for altitude adjustment before summit night.</p><h3>Acclimatization</h3><p>Day 1 overnight in Nanyuki at the foot of the mountain helps your body adjust before trekking begins. The itinerary then ascends steadily through forest, bamboo, and alpine zones with a dedicated night at Top Camp (4,790m) before the Lenana summit attempt.</p><h3>What to carry</h3><p>Hiking gear is not included in the price. Bring sturdy broken-in boots, warm layers, waterproof jacket and trousers, hat, gloves, head torch, sun protection, personal medications, and a good sleeping bag rated for high-altitude nights. Trekking poles are recommended on steep sections.</p>',
    '8 Days Mt Kenya Burguret Chogoria Trek | Benroso Safaris',
    'Hike Mt Kenya on the 8-day Burguret to Chogoria route. Guided trek with camping or hut options from $1,480 per person. Park fees and meals included.',
    'Mt Kenya Burguret Chogoria trek',
    '["Mt Kenya climbing","Burguret route","Chogoria descent","Point Lenana trek","Kenya mountain hiking"]',
    '[
      {"question":"How fit do I need to be for the 8-day Burguret route?","answer":"You should be comfortable walking 6–8 hours a day on consecutive days at altitude. Prior hill walking or trekking experience is recommended, though technical climbing skills are not required for Point Lenana."},
      {"question":"Is camping or hut accommodation available?","answer":"Yes. Camping is $1,480 per person and sleeping at the hut is $1,600 per person. Solo travellers attract an extra cost."},
      {"question":"What gear do I need to bring?","answer":"Bring your own hiking boots, warm clothing, waterproofs, sleeping bag, head torch, and personal items. Porters carry the group camping equipment; tips, sleeping bags, and personal gear are excluded from the quoted price."}
    ]'
  ),
  (
    'mt-kenya-sirimon-chogoria-acclimatization-5-days',
    '5 Days Mt Kenya: Sirimon to Chogoria with Acclimatization',
    'The Sirimon approach with a dedicated acclimatization day at Shipton''s Camp before the Lenana summit and Chogoria descent.',
    '<p>This 5-day Sirimon–Chogoria trek is the safer pacing option for Point Lenana. After two days of ascent to Shipton''s Camp, you spend a full acclimatization day hiking to Shipton''s Col before the long summit and descent day.</p><h3>Acclimatization</h3><p>The extra day at Shipton''s Camp reduces summit-day fatigue and helps your body adjust above 4,200m. This route is recommended if you are unsure how you will feel at altitude after day two, or if you prefer a steadier climb before the 24km summit-and-descent day.</p><h3>What to carry</h3><p>Pack broken-in hiking boots, thermal layers, waterproofs, gloves, sun hat, head torch, water bottle, personal medications, and a sleeping bag suitable for cold mountain nights. Trekking poles help on the long descent to Chogoria.</p>',
    '5 Days Mt Kenya Sirimon Chogoria Trek | Benroso Safaris',
    '5-day Mt Kenya Sirimon to Chogoria trek with acclimatization day at Shipton''s Camp. Camping from $925 or hut from $1,000 per person.',
    'Mt Kenya Sirimon Chogoria acclimatization trek',
    '["Mt Kenya 5 day trek","Sirimon route","Shipton''s Camp","Point Lenana hike","Chogoria descent"]',
    '[
      {"question":"Why choose the acclimatization version?","answer":"The extra day at Shipton''s Camp lets you hike to Shipton''s Col and back before summit day. That helps reduce altitude sickness risk on the long 24km day from Shipton''s to Lenana and down to Chogoria Anabas."},
      {"question":"How long is summit day?","answer":"Summit day is roughly 12–14 hours of hiking, covering about 24km from Shipton''s Camp to Point Lenana and down to Chogoria Anabas. You leave camp around 3:00am for the summit push."},
      {"question":"What is not included in the price?","answer":"Tips, personal hiking gear including sleeping bags, and items of a personal nature are excluded. Meals on the mountain, park fees, guide, porters, cook, and Nairobi transfers are included."}
    ]'
  ),
  (
    'mt-kenya-sirimon-chogoria-5-days',
    '5 Days Mt Kenya: Sirimon to Chogoria without Acclimatization',
    'A faster 5-day Sirimon to Chogoria traverse with summit push from Shipton''s and overnight at Hall''s Tarn.',
    '<p>This is the faster Sirimon–Chogoria option for fit trekkers who do not need a separate acclimatization day. After two days to Shipton''s Camp, you summit Point Lenana and overnight at scenic Hall''s Tarn before the Chogoria descent.</p><h3>Acclimatization</h3><p>This route has no rest day at Shipton''s. It suits hikers who adapt well to altitude or have recent high-altitude experience. If you feel unwell after day two, speak with your guide — an extra night at Shipton''s may still be possible depending on conditions.</p><h3>What to carry</h3><p>Bring hiking boots, warm layers, waterproof jacket and trousers, hat, gloves, head torch, sun cream, personal medications, snacks, and a cold-rated sleeping bag. Hall''s Tarn can be windy; pack accordingly.</p>',
    '5 Days Mt Kenya Sirimon Chogoria Fast Trek | Benroso',
    'Fast 5-day Mt Kenya Sirimon to Chogoria trek without acclimatization day. Summit Lenana and descend via Hall''s Tarn. From $925 per person.',
    'Mt Kenya Sirimon Chogoria 5 day trek',
    '["Mt Kenya fast trek","Sirimon Chogoria","Hall''s Tarn","Point Lenana","Kenya trekking"]',
    '[
      {"question":"Who is this route best for?","answer":"Fit hikers who are confident at altitude and want to complete Sirimon to Chogoria in five days without a dedicated acclimatization day at Shipton''s Camp."},
      {"question":"What makes Hall''s Tarn special?","answer":"Hall''s Tarn is one of Mt Kenya''s most scenic campsites, with sunrise views over the lake and panoramas of Chogoria gorges, Lake Michaelson, and the main peaks. Some groups optionally summit during daylight from here."},
      {"question":"What should I pack?","answer":"You need your own hiking boots, sleeping bag, warm and waterproof clothing, head torch, and personal items. Camping equipment on the mountain is arranged by the crew; tips and personal gear are not included in the trek price."}
    ]'
  )
) as v(slug, title, excerpt, overview_html, seo_title, seo_description, focus_keyword, keywords, faqs)
where tt.locale = 'en' and tt.slug = v.slug;
