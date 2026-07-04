'use client';

import Image from 'next/image';

import { Icons } from '@/components/icons';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { ScrollReveal } from '@/components/public/ui/scroll-reveal';
import { TrustedChecklist } from '@/components/public/home/home-trusted-checklist';
import { Slider } from '@/components/public/ui/slider';
import { localePath } from '@/lib/public/locale-path';

const WHY_CHOOSE_IMAGES = [
  {
    imageUrl: '/assets/benroso-safaris-kenya.webp',
    imageAlt: 'Benroso Safaris vehicle on the plains of Kenya'
  },
  {
    imageUrl: '/assets/Elephant-in-Amboseli-National-Park-2.jpeg',
    imageAlt: 'Elephants in Amboseli National Park beneath Mount Kilimanjaro'
  },
  {
    imageUrl: '/assets/Masai-Mara-Hot-Air-Balloon-Safari-with-Champagne-Breakfast.jpg',
    imageAlt: 'Hot air balloon safari over the Maasai Mara'
  }
];

export function HomeWhyChooseUs({ locale }: { locale: string }) {
  const trustPoints = [
    'Registered, licensed, and KATO bonded, with KPSGA certified driver-guides.',
    'Custom itineraries built around your dates, interests, and comfort level.',
    'A modern, well-maintained private safari fleet you travel in start to finish.',
    'Responsive support before, during, and after your trip, every single day.'
  ];

  return (
    <section className='border-b border-[var(--benroso-line)] bg-white' id='why-choose-us'>
      <div className='benroso-container py-16 md:py-20'>
        <div className='grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14'>
          <ScrollReveal className='relative' from='left'>
            <Slider autoPlayMs={5000} showArrows={false}>
              {WHY_CHOOSE_IMAGES.map((image) => (
                <div
                  className='relative aspect-[4/3] overflow-hidden rounded-[var(--benroso-radius)] bg-[var(--benroso-primary)]'
                  key={image.imageUrl}
                >
                  <Image
                    alt={image.imageAlt}
                    className='object-cover'
                    fill
                    loading='lazy'
                    sizes='(max-width:1024px) 100vw, 50vw'
                    src={image.imageUrl}
                  />
                </div>
              ))}
            </Slider>
          </ScrollReveal>

          <ScrollReveal from='right'>
            <p className='benroso-eyebrow'>Why Choose Benroso Safaris</p>
            <h2 className='benroso-heading mt-3 font-display text-[clamp(1.875rem,4vw,3rem)] leading-[1.1]'>
              Trusted East Africa Safari Experts Since 2000
            </h2>
            <span className='benroso-gold-line benroso-gold-line--left' />
            <p className='benroso-body mt-6 text-base leading-8'>
              From the Great Migration to gorilla trekking and the Cape, every itinerary is designed
              by a team that has spent close to thirty years in the field. You get local expertise,
              honest advice, and logistics that simply work.
            </p>
            <TrustedChecklist items={trustPoints} />
            <div className='mt-8'>
              <BenrosoButton
                className='group'
                href={localePath(locale, '/about')}
                variant='primary'
              >
                <Icons.compass className='h-4 w-4 transition-transform duration-500 ease-out group-hover:rotate-[360deg]' />
                Discover Our Story
              </BenrosoButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
