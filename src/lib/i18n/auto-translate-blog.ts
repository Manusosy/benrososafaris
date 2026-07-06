import {
  getAutoTranslateLocales,
  isAutoTranslateEnabled,
  shouldAutoPublishTranslations
} from '@/lib/i18n/auto-translate-config';
import { translateHtml, translateStringList, translateText } from '@/lib/i18n/google-translate';
import { createClient } from '@/lib/supabase/server';
import { slugify } from '@/lib/utils';

export interface BlogEnglishSource {
  postId: string;
  slug: string;
  title: string;
  excerpt: string | null;
  contentHtml: string;
  seoTitle: string | null;
  seoDescription: string | null;
  focusKeyword: string | null;
  keywords: string[];
  featuredImageCaption: string | null;
  ogImageId: string | null;
  publishedAt: string | null;
}

async function resolveUniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  locale: string,
  baseSlug: string,
  postId: string
): Promise<string> {
  let candidate = baseSlug || 'article';
  let suffix = 2;

  while (true) {
    const { data } = await supabase
      .from('blog_translations')
      .select('post_id')
      .eq('locale', locale)
      .eq('slug', candidate)
      .maybeSingle();

    if (!data || data.post_id === postId) return candidate;

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

async function upsertBlogTranslation(
  supabase: Awaited<ReturnType<typeof createClient>>,
  locale: string,
  source: BlogEnglishSource,
  now: string
): Promise<void> {
  const [
    title,
    excerpt,
    contentHtml,
    seoTitle,
    seoDescription,
    focusKeyword,
    keywords,
    featuredImageCaption
  ] = await Promise.all([
    translateText(source.title, locale),
    source.excerpt ? translateText(source.excerpt, locale) : Promise.resolve(null),
    source.contentHtml ? translateHtml(source.contentHtml, locale) : Promise.resolve(''),
    source.seoTitle ? translateText(source.seoTitle, locale) : Promise.resolve(null),
    source.seoDescription ? translateText(source.seoDescription, locale) : Promise.resolve(null),
    source.focusKeyword ? translateText(source.focusKeyword, locale) : Promise.resolve(null),
    source.keywords.length ? translateStringList(source.keywords, locale) : Promise.resolve([]),
    source.featuredImageCaption
      ? translateText(source.featuredImageCaption, locale)
      : Promise.resolve(null)
  ]);

  const slug = await resolveUniqueSlug(
    supabase,
    locale,
    slugify(title) || source.slug,
    source.postId
  );

  const publishedAt =
    shouldAutoPublishTranslations() && source.publishedAt ? source.publishedAt : null;

  const payload = {
    post_id: source.postId,
    locale,
    slug,
    title,
    excerpt,
    content: contentHtml ? { html: contentHtml } : null,
    seo_title: seoTitle || title,
    seo_description: seoDescription,
    focus_keyword: focusKeyword,
    keywords,
    featured_image_caption: featuredImageCaption,
    og_image_id: source.ogImageId,
    published_at: publishedAt,
    updated_at: now
  };

  const { data: existing } = await supabase
    .from('blog_translations')
    .select('id')
    .eq('post_id', source.postId)
    .eq('locale', locale)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from('blog_translations')
      .update(payload)
      .eq('id', existing.id);
    if (error) throw new Error(error.message);
    return;
  }

  const { error } = await supabase.from('blog_translations').insert(payload);
  if (error) throw new Error(error.message);
}

/** Creates or refreshes non-English blog translations from the English source row. */
export async function autoTranslateBlogPost(source: BlogEnglishSource): Promise<void> {
  if (!isAutoTranslateEnabled()) return;

  const locales = getAutoTranslateLocales();
  if (!locales.length) return;

  const supabase = await createClient();
  const now = new Date().toISOString();

  for (const locale of locales) {
    await upsertBlogTranslation(supabase, locale, source, now);
  }
}
