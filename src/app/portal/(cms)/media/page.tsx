import PageContainer from '@/components/layout/page-container';
import { MediaLibrary } from '@/features/portal/cms/media/components/media-library';

export default function PortalMediaPage() {
  return (
    <PageContainer
      pageTitle='Media Library'
      pageDescription='Upload, organise, and edit images used across the site.'
    >
      <MediaLibrary />
    </PageContainer>
  );
}
