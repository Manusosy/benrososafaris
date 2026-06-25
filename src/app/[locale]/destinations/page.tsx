import { DestinationCard } from '@/components/public/cards/content-cards';
import { EmptyState, ListingShell } from '@/components/public/page-shell';
import { PublicPageHero } from '@/components/public/public-page-hero';
import { BENROSO_PUBLIC_HERO_IMAGES } from '@/config/benroso';
import { localePath } from '@/lib/public/locale-path';
import { getPublicDestinations } from '@/lib/public/site-data';

type DestinationsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DestinationsPage({ params }: DestinationsPageProps) {
  const { locale } = await params;
  const destinations = await getPublicDestinations(locale, 24);
  const hero = BENROSO_PUBLIC_HERO_IMAGES.destinations;

  return (
    <>
      <PublicPageHero
        breadcrumbs={[{ href: localePath(locale), label: 'Home' }, { label: 'Destinations' }]}
        description='Destination guides for Kenya, Tanzania, national parks, wildlife seasons, and linked safari routes.'
        eyebrow='Destinations'
        imageAlt={hero.imageAlt}
        imageUrl={hero.imageUrl}
        title='East Africa Safari Destinations'
      />
      <ListingShell
        filters={
          <div className='space-y-4'>
            <h2 className='benroso-heading font-display text-xl'>Browse By Country</h2>
            <ul className='space-y-2 text-sm'>
              <li>
                <a
                  className='text-[var(--benroso-ink)] hover:text-[var(--benroso-primary)] hover:underline'
                  href={localePath(locale, '/destinations?country=kenya')}
                >
                  Kenya
                </a>
              </li>
              <li>
                <a
                  className='text-[var(--benroso-ink)] hover:text-[var(--benroso-primary)] hover:underline'
                  href={localePath(locale, '/destinations?country=tanzania')}
                >
                  Tanzania
                </a>
              </li>
            </ul>
          </div>
        }
      >
        {destinations.length ? (
          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {destinations.map((destination) => (
              <DestinationCard
                item={{
                  country: destination.country,
                  excerpt: destination.summary,
                  href: destination.href,
                  imageAlt: destination.imageAlt,
                  imageUrl: destination.imageUrl,
                  title: destination.name
                }}
                key={destination.id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            actionHref={localePath(locale, '/contact')}
            actionLabel='Speak With a Safari Planner'
            message='Destination guides will populate automatically from the CMS once published.'
            title='No destinations published yet'
          />
        )}
      </ListingShell>
    </>
  );
}
