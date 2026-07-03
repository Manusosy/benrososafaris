import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Icons } from '@/components/icons';
import { FleetCard } from '@/components/public/fleet/fleet-card';
import { EmptyState, ListingShell } from '@/components/public/page-shell';
import { PublicPageHero } from '@/components/public/public-page-hero';
import { BENROSO_PUBLIC_HERO_IMAGES } from '@/config/benroso';
import { getPublishedFleet } from '@/lib/public/fleet';
import { localePath } from '@/lib/public/locale-path';
import { getPageHero } from '@/lib/public/site-data';
import { absoluteUrl } from '@/lib/seo';
import { cn } from '@/lib/utils';

type FleetPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
};

const fleetDescription =
  'Safari vehicles prepared for East African roads, long park days, photography stops, and comfortable private game drives.';

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
}

export async function generateMetadata({ params }: FleetPageProps): Promise<Metadata> {
  const { locale } = await params;
  const canonical = absoluteUrl(`/${locale}/our-fleet`);

  return {
    title: 'Safari Vehicles & Fleet | Benroso Safaris',
    description: fleetDescription,
    alternates: { canonical },
    openGraph: {
      title: 'Safari Vehicles & Fleet | Benroso Safaris',
      description: fleetDescription,
      type: 'website',
      url: canonical
    }
  };
}

export default async function FleetPage({ params, searchParams }: FleetPageProps) {
  const { locale } = await params;
  const { type: typeParam } = await searchParams;
  const activeType = typeParam?.toLowerCase() ?? null;

  const [fleet, pageHero] = await Promise.all([getPublishedFleet(locale), getPageHero('fleet')]);
  const hero = BENROSO_PUBLIC_HERO_IMAGES.fleet;

  const typeFacets = [
    ...new Map(
      fleet
        .filter((vehicle) => vehicle.vehicleType)
        .map((vehicle) => [slugify(vehicle.vehicleType as string), vehicle.vehicleType as string])
    )
  ].toSorted((a, b) => a[1].localeCompare(b[1]));

  const visible = activeType
    ? fleet.filter((vehicle) => vehicle.vehicleType && slugify(vehicle.vehicleType) === activeType)
    : fleet;
  const activeLabel = typeFacets.find(([slug]) => slug === activeType)?.[1];

  return (
    <>
      <PublicPageHero
        breadcrumbStyle='pipe-uppercase'
        breadcrumbs={[{ href: localePath(locale), label: 'Home' }, { label: 'Our Fleet' }]}
        description={fleetDescription}
        eyebrow='Safari Fleet'
        hero={pageHero}
        imageAlt={hero.imageAlt}
        imageUrl={hero.imageUrl}
        showGoldLine={false}
        title='Safari Vehicles & Fleet'
        titleTone='gold'
      />

      <section className='bg-white'>
        <div className='benroso-container border-b border-[var(--benroso-line)] py-8'>
          <div className='grid gap-6 md:grid-cols-3'>
            <FleetStat
              icon={<Icons.fleet className='size-5' />}
              label='Prepared for'
              value='Game drives'
            />
            <FleetStat
              icon={<Icons.checks className='size-5' />}
              label='Checked for'
              value='Comfort & safety'
            />
            <FleetStat
              icon={<Icons.compass className='size-5' />}
              label='Ready for'
              value='Private routes'
            />
          </div>
        </div>
      </section>

      <ListingShell
        className='bg-white'
        filters={
          <div className='space-y-5'>
            <div>
              <p className='benroso-eyebrow'>Vehicles</p>
              <h2 className='benroso-heading mt-2 font-display text-xl'>Browse By Type</h2>
            </div>
            <ul className='space-y-1.5 text-sm'>
              <FilterLink
                active={!activeType}
                count={fleet.length}
                href={localePath(locale, '/our-fleet')}
                label='All vehicles'
              />
              {typeFacets.map(([slug, label]) => (
                <FilterLink
                  active={activeType === slug}
                  count={
                    fleet.filter(
                      (vehicle) => vehicle.vehicleType && slugify(vehicle.vehicleType) === slug
                    ).length
                  }
                  href={localePath(locale, `/our-fleet?type=${slug}`)}
                  key={slug}
                  label={label}
                />
              ))}
            </ul>
          </div>
        }
      >
        <div className='mb-7 flex flex-wrap items-end justify-between gap-3'>
          <div>
            <p className='benroso-eyebrow'>Fleet Directory</p>
            <h2 className='benroso-heading mt-2 font-display text-3xl'>
              {activeLabel ? `${activeLabel} vehicles` : 'All safari vehicles'}
            </h2>
          </div>
          <span className='text-sm text-[var(--benroso-muted)]'>
            {visible.length} {visible.length === 1 ? 'vehicle' : 'vehicles'}
          </span>
        </div>

        {visible.length ? (
          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {visible.map((vehicle) => (
              <FleetCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <EmptyState
            actionHref={localePath(locale, '/contact')}
            actionLabel='Ask About Our Fleet'
            message={
              activeLabel
                ? `No published ${activeLabel} vehicles are visible yet. Try another type or ask the team for the current fleet list.`
                : 'Published fleet vehicles will appear here automatically once added in the portal.'
            }
            title='Fleet content coming soon'
          />
        )}
      </ListingShell>
    </>
  );
}

function FleetStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className='flex items-center gap-4 border-l-2 border-[var(--benroso-lime)] pl-4'>
      <span className='grid size-11 place-items-center rounded-full bg-[var(--benroso-primary)] text-white'>
        {icon}
      </span>
      <div>
        <p className='text-xs font-bold uppercase tracking-[0.14em] text-[var(--benroso-muted)]'>
          {label}
        </p>
        <p className='benroso-heading font-display text-xl'>{value}</p>
      </div>
    </div>
  );
}

function FilterLink({
  active,
  count,
  href,
  label
}: {
  active: boolean;
  count: number;
  href: string;
  label: string;
}) {
  return (
    <li>
      <a
        className={cn(
          'flex items-center justify-between gap-2 rounded-[var(--benroso-radius)] px-3 py-2 transition-colors',
          active
            ? 'bg-[var(--benroso-primary)] font-semibold text-white'
            : 'text-[var(--benroso-ink)] hover:bg-[var(--benroso-ivory)] hover:text-[var(--benroso-primary)]'
        )}
        href={href}
      >
        <span>{label}</span>
        <span
          className={cn(
            'rounded-full px-2 py-0.5 text-xs',
            active
              ? 'bg-white/20 text-white'
              : 'bg-[var(--benroso-ivory)] text-[var(--benroso-muted)]'
          )}
        >
          {count}
        </span>
      </a>
    </li>
  );
}
