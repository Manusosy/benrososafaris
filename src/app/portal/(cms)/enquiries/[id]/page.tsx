import Link from 'next/link';
import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { enquiryDetailQueryOptions } from '@/features/enquiries/api/queries';
import { EnquiryDetailView } from '@/features/enquiries/components/enquiry-detail-view';
import { requirePortalSession } from '@/lib/auth/portal';
import { getQueryClient } from '@/lib/query-client';

function EnquiryDetailSkeleton() {
  return (
    <div className='space-y-5'>
      <Skeleton className='h-16 w-full rounded-md' />
      <Skeleton className='h-[720px] w-full rounded-md' />
    </div>
  );
}

export default async function PortalEnquiryDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePortalSession();
  const { id } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(enquiryDetailQueryOptions(id));

  return (
    <div className='enquiry-detail-page'>
      <PageContainer
        pageDescription='Review, update status, or print this enquiry for your records.'
        pageHeaderAction={
          <Button asChild className='enquiry-detail-no-print' size='sm' variant='outline'>
            <Link href='/portal/enquiries'>
              <Icons.chevronLeft className='size-4' />
              All enquiries
            </Link>
          </Button>
        }
        pageTitle='Enquiry details'
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<EnquiryDetailSkeleton />}>
            <EnquiryDetailView id={id} />
          </Suspense>
        </HydrationBoundary>
      </PageContainer>
    </div>
  );
}
