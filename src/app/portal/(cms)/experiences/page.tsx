import Link from 'next/link';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { ExperiencesList } from '@/features/portal/cms/experiences/list/experiences-list';
import { experiencesListQueryOptions } from '@/features/portal/cms/experiences/list/queries';
import type { ExperienceListStatus } from '@/features/portal/cms/experiences/list/types';
import { requirePortalSession } from '@/lib/auth/portal';
import { getQueryClient } from '@/lib/query-client';

const STATUSES: ExperienceListStatus[] = ['all', 'published', 'draft', 'trash'];

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

export default async function PortalExperiencesPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requirePortalSession();
  const sp = await searchParams;

  const statusParam = first(sp.status) as ExperienceListStatus;
  const params = {
    status: STATUSES.includes(statusParam) ? statusParam : 'all',
    search: first(sp.s),
    category: first(sp.category),
    month: first(sp.m),
    page: Math.max(1, Number(first(sp.paged)) || 1)
  };

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(experiencesListQueryOptions(params));

  return (
    <PageContainer
      pageTitle='Experiences'
      pageDescription='Manage experience pages — filter, quick edit, and trash.'
      pageHeaderAction={
        <Button asChild size='sm'>
          <Link href='/portal/experiences/new'>
            <Icons.add className='mr-2 size-4' />
            Add new
          </Link>
        </Button>
      }
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExperiencesList />
      </HydrationBoundary>
    </PageContainer>
  );
}
