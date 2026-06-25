'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ContactScrollRevealProps = {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
};

export function ContactScrollReveal({
  children,
  className,
  stagger = false
}: ContactScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || !containerRef.current) return;

      const targets = stagger
        ? containerRef.current.querySelectorAll('[data-contact-reveal]')
        : containerRef.current;

      gsap.from(targets, {
        duration: 0.85,
        ease: 'power2.out',
        opacity: 0,
        scrollTrigger: {
          once: true,
          start: 'top 88%',
          trigger: containerRef.current
        },
        stagger: stagger ? 0.12 : 0,
        y: 40
      });
    },
    { scope: containerRef }
  );

  return (
    <div className={cn(className)} ref={containerRef}>
      {children}
    </div>
  );
}
