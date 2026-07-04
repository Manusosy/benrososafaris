'use client';

import * as React from 'react';

import { BENROSO_OPERATING_COUNTRIES } from '@/features/experiences/public/country-map-copy';
import type { ExperienceListingFiltersState } from '@/features/experiences/public/filters';
import { cn } from '@/lib/utils';

type ExperienceListingFiltersProps = {
  active: ExperienceListingFiltersState;
  onChange: (next: ExperienceListingFiltersState) => void;
};

const MENU_GROUP_FILTERS = [
  {
    label: 'Signature Experiences',
    value: 'top_experiences' as const
  },
  {
    label: 'Wildlife Safaris',
    value: 'wildlife_safari' as const
  }
];

function toggleList<T extends string>(current: T[], value: T) {
  return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
}

function FilterGroup({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className='space-y-3 border-b border-[var(--benroso-line)] pb-5 last:border-b-0 last:pb-0'>
      <h3 className='benroso-heading font-display text-sm uppercase tracking-[0.12em]'>{title}</h3>
      <ul className='space-y-2.5 font-sans text-sm'>{children}</ul>
    </div>
  );
}

function FilterCheckbox({
  checked,
  id,
  label,
  onCheckedChange
}: {
  checked: boolean;
  id: string;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <li>
      <label
        className={cn(
          'flex cursor-pointer items-center gap-2.5 transition-colors hover:text-[var(--benroso-primary)]',
          checked ? 'font-semibold text-[var(--benroso-primary)]' : 'text-[var(--benroso-ink)]'
        )}
        htmlFor={id}
      >
        <input
          checked={checked}
          className='benroso-contact-checkbox-input'
          id={id}
          onChange={(event) => {
            event.stopPropagation();
            onCheckedChange(event.target.checked);
          }}
          type='checkbox'
        />
        <span>{label}</span>
      </label>
    </li>
  );
}

export function ExperienceListingFilters({ active, onChange }: ExperienceListingFiltersProps) {
  const hasActiveFilters = active.countries.length > 0 || active.groups.length > 0;

  function update(partial: Partial<ExperienceListingFiltersState>) {
    onChange({ ...active, ...partial });
  }

  return (
    <div className='benroso-accommodation-filters space-y-5'>
      <h2 className='benroso-heading font-display text-xl'>Filter By</h2>

      <ul className='space-y-2.5 border-b border-[var(--benroso-line)] pb-5 font-sans text-sm'>
        <FilterCheckbox
          checked={!hasActiveFilters}
          id='filter-all-experiences'
          label='All Experiences'
          onCheckedChange={(checked) => {
            if (checked) onChange({ countries: [], groups: [] });
          }}
        />
      </ul>

      <FilterGroup title='Country'>
        {BENROSO_OPERATING_COUNTRIES.map((country) => {
          const id = `filter-country-${country.id}`;
          const checked = active.countries.includes(country.id);

          return (
            <FilterCheckbox
              checked={checked}
              id={id}
              key={country.id}
              label={country.name}
              onCheckedChange={(checked) => {
                if (!checked) {
                  update({ countries: active.countries.filter((item) => item !== country.id) });
                  return;
                }

                update({ countries: toggleList(active.countries, country.id) });
              }}
            />
          );
        })}
      </FilterGroup>

      <FilterGroup title='Collection'>
        {MENU_GROUP_FILTERS.map((entry) => {
          const id = `filter-group-${entry.value}`;

          return (
            <FilterCheckbox
              checked={active.groups.includes(entry.value)}
              id={id}
              key={entry.value}
              label={entry.label}
              onCheckedChange={(checked) => {
                if (!checked) {
                  update({ groups: active.groups.filter((item) => item !== entry.value) });
                  return;
                }

                update({ groups: toggleList(active.groups, entry.value) });
              }}
            />
          );
        })}
      </FilterGroup>
    </div>
  );
}
