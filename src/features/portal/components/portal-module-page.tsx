import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PortalContentTable } from '@/features/portal/components/portal-content-table';
import type { PortalContentList } from '@/features/portal/api/types';
import { Icons } from '@/components/icons';

interface PortalModulePageProps {
  publicPath: string;
  data: PortalContentList;
  /** When set, the "Add new" button links here (otherwise it is disabled). */
  newHref?: string;
  /** When set, table rows link to `${editBasePath}/${id}` for editing. */
  editBasePath?: string;
}

export function PortalModulePage({
  publicPath,
  data,
  newHref,
  editBasePath
}: PortalModulePageProps) {
  return (
    <div className='space-y-4'>
      <div className='flex justify-end gap-2'>
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

      <PortalContentTable rows={data.rows} editBasePath={editBasePath} />
    </div>
  );
}
