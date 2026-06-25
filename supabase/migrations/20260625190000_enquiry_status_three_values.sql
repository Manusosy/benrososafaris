-- Reduce enquiry status workflow to: pending, deal, no-deal

update public.enquiries
set status = 'no-deal'
where status in ('not-won', 'lost');

alter table public.enquiries drop constraint if exists enquiries_status_check;

alter table public.enquiries
  add constraint enquiries_status_check
  check (status in ('pending', 'deal', 'no-deal'));
