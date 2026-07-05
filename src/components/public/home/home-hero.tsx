'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Icons } from '@/components/icons';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { BenrosoButtonGroup } from '@/components/public/ui/benroso-button-group';
import { localePath } from '@/lib/public/locale-path';
import { youtubeVideoId } from '@/lib/public/page-heroes';
import type { HeroSlide, PageHero } from '@/lib/public/types';

const HERO_FALLBACK_SLIDES: HeroSlide[] = [
  {
    mediaType: 'image',
    mediaUrl: '/assets/great%20migration%20of%20wildebeasts%20in%20across%20mara%20river.jpg',
    alt: 'Wildebeest crossing the Mara River during the Great Migration',
    heading: null,
    subheading: null,
    posterUrl: null,
    isActive: true,
    sortOrder: 0
  },
  {
    mediaType: 'image',
    mediaUrl: '/assets/Masai-Mara-Hot-Air-Balloon-Safari-with-Champagne-Breakfast.jpg',
    alt: 'Hot air balloon safari over the Maasai Mara at sunrise',
    heading: null,
    subheading: null,
    posterUrl: null,
    isActive: true,
    sortOrder: 1
  },
  {
    mediaType: 'image',
    mediaUrl: '/assets/Elephant-in-Amboseli-National-Park-2.jpeg',
    alt: 'Elephants walking across Amboseli National Park with Mount Kilimanjaro behind',
    heading: null,
    subheading: null,
    posterUrl: null,
    isActive: true,
    sortOrder: 2
  },
  {
    mediaType: 'image',
    mediaUrl: '/assets/Saruni-Basecamp-The-Great-Migration-river-crossing.jpg',
    alt: 'Safari guests watching a river crossing during the Great Migration',
    heading: null,
    subheading: null,
    posterUrl: null,
    isActive: true,
    sortOrder: 3
  }
];

const HERO_SLIDE_INTERVAL = 6500;

export function HomeHero({
  locale,
  hero,
  slides
}: {
  locale: string;
  hero?: PageHero | null;
  slides?: HeroSlide[];
}) {
  const contactHref = localePath(locale, '/contact');
  const toursHref = localePath(locale, '/tours');

  const configuredSlides = hero?.slides ?? slides;
  const heroSlides =
    configuredSlides && configuredSlides.length > 0 ? configuredSlides : HERO_FALLBACK_SLIDES;
  const videoId = hero?.type === 'youtube' ? youtubeVideoId(hero.youtubeUrl) : null;

  const eyebrow = hero?.eyebrow ?? 'Welcome to Benroso Safaris';
  const heading = hero?.heading ?? 'Unforgettable East African Safaris, Crafted Around You';
  const fallbackHomeSubheading =
    'For twenty-five years we have guided travelers across Kenya, Tanzania, Uganda, and Rwanda. Every itinerary is built by people who know these parks firsthand, not from a brochure. Tell us how you like to travel, and we will take care of the rest.';
  const subheading = hero?.subheading ?? fallbackHomeSubheading;
  const primaryCtaLabel = hero?.ctaLabel ?? 'Plan My Safari';
  const primaryCtaHref = hero?.ctaHref ? localePath(locale, hero.ctaHref) : contactHref;

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (videoId) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || heroSlides.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, HERO_SLIDE_INTERVAL);

    return () => window.clearInterval(interval);
  }, [heroSlides.length, videoId]);

  return (
    <section className='relative min-h-[min(92vh,960px)] overflow-hidden bg-[var(--benroso-primary-dark)] text-white'>
      {videoId ? (
        <>
          {heroSlides[0]?.mediaUrl ? (
            <Image
              alt={heroSlides[0].alt ?? 'Benroso Safaris'}
              className='object-cover'
              fill
              fetchPriority='high'
              priority
              sizes='100vw'
              src={heroSlides[0].mediaUrl}
            />
          ) : null}
          <iframe
            allow='autoplay; encrypted-media'
            aria-hidden
            className='pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2'
            loading='lazy'
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1&showinfo=0`}
            title='Background video'
          />
        </>
      ) : (
        heroSlides.map((slide, index) => (
          <div
            aria-hidden={index !== activeSlide}
            className='absolute inset-0 transition-opacity duration-1000'
            key={`${slide.mediaUrl}-${index}`}
            style={{ opacity: index === activeSlide ? 1 : 0 }}
          >
            {slide.mediaType === 'video' ? (
              <video
                autoPlay
                className='h-full w-full object-cover'
                loop
                muted
                playsInline
                poster={slide.posterUrl ?? undefined}
              >
                <source src={slide.mediaUrl} />
              </video>
            ) : (
              <Image
                alt={slide.alt ?? 'Benroso Safaris'}
                className='object-cover'
                fetchPriority={index === 0 ? 'high' : undefined}
                fill
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
                sizes='100vw'
                src={slide.mediaUrl}
              />
            )}
          </div>
        ))
      )}
      <div
        aria-hidden
        className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30'
      />
      <div
        aria-hidden
        className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent'
      />

      <div className='relative z-10 flex min-h-[min(92vh,960px)] flex-col justify-between'>
        <div className='flex flex-1 items-center'>
          <div className='benroso-container py-20'>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-[var(--benroso-gold)]'>
              {eyebrow}
            </p>
            <h1 className='mt-4 max-w-3xl font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-white'>
              {heading}
            </h1>
            <p className='mt-6 max-w-2xl text-lg leading-8 text-white/90'>{subheading}</p>
            <BenrosoButtonGroup className='mt-8'>
              <BenrosoButton
                className='border-[var(--benroso-lime)] bg-[var(--benroso-lime)] text-white [--benroso-fill:var(--benroso-primary)]'
                href={primaryCtaHref}
                variant='accent'
              >
                <Icons.compass className='h-4 w-4 shrink-0' />
                {primaryCtaLabel}
              </BenrosoButton>
              <BenrosoButton href={toursHref} variant='gold-outline'>
                View Safari Tours
                <Icons.arrowRight className='h-4 w-4 shrink-0' />
              </BenrosoButton>
            </BenrosoButtonGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
