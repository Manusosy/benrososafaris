import { BlogCard } from '@/components/public/blog/blog-card';
import type { PublicBlogPost } from '@/lib/public/types';

type RelatedArticlesProps = {
  category: string | null;
  posts: PublicBlogPost[];
};

export function RelatedArticles({ category, posts }: RelatedArticlesProps) {
  const items = posts.slice(0, 3);
  if (!items.length) return null;

  return (
    <section
      aria-labelledby='related-articles-heading'
      className='mt-12 border-t border-[var(--benroso-line)] pt-10'
    >
      <p className='benroso-eyebrow'>Keep reading</p>
      <h2
        className='benroso-heading mt-3 font-display text-[clamp(1.5rem,3vw,2.25rem)]'
        id='related-articles-heading'
      >
        {category ? `More articles in ${category}` : 'Suggested articles'}
      </h2>
      <div className='mt-8 grid gap-6 md:grid-cols-3'>
        {items.map((post) => (
          <BlogCard key={post.id} post={post} titleTag='h3' />
        ))}
      </div>
    </section>
  );
}
