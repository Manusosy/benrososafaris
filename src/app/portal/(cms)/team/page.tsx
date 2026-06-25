import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { getPortalTeam } from '@/features/portal/api/service';
import { requireSuperAdmin } from '@/lib/auth/portal';
import { roleLabel, type PortalRole } from '@/lib/auth/roles';

export default async function PortalTeamPage() {
  await requireSuperAdmin();
  const team = await getPortalTeam();

  return (
    <PageContainer pageTitle='Team & Roles'>
      {!team.length ? (
        <div className='text-muted-foreground rounded-lg border border-dashed px-6 py-12 text-center text-sm'>
          No team members yet.
        </div>
      ) : (
        <div className='rounded-lg border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className='font-medium'>
                    {member.full_name ?? 'Unnamed user'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        member.role === 'admin' || member.role === 'owner' ? 'default' : 'secondary'
                      }
                    >
                      {roleLabel(member.role as PortalRole)}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.status}</TableCell>
                  <TableCell className='text-muted-foreground text-sm'>
                    {new Date(member.created_at).toLocaleDateString()}
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
