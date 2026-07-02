'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export type ParkTab = { id: string; label: string };

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Sticky tab bar with scroll-spy. Clicking a tab smooth-scrolls to its section;
 * scrolling the page highlights the section currently under the bar — so the
 * active tab moves from the first to the last section without clicking away.
 *
 * The active section is the last one whose top has passed the offset line
 * (header height + this bar). Sections must carry matching `scroll-mt`.
 */
export function ParkScrollTabs({ tabs }: { tabs: ParkTab[] }) {
  const [active, setActive] = React.useState(tabs[0]?.id ?? '');

  React.useEffect(() => {
    const ids = tabs.map((tab) => tab.id);
    const OFFSET = 140; // header (80px) + this bar — keep in sync with section scroll-mt

    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - OFFSET <= 0) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [tabs]);

  return (
    <div className='sticky top-[var(--benroso-header-h)] z-30 border-b border-[var(--benroso-line)] bg-white'>
      <div className='benroso-container flex overflow-x-auto'>
        {tabs.map((tab) => (
          <button
            className={cn(
              'relative shrink-0 whitespace-nowrap px-5 py-4 text-sm font-bold uppercase tracking-[0.08em] transition-colors md:px-6',
              active === tab.id
                ? 'bg-[var(--benroso-lime)] text-[var(--benroso-primary-dark)]'
                : 'text-[var(--benroso-muted)] hover:bg-[var(--benroso-ivory)] hover:text-[var(--benroso-primary)]'
            )}
            key={tab.id}
            onClick={() => scrollToSection(tab.id)}
            type='button'
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
