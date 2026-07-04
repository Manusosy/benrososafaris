'use client';

import { useEffect, useRef } from 'react';

import { loadGsapRuntime } from '@/lib/gsap/load-runtime';
import { cn } from '@/lib/utils';

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Reveal each [data-reveal-item] child in sequence instead of the container as a whole. */
  stagger?: boolean;
  /** Direction the content travels in from. */
  from?: 'up' | 'left' | 'right';
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  stagger = false,
  from = 'up',
  delay = 0
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let killed = false;
    let cleanup: (() => void) | undefined;

    void loadGsapRuntime().then(({ gsap }) => {
      if (killed || !containerRef.current) return;

      const targets = stagger
        ? containerRef.current.querySelectorAll('[data-reveal-item]')
        : containerRef.current;

      const offset =
        from === 'left' ? { x: -32, y: 0 } : from === 'right' ? { x: 32, y: 0 } : { x: 0, y: 36 };

      const tween = gsap.from(targets, {
        opacity: 0,
        x: offset.x,
        y: offset.y,
        duration: 0.85,
        delay,
        ease: 'power2.out',
        stagger: stagger ? 0.1 : 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 88%',
          once: true
        }
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      killed = true;
      cleanup?.();
    };
  }, [stagger, from, delay]);

  return (
    <div className={cn(className)} ref={containerRef}>
      {children}
    </div>
  );
}
