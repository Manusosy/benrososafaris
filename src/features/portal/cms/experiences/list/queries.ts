import { queryOptions } from '@tanstack/react-query';

import { listExperiences } from './service';
import type { ExperienceListParams } from './types';

export const experiencesListKeys = {
  all: ['portal', 'experiences', 'list'] as const,
  list: (params: ExperienceListParams) => [...experiencesListKeys.all, params] as const
};

export function experiencesListQueryOptions(params: ExperienceListParams) {
  return queryOptions({
    queryKey: experiencesListKeys.list(params),
    queryFn: () => listExperiences(params)
  });
}
