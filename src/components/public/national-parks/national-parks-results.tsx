'use client';

import { EmptyState } from '@/components/public/page-shell';
import { NationalParkCard } from '@/components/public/national-parks/national-park-card';
import {
  NationalParkViewToggle,
  useNationalParkView
} from '@/components/public/national-parks/national-park-view-toggle';
import { localePath } from '@/lib/public/locale-path';
import type { ParkListItem } from '@/lib/public/national-parks';
import { cn } from '@/lib/utils';

type NationalParksResultsProps = {
  locale: string;
  parks: ParkListItem[];
};

export function NationalParksResults({ locale, parks }: NationalParksResultsProps) {
  const [view] = useNationalParkView();
  const countLabel = `${parks.length} ${parks.length === 1 ? 'park or reserve' : 'parks and reserves'} found`;

  if (!parks.length) {
    return (
      <>
        <p className='mb-6 text-sm font-medium text-[var(--benroso-muted)]'>{countLabel}</p>
        <EmptyState
          actionHref={localePath(locale, '/contact')}
          actionLabel='Ask a Safari Planner'
          message='No published park guides match these filters yet. Clear a filter or ask our team which parks fit your dates and wildlife interests.'
          title='No matching parks found'
        />
      </>
    );
  }

  return (
    <>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
        <div>
          <p className='benroso-eyebrow'>Safari Parks</p>
          <p className='mt-2 text-sm font-medium text-[var(--benroso-muted)]'>{countLabel}</p>
        </div>
        <NationalParkViewToggle />
      </div>

      <div
        className={cn(
          view === 'grid'
            ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
            : 'flex flex-col gap-6'
        )}
      >
        {parks.map((park) => (
          <NationalParkCard
            href={localePath(locale, `/national-parks/${park.slug}`)}
            item={park}
            key={park.id}
            variant={view}
          />
        ))}
      </div>
    </>
  );
}
