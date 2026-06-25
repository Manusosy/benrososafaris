import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import type { PortalContentRow } from '@/features/portal/api/types';

function statusVariant(status: string): 'default' | 'secondary' | 'outline' {
  if (status === 'published') return 'default';
  if (status === 'draft') return 'secondary';
  return 'outline';
}

interface PortalContentTableProps {
  rows: PortalContentRow[];
  emptyMessage?: string;
  /** When set, each row title links to `${editBasePath}/${row.id}` for editing. */
  editBasePath?: string;
}

export function PortalContentTable({
  rows,
  emptyMessage = 'No entries yet. Content editors can add the first record from this module.',
  editBasePath
}: PortalContentTableProps) {
  if (!rows.length) {
    return (
      <div className='text-muted-foreground rounded-lg border border-dashed px-6 py-12 text-center text-sm'>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className='rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Locale</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className='font-medium'>
                {editBasePath ? (
                  <Link className='hover:underline' href={`${editBasePath}/${row.id}`}>
                    {row.title}
                  </Link>
                ) : (
                  row.title
                )}
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
              </TableCell>
              <TableCell>{row.locale}</TableCell>
              <TableCell className='text-muted-foreground text-sm'>
                {new Date(row.updatedAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
