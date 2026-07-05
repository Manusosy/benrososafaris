-- Public blog listing/detail pages join blog_translations -> blog_posts!inner(...).
-- Without a SELECT policy on blog_posts, anon visitors cannot resolve the join
-- and published articles silently fail to render.

create policy "public can read published blog bases" on public.blog_posts
  for select to anon, authenticated
  using (status = 'published' and deleted_at is null);
