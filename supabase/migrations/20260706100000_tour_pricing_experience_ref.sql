-- Link tours to experience package pricing tables (reference-only; live sync from experiences.package_pricing)
ALTER TABLE public.tours
  ADD COLUMN IF NOT EXISTS pricing_experience_id uuid REFERENCES public.experiences(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS pricing_table_keys jsonb NOT NULL DEFAULT '[]';

CREATE INDEX IF NOT EXISTS tours_pricing_experience_id_idx ON public.tours(pricing_experience_id);
