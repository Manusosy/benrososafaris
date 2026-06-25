-- Allow service_role direct inserts (bypasses RLS when key is configured server-side)
grant insert, select, update, delete on public.enquiries to service_role;

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

revoke all on function public.submit_enquiry(
  text, text, text, text, text, text, text, jsonb, integer, text, text, text, text, text, text
) from public;

grant execute on function public.submit_enquiry(
  text, text, text, text, text, text, text, jsonb, integer, text, text, text, text, text, text
) to anon, authenticated, service_role;
