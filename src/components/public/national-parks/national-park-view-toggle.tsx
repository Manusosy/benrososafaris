'use client';

import { parseAsStringEnum, useQueryState } from 'nuqs';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

export type NationalParkViewMode = 'grid' | 'list';

const viewParser = parseAsStringEnum<NationalParkViewMode>(['grid', 'list']).withDefault('grid');

export function useNationalParkView() {
  return useQueryState('view', viewParser);
}

export function NationalParkViewToggle({ className }: { className?: string }) {
  const [view, setView] = useNationalParkView();

  return (
    <div
      aria-label='National park view mode'
      className={cn(
        'flex rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white',
        className
      )}
      role='group'
    >
      <button
        aria-label='Grid view'
        aria-pressed={view === 'grid'}
        className={cn(
          'inline-flex items-center justify-center px-2.5 py-1.5 transition-colors',
          view === 'grid'
            ? 'bg-[var(--benroso-primary)] text-white'
            : 'text-[var(--benroso-muted)] hover:text-[var(--benroso-ink)]'
        )}
        onClick={() => void setView('grid')}
        type='button'
      >
        <Icons.dashboard className='size-4' />
      </button>
      <button
        aria-label='List view'
        aria-pressed={view === 'list'}
        className={cn(
          'inline-flex items-center justify-center border-l border-[var(--benroso-line)] px-2.5 py-1.5 transition-colors',
          view === 'list'
            ? 'bg-[var(--benroso-primary)] text-white'
            : 'text-[var(--benroso-muted)] hover:text-[var(--benroso-ink)]'
        )}
        onClick={() => void setView('list')}
        type='button'
      >
        <Icons.listBullet className='size-4' />
      </button>
    </div>
  );
}
