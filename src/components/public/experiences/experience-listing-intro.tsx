'use client';

import { ContourBackground } from '@/components/public/contour-background';
import { ExperienceScrollReveal } from '@/components/public/experiences/experience-scroll-reveal';
import {
  EXPERIENCE_LISTING_INTRO_TITLE,
  type IntroParagraph
} from '@/features/experiences/public/listing-copy';
import { cn } from '@/lib/utils';

type ExperienceListingIntroProps = {
  intro: {
    lead: IntroParagraph;
    secondary: IntroParagraph;
    tertiary: IntroParagraph;
  };
};

function IntroParagraphText({ segments }: { segments: IntroParagraph }) {
  return (
    <p>
      {segments.map((segment, index) => {
        if (segment.emphasis === 'green') {
          return (
            <span
              className='font-semibold text-[var(--benroso-primary)]'
              key={`${segment.text}-${index}`}
            >
              {segment.text}
            </span>
          );
        }

        if (segment.emphasis === 'strong') {
          return (
            <strong
              className='font-semibold text-[var(--benroso-ink)]'
              key={`${segment.text}-${index}`}
            >
              {segment.text}
            </strong>
          );
        }

        return <span key={`${segment.text}-${index}`}>{segment.text}</span>;
      })}
    </p>
  );
}

export function ExperienceListingIntro({ intro }: ExperienceListingIntroProps) {
  return (
    <ExperienceScrollReveal>
      <section className='relative overflow-hidden bg-[var(--benroso-warm-gray)]'>
        <ContourBackground opacity={0.1} />
        <div className='benroso-container relative py-16 md:py-20 lg:py-24'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='benroso-heading font-display text-3xl leading-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]'>
              {EXPERIENCE_LISTING_INTRO_TITLE}
            </h2>
            <span aria-hidden className='benroso-gold-line mt-6 [width:90px]' />
            <div
              className={cn(
                'benroso-body mx-auto mt-8 max-w-[52rem] space-y-5 text-lg leading-relaxed md:text-xl md:leading-[1.75]'
              )}
            >
              <IntroParagraphText segments={intro.lead} />
              <IntroParagraphText segments={intro.secondary} />
              <IntroParagraphText segments={intro.tertiary} />
            </div>
          </div>
        </div>
      </section>
    </ExperienceScrollReveal>
  );
}
