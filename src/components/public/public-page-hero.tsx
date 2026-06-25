'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { PublicHeroGhostCta } from '@/components/public/public-hero-ghost-cta';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

type PublicPageHeroProps = {
  breadcrumbs?: Array<{ href?: string; label: string }>;
  breadcrumbStyle?: 'default' | 'pipe-uppercase';
  className?: string;
  cta?: {
    href: string;
    label: string;
  };
  ctaVariant?: 'gold' | 'ghost-hero';
  description?: string;
  eyebrow?: string;
  eyebrowTone?: 'gold' | 'white';
  imageAlt: string;
  imageUrl: string;
  showGoldLine?: boolean;
  title: string;
  titleTone?: 'white' | 'gold';
  children?: ReactNode;
};

export function PublicPageHero({
  breadcrumbs,
  breadcrumbStyle = 'default',
  className,
  cta,
  ctaVariant = 'gold',
  description,
  eyebrow,
  eyebrowTone = 'gold',
  imageAlt,
  imageUrl,
  showGoldLine = true,
  title,
  titleTone = 'white',
  children
}: PublicPageHeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const isPipeUppercase = breadcrumbStyle === 'pipe-uppercase';

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || !contentRef.current) return;

      gsap.from(contentRef.current.children, {
        opacity: 0,
        y: 24,
        duration: 0.85,
        ease: 'power2.out',
        stagger: 0.1
      });
    },
    { scope: contentRef }
  );

  return (
    <section
      className={cn(
        'relative flex min-h-[420px] h-[50vh] max-h-[560px] items-center overflow-hidden border-b border-[var(--benroso-line)] text-white',
        className
      )}
    >
      <div
        aria-hidden
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url("${imageUrl}")` }}
      />
      <span className='sr-only'>{imageAlt}</span>
      <div aria-hidden className='absolute inset-0 bg-[rgba(60,81,66,0.68)]' />
      <div className='relative z-10 w-full py-10 md:py-14'>
        <div className='benroso-container'>
          <div className='mx-auto max-w-3xl text-center' ref={contentRef}>
            {breadcrumbs?.length ? (
              <nav
                aria-label='Breadcrumb'
                className={cn(
                  'mb-8 flex flex-wrap items-center justify-center gap-x-3 text-sm md:mb-10',
                  isPipeUppercase
                    ? 'font-semibold uppercase tracking-[0.14em] text-white/75'
                    : 'text-white/70'
                )}
              >
                {breadcrumbs.map((crumb, index) => (
                  <span className='inline-flex items-center gap-3' key={`${crumb.label}-${index}`}>
                    {index > 0 ? (
                      <span aria-hidden className={isPipeUppercase ? 'text-white/50' : undefined}>
                        {isPipeUppercase ? '|' : '/'}
                      </span>
                    ) : null}
                    {crumb.href ? (
                      <a className='transition-colors hover:text-white' href={crumb.href}>
                        {crumb.label}
                      </a>
                    ) : (
                      <span className='text-white'>{crumb.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            ) : null}
            {eyebrow ? (
              <p
                className={cn(
                  'text-xs font-bold uppercase tracking-[0.2em]',
                  eyebrowTone === 'white' ? 'text-white' : 'benroso-eyebrow'
                )}
              >
                {eyebrow}
              </p>
            ) : null}
            <h1
              className={cn(
                'mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08]',
                titleTone === 'gold' ? 'text-[var(--benroso-gold)]' : 'text-white'
              )}
            >
              {title}
            </h1>
            {showGoldLine ? <span aria-hidden className='benroso-gold-line mt-5' /> : null}
            {description ? (
              <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/85'>
                {description}
              </p>
            ) : null}
            {cta ? (
              <div className='mt-8'>
                {ctaVariant === 'ghost-hero' ? (
                  <PublicHeroGhostCta href={cta.href} label={cta.label} />
                ) : (
                  <BenrosoButton href={cta.href} variant='gold'>
                    {cta.label}
                  </BenrosoButton>
                )}
              </div>
            ) : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
