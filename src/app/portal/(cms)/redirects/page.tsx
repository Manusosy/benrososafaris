import PageContainer from '@/components/layout/page-container';
import { createClient } from '@/lib/supabase/server';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export default async function PortalRedirectsPage() {
  const supabase = await createClient();
  const { data: redirects } = await supabase
    .from('redirects')
    .select('source_path, destination_path, status_code, created_at')
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <PageContainer pageTitle='Redirects'>
      {!redirects?.length ? (
        <div className='text-muted-foreground rounded-lg border border-dashed px-6 py-12 text-center text-sm'>
          No redirects configured yet.
        </div>
      ) : (
        <div className='rounded-lg border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {redirects.map((row) => (
                <TableRow key={row.source_path}>
                  <TableCell className='font-mono text-xs'>{row.source_path}</TableCell>
                  <TableCell className='font-mono text-xs'>{row.destination_path}</TableCell>
                  <TableCell>{row.status_code}</TableCell>
                  <TableCell className='text-muted-foreground text-sm'>
                    {new Date(row.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </PageContainer>
  );
}
