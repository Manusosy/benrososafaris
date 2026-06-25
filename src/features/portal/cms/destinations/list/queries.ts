import { queryOptions } from '@tanstack/react-query';

import { listDestinations } from './service';
import type { DestinationListParams } from './types';

export const destinationsListKeys = {
  all: ['portal', 'destinations', 'list'] as const,
  list: (params: DestinationListParams) => [...destinationsListKeys.all, params] as const
};

export function destinationsListQueryOptions(params: DestinationListParams) {
  return queryOptions({
    queryKey: destinationsListKeys.list(params),
    queryFn: () => listDestinations(params)
  });
}
