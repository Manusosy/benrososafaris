import { createEnquiryPublicClient } from '@/lib/supabase/service-role';
import { localePath } from '@/lib/public/locale-path';
import { slugify } from '@/lib/utils';
import type { PublicBlogPost } from './types';

export type TocItem = { id: string; text: string; level: 2 | 3 };

export type ArticleNeighbor = { title: string; href: string } | null;

function unwrap<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

/**
 * Injects stable ids into the article's H2/H3 headings (so the table of
 * contents can link to them) and returns the heading list. Operates on our own
 * editor HTML, so a scoped regex is sufficient — no DOM parser needed.
 */
export function buildToc(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();

  const out = html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (full, tag: string, attrs: string, inner: string) => {
      const text = inner
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .trim();
      if (!text) return full;

      let id = slugify(text) || 'section';
      let unique = id;
      let n = 2;
      while (used.has(unique)) {
        unique = `${id}-${n}`;
        n += 1;
      }
      used.add(unique);
      toc.push({ id: unique, text, level: tag.toLowerCase() === 'h2' ? 2 : 3 });

      if (/\sid=/.test(attrs)) return full;
      return `<${tag}${attrs} id="${unique}">${inner}</${tag}>`;
    }
  );

  return { html: out, toc };
}

/**
 * Previous (older) and next (newer) published articles, by publish date.
 * "Previous" reads as the older post, "Next" as the more recent one.
 */
export async function getArticleNeighbors(
  locale: string,
  postId: string,
  publishedAt: string | null
): Promise<{ previous: ArticleNeighbor; next: ArticleNeighbor }> {
  if (!publishedAt) return { previous: null, next: null };
  const supabase = createEnquiryPublicClient();

  async function neighbor(direction: 'previous' | 'next'): Promise<ArticleNeighbor> {
    const base = supabase
      .from('blog_posts')
      .select('id, published_at')
      .eq('status', 'published')
      .is('deleted_at', null)
      .neq('id', postId);
    const filtered =
      direction === 'previous'
        ? base.lt('published_at', publishedAt)
        : base.gt('published_at', publishedAt);
    const { data: row } = await filtered
      .order('published_at', { ascending: direction === 'next' })
      .limit(1)
      .maybeSingle();
    if (!row) return null;

    const { data: translation } = await supabase
      .from('blog_translations')
      .select('title, slug')
      .eq('post_id', row.id)
      .eq('locale', locale)
      .not('published_at', 'is', null)
      .maybeSingle();
    if (!translation) return null;

    return {
      title: translation.title as string,
      href: localePath(locale, `/blog/${translation.slug}`)
    };
  }

  const [previous, next] = await Promise.all([neighbor('previous'), neighbor('next')]);
  return { previous, next };
}

function mapTranslationRow(
  locale: string,
  row: {
    excerpt: string | null;
    published_at: string | null;
    slug: string;
    title: string;
    og_image?:
      | { alt: string | null; url: string | null }
      | { alt: string | null; url: string | null }[]
      | null;
    post:
      | {
          id: string;
          published_at?: string | null;
          primary_category?: { name: string } | { name: string }[] | null;
        }
      | {
          id: string;
          published_at?: string | null;
          primary_category?: { name: string } | { name: string }[] | null;
        }[]
      | null;
  }
): PublicBlogPost | null {
  const post = unwrap(row.post);
  if (!post) return null;

  return {
    category: unwrap(post.primary_category)?.name ?? null,
    excerpt: row.excerpt,
    href: localePath(locale, `/blog/${row.slug}`),
    id: post.id,
    imageAlt: unwrap(row.og_image)?.alt ?? row.title,
    imageUrl: unwrap(row.og_image)?.url ?? null,
    publishedAt: row.published_at ?? post.published_at ?? null,
    slug: row.slug,
    title: row.title
  };
}

async function resolvePostCategoryId(
  postId: string,
  primaryCategoryId: string | null
): Promise<string | null> {
  if (primaryCategoryId) return primaryCategoryId;

  const supabase = createEnquiryPublicClient();
  const { data } = await supabase
    .from('blog_post_categories')
    .select('category_id')
    .eq('post_id', postId)
    .limit(1)
    .maybeSingle();

  return data?.category_id ?? null;
}

/** Published articles in the same category, excluding the current post. */
export async function getRelatedArticles(
  locale: string,
  postId: string,
  categoryId: string | null,
  limit = 3
): Promise<PublicBlogPost[]> {
  const resolvedCategoryId = await resolvePostCategoryId(postId, categoryId);
  if (!resolvedCategoryId) return [];

  const supabase = createEnquiryPublicClient();

  const [{ data: primaryRows }, { data: joinRows }] = await Promise.all([
    supabase
      .from('blog_posts')
      .select('id, published_at')
      .eq('status', 'published')
      .is('deleted_at', null)
      .eq('primary_category_id', resolvedCategoryId)
      .neq('id', postId),
    supabase
      .from('blog_post_categories')
      .select('post_id, post:blog_posts!inner(id, published_at, status, deleted_at)')
      .eq('category_id', resolvedCategoryId)
      .neq('post_id', postId)
  ]);

  const candidates = new Map<string, string>();

  for (const row of primaryRows ?? []) {
    candidates.set(row.id, row.published_at ?? '');
  }

  for (const row of joinRows ?? []) {
    const post = unwrap(row.post);
    if (!post || post.status !== 'published' || post.deleted_at) continue;
    candidates.set(post.id, post.published_at ?? '');
  }

  const sortedIds = [...candidates.entries()]
    .sort(([, left], [, right]) => right.localeCompare(left))
    .slice(0, limit)
    .map(([id]) => id);

  if (!sortedIds.length) return [];

  const { data } = await supabase
    .from('blog_translations')
    .select(
      `
      slug,
      title,
      excerpt,
      published_at,
      post:blog_posts!inner(
        id,
        published_at,
        primary_category:blog_categories!blog_posts_primary_category_id_fkey(name)
      ),
      og_image:media_assets!blog_translations_og_image_id_fkey(url, alt)
    `
    )
    .eq('locale', locale)
    .in('post_id', sortedIds);

  const byPostId = new Map(
    (data ?? [])
      .map((row) => mapTranslationRow(locale, row))
      .filter((post): post is PublicBlogPost => post !== null)
      .map((post) => [post.id, post] as const)
  );

  return sortedIds.flatMap((id) => {
    const post = byPostId.get(id);
    return post ? [post] : [];
  });
}
