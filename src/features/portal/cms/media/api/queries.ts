import { queryOptions } from '@tanstack/react-query';

import { listMedia } from './client';
import type { MediaListParams } from './types';

/** Query key factory for the media library cache. */
export const mediaKeys = {
  all: ['media'] as const,
  list: (params: MediaListParams) => [...mediaKeys.all, 'list', params] as const
};

export function mediaListQueryOptions(params: MediaListParams) {
  return queryOptions({
    queryKey: mediaKeys.list(params),
    queryFn: () => listMedia(params)
  });
}
