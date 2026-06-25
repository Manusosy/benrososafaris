import { notFound } from 'next/navigation';

import PageContainer from '@/components/layout/page-container';
import { requirePortalSession } from '@/lib/auth/portal';
import { ExperienceWizard } from '@/features/portal/cms/experiences/experience-wizard';
import { getExperience, getExperienceFacets } from '@/features/portal/cms/experiences/service';

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  await requirePortalSession();
  const { id } = await params;
  const [experience, facets] = await Promise.all([getExperience(id), getExperienceFacets()]);

  if (!experience) {
    notFound();
  }

  return (
    <PageContainer
      pageTitle={`Edit: ${experience.title || 'Experience'}`}
      pageDescription='Update this experience, then save as a draft or publish.'
    >
      <ExperienceWizard
        id={experience.id}
        initialValues={experience}
        categoryOptions={facets.categories}
      />
    </PageContainer>
  );
}
