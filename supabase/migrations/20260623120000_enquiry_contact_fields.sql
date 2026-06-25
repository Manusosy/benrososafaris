alter table public.enquiries
  add column if not exists enquiry_type text not null default 'safari-quote'
    check (enquiry_type in ('safari-quote', 'general', 'other')),
  add column if not exists country text,
  add column if not exists destinations text,
  add column if not exists topic text,
  add column if not exists booking_reference text;
