-- Soft-delete (trash) support for enquiries.
-- A non-null deleted_at marks an enquiry as trashed.

alter table public.enquiries
  add column if not exists deleted_at timestamptz;

create index if not exists enquiries_deleted_at_idx
  on public.enquiries (deleted_at);
