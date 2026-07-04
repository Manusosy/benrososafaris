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
  description?: string;
  embedded?: boolean;
  eyebrow?: string;
  faqs: DirectAnswer[];
  headingClassName?: string;
  headingId?: string;
  title?: string;
};

export function FaqSection({
  className,
  description,
  embedded = false,
  eyebrow,
  faqs,
  headingClassName,
  headingId = 'destination-faq-heading',
  title = 'Travelers are asking'
}: FaqSectionProps) {
  if (!faqs.length) return null;

  const resolvedEyebrow = eyebrow ?? (embedded ? undefined : 'FAQ');
  const resolvedDescription =
    description ??
    (embedded
      ? undefined
      : 'Everything you need to know before you travel with us. Still unsure about something? Our safari planners are always happy to help.');

  const accordion = (
    <Accordion className='border-t border-[var(--benroso-line)]' collapsible type='single'>
      {faqs.map((faq, index) => (
        <AccordionItem
          className='border-[var(--benroso-line)]'
          key={`${index}-${faq.question}`}
          value={`faq-${index}`}
        >
          <AccordionTrigger
            className={cn(
              'items-center gap-4 py-5 text-left leading-snug hover:no-underline hover:text-[var(--benroso-primary)] data-[state=open]:text-[var(--benroso-primary)] [&>svg]:size-5 [&>svg]:text-[var(--benroso-lime)]',
              embedded
                ? 'text-[15px] font-medium text-[var(--benroso-ink)] md:text-base'
                : 'font-display py-6 text-lg text-[var(--benroso-heading)] md:text-xl'
            )}
          >
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className='max-w-2xl pb-5 text-[15px] leading-7 text-[var(--benroso-muted)]'>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return (
    <section
      aria-labelledby={headingId}
      className={cn(embedded ? 'scroll-mt-36' : 'benroso-section bg-white', className)}
    >
      <div className={cn(embedded ? '' : 'benroso-container')}>
        {embedded ? (
          <div>
            <h2
              className={cn(
                'benroso-heading font-display text-2xl leading-tight tracking-tight',
                headingClassName
              )}
              id={headingId}
            >
              {title}
            </h2>
            <span aria-hidden className='benroso-gold-line benroso-gold-line--left mt-3' />
            {resolvedDescription ? (
              <p className='benroso-body mt-4 max-w-2xl text-[15px] leading-7'>
                {resolvedDescription}
              </p>
            ) : null}
            <div className='mt-6'>{accordion}</div>
          </div>
        ) : (
          <div className='grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-16'>
            <div className='lg:sticky lg:top-28'>
              <SectionHeader
                align='left'
                description={resolvedDescription}
                eyebrow={resolvedEyebrow}
                title={title}
                titleId={headingId}
              />
            </div>
            {accordion}
          </div>
        )}
      </div>
    </section>
  );
}
