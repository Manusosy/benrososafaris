'use client';

import { useCallback, useEffect, useState } from 'react';

import { AboutOverviewSection } from '@/components/public/about/about-overview-section';
import { AboutPartnersSection } from '@/components/public/about/about-partners-section';
import { AboutPeopleSection } from '@/components/public/about/about-people-section';
import { AboutReviewsSection } from '@/components/public/about/about-reviews-section';
import { AboutTeamIntro } from '@/components/public/about/about-team-intro';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { localePath } from '@/lib/public/locale-path';
import {
  ABOUT_TAB_IDS,
  PLACEHOLDER_DRIVERS,
  PLACEHOLDER_GUIDES,
  PLACEHOLDER_PARTNERS,
  PLACEHOLDER_TEAM,
  PLACEHOLDER_TESTIMONIALS,
  type AboutTabId
} from '@/lib/public/about-placeholders';
import type { PublicSiteSettings } from '@/lib/public/types';
import { cn } from '@/lib/utils';

const TAB_CONFIG: Array<{ id: AboutTabId; label: string }> = [
  { id: 'about', label: 'About Us' },
  { id: 'team', label: 'Our Team' },
  { id: 'guides', label: 'Safari Guides' },
  { id: 'drivers', label: 'Driver-Guides' },
  { id: 'partners', label: 'Partners' },
  { id: 'reviews', label: 'Reviews' }
];

function isValidTabId(value: string): value is AboutTabId {
  return (ABOUT_TAB_IDS as readonly string[]).includes(value);
}

type AboutTabsProps = {
  locale: string;
  siteSettings: PublicSiteSettings;
};

export function AboutTabs({ locale, siteSettings }: AboutTabsProps) {
  const [activeTab, setActiveTab] = useState<AboutTabId>('about');

  const contactHref = localePath(locale, '/contact');
  const fleetHref = localePath(locale, '/our-fleet');

  const syncTabFromHash = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    if (isValidTabId(hash)) {
      setActiveTab(hash);
    }
  }, []);

  useEffect(() => {
    syncTabFromHash();
    window.addEventListener('hashchange', syncTabFromHash);
    return () => window.removeEventListener('hashchange', syncTabFromHash);
  }, [syncTabFromHash]);

  const handleTabChange = (value: string) => {
    if (!isValidTabId(value)) return;
    setActiveTab(value);
    const base = window.location.pathname;
    window.history.replaceState(null, '', value === 'about' ? base : `${base}#${value}`);
  };

  return (
    <Tabs className='gap-0' onValueChange={handleTabChange} value={activeTab}>
      <div className='sticky top-[calc(var(--benroso-topbar-h)+var(--benroso-header-h))] z-30 border-b border-[var(--benroso-line)] bg-white'>
        <div className='benroso-container'>
          <TabsList className='flex h-auto w-full flex-wrap justify-start gap-1 rounded-none bg-transparent p-0 py-3'>
            {TAB_CONFIG.map((tab) => (
              <TabsTrigger
                className={cn(
                  'rounded-[var(--benroso-radius)] border border-transparent px-4 py-2.5 text-xs font-bold uppercase tracking-wide',
                  'text-[var(--benroso-muted)] shadow-none transition-colors',
                  'data-[state=active]:border-[var(--benroso-primary)] data-[state=active]:bg-[var(--benroso-primary)]',
                  'data-[state=active]:text-white data-[state=active]:shadow-none',
                  'hover:text-[var(--benroso-primary)] data-[state=active]:hover:text-white'
                )}
                key={tab.id}
                value={tab.id}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>

      <TabsContent className='mt-0' value='about'>
        <AboutOverviewSection
          contactHref={contactHref}
          fleetHref={fleetHref}
          locale={locale}
          siteSettings={siteSettings}
        />
      </TabsContent>

      <TabsContent className='mt-0' value='team'>
        <AboutTeamIntro />
        <AboutPeopleSection
          contactHref={contactHref}
          description='Leadership, operations, reservations, and guest care — the Nairobi team that coordinates every safari before your vehicle leaves the city.'
          eyebrow='Company Team'
          introImage={{
            alt: 'Benroso Safaris office and planning team',
            url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80'
          }}
          people={PLACEHOLDER_TEAM}
          title='The People Behind Your Safari'
        />
      </TabsContent>

      <TabsContent className='mt-0' value='guides'>
        <AboutPeopleSection
          contactHref={contactHref}
          description='KPSGA-aligned professional guides who bring interpretation, walking safaris, primate trekking expertise, and deep park knowledge to every itinerary.'
          eyebrow='Safari Guides'
          introImage={{
            alt: 'Professional safari guide on a game drive',
            url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80'
          }}
          people={PLACEHOLDER_GUIDES}
          showCertifications
          title='Meet Our Professional Safari Guides'
        />
      </TabsContent>

      <TabsContent className='mt-0' value='drivers'>
        <AboutPeopleSection
          contactHref={contactHref}
          description='Driver-guides are the face of your safari — skilled on bush tracks, expert at wildlife spotting, and trained for guest safety and comfort on every mile.'
          eyebrow='Driver-Guides'
          fleetHref={fleetHref}
          introImage={{
            alt: 'Driver-guide with safari Land Cruiser',
            url: 'https://images.unsplash.com/photo-1523805009345-7448845a9e3?auto=format&fit=crop&w=1200&q=80'
          }}
          people={PLACEHOLDER_DRIVERS}
          showCertifications
          title='Meet Our Driver-Guides'
        />
      </TabsContent>

      <TabsContent className='mt-0' value='partners'>
        <AboutPartnersSection contactHref={contactHref} partners={PLACEHOLDER_PARTNERS} />
      </TabsContent>

      <TabsContent className='mt-0' value='reviews'>
        <AboutReviewsSection contactHref={contactHref} testimonials={PLACEHOLDER_TESTIMONIALS} />
      </TabsContent>
    </Tabs>
  );
}
