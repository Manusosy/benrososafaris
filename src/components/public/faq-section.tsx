'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { SectionHeader } from '@/components/public/ui/section-header';
import type { DirectAnswer } from '@/lib/seo/direct-answers';
import { cn } from '@/lib/utils';

type FaqSectionProps = {
  className?: string;
  eyebrow?: string;
  faqs: DirectAnswer[];
  headingId?: string;
  title?: string;
};

export function FaqSection({
  className,
  eyebrow = 'FAQ',
  faqs,
  headingId = 'destination-faq-heading',
  title = 'Travelers are asking'
}: FaqSectionProps) {
  if (!faqs.length) return null;

  return (
    <section aria-labelledby={headingId} className={cn('benroso-section bg-white', className)}>
      <div className='benroso-container max-w-4xl'>
        <SectionHeader align='left' eyebrow={eyebrow} title={title} titleId={headingId} />
        <div className='mt-10 rounded-[var(--benroso-radius)] border border-[var(--benroso-line)]'>
          <Accordion collapsible type='single'>
            {faqs.map((faq, index) => (
              <AccordionItem
                className='border-[var(--benroso-line)] px-5 last:border-b-0'
                key={`${index}-${faq.question}`}
                value={`faq-${index}`}
              >
                <AccordionTrigger className='py-5 text-base font-semibold text-[var(--benroso-heading)] hover:no-underline [&>svg]:text-[var(--benroso-gold)]'>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className='pb-5 text-[var(--benroso-muted)] leading-7'>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
