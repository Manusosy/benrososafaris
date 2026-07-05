'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/components/icons';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { ScrollReveal } from '@/components/public/ui/scroll-reveal';
import { SectionHeader } from '@/components/public/ui/section-header';
import type { PublicExperience } from '@/features/experiences/public/types';
import {
  HOME_EXPERIENCE_CATEGORIES,
  sortExperienceCategoriesBySearchPopularity,
  sortExperiencesBySearchPopularity
} from '@/lib/public/home-content';
import { localePath } from '@/lib/public/locale-path';

const HOME_EXPERIENCE_GRID_LIMIT = 8;

const FADED_DOT_PATTERN = {
  backgroundImage: 'radial-gradient(rgba(60,81,66,0.07) 1.5px, transparent 1.6px)',
  backgroundSize: '22px 22px'
} as const;

type HomeExperienceGridItem = {
  blurb: string;
  href: string;
  id: string;
  imageAlt: string;
  imageUrl: string | null;
  title: string;
};

function firstSentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return '';

  const periodIndex = trimmed.indexOf('.');
  if (periodIndex === -1) return trimmed;

  return trimmed.slice(0, periodIndex + 1);
}

function mapPublishedExperience(experience: PublicExperience): HomeExperienceGridItem {
  return {
    blurb: firstSentence(experience.summary ?? ''),
    href: experience.href,
    id: experience.id,
    imageAlt: experience.imageAlt ?? experience.title,
    imageUrl: experience.imageUrl,
    title: experience.title
  };
}

function mapFallbackCategory(locale: string): HomeExperienceGridItem[] {
  return sortExperienceCategoriesBySearchPopularity(HOME_EXPERIENCE_CATEGORIES).map((category) => ({
    blurb: firstSentence(category.blurb),
    href: localePath(locale, category.href),
    id: category.id,
    imageAlt: category.imageAlt,
    imageUrl: category.imageUrl,
    title: category.title
  }));
}

type HomeExperiencesGridProps = {
  experiences: PublicExperience[];
  locale: string;
};

export function HomeExperiencesGrid({ experiences, locale }: HomeExperiencesGridProps) {
  const items = (
    experiences.length
      ? sortExperiencesBySearchPopularity(experiences).map(mapPublishedExperience)
      : mapFallbackCategory(locale)
  ).slice(0, HOME_EXPERIENCE_GRID_LIMIT);

  return (
    <section className='benroso-section relative overflow-hidden bg-white'>
      <span
        aria-hidden
        className='pointer-events-none absolute -right-6 top-0 h-56 w-56 opacity-40 md:-right-2 md:top-2 md:h-72 md:w-72'
        style={{
          ...FADED_DOT_PATTERN,
          maskImage: 'radial-gradient(ellipse at top right, black 15%, transparent 72%)'
        }}
      />
      <span
        aria-hidden
        className='pointer-events-none absolute -bottom-6 -left-6 h-56 w-56 opacity-40 md:-bottom-2 md:h-72 md:w-72'
        style={{
          ...FADED_DOT_PATTERN,
          maskImage: 'radial-gradient(ellipse at bottom left, black 15%, transparent 72%)'
        }}
      />
      <div className='benroso-container relative'>
        <SectionHeader
          description='From first-time family safaris to fly-in luxury and gorilla treks, choose the kind of journey that fits you. Every experience is tailorable.'
          title='A Safari for Every Kind of Traveler'
        />

        <ScrollReveal
          className='mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'
          stagger
        >
          {items.map((item) => (
            <Link
              className='group relative block aspect-[4/5] overflow-hidden rounded-[var(--benroso-radius)] border border-[var(--benroso-line)]'
              data-reveal-item
              href={item.href}
              key={item.id}
            >
              {item.imageUrl ? (
                <Image
                  alt={item.imageAlt}
                  className='object-cover transition-transform duration-500 group-hover:scale-110'
                  fill
                  sizes='(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw'
                  src={item.imageUrl}
                />
              ) : (
                <span aria-hidden className='absolute inset-0 bg-[var(--benroso-primary-light)]' />
              )}
              <span
                aria-hidden
                className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-colors group-hover:from-black/90'
              />
              <span className='absolute inset-x-0 bottom-0 p-4'>
                <span className='block font-display text-lg leading-tight text-white'>
                  {item.title}
                </span>
                {item.blurb ? (
                  <span className='mt-1 hidden text-xs leading-5 text-white/80 sm:block'>
                    {item.blurb}
                  </span>
                ) : null}
                <span className='mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[var(--benroso-gold)]'>
                  View Details
                  <Icons.arrowRight className='h-3 w-3 transition-transform group-hover:translate-x-1' />
                </span>
              </span>
            </Link>
          ))}
        </ScrollReveal>

        <div className='mt-10 flex justify-center'>
          <BenrosoButton href={localePath(locale, '/experiences')} variant='accent-outline'>
            See All Experiences
          </BenrosoButton>
        </div>
      </div>
    </section>
  );
}
