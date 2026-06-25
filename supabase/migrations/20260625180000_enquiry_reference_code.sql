-- Human-readable enquiry reference codes (industry format: PREFIX-YEAR-SEQUENCE)
-- Display format: BENS-2026-00001 (Benroso Safaris, calendar year, zero-padded sequence)

create table if not exists public.enquiry_reference_counters (
  year integer primary key,
  last_value integer not null default 0
);

alter table public.enquiries
  add column if not exists reference_code text;

create or replace function public.generate_enquiry_reference_code(p_created_at timestamptz default now())
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_year integer;
  v_next integer;
begin
  v_year := extract(year from coalesce(p_created_at, now()))::integer;

  insert into public.enquiry_reference_counters (year, last_value)
  values (v_year, 1)
  on conflict (year) do update
  set last_value = enquiry_reference_counters.last_value + 1
  returning last_value into v_next;

  return 'BENS-' || v_year::text || '-' || lpad(v_next::text, 5, '0');
end;
$$;

create or replace function public.set_enquiry_reference_code()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.reference_code is null or trim(new.reference_code) = '' then
    new.reference_code := public.generate_enquiry_reference_code(new.created_at);
  end if;
  return new;
end;
$$;

drop trigger if exists enquiries_set_reference_code on public.enquiries;

create trigger enquiries_set_reference_code
before insert on public.enquiries
for each row
execute function public.set_enquiry_reference_code();

-- Backfill existing enquiries in chronological order per year
do $$
declare
  rec record;
  v_year integer;
  v_next integer;
begin
  for rec in
    select id, created_at
    from public.enquiries
    where reference_code is null
    order by created_at asc
  loop
    v_year := extract(year from rec.created_at)::integer;

    insert into public.enquiry_reference_counters (year, last_value)
    values (v_year, 1)
    on conflict (year) do update
    set last_value = enquiry_reference_counters.last_value + 1
    returning last_value into v_next;

    update public.enquiries
    set reference_code = 'BENS-' || v_year::text || '-' || lpad(v_next::text, 5, '0')
    where id = rec.id;
  end loop;
end;
$$;

alter table public.enquiries
  alter column reference_code set not null;

create unique index if not exists enquiries_reference_code_key
  on public.enquiries (reference_code);

create index if not exists enquiries_reference_code_search_idx
  on public.enquiries (reference_code text_pattern_ops);

-- submit_enquiry: reference_code is assigned by trigger; return it alongside id
create or replace function public.submit_enquiry(
  p_name text,
  p_email text,
  p_phone text,
  p_locale text,
  p_message text,
  p_source_path text,
  p_enquiry_type text,
  p_form_data jsonb,
  p_travelers integer default null,
  p_preferred_dates text default null,
  p_budget text default null,
  p_country text default null,
  p_destinations text default null,
  p_topic text default null,
  p_booking_reference text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
begin
  if p_name is null or length(trim(p_name)) < 2 then
    raise exception 'Name is required';
  end if;

  if p_email is null or p_email !~ '^[^@]+@[^@]+\.[^@]+$' then
    raise exception 'Valid email is required';
  end if;

  if p_message is null or length(trim(p_message)) < 1 then
    raise exception 'Message is required';
  end if;

  if p_enquiry_type not in ('safari-quote', 'general', 'other') then
    raise exception 'Invalid enquiry type';
  end if;

  insert into public.enquiries (
    name,
    email,
    phone,
    locale,
    message,
    source_path,
    enquiry_type,
    form_data,
    travelers,
    preferred_dates,
    budget,
    country,
    destinations,
    topic,
    booking_reference,
    status
  ) values (
    trim(p_name),
    lower(trim(p_email)),
    p_phone,
    coalesce(nullif(trim(p_locale), ''), 'en'),
    p_message,
    p_source_path,
    p_enquiry_type,
    coalesce(p_form_data, '{}'::jsonb),
    p_travelers,
    p_preferred_dates,
    p_budget,
    p_country,
    p_destinations,
    p_topic,
    p_booking_reference,
    'pending'
  )
  returning id into new_id;

  return new_id;
end;
$$;

revoke all on function public.generate_enquiry_reference_code(timestamptz) from public;
grant execute on function public.generate_enquiry_reference_code(timestamptz) to service_role;
