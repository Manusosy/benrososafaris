'use client';

import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SAFARI_DESTINATION_OPTIONS } from '@/features/contact/constants/safari-countries';
import { cn } from '@/lib/utils';

type DestinationsMultiSelectProps = {
  className?: string;
  onChange: (value: string) => void;
  value: string;
};

function getDisplayLabel(selected: string[]) {
  if (!selected.length) return 'Select countries...';
  if (selected.length === 1) return selected[0];
  if (selected.length === 2) return selected.join(', ');
  return `${selected.length} countries selected`;
}

export function DestinationsMultiSelect({
  className,
  onChange,
  value
}: DestinationsMultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selected = React.useMemo(
    () =>
      value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    [value]
  );

  function toggleCountry(country: string) {
    const next = selected.includes(country)
      ? selected.filter((item) => item !== country)
      : [...selected, country];
    onChange(next.join(', '));
  }

  return (
    <div className={cn('mt-1.5', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className={cn(
              'benroso-contact-field benroso-destination-trigger h-auto min-h-11 w-full justify-between px-3 py-2.5 font-normal shadow-none focus-visible:ring-0 focus-visible:ring-offset-0',
              selected.length ? 'text-[var(--benroso-ink)]' : 'text-[var(--benroso-muted)]/70'
            )}
            type='button'
            variant='ghost'
          >
            <span className='truncate text-left'>{getDisplayLabel(selected)}</span>
            <Icons.chevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align='start'
          className='benroso-destination-popover w-[min(100vw-2rem,320px)] border-[#d9d9d9] bg-white p-0 text-[#1a1a1a] shadow-md'
          collisionPadding={12}
          side='bottom'
          sideOffset={6}
        >
          <div
            aria-label='Safari destination countries'
            className='benroso-destination-popover-list'
            role='group'
          >
            {SAFARI_DESTINATION_OPTIONS.map(({ code, country }) => {
              const isSelected = selected.includes(country);

              return (
                <label
                  className={cn(
                    'benroso-destination-popover-item',
                    isSelected && 'benroso-destination-popover-item--selected'
                  )}
                  key={country}
                >
                  <input
                    checked={isSelected}
                    className='benroso-contact-checkbox-input'
                    onChange={() => toggleCountry(country)}
                    type='checkbox'
                  />
                  <span className='benroso-destination-popover-item-label'>{country}</span>
                  <span className='benroso-destination-popover-item-code'>{code}</span>
                </label>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      {!selected.length ? (
        <p className='mt-1.5 text-xs text-[var(--benroso-muted)]'>Choose at least one country.</p>
      ) : null}
      {selected.length > 0 && !open ? (
        <p className='mt-1.5 text-xs text-[var(--benroso-muted)]'>
          We will use the selected countries to tailor your itinerary.
        </p>
      ) : null}
    </div>
  );
}
