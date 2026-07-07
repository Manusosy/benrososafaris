-- Allow full comfort-tier keys on legacy tour pricing (economy through high_end)
-- and nullable cell prices so empty cells can render as "On request" on the public site.

alter table public.tour_pricing_tiers
  drop constraint if exists tour_pricing_tiers_tier_check;

alter table public.tour_pricing_tiers
  add constraint tour_pricing_tiers_tier_check
  check (tier in ('economy', 'budget', 'mid_range', 'luxury', 'high_end', 'custom'));

alter table public.tour_pricing_cells
  alter column price drop not null;
