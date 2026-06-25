import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import PageContainer from '@/components/layout/page-container';
import { EnquiriesList } from '@/features/enquiries/components/enquiries-list';
import { enquiriesListQueryOptions } from '@/features/enquiries/api/queries';
import type { EnquiryStatus, EnquiryType } from '@/features/enquiries/api/types';
import { requirePortalSession } from '@/lib/auth/portal';
import { getQueryClient } from '@/lib/query-client';

const STATUSES: Array<EnquiryStatus | 'all'> = ['all', 'pending', 'deal', 'no-deal'];

const TYPES: Array<EnquiryType | 'all'> = [
  'all',
  'safari-quote',
  'general',
  'other',
  'accommodation-inquiry',
  'trip-inquiry'
];

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

export default async function PortalEnquiriesPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requirePortalSession();
  const sp = await searchParams;

  const statusParam = first(sp.status) as EnquiryStatus | 'all';
  const typeParam = first(sp.type) as EnquiryType | 'all';

  const params = {
    enquiryType: TYPES.includes(typeParam) ? typeParam : 'all',
    page: Math.max(1, Number(first(sp.paged)) || 1),
    search: first(sp.s),
    status: STATUSES.includes(statusParam) ? statusParam : 'all'
  };

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(enquiriesListQueryOptions(params));

  return (
    <PageContainer
      pageDescription='Review safari quotes, general contact messages, and booking enquiries.'
      pageTitle='Enquiries'
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EnquiriesList />
      </HydrationBoundary>
    </PageContainer>
  );
}
