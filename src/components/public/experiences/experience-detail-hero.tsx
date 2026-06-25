'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { localePath } from '@/lib/public/locale-path';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ExperienceDetailHeroProps = {
  category: string | null;
  imageAlt: string | null;
  imageUrl: string | null;
  locale: string;
  summary: string | null;
  title: string;
};

export function ExperienceDetailHero({
  category,
  imageAlt,
  imageUrl,
  locale,
  summary,
  title
}: ExperienceDetailHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.12
        });
      }

      if (imageRef.current && sectionRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section className='relative min-h-[min(78vh,720px)] overflow-hidden' ref={sectionRef}>
      <div className='absolute inset-0' ref={imageRef}>
        {imageUrl ? (
          <Image
            alt={imageAlt || title}
            className='object-cover'
            fill
            priority
            sizes='100vw'
            src={imageUrl}
          />
        ) : (
          <div className='absolute inset-0 bg-[var(--benroso-primary-light)]' />
        )}
      </div>
      <div
        aria-hidden
        className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/25'
      />

      <div className='relative z-10 flex min-h-[min(78vh,720px)] items-end'>
        <div className='benroso-container w-full pb-12 pt-28 md:pb-16 md:pt-32'>
          <nav aria-label='Breadcrumb' className='mb-8 flex flex-wrap gap-2 text-sm text-white/70'>
            <a className='hover:text-white' href={localePath(locale)}>
              Home
            </a>
            <span>/</span>
            <a className='hover:text-white' href={localePath(locale, '/experiences')}>
              Experiences
            </a>
            <span>/</span>
            <span className='text-white'>{title}</span>
          </nav>

          <div className='max-w-4xl' ref={contentRef}>
            {category ? (
              <p className='text-xs font-bold uppercase tracking-[0.2em] text-[var(--benroso-gold)]'>
                {category}
              </p>
            ) : null}
            <h1 className='mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.06] text-white'>
              {title}
            </h1>
            {summary ? (
              <p className='mt-5 max-w-2xl text-lg leading-8 text-white/88'>{summary}</p>
            ) : null}
            <div className='mt-8 flex flex-wrap gap-4'>
              <BenrosoButton href={localePath(locale, '/contact')}>
                Let&apos;s Start Planning
              </BenrosoButton>
              <BenrosoButton href={localePath(locale, '/tours')} variant='gold-outline'>
                View Tours
              </BenrosoButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
