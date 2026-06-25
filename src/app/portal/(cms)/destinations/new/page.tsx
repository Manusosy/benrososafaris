import PageContainer from '@/components/layout/page-container';
import { requirePortalSession } from '@/lib/auth/portal';
import { DestinationWizard } from '@/features/portal/cms/destinations/destination-wizard';
import { getDestinationFacets } from '@/features/portal/cms/destinations/service';
import { PrerequisiteGate } from '@/features/portal/cms/shared/prerequisite-gate';
import { getEntityLabel, getPrerequisiteStatus } from '@/features/portal/cms/shared/prerequisites';

export default async function NewDestinationPage() {
  await requirePortalSession();
  const status = await getPrerequisiteStatus('destinations');
  const facets = await getDestinationFacets();

  return (
    <PageContainer
      pageTitle='New destination'
      pageDescription='Create a destination hub page in a few guided steps.'
    >
      {status.ok ? (
        <DestinationWizard countryOptions={facets.countries} regionOptions={facets.regions} />
      ) : (
        <PrerequisiteGate
          entityLabel={await getEntityLabel('destinations')}
          missing={status.missing}
        />
      )}
    </PageContainer>
  );
}
