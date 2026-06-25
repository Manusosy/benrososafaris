'use client';

import * as React from 'react';

import Link from 'next/link';

import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { enquiryKeys, trashedEnquiriesListQueryOptions } from '@/features/enquiries/api/queries';
import { restoreEnquiry } from '@/features/enquiries/api/service';
import type { Enquiry } from '@/features/enquiries/api/types';
import { EnquiriesViewTabs } from '@/features/enquiries/components/enquiries-view-tabs';
import { EnquiryTypeBadge } from '@/features/enquiries/components/enquiry-type-badge';
import { CMS_SURFACE } from '@/features/portal/cms/shared/surface';
import { cn } from '@/lib/utils';

const listParsers = {
  s: parseAsString.withDefault(''),
  paged: parseAsInteger.withDefault(1)
};

function formatDeletedAt(value: string | null) {
  if (!value) return '—';

  return new Date(value).toLocaleString(undefined, {
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

type TrashedEnquiryRowProps = {
  enquiry: Enquiry;
  isRestoring: boolean;
  onRestore: (id: string) => void;
};

function TrashedEnquiryRow({ enquiry, isRestoring, onRestore }: TrashedEnquiryRowProps) {
  return (
    <TableRow>
      <TableCell className='font-mono text-xs tracking-wide'>{enquiry.referenceCode}</TableCell>
      <TableCell>
        <div className='font-medium text-[#111827]'>{enquiry.name}</div>
        <div className='text-muted-foreground text-xs'>{enquiry.email}</div>
      </TableCell>
      <TableCell>
        <EnquiryTypeBadge type={enquiry.enquiryType} />
      </TableCell>
      <TableCell className='text-muted-foreground text-sm whitespace-nowrap'>
        {formatDeletedAt(enquiry.deletedAt)}
      </TableCell>
      <TableCell>
        <div className='flex flex-wrap items-center gap-2'>
          <Button
            disabled={isRestoring}
            onClick={() => onRestore(enquiry.id)}
            size='sm'
            type='button'
            variant='outline'
          >
            <Icons.undo className='size-4' />
            Restore
          </Button>
          <Button asChild size='sm' type='button' variant='ghost'>
            <Link href={`/portal/enquiries/${enquiry.id}`}>View</Link>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function TrashedEnquiriesList() {
  const queryClient = useQueryClient();
  const [params, setParams] = useQueryStates(listParsers, { shallow: true });
  const { s: search, paged: page } = params;
  const [searchInput, setSearchInput] = React.useState(search);
  const [restoringId, setRestoringId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const { data, isFetching, refetch } = useQuery({
    ...trashedEnquiriesListQueryOptions({ page, search }),
    placeholderData: keepPreviousData
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const trashCount = data?.trashCount ?? total;
  const pageSize = data?.pageSize ?? 20;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: enquiryKeys.all });
  };

  const restoreMutation = useMutation({
    mutationFn: (id: string) => restoreEnquiry(id),
    onMutate: (id) => {
      setRestoringId(id);
    },
    onSuccess: () => {
      toast.success('Enquiry restored.');
      invalidate();
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : 'Restore failed.'),
    onSettled: () => {
      setRestoringId(null);
    }
  });

  return (
    <div className='space-y-4'>
      <EnquiriesViewTabs trashCount={trashCount} variant='trash' />

      <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
        <p className='text-muted-foreground text-sm'>
          Enquiries moved to trash are hidden from the active list until restored.
        </p>

        <div className='flex flex-wrap items-center gap-2'>
          <form
            className='flex gap-2'
            onSubmit={(event) => {
              event.preventDefault();
              setParams({ s: searchInput.trim(), paged: 1 });
            }}
          >
            <Input
              className='w-[220px] bg-white'
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder='Search name, email, reference...'
              value={searchInput}
            />
            <Button size='sm' type='submit' variant='secondary'>
              <Icons.search className='size-4' />
            </Button>
          </form>

          <Button
            disabled={isFetching}
            onClick={() => refetch()}
            size='sm'
            type='button'
            variant='ghost'
          >
            <Icons.spinner className={cn('size-4', isFetching && 'animate-spin')} />
          </Button>
        </div>
      </div>

      <div className='flex items-center justify-between text-sm'>
        <p className='text-muted-foreground'>
          {total} trashed {total === 1 ? 'enquiry' : 'enquiries'}
          {isFetching ? ' · refreshing…' : null}
        </p>
      </div>

      <div
        className={cn('overflow-hidden rounded-md border border-[#E5E7EB] bg-white', CMS_SURFACE)}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Deleted</TableHead>
              <TableHead className='w-[180px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!items.length ? (
              <TableRow>
                <TableCell className='text-muted-foreground py-12 text-center' colSpan={5}>
                  {isFetching ? 'Loading trashed enquiries…' : 'No trashed enquiries.'}
                </TableCell>
              </TableRow>
            ) : (
              items.map((enquiry) => (
                <TrashedEnquiryRow
                  enquiry={enquiry}
                  isRestoring={restoreMutation.isPending && restoringId === enquiry.id}
                  key={enquiry.id}
                  onRestore={(id) => restoreMutation.mutate(id)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 ? (
        <div className='flex items-center justify-between text-sm'>
          <span className='text-muted-foreground'>
            Page {page} of {totalPages}
          </span>
          <div className='flex gap-2'>
            <Button
              disabled={page <= 1 || isFetching}
              onClick={() => setParams({ paged: page - 1 })}
              size='sm'
              type='button'
              variant='outline'
            >
              <Icons.chevronLeft className='size-4' />
              Previous
            </Button>
            <Button
              disabled={page >= totalPages || isFetching}
              onClick={() => setParams({ paged: page + 1 })}
              size='sm'
              type='button'
              variant='outline'
            >
              Next
              <Icons.chevronRight className='size-4' />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
