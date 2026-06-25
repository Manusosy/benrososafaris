import { EmptyState, PageHero } from '@/components/public/page-shell';
import { localePath } from '@/lib/public/locale-path';
import { getPublicBlogPosts } from '@/lib/public/site-data';

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const posts = await getPublicBlogPosts(locale, 12);

  return (
    <>
      <PageHero
        breadcrumbs={[{ href: localePath(locale), label: 'Home' }, { label: 'Blog' }]}
        description='Safari travel insights, destination guides, and planning tips from the Benroso Safaris team.'
        eyebrow='Blog'
        title='Safari Travel Insights'
      />
      <section className='benroso-section bg-[var(--benroso-ivory)]'>
        <div className='benroso-container'>
          {posts.length ? (
            <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
              {posts.map((post) => (
                <article
                  className='rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white p-5'
                  key={post.id}
                >
                  <h2 className='benroso-heading font-display text-2xl'>
                    <a className='hover:text-[var(--benroso-primary)]' href={post.href}>
                      {post.title}
                    </a>
                  </h2>
                  {post.excerpt ? (
                    <p className='mt-3 line-clamp-4 text-sm leading-7 text-[var(--benroso-muted)]'>
                      {post.excerpt}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              actionHref={localePath(locale, '/contact')}
              actionLabel='Plan Your Safari'
              message='Blog articles will appear here once published through the CMS.'
              title='No blog posts yet'
            />
          )}
        </div>
      </section>
    </>
  );
}
