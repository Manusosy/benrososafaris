import { notFound } from 'next/navigation';

import { TourDetailShell } from '@/components/public/tour-detail-shell';
import { createClient } from '@/lib/supabase/server';
import { buildTouristTripJsonLd } from '@/lib/seo';

type TourPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function TourDetailPage({ params }: TourPageProps) {
  const { locale, slug } = await params;
  const supabase = await createClient();
  const { data: tour } = await supabase
    .from('tour_translations')
    .select('*, tour:tours!inner(id, status, days, price_from)')
    .eq('locale', locale)
    .eq('slug', slug)
    .eq('tour.status', 'published')
    .single();

  if (!tour) notFound();

  const jsonLd = buildTouristTripJsonLd(
    { ...tour, days: tour.tour?.days, price_from: tour.tour?.price_from },
    `/${locale}/tours/${tour.slug}`
  );

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TourDetailShell
        days={tour.tour?.days}
        excerpt={tour.excerpt}
        locale={locale}
        priceFrom={tour.tour?.price_from}
        title={tour.title}
      />
    </>
  );
}
