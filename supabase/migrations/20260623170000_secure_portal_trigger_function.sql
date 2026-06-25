-- Trigger-only function: block direct RPC execution via Data API
revoke all on function public.handle_new_portal_user() from public;
revoke all on function public.handle_new_portal_user() from anon, authenticated;
