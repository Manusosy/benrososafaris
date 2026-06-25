-- Migrate enquiry status workflow to: pending, deal, no-deal, not-won, lost

update public.enquiries
set status = 'pending'
where status in ('new', 'contacted', 'qualified', 'proposal-sent');

update public.enquiries
set status = 'deal'
where status = 'won';

alter table public.enquiries drop constraint if exists enquiries_status_check;

alter table public.enquiries
  alter column status set default 'pending';

alter table public.enquiries
  add constraint enquiries_status_check
  check (status in ('pending', 'deal', 'no-deal', 'not-won', 'lost'));
