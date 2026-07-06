-- Wire the existing Lakes and Plains tour to Luxury Safaris experience pricing (live sync).
-- Experience id: Luxury Safaris (6cd6756a-4a06-4d28-8af2-95cd58ac71f3)
-- Tour id: Lakes and Plains of Kenya Safari (c16c6a84-8827-4e54-bea0-f4aeb15e2ea0)

INSERT INTO public.tour_experiences (tour_id, experience_id, position)
VALUES (
  'c16c6a84-8827-4e54-bea0-f4aeb15e2ea0',
  '6cd6756a-4a06-4d28-8af2-95cd58ac71f3',
  0
)
ON CONFLICT (tour_id, experience_id) DO UPDATE SET position = EXCLUDED.position;

UPDATE public.tours
SET
  pricing_experience_id = '6cd6756a-4a06-4d28-8af2-95cd58ac71f3',
  pricing_table_keys = '["budget", "mid_range", "luxury"]'::jsonb,
  updated_at = now()
WHERE id = 'c16c6a84-8827-4e54-bea0-f4aeb15e2ea0';

DELETE FROM public.tour_pricing_tiers
WHERE tour_id = 'c16c6a84-8827-4e54-bea0-f4aeb15e2ea0';
