-- Allow authenticated users to create their own portal profile on sign-up
create policy "users can insert their own profile"
  on public.profiles for insert to authenticated
  with check ((select auth.uid()) = id);
