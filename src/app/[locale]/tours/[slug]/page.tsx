import { notFound } from 'next/navigation';

import { TourDetailShell } from '@/components/public/tour-detail-shell';
import { getPublicTourDetail, getSimilarToursForTour } from '@/lib/public/site-data';
import { buildTouristTripJsonLd } from '@/lib/seo';

type TourPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function TourDetailPage({ params }: TourPageProps) {
  const { locale, slug } = await params;
  const tour = await getPublicTourDetail(locale, slug);

  if (!tour) notFound();

  const similarTours = await getSimilarToursForTour(locale, tour.id);
  const primaryDestination = tour.destinationLabels?.[0] ?? null;

  const jsonLd = buildTouristTripJsonLd(
    {
      days: tour.days,
      excerpt: tour.excerpt,
      locale,
      price_from: tour.priceFrom,
      slug: tour.slug,
      title: tour.title
    },
    `/${locale}/tours/${tour.slug}`
  );

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TourDetailShell
        locale={locale}
        primaryDestination={primaryDestination}
        similarTours={similarTours}
        tour={tour}
      />
    </>
  );
}
