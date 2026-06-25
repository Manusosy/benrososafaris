-- Soft-delete (trash) support for destinations.
--
-- A non-null `deleted_at` marks a destination as trashed. Trashed rows are also
-- moved to status 'trash' so existing public queries (which filter on
-- status = 'published') never surface them. Restoring recomputes the status
-- from the translation's publish timestamp; emptying the trash deletes the rows.

alter table public.destinations
  add column if not exists deleted_at timestamptz;

create index if not exists destinations_deleted_at_idx
  on public.destinations (deleted_at);
