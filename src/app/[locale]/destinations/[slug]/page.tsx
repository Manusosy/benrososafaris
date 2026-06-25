import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FaqSection } from '@/components/public/faq-section';
import { createClient } from '@/lib/supabase/server';
import { absoluteUrl, buildAlternates, buildDestinationJsonLd, buildFaqJsonLd } from '@/lib/seo';
import { normalizeDirectAnswers } from '@/lib/seo/direct-answers';

type DestinationPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

type DestinationTranslation = {
  destination: { id: string; country: string | null; status: string };
  faqs: unknown;
  locale: string;
  name: string;
  og_image?: { alt: string | null; url: string | null } | null;
  seo_description: string | null;
  seo_title: string | null;
  slug: string;
  summary: string | null;
};

export async function generateMetadata(props: DestinationPageProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const supabase = await createClient();

  const { data: destination } = await supabase
    .from('destination_translations')
    .select(
      `
      slug,
      locale,
      name,
      summary,
      seo_title,
      seo_description,
      og_image:media_assets!destination_translations_og_image_id_fkey(url, alt),
      destination:destinations!inner(id, status, country)
    `
    )
    .eq('locale', locale)
    .eq('slug', slug)
    .eq('destination.status', 'published')
    .single<DestinationTranslation>();

  if (!destination) notFound();

  const canonical = absoluteUrl(`/${locale}/destinations/${destination.slug}`);
  const title = destination.seo_title || `${destination.name} Safari Guide | Benroso Safaris`;
  const description = destination.seo_description || destination.summary || '';

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: await buildAlternates({
        table: 'destination_translations',
        parentId: destination.destination.id,
        parentKey: 'destination_id',
        pathBuilder: (item) => `/${item.locale}/destinations/${item.slug}`
      })
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      images: destination.og_image?.url
        ? [{ url: destination.og_image.url, alt: destination.og_image.alt || title }]
        : []
    }
  };
}

export default async function DestinationDetailPage(props: DestinationPageProps) {
  const { locale, slug } = await props.params;
  const supabase = await createClient();

  const { data: destination } = await supabase
    .from('destination_translations')
    .select(
      `
      *,
      destination:destinations!inner(id, status, country)
    `
    )
    .eq('locale', locale)
    .eq('slug', slug)
    .eq('destination.status', 'published')
    .single<DestinationTranslation>();

  if (!destination) notFound();

  const faqs = normalizeDirectAnswers(destination.faqs);
  const jsonLd = buildDestinationJsonLd(
    { ...destination, country: destination.destination.country, faqs },
    `/${locale}/destinations/${destination.slug}`
  );
  const faqJsonLd = buildFaqJsonLd(faqs);

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <main className='benroso-section bg-[var(--benroso-ivory)]'>
        <article className='benroso-container max-w-4xl'>
          <p className='benroso-eyebrow'>Destination Guide</p>
          <h1 className='benroso-heading mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight'>
            {destination.name}
          </h1>
          {destination.summary ? (
            <p className='mt-6 text-lg leading-8 text-[var(--benroso-muted)]'>
              {destination.summary}
            </p>
          ) : null}
        </article>
      </main>
      <FaqSection faqs={faqs} headingId='destination-faq-heading' />
    </>
  );
}
