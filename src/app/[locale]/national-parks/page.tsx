import type { Metadata } from 'next';

import { NationalParkFilters } from '@/components/public/national-parks/national-park-filters';
import { NationalParksResults } from '@/components/public/national-parks/national-parks-results';
import { ListingShell } from '@/components/public/page-shell';
import { PublicPageHero } from '@/components/public/public-page-hero';
import { BENROSO_PUBLIC_HERO_IMAGES } from '@/config/benroso';
import { localePath } from '@/lib/public/locale-path';
import { getParkFilterFacets, listPublishedParks } from '@/lib/public/national-parks';
import { getPageHero } from '@/lib/public/site-data';
import { absoluteUrl } from '@/lib/seo';

type NationalParksPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    activity?: string;
    country?: string;
    region?: string;
    wildlife?: string;
  }>;
};

const nationalParksDescription =
  'Choose the wildlife areas that match your season, route, and travel pace, from classic savannah reserves to quieter parks with room to explore.';

function parseFilterList(value?: string) {
  if (!value?.trim()) return [];
  return value
    .split(',')
    .map((item) => decodeURIComponent(item.trim()))
    .filter(Boolean);
}

export async function generateMetadata({ params }: NationalParksPageProps): Promise<Metadata> {
  const { locale } = await params;
  const canonical = absoluteUrl(`/${locale}/national-parks`);

  return {
    title: 'National Parks & Safari Reserves | Benroso Safaris',
    description: nationalParksDescription,
    alternates: { canonical },
    openGraph: {
      title: 'National Parks & Safari Reserves | Benroso Safaris',
      description: nationalParksDescription,
      type: 'website',
      url: canonical
    }
  };
}

export default async function NationalParksPage({ params, searchParams }: NationalParksPageProps) {
  const { locale } = await params;
  const query = await searchParams;

  const activeFilters = {
    activities: parseFilterList(query.activity),
    countries: parseFilterList(query.country),
    regions: parseFilterList(query.region),
    wildlife: parseFilterList(query.wildlife)
  };

  const [parks, facets, pageHero] = await Promise.all([
    listPublishedParks({
      activities: activeFilters.activities,
      countries: activeFilters.countries,
      locale,
      regions: activeFilters.regions,
      wildlife: activeFilters.wildlife
    }),
    getParkFilterFacets(locale),
    getPageHero('national-parks')
  ]);
  const hero = BENROSO_PUBLIC_HERO_IMAGES.destinations;

  return (
    <>
      <PublicPageHero
        breadcrumbStyle='pipe-uppercase'
        breadcrumbs={[{ href: localePath(locale), label: 'Home' }, { label: 'National Parks' }]}
        description={nationalParksDescription}
        eyebrow='Safari Parks'
        eyebrowTone='white'
        hero={pageHero}
        imageAlt={hero.imageAlt}
        imageUrl={hero.imageUrl}
        overlayTone='black'
        showGoldLine={false}
        title='National Parks & Reserves'
        titleTone='white'
      />

      <section className='bg-white'>
        <div className='benroso-container border-b border-[var(--benroso-line)] py-9'>
          <div className='max-w-3xl'>
            <p className='benroso-eyebrow'>Plan by landscape</p>
            <h2 className='benroso-heading mt-3 font-display text-[clamp(1.9rem,3vw,2.75rem)] leading-tight'>
              Find the park that fits the wildlife you want to see and the way you like to travel.
            </h2>
            <p className='benroso-body mt-4 text-base leading-8'>
              Use this guide to compare safari parks by country, region, wildlife, activities, and
              the best time to go. When you are ready, our planners can connect the right parks with
              tours, stays, and private routes.
            </p>
          </div>
        </div>
      </section>

      <ListingShell
        className='bg-white'
        filters={<NationalParkFilters active={activeFilters} facets={facets} locale={locale} />}
      >
        <NationalParksResults locale={locale} parks={parks} />
      </ListingShell>
    </>
  );
}
