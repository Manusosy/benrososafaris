'use client';

import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PortalContentTable } from '@/features/portal/components/portal-content-table';
import type { PortalContentList } from '@/features/portal/api/types';
import { PORTAL_MODULE_PAGE_SIZE } from '@/features/portal/constants';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

type StatusFilter = 'all' | 'published' | 'draft' | 'trash';

interface StatusTab {
  value: StatusFilter;
  label: string;
}

const STATUS_TABS: StatusTab[] = [
  { value: 'all', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'trash', label: 'Trash' }
];

interface PortalModulePageProps {
  publicPath: string;
  data: PortalContentList;
  /** When set, the "Add new" button links here (otherwise it is disabled). */
  newHref?: string;
  /** When set, table rows link to `${editBasePath}/${id}` for editing. */
  editBasePath?: string;
  /** Heading + body shown in the table's empty state. */
  emptyTitle?: string;
  emptyMessage?: string;
}

function isTrashStatus(status: string): boolean {
  return ['trash', 'archived', 'deleted'].includes(status);
}

function matchesStatus(status: string, filter: StatusFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'trash') return isTrashStatus(status);
  return status === filter;
}

function getCounts(rows: PortalContentList['rows']) {
  return rows.reduce(
    (counts, row) => {
      counts.all += 1;
      if (row.status === 'published') counts.published += 1;
      if (row.status === 'draft') counts.draft += 1;
      if (isTrashStatus(row.status)) counts.trash += 1;
      return counts;
    },
    { all: 0, published: 0, draft: 0, trash: 0 } satisfies Record<StatusFilter, number>
  );
}

function getEmptyCopy({
  hasRows,
  hasQuery,
  filter,
  fallbackTitle,
  fallbackMessage
}: {
  hasRows: boolean;
  hasQuery: boolean;
  filter: StatusFilter;
  fallbackTitle?: string;
  fallbackMessage?: string;
}) {
  if (hasQuery) {
    return {
      title: 'No matching records',
      message: 'Try a different search term or switch the status filter.'
    };
  }

  if (filter === 'published') {
    return {
      title: 'Nothing published yet',
      message: 'Publish a record to make it available on the public website.'
    };
  }

  if (filter === 'draft') {
    return {
      title: 'No drafts waiting',
      message: 'Drafts appear here when content is saved before it is ready to publish.'
    };
  }

  if (filter === 'trash') {
    return {
      title: 'Trash is empty',
      message: 'Archived records will appear here when content is removed from the active workflow.'
    };
  }

  if (!hasRows) {
    return {
      title: fallbackTitle ?? 'No content yet',
      message:
        fallbackMessage ??
        'Create the first record for this module and it will appear in this table.'
    };
  }

  return {
    title: 'Nothing in this view',
    message: 'Change the filters above to see more records.'
  };
}

export function PortalModulePage({
  publicPath,
  data,
  newHref,
  editBasePath,
  emptyTitle,
  emptyMessage
}: PortalModulePageProps) {
  const [query, setQuery] = React.useState('');
  const [searchInput, setSearchInput] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>('all');
  const [page, setPage] = React.useState(1);
  const trimmedQuery = query.trim().toLowerCase();

  const counts = React.useMemo(() => getCounts(data.rows), [data.rows]);
  const filteredRows = React.useMemo(
    () =>
      data.rows.filter((row) => {
        const statusMatch = matchesStatus(row.status, statusFilter);
        const queryMatch =
          !trimmedQuery ||
          row.title.toLowerCase().includes(trimmedQuery) ||
          row.status.toLowerCase().includes(trimmedQuery) ||
          row.locale.toLowerCase().includes(trimmedQuery);

        return statusMatch && queryMatch;
      }),
    [data.rows, statusFilter, trimmedQuery]
  );

  React.useEffect(() => {
    setPage(1);
  }, [statusFilter, trimmedQuery]);

  const totalFiltered = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PORTAL_MODULE_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedRows = filteredRows.slice(
    (safePage - 1) * PORTAL_MODULE_PAGE_SIZE,
    safePage * PORTAL_MODULE_PAGE_SIZE
  );

  const emptyCopy = getEmptyCopy({
    hasRows: data.rows.length > 0,
    hasQuery: trimmedQuery.length > 0,
    filter: statusFilter,
    fallbackTitle: emptyTitle,
    fallbackMessage: emptyMessage
  });

  return (
    <div className='min-w-0 max-w-full space-y-3'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <nav className='flex flex-wrap items-center gap-x-2 gap-y-1 text-sm'>
          {STATUS_TABS.map((tab, index) => {
            const isActive = statusFilter === tab.value;
            const count = counts[tab.value];
            if (tab.value === 'draft' && count === 0 && statusFilter !== 'draft') return null;

            return (
              <span key={tab.value} className='flex items-center'>
                {index > 0 ? <span className='mr-2 text-muted-foreground'>|</span> : null}
                <button
                  type='button'
                  onClick={() => setStatusFilter(tab.value)}
                  className={cn(
                    'hover:text-[#3c5142]',
                    isActive ? 'font-semibold text-[#3c5142]' : 'text-muted-foreground'
                  )}
                >
                  {tab.label} <span className='text-muted-foreground'>({count})</span>
                </button>
              </span>
            );
          })}
        </nav>

        <form
          className='flex items-center gap-2'
          onSubmit={(event) => {
            event.preventDefault();
            setQuery(searchInput.trim());
          }}
        >
          <Input
            aria-label='Search portal records'
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder='Search by title, status, or locale'
            className='h-9 w-56'
          />
          <Button type='submit' size='sm' variant='outline'>
            Search
          </Button>
        </form>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-3'>
        <p className='text-muted-foreground text-sm'>
          Showing <span className='text-foreground font-medium'>{totalFiltered}</span> of{' '}
          <span className='text-foreground font-medium'>{data.total}</span> records
        </p>
        <div className='flex flex-wrap gap-2'>
          {newHref ? (
            <Button asChild size='sm' variant='outline'>
              <Link href={newHref}>
                <Icons.add className='mr-2 size-4' />
                Add new
              </Link>
            </Button>
          ) : (
            <Button disabled size='sm' variant='outline'>
              <Icons.add className='mr-2 size-4' />
              Add new
            </Button>
          )}
          <Button asChild size='sm' variant='secondary'>
            <a href={publicPath} rel='noopener noreferrer' target='_blank'>
              <Icons.externalLink className='mr-2 size-4' />
              View on site
            </a>
          </Button>
        </div>
      </div>

      <PortalContentTable
        rows={pagedRows}
        editBasePath={editBasePath}
        emptyTitle={emptyCopy.title}
        emptyMessage={emptyCopy.message}
      />

      {totalPages > 1 ? (
        <div className='flex items-center justify-end gap-2'>
          <span className='text-muted-foreground text-sm'>
            Page {safePage} of {totalPages}
          </span>
          <Button
            type='button'
            size='sm'
            variant='outline'
            disabled={safePage <= 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
          >
            <Icons.chevronLeft className='size-4' />
            Prev
          </Button>
          <Button
            type='button'
            size='sm'
            variant='outline'
            disabled={safePage >= totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
          >
            Next
            <Icons.chevronRight className='size-4' />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
