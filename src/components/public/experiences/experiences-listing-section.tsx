'use client';

import { ListingShell } from '@/components/public/page-shell';
import { ExperienceScrollReveal } from '@/components/public/experiences/experience-scroll-reveal';

type ExperiencesListingSectionProps = {
  children: React.ReactNode;
  filters?: React.ReactNode;
};

export function ExperiencesListingSection({ children, filters }: ExperiencesListingSectionProps) {
  return (
    <ExperienceScrollReveal>
      <ListingShell className='bg-white' filters={filters}>
        {children}
      </ListingShell>
    </ExperienceScrollReveal>
  );
}
