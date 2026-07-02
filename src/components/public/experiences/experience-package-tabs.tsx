'use client';

import * as React from 'react';

import { Icons } from '@/components/icons';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { localePath } from '@/lib/public/locale-path';
import { cn } from '@/lib/utils';
import type { PublicExperiencePackageLevel } from '@/features/experiences/public/types';

type ExperiencePackageTabsProps = {
  levels: PublicExperiencePackageLevel[];
  locale: string;
};

function collectBands(level: PublicExperiencePackageLevel) {
  const bands: string[] = [];
  for (const season of level.seasons) {
    for (const cell of season.cells) {
      if (!bands.includes(cell.groupBand)) bands.push(cell.groupBand);
    }
  }
  return bands;
}

function formatBandLabel(band: string) {
  const normalized = band.trim().toLowerCase();
  if (normalized.includes('pax') || normalized.includes('person')) return band;
  return `${band} pax`;
}

const PACKAGE_LEVELS: Array<{
  fallbackBlurb: string;
  key: PublicExperiencePackageLevel['key'];
  label: string;
}> = [
  {
    fallbackBlurb:
      'Simple stays and practical routing for travellers who want the experience first.',
    key: 'economy',
    label: 'Economy'
  },
  {
    fallbackBlurb: 'Good-value camps and lodges with the core safari route kept intact.',
    key: 'budget',
    label: 'Budget'
  },
  {
    fallbackBlurb: 'Balanced comfort, strong locations, and a polished safari rhythm.',
    key: 'mid_range',
    label: 'Mid-Range'
  },
  {
    fallbackBlurb: 'Premium lodges and camps with elevated comfort throughout the route.',
    key: 'luxury',
    label: 'Luxury'
  },
  {
    fallbackBlurb:
      'Top-tier camps, private touches, and the most refined version of this experience.',
    key: 'high_end',
    label: 'High-End'
  }
];

function tierTheme(key: PublicExperiencePackageLevel['key']) {
  if (key === 'economy') {
    return {
      Icon: Icons.package,
      active: 'border-emerald-600 bg-emerald-600 text-white',
      inactive: 'border-emerald-600/25 text-emerald-700 hover:border-emerald-600',
      table: 'bg-emerald-700 text-white'
    };
  }
  if (key === 'budget') {
    return {
      Icon: Icons.badgeCheck,
      active: 'border-[#5f8a3d] bg-[#5f8a3d] text-white',
      inactive: 'border-[#5f8a3d]/25 text-[#5f8a3d] hover:border-[#5f8a3d]',
      table: 'bg-[#5f8a3d] text-white'
    };
  }
  if (key === 'luxury') {
    return {
      Icon: Icons.pro,
      active:
        'border-[var(--benroso-gold)] bg-[var(--benroso-gold)] text-[var(--benroso-primary-dark)]',
      inactive:
        'border-[var(--benroso-gold)]/40 text-[var(--benroso-brown)] hover:border-[var(--benroso-gold)]',
      table: 'bg-[var(--benroso-gold)] text-[var(--benroso-primary-dark)]'
    };
  }
  if (key === 'high_end') {
    return {
      Icon: Icons.sparkles,
      active: 'border-[var(--benroso-primary-dark)] bg-[var(--benroso-primary-dark)] text-white',
      inactive:
        'border-[var(--benroso-primary-dark)]/25 text-[var(--benroso-primary-dark)] hover:border-[var(--benroso-primary-dark)]',
      table: 'bg-[var(--benroso-primary-dark)] text-white'
    };
  }
  return {
    Icon: Icons.exclusive,
    active: 'border-[var(--benroso-primary)] bg-[var(--benroso-primary)] text-white',
    inactive:
      'border-[var(--benroso-primary)]/25 text-[var(--benroso-primary)] hover:border-[var(--benroso-primary)]',
    table: 'bg-[var(--benroso-primary)] text-white'
  };
}

function formatPriceValue(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(value);
}

function PriceCell({ currency, price }: { currency: string; price: number | null | undefined }) {
  if (!price) {
    return <span className='text-sm text-[var(--benroso-muted)]'>On request</span>;
  }

  return (
    <span className='inline-flex min-w-[104px] flex-col leading-none'>
      <span>
        <span className='mr-1 align-baseline text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--benroso-muted)]'>
          {currency || 'USD'}
        </span>
        <strong className='font-display text-xl font-bold text-[var(--benroso-heading)]'>
          {formatPriceValue(price)}
        </strong>
      </span>
      <span className='mt-2 text-xs font-normal text-[var(--benroso-muted)]'>per person</span>
    </span>
  );
}

function EmptyPackageGuide({ locale }: { locale: string }) {
  return (
    <div className='rounded-[var(--benroso-radius)] border border-dashed border-[var(--benroso-line)] bg-white p-6'>
      <h3 className='benroso-heading font-display text-2xl'>Package Prices On Request</h3>
      <p className='benroso-body mt-3 max-w-2xl text-sm leading-7'>
        This experience can be shaped around economy, mid-range, luxury, or high-end comfort levels.
        Pricing depends on the selected trip, season, lodge availability, and group size.
      </p>
      <div className='mt-5'>
        <BenrosoButton href={localePath(locale, '/contact')} size='sm'>
          Request Package Prices
        </BenrosoButton>
      </div>
    </div>
  );
}

