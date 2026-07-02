'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { Icons } from '@/components/icons';
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
      <div aria-hidden className='absolute inset-0 bg-black/60' />

      <div className='relative z-10 flex min-h-[min(78vh,720px)] items-center'>
        <div className='benroso-container w-full py-28 md:py-32'>
          <nav
            aria-label='Breadcrumb'
            className='mb-8 flex flex-wrap justify-center gap-2 text-sm text-white/75'
          >
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

          <div className='mx-auto max-w-4xl text-center' ref={contentRef}>
            {category ? (
              <p className='text-xs font-bold uppercase tracking-[0.2em] text-white'>{category}</p>
            ) : null}
            <h1 className='mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.06] text-white'>
              {title}
            </h1>
            {summary ? (
              <p className='mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/88'>{summary}</p>
            ) : null}
            <div className='mt-8 flex flex-wrap justify-center gap-4'>
              <BenrosoButton className='group' href={localePath(locale, '/contact')}>
                Let&apos;s Start Planning
                <Icons.arrowRight className='h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100' />
              </BenrosoButton>
              <BenrosoButton
                className='group'
                href={localePath(locale, '/tours')}
                variant='gold-outline'
              >
                View Tours
                <Icons.arrowRight className='h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100' />
              </BenrosoButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
