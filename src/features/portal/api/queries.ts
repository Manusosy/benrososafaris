import { queryOptions } from '@tanstack/react-query';

import { getPortalContentList, getPortalOverviewStats } from './service';

export const portalKeys = {
  all: ['portal'] as const,
  overview: () => [...portalKeys.all, 'overview'] as const,
  content: (moduleKey: string) => [...portalKeys.all, 'content', moduleKey] as const
};

export const portalOverviewQueryOptions = () =>
  queryOptions({
    queryKey: portalKeys.overview(),
    queryFn: () => getPortalOverviewStats()
  });

export const portalContentQueryOptions = (moduleKey: string) =>
  queryOptions({
    queryKey: portalKeys.content(moduleKey),
    queryFn: () => getPortalContentList(moduleKey)
  });
