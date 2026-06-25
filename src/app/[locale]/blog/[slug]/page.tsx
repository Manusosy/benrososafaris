import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { absoluteUrl, buildAlternates, buildBlogJsonLd } from '@/lib/seo';

type BlogPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

type BlogTranslation = {
  excerpt: string | null;
  locale: string;
  og_image?: { alt: string | null; url: string | null } | null;
  post: { id: string; published_at: string | null; status: string; updated_at: string | null };
  seo_description: string | null;
  seo_title: string | null;
  slug: string;
  title: string;
};

export async function generateMetadata(props: BlogPageProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('blog_translations')
    .select(
      `
      slug,
      locale,
      title,
      excerpt,
      seo_title,
      seo_description,
      og_image:media_assets!blog_translations_og_image_id_fkey(url, alt),
      post:blog_posts!inner(id, status, published_at, updated_at)
    `
    )
    .eq('locale', locale)
    .eq('slug', slug)
    .eq('post.status', 'published')
    .single<BlogTranslation>();

  if (!post) notFound();

  const canonical = absoluteUrl(`/${locale}/blog/${post.slug}`);
  const title = post.seo_title || `${post.title} | Benroso Safaris`;
  const description = post.seo_description || post.excerpt || '';

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: await buildAlternates({
        table: 'blog_translations',
        parentId: post.post.id,
        pathBuilder: (item) => `/${item.locale}/blog/${item.slug}`
      })
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: post.og_image?.url
        ? [{ url: post.og_image.url, alt: post.og_image.alt || title }]
        : []
    }
  };
}

export default async function BlogPostPage(props: BlogPageProps) {
  const { locale, slug } = await props.params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('blog_translations')
    .select(
      `
      *,
      post:blog_posts!inner(id, status, published_at, updated_at)
    `
    )
    .eq('locale', locale)
    .eq('slug', slug)
    .eq('post.status', 'published')
    .single<BlogTranslation>();

  if (!post) notFound();

  const jsonLd = buildBlogJsonLd(post, `/${locale}/blog/${post.slug}`);

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className='benroso-section bg-[var(--benroso-ivory)]'>
        <article className='benroso-container max-w-4xl'>
          <p className='benroso-eyebrow'>Blog</p>
          <h1 className='benroso-heading mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight'>
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className='mt-6 text-lg leading-8 text-[var(--benroso-muted)]'>{post.excerpt}</p>
          ) : null}
        </article>
      </main>
    </>
  );
}
