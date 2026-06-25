import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/components/icons';
import { TourCard } from '@/components/public/cards/content-cards';
import { ExperienceDetailHero } from '@/components/public/experiences/experience-detail-hero';
import { ExperienceFaqSection } from '@/components/public/experiences/experience-faq-section';
import { ExperienceScrollReveal } from '@/components/public/experiences/experience-scroll-reveal';
import { SectionHeader } from '@/components/public/ui/section-header';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { localePath } from '@/lib/public/locale-path';
import type {
  PublicExperienceDetail,
  PublicExperienceRelatedAccommodation,
  PublicExperienceRelatedTour
} from '@/features/experiences/public/types';

type ExperienceDetailShellProps = {
  accommodations: PublicExperienceRelatedAccommodation[];
  experience: PublicExperienceDetail;
  locale: string;
  tours: PublicExperienceRelatedTour[];
};

function formatExperienceTourHeading(category: string | null, title: string) {
  if (category) return `Our Best ${category} Safari Packages`;
  const trimmed = title.replace(/\s+Safari(s)?$/i, '').trim();
  return trimmed ? `Our Best ${trimmed} Safari Packages` : 'Safari Packages For This Experience';
}

export function ExperienceDetailShell({
  accommodations,
  experience,
  locale,
  tours
}: ExperienceDetailShellProps) {
  const galleryImages = experience.gallery.filter((image) => image.url);

  return (
    <>
      <ExperienceDetailHero
        category={experience.category}
        imageAlt={experience.imageAlt}
        imageUrl={experience.imageUrl}
        locale={locale}
        summary={experience.summary}
        title={experience.title}
      />

      {experience.summary ? (
        <ExperienceScrollReveal className='benroso-section bg-[var(--benroso-ivory)]'>
          <div className='benroso-container max-w-3xl'>
            <p className='benroso-eyebrow'>Overview</p>
            <p className='mt-4 text-lg leading-8 text-[var(--benroso-ink)]'>{experience.summary}</p>
          </div>
        </ExperienceScrollReveal>
      ) : null}

      {galleryImages.length ? (
        <ExperienceScrollReveal className='benroso-section bg-white' stagger>
          <div className='benroso-container'>
            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {galleryImages.map((image, index) => (
                <div
                  className='relative aspect-[4/3] overflow-hidden rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-[var(--benroso-ivory)]'
                  data-reveal-item
                  key={image.id}
                >
                  <Image
                    alt={image.alt || `${experience.title} gallery ${index + 1}`}
                    className='object-cover'
                    fill
                    sizes='(max-width:768px) 100vw, 33vw'
                    src={image.url!}
                  />
                </div>
              ))}
            </div>
          </div>
        </ExperienceScrollReveal>
      ) : null}

      {experience.contentHtml ? (
        <ExperienceScrollReveal className='benroso-section bg-[var(--benroso-ivory)]'>
          <div className='benroso-container max-w-3xl'>
            <article
              className='benroso-legal-prose'
              dangerouslySetInnerHTML={{ __html: experience.contentHtml }}
            />
          </div>
        </ExperienceScrollReveal>
      ) : null}

      {experience.highlights.length ? (
        <ExperienceScrollReveal className='benroso-section bg-white'>
          <div className='benroso-container max-w-3xl'>
            <SectionHeader
              align='left'
              eyebrow='Highlights'
              title='What Makes This Experience Special'
            />
            <ul className='mt-8 space-y-4'>
              {experience.highlights.map((item) => (
                <li
                  className='flex items-start gap-3 border-b border-[var(--benroso-line)] pb-4 last:border-b-0'
                  key={item}
                >
                  <Icons.circleCheck
                    aria-hidden
                    className='mt-0.5 h-5 w-5 shrink-0 text-[var(--benroso-primary)]'
                  />
                  <span className='text-[15px] leading-7 text-[var(--benroso-ink)]'>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ExperienceScrollReveal>
      ) : null}

      {tours.length ? (
        <ExperienceScrollReveal className='benroso-section bg-[var(--benroso-ivory)]' stagger>
          <div className='benroso-container'>
            <SectionHeader
              description='Handpicked itineraries that match this travel style, with clear durations, park routes, and starting prices.'
              eyebrow='Safari Tours'
              title={formatExperienceTourHeading(experience.category, experience.title)}
            />
            <div className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
              {tours.map((tour) => (
                <div data-reveal-item key={tour.id}>
                  <TourCard
                    item={{
                      days: tour.days,
                      excerpt: tour.excerpt,
                      href: tour.href,
                      imageAlt: tour.imageAlt,
                      imageUrl: tour.imageUrl,
                      nights: tour.nights,
                      priceFrom: tour.priceFrom,
                      regionLabel: tour.parksLabel ?? undefined,
                      title: tour.title
                    }}
                    linkAccent='gold'
                  />
                </div>
              ))}
            </div>
          </div>
        </ExperienceScrollReveal>
      ) : null}

      {accommodations.length ? (
        <ExperienceScrollReveal className='benroso-section bg-white' stagger>
          <div className='benroso-container'>
            <SectionHeader
              align='left'
              description='Lodges and camps featured on linked safari routes. Each stay is chosen for location, comfort, and access to the wildlife areas that define this experience.'
              eyebrow='Where To Stay'
              title='Recommended Safari Lodges'
            />
            <div className='mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {accommodations.map((accommodation) => (
                <article
                  className='flex h-full flex-col overflow-hidden rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white'
                  data-reveal-item
                  key={accommodation.id}
                >
                  <Link
                    className='group relative block aspect-[4/3] overflow-hidden bg-[var(--benroso-primary)]'
                    href={accommodation.href}
                  >
                    {accommodation.imageUrl ? (
                      <Image
                        alt={accommodation.imageAlt || accommodation.name}
                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                        fill
                        sizes='(max-width:768px) 100vw, 33vw'
                        src={accommodation.imageUrl}
                      />
                    ) : (
                      <div className='absolute inset-0 bg-[var(--benroso-primary-light)]' />
                    )}
                  </Link>
                  <div className='flex flex-1 flex-col p-5'>
                    {accommodation.locationLabel ? (
                      <p className='text-xs font-bold uppercase tracking-wide text-[var(--benroso-gold)]'>
                        {accommodation.locationLabel}
                      </p>
                    ) : null}
                    <h3 className='benroso-heading mt-2 font-display text-xl leading-tight'>
                      <Link
                        className='transition-colors hover:text-[var(--benroso-primary)]'
                        href={accommodation.href}
                      >
                        {accommodation.name}
                      </Link>
                    </h3>
                    {accommodation.summary ? (
                      <p className='benroso-body mt-3 line-clamp-3 flex-1 text-[15px] leading-7'>
                        {accommodation.summary}
                      </p>
                    ) : null}
                    <div className='mt-5 border-t border-[var(--benroso-line)] pt-4'>
                      <Link
                        className='inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[var(--benroso-primary)] transition-colors hover:text-[var(--benroso-gold)]'
                        href={accommodation.href}
                      >
                        View Lodge
                        <Icons.arrowRight className='h-3.5 w-3.5' />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </ExperienceScrollReveal>
      ) : null}

      <ExperienceFaqSection faqs={experience.faqs} />

      <ExperienceScrollReveal className='benroso-section border-t border-[var(--benroso-line)] bg-[var(--benroso-primary-dark)] text-white'>
        <div className='benroso-container flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='max-w-2xl'>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-[var(--benroso-gold)]'>
              Plan With Benroso Safaris
            </p>
            <h2 className='mt-3 font-display text-3xl leading-tight'>
              Ready to shape this experience around your dates and travel style?
            </h2>
          </div>
          <div className='flex flex-wrap gap-4'>
            <BenrosoButton href={localePath(locale, '/contact')}>
              Let&apos;s Start Planning
            </BenrosoButton>
            <BenrosoButton href={localePath(locale, '/experiences')} variant='gold-outline'>
              All Experiences
            </BenrosoButton>
          </div>
        </div>
      </ExperienceScrollReveal>
    </>
  );
}
