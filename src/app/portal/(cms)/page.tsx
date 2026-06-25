import PageContainer from '@/components/layout/page-container';
import { PortalOverview } from '@/features/portal/components/portal-overview';
import { getPortalOverviewStats } from '@/features/portal/api/service';
import { requirePortalSession } from '@/lib/auth/portal';

export default async function PortalDashboardPage() {
  const session = await requirePortalSession();
  const stats = await getPortalOverviewStats();

  return (
    <PageContainer>
      <PortalOverview stats={stats} userName={session.fullName ?? session.email.split('@')[0]} />
    </PageContainer>
  );
}
