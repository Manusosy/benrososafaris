import Link from 'next/link';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { DestinationsList } from '@/features/portal/cms/destinations/list/destinations-list';
import { destinationsListQueryOptions } from '@/features/portal/cms/destinations/list/queries';
import type { DestinationListStatus } from '@/features/portal/cms/destinations/list/types';
import { requirePortalSession } from '@/lib/auth/portal';
import { getQueryClient } from '@/lib/query-client';

const STATUSES: DestinationListStatus[] = ['all', 'published', 'draft', 'trash'];

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

export default async function PortalDestinationsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requirePortalSession();
  const sp = await searchParams;

  const statusParam = first(sp.status) as DestinationListStatus;
  const params = {
    status: STATUSES.includes(statusParam) ? statusParam : 'all',
    search: first(sp.s),
    country: first(sp.country),
    month: first(sp.m),
    page: Math.max(1, Number(first(sp.paged)) || 1)
  };

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(destinationsListQueryOptions(params));

  return (
    <PageContainer
      pageTitle='Destinations'
      pageDescription='Manage destination hub pages — filter, quick edit, and trash.'
      pageHeaderAction={
        <Button asChild size='sm'>
          <Link href='/portal/destinations/new'>
            <Icons.add className='mr-2 size-4' />
            Add new
          </Link>
        </Button>
      }
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DestinationsList />
      </HydrationBoundary>
    </PageContainer>
  );
}