export function ExperiencePackageTabs({ levels, locale }: ExperiencePackageTabsProps) {
  const levelsByKey = React.useMemo(
    () => new Map(levels.map((level) => [level.key, level])),
    [levels]
  );
  const firstAvailable =
    PACKAGE_LEVELS.find((level) => levelsByKey.has(level.key))?.key ?? levels[0]?.key ?? 'luxury';
  const [activeKey, setActiveKey] =
    React.useState<PublicExperiencePackageLevel['key']>(firstAvailable);
  const activeLevel = levelsByKey.get(activeKey) ?? levelsByKey.get(firstAvailable) ?? levels[0];

  React.useEffect(() => {
    if (!levelsByKey.has(activeKey)) setActiveKey(firstAvailable);
  }, [activeKey, firstAvailable, levelsByKey]);

  if (!levels.length || !activeLevel) return <EmptyPackageGuide locale={locale} />;

  const bands = collectBands(activeLevel);
  const activeTheme = tierTheme(activeLevel.key);

  return (
    <div>
      <div
        className='flex flex-wrap justify-center gap-3'
        role='tablist'
        aria-label='Package levels'
      >
        {PACKAGE_LEVELS.map((packageLevel) => {
          const level = levelsByKey.get(packageLevel.key);
          const theme = tierTheme(packageLevel.key);
          const Icon = theme.Icon;
          const active = activeLevel.key === packageLevel.key && Boolean(level);
          return (
            <button
              aria-disabled={!level}
              disabled={!level}
              key={packageLevel.key}
              type='button'
              role='tab'
              aria-selected={active}
              className={cn(
                'inline-flex items-center gap-2 rounded-[var(--benroso-radius)] border bg-white px-5 py-3 text-xs font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--benroso-gold)]',
                active ? theme.active : theme.inactive,
                !level &&
                  'cursor-not-allowed border-[var(--benroso-line)] text-[var(--benroso-muted)] opacity-45 hover:border-[var(--benroso-line)]'
              )}
              onClick={() => {
                if (level) setActiveKey(level.key);
              }}
            >
              <Icon className='h-4 w-4' />
              {packageLevel.label}
            </button>
          );
        })}
      </div>

      <div className='mx-auto mt-8 max-w-5xl'>
        <div className='mb-6 text-center'>
          <h3 className='benroso-heading font-display text-2xl'>{activeLevel.label}</h3>
          <p className='benroso-body mx-auto mt-2 max-w-2xl text-sm leading-7'>
            {activeLevel.blurb ||
              PACKAGE_LEVELS.find((level) => level.key === activeLevel.key)?.fallbackBlurb}
          </p>
        </div>

        <div className='overflow-hidden rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white'>
          {bands.length && activeLevel.seasons.length ? (
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[760px] text-left text-sm'>
                <thead>
                  <tr
                    className={cn(
                      'border-b border-[var(--benroso-line)] text-xs font-bold uppercase tracking-[0.08em]',
                      activeTheme.table
                    )}
                  >
                    <th className='px-5 py-4'>Travel period</th>
                    {bands.map((band) => (
                      <th className='px-5 py-4' key={band}>
                        {formatBandLabel(band)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeLevel.seasons.map((season) => (
                    <tr
                      className='border-b border-[var(--benroso-line)] last:border-b-0 even:bg-[var(--benroso-ivory)]/35 hover:bg-[var(--benroso-ivory)]/65'
                      key={season.label}
                    >
                      <th className='w-[190px] px-5 py-5 font-semibold text-[var(--benroso-ink)]'>
                        {season.label}
                      </th>
                      {bands.map((band) => {
                        const cell = season.cells.find((item) => item.groupBand === band);
                        return (
                          <td
                            className='px-5 py-5 tabular-nums text-[var(--benroso-muted)]'
                            key={band}
                          >
                            <PriceCell currency={activeLevel.currency} price={cell?.price} />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='flex min-h-48 flex-col items-center justify-center gap-3 p-6 text-center'>
              <Icons.info className='h-8 w-8 text-[var(--benroso-gold)]' />
              <p className='benroso-body max-w-sm text-sm leading-7'>
                Detailed group-size prices for this level are still being prepared.
              </p>
            </div>
          )}
        </div>

        <div className='mt-5 flex flex-col gap-3 border-t border-[var(--benroso-line)] pt-5 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm leading-6 text-[var(--benroso-muted)]'>
            Prices are per person and vary by travel period, rooming, park fees, and lodge
            availability.
          </p>
          <BenrosoButton
            className='group'
            href={localePath(locale, '/contact')}
            size='sm'
            variant='accent-outline'
          >
            <span className='relative flex h-4 w-4 items-center justify-center'>
              <Icons.mail className='h-4 w-4 animate-pulse' />
              <Icons.whatsapp className='absolute h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
            </span>
            Enquire
          </BenrosoButton>
        </div>
      </div>
    </div>
  );
}
