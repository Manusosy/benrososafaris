'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ADVANTAGES = [
  'Personalized service by travel experts with first-hand knowledge',
  'Customizable tours to your preference',
  'Trusted reviews on TripAdvisor and Google',
  'Booking security: transparent pricing and 24/7 support'
] as const;

type ContactAdvantagesListProps = {
  className?: string;
};

export function ContactAdvantagesList({ className }: ContactAdvantagesListProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const list = listRef.current;
      if (reduced || !list) return;

      const items = list.querySelectorAll('[data-advantage-item]');
      if (!items.length) return;

      items.forEach((item) => {
        const icon = item.querySelector('[data-advantage-icon]');
        const textEl = item.querySelector('[data-advantage-text]');

        if (icon) {
          gsap.set(icon, { opacity: 0, scale: 0.4 });
        }

        if (textEl) {
          textEl.textContent = '';
        }
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: list,
          start: 'top 88%',
          once: true
        }
      });

      items.forEach((item) => {
        const icon = item.querySelector('[data-advantage-icon]');
        const textEl = item.querySelector('[data-advantage-text]');
        const fullText = textEl?.getAttribute('data-full-text') ?? '';

        if (!icon || !textEl) return;

        timeline
          .to(icon, {
            duration: 0.38,
            ease: 'back.out(1.8)',
            opacity: 1,
            scale: 1
          })
          .to(
            {},
            {
              duration: Math.max(0.75, fullText.length * 0.028),
              ease: 'none',
              onStart: () => {
                textEl.textContent = '';
              },
              onUpdate: function onType() {
                const length = Math.round(fullText.length * this.progress());
                textEl.textContent = fullText.slice(0, length);
              }
            }
          );
      });
    },
    { scope: listRef }
  );

  return (
    <ul className={cn('benroso-contact-sidebar-advantages', className)} ref={listRef}>
      {ADVANTAGES.map((advantage) => (
        <li className='benroso-contact-sidebar-advantage' data-advantage-item key={advantage}>
          <span aria-hidden className='benroso-contact-sidebar-advantage-icon' data-advantage-icon>
            <Icons.check />
          </span>
          <span data-advantage-text data-full-text={advantage}>
            {advantage}
          </span>
        </li>
      ))}
    </ul>
  );
}
