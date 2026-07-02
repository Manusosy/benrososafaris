'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ExperienceScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  stagger?: boolean;
  styleImage?: string | null;
};

export function ExperienceScrollReveal({
  children,
  className,
  id,
  stagger = false,
  styleImage
}: ExperienceScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || !containerRef.current) return;

      const targets = stagger
        ? containerRef.current.querySelectorAll('[data-reveal-item]')
        : containerRef.current;

      gsap.from(targets, {
        opacity: 0,
        y: 36,
        duration: 0.85,
        ease: 'power2.out',
        stagger: stagger ? 0.1 : 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 88%',
          once: true
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      className={cn(className)}
      id={id}
      ref={containerRef}
      style={styleImage ? { backgroundImage: `url(${styleImage})` } : undefined}
    >
      {children}
    </div>
  );
}
