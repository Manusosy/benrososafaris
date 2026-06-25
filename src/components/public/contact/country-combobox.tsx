'use client';

import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { WORLD_COUNTRIES } from '@/constants/world-countries';
import { cn } from '@/lib/utils';

type CountryComboboxProps = {
  className?: string;
  id?: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
  value: string;
};

export function CountryCombobox({ className, id, onBlur, onChange, value }: CountryComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const filteredCountries = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return WORLD_COUNTRIES;
    return WORLD_COUNTRIES.filter((country) => country.toLowerCase().includes(query));
  }, [search]);

  React.useEffect(() => {
    if (!open) {
      setSearch('');
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-controls='country-listbox'
          aria-expanded={open}
          className={cn(
            'benroso-contact-field benroso-country-combobox-trigger mt-1.5 h-auto min-h-11 w-full justify-between px-3 py-2.5 font-normal shadow-none focus-visible:ring-0 focus-visible:ring-offset-0',
            value ? 'text-[var(--benroso-ink)]' : 'text-[var(--benroso-muted)]/70',
            className
          )}
          id={id}
          onBlur={onBlur}
          role='combobox'
          type='button'
          variant='ghost'
        >
          {value || 'Start typing your country...'}
          <Icons.chevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className='benroso-country-combobox-popover w-[min(100vw-2rem,360px)] border-[#d9d9d9] bg-white p-0 text-[#1a1a1a] shadow-md'
        collisionPadding={12}
        side='bottom'
        sideOffset={6}
      >
        <Command
          className='benroso-country-combobox-command bg-white text-[#1a1a1a]'
          shouldFilter={false}
        >
          <div className='benroso-country-combobox-search'>
            <Icons.search aria-hidden className='benroso-country-combobox-search-icon' />
            <input
              aria-label='Search countries'
              className='benroso-country-combobox-search-input'
              onChange={(event) => setSearch(event.target.value)}
              placeholder='Search countries...'
              ref={searchInputRef}
              type='search'
              value={search}
            />
          </div>

          <CommandList className='benroso-country-combobox-list' id='country-listbox'>
            <CommandEmpty className='px-3 py-6 text-sm text-[#5c665f]'>
              No country found.
            </CommandEmpty>
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  className='benroso-country-combobox-item text-[#1a1a1a] data-[selected=true]:bg-[rgb(60_81_66/0.12)] data-[selected=true]:text-[#1a1a1a]'
                  key={country}
                  onSelect={() => {
                    onChange(country);
                    setOpen(false);
                  }}
                  value={country}
                >
                  <Icons.check
                    className={cn('mr-2 h-4 w-4', value === country ? 'opacity-100' : 'opacity-0')}
                  />
                  {country}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
