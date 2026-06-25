import { queryOptions } from '@tanstack/react-query';

import { getContactDestinations } from './service';

export const contactKeys = {
  all: ['contact'] as const,
  destinations: (locale: string) => [...contactKeys.all, 'destinations', locale] as const
};

export const contactDestinationsQueryOptions = (locale: string) =>
  queryOptions({
    queryKey: contactKeys.destinations(locale),
    queryFn: () => getContactDestinations(locale),
    staleTime: 5 * 60 * 1000
  });
