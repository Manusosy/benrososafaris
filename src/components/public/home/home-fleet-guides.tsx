'use client';

import Image from 'next/image';

import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { ScrollReveal } from '@/components/public/ui/scroll-reveal';
import { localePath } from '@/lib/public/locale-path';

const FLEET_GUIDES_GALLERY = [
  {
    imageUrl: '/assets/The-Great-Wildebeest-Migration-1024x683.jpg.webp',
    imageAlt: 'Safari vehicle following the Great Wildebeest Migration'
  },
  {
    imageUrl:
      '/assets/The-Ultimate-Guided-Rhino-Tracking-on-Foot-in-Kenya-Conservation-Safari-A-Journey-to-Save-the-Giants.jpg',
    imageAlt: 'Guided rhino tracking on foot with a Benroso guide'
  },
  {
    imageUrl: '/assets/benroso-safaris-kenya.webp',
    imageAlt: 'Benroso Safaris vehicle on the plains of Kenya'
  }
];

export function HomeFleetGuides({ locale }: { locale: string }) {
  return (
    <section className='benroso-section bg-white'>
      <div className='benroso-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center'>
        <ScrollReveal from='left'>
          <p className='benroso-eyebrow'>Our Fleet &amp; Guides</p>
          <h2 className='benroso-heading mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight'>
            The Same Vehicles and Guides for Every Trip
          </h2>
          <p className='benroso-body mt-5 max-w-xl text-base leading-8'>
            Our private 4x4 safari cruisers are serviced on a fixed schedule, and our driver-guides
            hold current KPSGA certification. You travel with people who know these parks well, not
            a rotating cast of subcontractors.
          </p>
          <div className='mt-8 flex flex-wrap gap-4'>
            <BenrosoButton href={localePath(locale, '/our-fleet')} variant='primary'>
              View Our Fleet
            </BenrosoButton>
            <BenrosoButton href={localePath(locale, '/safari-guides')} variant='accent-outline'>
              Meet Our Guides
            </BenrosoButton>
          </div>
        </ScrollReveal>
        <ScrollReveal className='grid grid-cols-2 gap-4' from='right' stagger>
          {FLEET_GUIDES_GALLERY.map((item, index) => (
            <div
              className={`relative overflow-hidden rounded-[var(--benroso-radius)] bg-[var(--benroso-primary)] ${
                index === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'
              }`}
              data-reveal-item
              key={item.imageUrl}
            >
              <Image
                alt={item.imageAlt}
                className='object-cover'
                fill
                loading='lazy'
                sizes='(max-width:1024px) 100vw, 50vw'
                src={item.imageUrl}
              />
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
