'use client';

import { ListingShell } from '@/components/public/page-shell';
import { ExperienceScrollReveal } from '@/components/public/experiences/experience-scroll-reveal';

type ExperiencesListingSectionProps = {
  children: React.ReactNode;
  filters?: React.ReactNode;
  id?: string;
};

export function ExperiencesListingSection({
  children,
  filters,
  id
}: ExperiencesListingSectionProps) {
  return (
    <ExperienceScrollReveal id={id}>
      <ListingShell className='bg-white' filters={filters}>
        {children}
      </ListingShell>
    </ExperienceScrollReveal>
  );
}
