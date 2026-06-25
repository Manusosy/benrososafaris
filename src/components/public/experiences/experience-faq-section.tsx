'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import type { PublicExperienceFaq } from '@/features/experiences/public/types';

import { ExperienceScrollReveal } from './experience-scroll-reveal';

type ExperienceFaqSectionProps = {
  faqs: PublicExperienceFaq[];
};

export function ExperienceFaqSection({ faqs }: ExperienceFaqSectionProps) {
  if (!faqs.length) return null;

  return (
    <ExperienceScrollReveal className='benroso-section border-t border-[var(--benroso-line)] bg-white'>
      <div className='benroso-container max-w-3xl'>
        <p className='benroso-eyebrow'>Questions</p>
        <h2 className='benroso-heading mt-3 font-display text-[clamp(2rem,4vw,2.75rem)] leading-tight'>
          Frequently Asked Questions
        </h2>
        <span aria-hidden className='benroso-gold-line benroso-gold-line--left' />

        <Accordion className='mt-8' collapsible type='single'>
          {faqs.map((faq, index) => (
            <AccordionItem
              className='border-[var(--benroso-line)]'
              key={`${faq.question}-${index}`}
              value={`faq-${index}`}
            >
              <AccordionTrigger className='font-display text-base font-semibold text-[var(--benroso-heading)] hover:no-underline'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='text-[15px] leading-7 text-[var(--benroso-muted)]'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ExperienceScrollReveal>
  );
}
