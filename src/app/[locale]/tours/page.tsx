import { TourCard } from '@/components/public/cards/content-cards';
import { EmptyState, ListingShell } from '@/components/public/page-shell';
import { PublicPageHero } from '@/components/public/public-page-hero';
import { BENROSO_PUBLIC_HERO_IMAGES } from '@/config/benroso';
import { localePath } from '@/lib/public/locale-path';
import { getPublicTours } from '@/lib/public/site-data';

type ToursPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ToursPage({ params }: ToursPageProps) {
  const { locale } = await params;
  const tours = await getPublicTours(locale, 24);
  const hero = BENROSO_PUBLIC_HERO_IMAGES.tours;

  return (
    <>
      <PublicPageHero
        breadcrumbs={[{ href: localePath(locale), label: 'Home' }, { label: 'Safari Tours' }]}
        description='Browse Kenya and Tanzania safari tours with clear durations, pricing guidance, and expert-planned routes.'
        eyebrow='Safari Tours'
        imageAlt={hero.imageAlt}
        imageUrl={hero.imageUrl}
        title='Kenya & Tanzania Safari Tours'
      />
      <ListingShell
        filters={
          <div className='space-y-4'>
            <h2 className='benroso-heading font-display text-xl'>Filter Safaris</h2>
            <p className='text-sm text-[var(--benroso-muted)]'>
              Filters will connect to CMS facets as content is published.
            </p>
          </div>
        }
      >
        {tours.length ? (
          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {tours.map((tour) => (
              <TourCard
                item={{
                  days: tour.days,
                  excerpt: tour.excerpt,
                  href: tour.href,
                  imageAlt: tour.imageAlt,
                  imageUrl: tour.imageUrl,
                  nights: tour.nights,
                  priceFrom: tour.priceFrom,
                  title: tour.title
                }}
                key={tour.id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            actionHref={localePath(locale, '/contact')}
            actionLabel='Plan a Custom Safari'
            message='Published tours will appear here once they are added through the Benroso CMS.'
            title='No tours published yet'
          />
        )}
      </ListingShell>
    </>
  );
}
