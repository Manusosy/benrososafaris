import PageContainer from '@/components/layout/page-container';
import { PortalModulePage } from '@/features/portal/components/portal-module-page';
import { getPortalContentList } from '@/features/portal/api/service';

export default async function PortalNationalParksPage() {
  const data = await getPortalContentList('national_parks');

  return (
    <PageContainer pageTitle='National Parks'>
      <PortalModulePage data={data} publicPath='/en/national-parks' />
    </PageContainer>
  );
}
