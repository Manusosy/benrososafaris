import Link from 'next/link';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { trashedEnquiriesListQueryOptions } from '@/features/enquiries/api/queries';
import { TrashedEnquiriesList } from '@/features/enquiries/components/trashed-enquiries-list';
import { requirePortalSession } from '@/lib/auth/portal';
import { getQueryClient } from '@/lib/query-client';

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

export default async function PortalEnquiriesTrashPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requirePortalSession();
  const sp = await searchParams;

  const params = {
    page: Math.max(1, Number(first(sp.paged)) || 1),
    search: first(sp.s)
  };

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trashedEnquiriesListQueryOptions(params));

  return (
    <PageContainer
      pageDescription='Review and restore enquiries removed from the active list.'
      pageHeaderAction={
        <Button asChild size='sm' variant='outline'>
          <Link href='/portal/enquiries'>
            <Icons.chevronLeft className='size-4' />
            Active enquiries
          </Link>
        </Button>
      }
      pageTitle='Trashed enquiries'
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TrashedEnquiriesList />
      </HydrationBoundary>
    </PageContainer>
  );
}
