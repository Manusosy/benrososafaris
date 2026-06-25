create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role text not null default 'viewer' check (role in ('owner', 'admin', 'editor', 'sales', 'viewer')),
  status text not null default 'active' check (status in ('active', 'disabled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'media',
  path text not null,
  url text,
  alt text,
  caption text,
  focal_point jsonb,
  dominant_color text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  singleton_key text not null unique default 'default',
  company_name text not null default 'Benroso Safaris Ltd',
  email text not null default 'info@benrososafaris.co.ke',
  phone_primary text not null default '+254 720 092309',
  phone_secondary text default '+254 731 201500',
  phone_office text default '+254 20 2147799',
  address_short text default 'Magadi Rd, Ongata Rongai, Nairobi, Kenya',
  postal_address text default 'P.O. Box 6868-00100 Nairobi',
  kato_address text default 'Kitaru Road off Magadi Road near Magenche',
  social_links jsonb not null default '{}'::jsonb,
  whatsapp_message text,
  seo_defaults jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  author_id uuid references auth.users(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_translations (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  locale text not null,
  slug text not null,
  title text not null,
  excerpt text,
  content jsonb,
  seo_title text,
  seo_description text,
  og_image_id uuid references public.media_assets(id),
  canonical_override text,
  faqs jsonb not null default '[]'::jsonb,
  direct_answers jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(locale, slug)
);

create table public.destinations (
  id uuid primary key default gen_random_uuid(),
  country text,
  region text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  latitude numeric,
  longitude numeric,
  best_time jsonb not null default '{}'::jsonb,
  wildlife jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.destination_translations (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid not null references public.destinations(id) on delete cascade,
  locale text not null,
  slug text not null,
  name text not null,
  summary text,
  description jsonb,
  seo_title text,
  seo_description text,
  og_image_id uuid references public.media_assets(id),
  canonical_override text,
  faqs jsonb not null default '[]'::jsonb,
  direct_answers jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(locale, slug)
);

create table public.tours (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  days integer,
  nights integer,
  price_from numeric,
  route_waypoints jsonb not null default '[]'::jsonb,
  inclusions jsonb not null default '[]'::jsonb,
  exclusions jsonb not null default '[]'::jsonb,
  itinerary_days jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tour_translations (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid not null references public.tours(id) on delete cascade,
  locale text not null,
  slug text not null,
  title text not null,
  excerpt text,
  overview jsonb,
  seo_title text,
  seo_description text,
  og_image_id uuid references public.media_assets(id),
  canonical_override text,
  faqs jsonb not null default '[]'::jsonb,
  direct_answers jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(locale, slug)
);

create table public.packages (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  package_group text,
  comfort_tier text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.package_translations (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  locale text not null,
  slug text not null,
  title text not null,
  excerpt text,
  content jsonb,
  seo_title text,
  seo_description text,
  og_image_id uuid references public.media_assets(id),
  canonical_override text,
  faqs jsonb not null default '[]'::jsonb,
  direct_answers jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  unique(locale, slug)
);

create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now()
);

create table public.experience_translations (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences(id) on delete cascade,
  locale text not null,
  slug text not null,
  title text not null,
  summary text,
  content jsonb,
  seo_title text,
  seo_description text,
  og_image_id uuid references public.media_assets(id),
  canonical_override text,
  faqs jsonb not null default '[]'::jsonb,
  direct_answers jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  unique(locale, slug)
);

create table public.accommodations (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  country text,
  region text,
  comfort_level text,
  amenities jsonb not null default '[]'::jsonb,
  room_types jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table public.accommodation_translations (
  id uuid primary key default gen_random_uuid(),
  accommodation_id uuid not null references public.accommodations(id) on delete cascade,
  locale text not null,
  slug text not null,
  name text not null,
  summary text,
  description jsonb,
  seo_title text,
  seo_description text,
  og_image_id uuid references public.media_assets(id),
  canonical_override text,
  faqs jsonb not null default '[]'::jsonb,
  direct_answers jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  unique(locale, slug)
);

create table public.fleet_vehicles (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  vehicle_type text,
  capacity integer,
  features jsonb not null default '[]'::jsonb,
  gallery jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table public.fleet_vehicle_translations (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.fleet_vehicles(id) on delete cascade,
  locale text not null,
  slug text not null,
  title text not null,
  summary text,
  description jsonb,
  seo_title text,
  seo_description text,
  og_image_id uuid references public.media_assets(id),
  canonical_override text,
  faqs jsonb not null default '[]'::jsonb,
  direct_answers jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  unique(locale, slug)
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  locale text not null default 'en',
  message text not null,
  source_path text,
  travelers integer,
  preferred_dates text,
  budget text,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'proposal-sent', 'won', 'lost')),
  assigned_to uuid references auth.users(id),
  notes jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.redirects (
  id uuid primary key default gen_random_uuid(),
  source_path text not null unique,
  destination_path text not null,
  status_code integer not null default 301 check (status_code in (301, 302, 307, 308)),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.media_assets enable row level security;
alter table public.site_settings enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_translations enable row level security;
alter table public.destinations enable row level security;
alter table public.destination_translations enable row level security;
alter table public.tours enable row level security;
alter table public.tour_translations enable row level security;
alter table public.packages enable row level security;
alter table public.package_translations enable row level security;
alter table public.experiences enable row level security;
alter table public.experience_translations enable row level security;
alter table public.accommodations enable row level security;
alter table public.accommodation_translations enable row level security;
alter table public.fleet_vehicles enable row level security;
alter table public.fleet_vehicle_translations enable row level security;
alter table public.enquiries enable row level security;
alter table public.redirects enable row level security;

create policy "public can read published blog translations" on public.blog_translations
  for select to anon, authenticated
  using (published_at is not null and exists (
    select 1 from public.blog_posts p where p.id = post_id and p.status = 'published'
  ));

create policy "public can read published destinations" on public.destination_translations
  for select to anon, authenticated
  using (published_at is not null and exists (
    select 1 from public.destinations d where d.id = destination_id and d.status = 'published'
  ));

create policy "public can read published tours" on public.tour_translations
  for select to anon, authenticated
  using (published_at is not null and exists (
    select 1 from public.tours t where t.id = tour_id and t.status = 'published'
  ));

create policy "public can create enquiries" on public.enquiries
  for insert to anon, authenticated
  with check (true);

create policy "users can read their own profile" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

create policy "users can update their own profile basics" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "public can read site settings" on public.site_settings
  for select to anon, authenticated
  using (true);

create policy "public can read media assets" on public.media_assets
  for select to anon, authenticated
  using (true);
