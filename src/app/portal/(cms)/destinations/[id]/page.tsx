import { notFound } from 'next/navigation';

import PageContainer from '@/components/layout/page-container';
import { requirePortalSession } from '@/lib/auth/portal';
import { DestinationWizard } from '@/features/portal/cms/destinations/destination-wizard';
import { getDestination, getDestinationFacets } from '@/features/portal/cms/destinations/service';

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  await requirePortalSession();
  const { id } = await params;
  const [destination, facets] = await Promise.all([getDestination(id), getDestinationFacets()]);

  if (!destination) {
    notFound();
  }

  return (
    <PageContainer
      pageTitle={`Edit: ${destination.name || 'Destination'}`}
      pageDescription='Update this destination, then save as a draft or publish.'
    >
      <DestinationWizard
        id={destination.id}
        initialValues={destination}
        countryOptions={facets.countries}
        regionOptions={facets.regions}
      />
    </PageContainer>
  );
}
