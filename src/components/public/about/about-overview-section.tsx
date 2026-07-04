import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/components/icons';
import { ExperienceAfricaMap } from '@/components/public/experiences/experience-africa-map';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { SectionHeader } from '@/components/public/ui/section-header';
import { localePath } from '@/lib/public/locale-path';
import {
  ABOUT_DESTINATIONS,
  ABOUT_GALLERY_IMAGES,
  ABOUT_SERVICES,
  ABOUT_STATS,
  ABOUT_VALUES
} from '@/lib/public/about-placeholders';
import type { PublicSiteSettings } from '@/lib/public/types';

type AboutOverviewSectionProps = {
  contactHref: string;
  fleetHref: string;
  locale: string;
  siteSettings: PublicSiteSettings;
};

export function AboutOverviewSection({
  contactHref,
  fleetHref,
  locale,
  siteSettings
}: AboutOverviewSectionProps) {
  const whyChoosePoints = [
    'Local expertise across Kenya, Tanzania, Uganda, and Rwanda safari circuits',
    'Custom itineraries built around your dates, interests, and comfort level',
    'Professional driver-guides and a well-maintained private safari fleet',
    'Responsive support before, during, and after your trip',
    'Registered & licensed tour operator — members of KATO and KPSGA',
    'Represented on SafariBookings.com with verified guest reviews'
  ];

  return (
    <div className='space-y-0'>
      {/* Introduction */}
      <section className='benroso-section bg-white'>
        <div className='benroso-container grid items-center gap-10 lg:grid-cols-2'>
          <div>
            <p className='benroso-eyebrow'>Our Story</p>
            <h2 className='benroso-heading mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight'>
              Experts in Lodge and Camping Safaris
            </h2>
            <div className='benroso-body mt-6 space-y-4 text-base leading-8'>
              <p>{siteSettings.description}</p>
              <p>
                Benroso Safaris was established in 2000 with a vision to make East Africa a truly
                memorable destination for travelers worldwide. We are a fully registered and
                licensed tour operator, regulated by the Tourism Regulatory Authority (TRA) and
                proud members of the Kenya Association of Tour Operators (KATO) and the Kenya
                Professional Safari Guides Association (KPSGA).
              </p>
              <p>
                With over two decades of experience, we deliver professionally guided, personalized
                safari experiences across Kenya, Tanzania, Uganda, and Rwanda — combining local
                expertise, reliable service, and responsible tourism practices.
              </p>
            </div>
          </div>
          <div className='relative aspect-[4/5] overflow-hidden rounded-[var(--benroso-radius)] bg-[var(--benroso-primary)]'>
            <Image
              alt='Benroso Safaris team in East Africa'
              className='object-cover'
              fill
              sizes='(max-width:1024px) 100vw, 50vw'
              src='https://images.unsplash.com/photo-1523805009345-7448845a9e3?auto=format&fit=crop&w=1400&q=80'
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className='border-y border-[var(--benroso-line)] bg-[var(--benroso-primary-dark)] text-white'>
        <div className='benroso-container py-12 md:py-14'>
          <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {ABOUT_STATS.map((stat) => (
              <div className='text-center' key={stat.label}>
                <p className='font-display text-4xl text-[var(--benroso-accent)] md:text-5xl'>
                  {stat.value}
                </p>
                <p className='mt-2 text-sm text-white/80'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className='benroso-section bg-[var(--benroso-ivory)]'>
        <div className='benroso-container'>
          <SectionHeader
            description='The principles that guide every itinerary, every game drive, and every guest relationship.'
            eyebrow='Vision & Mission'
            title='What Drives Benroso Safaris'
          />
          <div className='mt-12 grid gap-6 lg:grid-cols-2'>
            <article className='rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white p-8 md:p-10'>
              <p className='benroso-eyebrow'>Our Vision</p>
              <h3 className='benroso-heading mt-4 font-display text-2xl leading-snug md:text-3xl'>
                A trusted African safari partner, known globally for authenticity, professionalism,
                and responsible travel.
              </h3>
              <p className='benroso-body mt-5 text-sm leading-7'>
                We aim to represent East Africa with integrity — showing guests the wild honestly,
                supporting local communities, and setting a standard for safari hospitality that
                travelers remember for a lifetime.
              </p>
            </article>
            <article className='rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white p-8 md:p-10'>
              <p className='benroso-eyebrow'>Our Mission</p>
              <h3 className='benroso-heading mt-4 font-display text-2xl leading-snug md:text-3xl'>
                Ethical, profitable business through committed personnel and comradeship across the
                East Africa travel industry.
              </h3>
              <p className='benroso-body mt-5 text-sm leading-7'>
                To conduct ethical and profitable business by providing services to our customers
                through committed personnel and upholding the spirit of comradeship among all the
                players in the East Africa travel industry.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className='benroso-section bg-white'>
        <div className='benroso-container'>
          <SectionHeader align='left' eyebrow='Our Values' title='How We Operate Every Day' />
          <div className='mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
            {ABOUT_VALUES.map((value) => (
              <article
                className='rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-[var(--benroso-ivory)] p-6'
                key={value.title}
              >
                <Icons.badgeCheck className='h-5 w-5 text-[var(--benroso-accent)]' />
                <h3 className='benroso-heading mt-4 font-display text-xl'>{value.title}</h3>
                <p className='benroso-body mt-3 text-sm leading-7'>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className='benroso-section bg-[var(--benroso-ivory)]'>
        <div className='benroso-container'>
          <SectionHeader
            description='From the Maasai Mara to the Serengeti, gorilla forests to Indian Ocean beaches — we cover the region comprehensively.'
            eyebrow='Where We Operate'
            title='East Africa Safari Destinations'
          />
          <div className='mt-12 grid gap-6 md:grid-cols-2'>
            {ABOUT_DESTINATIONS.map((dest) => (
              <Link
                className='group overflow-hidden rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white'
                href={localePath(locale, `/destinations?country=${dest.slug}`)}
                key={dest.country}
              >
                <div className='relative aspect-[16/9] overflow-hidden bg-[var(--benroso-primary)]'>
                  <Image
                    alt={`${dest.country} safari destinations`}
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                    fill
                    sizes='(max-width:768px) 100vw, 50vw'
                    src={dest.imageUrl}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                  <h3 className='absolute bottom-4 left-4 font-display text-2xl text-white'>
                    {dest.country}
                  </h3>
                </div>
                <div className='p-5'>
                  <p className='benroso-body text-sm leading-7'>{dest.highlights}</p>
                  <span className='mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[var(--benroso-accent)]'>
                    Explore {dest.country}
                    <Icons.arrowRight className='h-3.5 w-3.5' />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ExperienceAfricaMap />

      {/* Services */}
      <section className='benroso-section bg-white'>
        <div className='benroso-container'>
          <SectionHeader eyebrow='What We Do' title='Safari Services & Experiences' />
          <div className='mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {ABOUT_SERVICES.map((service) => (
              <article
                className='rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] p-6'
                key={service.title}
              >
                <h3 className='benroso-heading font-display text-xl'>{service.title}</h3>
                <p className='benroso-body mt-3 text-sm leading-7'>{service.description}</p>
              </article>
            ))}
          </div>
          <div className='mt-10 text-center'>
            <BenrosoButton href={contactHref}>Plan Your Safari</BenrosoButton>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className='benroso-section bg-[var(--benroso-ivory)]'>
        <div className='benroso-container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start'>
          <div>
            <p className='benroso-eyebrow'>Why Choose Benroso Safaris</p>
            <h2 className='benroso-heading mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight'>
              Trusted East Africa Safari Experts Since 2000
            </h2>
            <p className='mt-5 max-w-2xl text-base leading-8 text-[var(--benroso-muted)]'>
              We are registered &amp; licensed tour operator company, members of{' '}
              <a
                className='font-medium text-[var(--benroso-primary)] underline decoration-[var(--benroso-primary)]/30 underline-offset-2 hover:text-[var(--benroso-accent)]'
                href='https://www.kato.org/'
                rel='noopener noreferrer'
                target='_blank'
              >
                KATO
              </a>{' '}
              &amp;{' '}
              <a
                className='font-medium text-[var(--benroso-primary)] underline decoration-[var(--benroso-primary)]/30 underline-offset-2 hover:text-[var(--benroso-accent)]'
                href='https://kpsga.org/'
                rel='noopener noreferrer'
                target='_blank'
              >
                Kenya Professional Safari Guides Association (KPSGA)
              </a>
              , committed to offering the best and most diverse services at competitive prices while
              still being personalized.
            </p>
            <div className='mt-8'>
              <BenrosoButton href={fleetHref} variant='primary'>
                View Our Safari Fleet
              </BenrosoButton>
            </div>
          </div>
          <ul className='space-y-3'>
            {whyChoosePoints.map((point) => (
              <li
                className='flex items-start gap-3 rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white px-4 py-3 text-sm text-[var(--benroso-muted)]'
                key={point}
              >
                <Icons.check className='mt-0.5 h-4 w-4 shrink-0 text-[var(--benroso-accent)]' />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Photo gallery */}
      <section className='benroso-section bg-white'>
        <div className='benroso-container'>
          <SectionHeader
            description='Moments from the field — wildlife, landscapes, and the journeys we share with our guests.'
            eyebrow='Life on Safari'
            title='Benroso Safaris in Pictures'
          />
          <div className='mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {ABOUT_GALLERY_IMAGES.map((image, index) => (
              <div
                className={`relative overflow-hidden rounded-[var(--benroso-radius)] bg-[var(--benroso-primary)] ${
                  index === 0 ? 'sm:row-span-2 sm:aspect-auto sm:min-h-[320px]' : 'aspect-[4/3]'
                }`}
                key={image.url}
              >
                <Image
                  alt={image.alt}
                  className='object-cover'
                  fill
                  sizes='(max-width:768px) 100vw, 33vw'
                  src={image.url}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='border-t border-[var(--benroso-line)] bg-[var(--benroso-primary-dark)] text-white'>
        <div className='benroso-container benroso-section'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight'>
              Ready to Meet the Team Behind Your Safari?
            </h2>
            <p className='mt-5 text-base leading-8 text-white/80'>
              Tell us your travel dates and interests. Our planners will design an itinerary with
              the right guides, driver-guides, and vehicles for your journey.
            </p>
            <div className='mt-6 space-y-2 text-sm text-white/75'>
              <p>{siteSettings.email}</p>
              <p>
                {siteSettings.phoneSecondary} / {siteSettings.phonePrimary}
              </p>
            </div>
            <div className='mt-8 flex flex-wrap justify-center gap-4'>
              <BenrosoButton href={contactHref}>Inquire Now</BenrosoButton>
              <BenrosoButton
                href={`tel:${siteSettings.phonePrimary.replace(/[^\d+]/g, '')}`}
                variant='accent-outline'
              >
                Call Us
              </BenrosoButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
