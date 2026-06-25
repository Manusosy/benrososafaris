-- Auto-create an active admin profile when a new auth user registers
create or replace function public.handle_new_portal_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'admin',
    'active'
  )
  on conflict (id) do update
  set
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    role = 'admin',
    status = 'active',
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_portal_profile on auth.users;

create trigger on_auth_user_created_portal_profile
  after insert on auth.users
  for each row
  execute function public.handle_new_portal_user();

-- Trigger-only: prevent direct RPC calls
revoke all on function public.handle_new_portal_user() from public;
revoke all on function public.handle_new_portal_user() from anon, authenticated;
