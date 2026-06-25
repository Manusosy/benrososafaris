import { Icons } from '@/components/icons';
import { DestinationCard, TourCard } from '@/components/public/cards/content-cards';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { SectionHeader } from '@/components/public/ui/section-header';
import { localePath } from '@/lib/public/locale-path';
import type { PublicDestination, PublicSiteSettings, PublicTour } from '@/lib/public/types';

export function HomeHero({
  locale,
  siteSettings
}: {
  locale: string;
  siteSettings: PublicSiteSettings;
}) {
  const contactHref = localePath(locale, '/contact');
  const toursHref = localePath(locale, '/tours');

  return (
    <section className='relative min-h-[min(88vh,920px)] overflow-hidden bg-[var(--benroso-primary-dark)] text-white'>
      <div
        aria-hidden
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1516426122076-c23e76319801?auto=format&fit=crop&w=2200&q=80")'
        }}
      />
      <div aria-hidden className='absolute inset-0 bg-[var(--benroso-primary)] opacity-80' />
      <div className='relative z-10 flex min-h-[min(88vh,920px)] items-center'>
        <div className='benroso-container py-20' data-animate='hero'>
          <p className='text-xs font-bold uppercase tracking-[0.18em] text-white/70'>
            East Africa Safari Experts Since 2000
          </p>
          <h1 className='mt-4 max-w-4xl font-display text-[clamp(2.75rem,7vw,5rem)] leading-[1.02] text-white'>
            African Safaris, Welcome to the <span className='italic'>Wild.</span>
          </h1>
          <p className='mt-6 max-w-2xl text-lg leading-8 text-white/90'>
            Helping you discover the wonderland of East Africa — personalized safaris across Kenya,
            Tanzania, and beyond since 2000.
          </p>
          <div className='mt-8 flex flex-wrap gap-4'>
            <BenrosoButton href={contactHref} variant='accent'>
              Inquire More
            </BenrosoButton>
            <BenrosoButton href={toursHref} variant='accent-outline'>
              View Safari Tours
            </BenrosoButton>
          </div>
          <div className='mt-10 flex flex-wrap items-center gap-6 text-sm text-white/85'>
            <span className='inline-flex items-center gap-2'>
              <Icons.badgeCheck className='h-4 w-4 text-white/70' />
              Tailor-made itineraries
            </span>
            <span className='inline-flex items-center gap-2'>
              <Icons.phone className='h-4 w-4 text-white/70' />
              {siteSettings.phoneSecondary} / {siteSettings.phonePrimary}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeWhyChooseUs() {
  const trustPoints = [
    'Registered and licensed tour operator, members of KATO and Kenya Professional Safari Guides Association (KPSGA)',
    'Custom itineraries built around your dates, interests, and preferred comfort level',
    'Professional driver-guides and a well-maintained private safari fleet',
    'Responsive support before, during, and after your trip — represented on SafariBookings.com'
  ];

  return (
    <section
      className='border-b border-[var(--benroso-line)] bg-[var(--benroso-ivory)]'
      id='why-choose-us'
    >
      <div className='benroso-container py-10 md:py-12'>
        <div className='grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12'>
          <div>
            <p className='benroso-eyebrow'>Why Choose Benroso Safaris</p>
            <h2 className='benroso-heading mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight'>
              Trusted East Africa Safari Experts Since 2000
            </h2>
            <p className='benroso-body mt-5 max-w-2xl text-base leading-8'>
              Benroso Safaris specializes in expertly curated safari tours across Kenya, Tanzania,
              Uganda, and Rwanda — from wildlife safaris and Great Migration experiences to gorilla
              trekking and beach holidays. Whether you are traveling as a couple, family, or group,
              our specialists design personalized itineraries that match your travel style and
              budget.
            </p>
          </div>
          <ul className='space-y-4 text-sm leading-7 text-[var(--benroso-muted)]'>
            {trustPoints.map((item) => (
              <li
                className='flex gap-3 border-b border-[var(--benroso-line)] pb-4 last:border-0'
                key={item}
              >
                <span
                  aria-hidden
                  className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--benroso-accent)]'
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function HomeEditorial({ locale }: { locale: string }) {
  return (
    <section className='benroso-section bg-white'>
      <div className='benroso-container grid items-center gap-10 lg:grid-cols-2'>
        <div>
          <SectionHeader
            align='left'
            description='Benroso Safaris began operations in Kenya in 2000 with a view of making Kenya and East Africa a memorable tourist destination. We are registered and licensed, members of KATO and KPSGA, committed to offering diverse services at competitive prices while still being personalized.'
            eyebrow='All-Inclusive Safari Holidays'
            title='Are You Ready for a Journey of New Experiences and Unforgettable Adventures?'
          />
          <p className='benroso-body mt-6 font-display text-2xl text-[var(--benroso-brown)]'>
            Safaris truly designed and tailor-made for those in search of real adventure.
          </p>
          <div className='mt-8'>
            <BenrosoButton href={localePath(locale, '/about')} variant='primary'>
              Discover Benroso Safaris
            </BenrosoButton>
          </div>
        </div>
        <div className='relative aspect-[4/5] overflow-hidden rounded-[var(--benroso-radius)] bg-[var(--benroso-primary)]'>
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1400&q=80")'
            }}
          />
        </div>
      </div>
    </section>
  );
}

export function HomeDestinations({
  destinations,
  locale
}: {
  destinations: PublicDestination[];
  locale: string;
}) {
  return (
    <section className='benroso-section bg-[var(--benroso-ivory)]'>
      <div className='benroso-container'>
        <SectionHeader
          description='The best and most diverse services at very competitive prices while still being personalized.'
          eyebrow='Popular Destinations'
          title='Authentic African Destinations'
        />
        <div className='mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {destinations.length
            ? destinations.slice(0, 6).map((item) => (
                <DestinationCard
                  item={{
                    country: item.country,
                    excerpt: item.summary,
                    href: item.href,
                    imageAlt: item.imageAlt,
                    imageUrl: item.imageUrl,
                    title: item.name
                  }}
                  key={item.id}
                />
              ))
            : ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'South Africa'].map((label) => (
                <DestinationCard
                  item={{
                    country: label.toLowerCase().replace(' ', '-'),
                    excerpt: `Explore ${label} with Benroso Safaris — curated routes, lodges, and expert guides.`,
                    href: localePath(
                      locale,
                      `/destinations?country=${label.toLowerCase().replace(' ', '-')}`
                    ),
                    title: label
                  }}
                  key={label}
                />
              ))}
        </div>
      </div>
    </section>
  );
}

export function HomeFeaturedTours({ locale, tours }: { locale: string; tours: PublicTour[] }) {
  return (
    <section className='benroso-section bg-white'>
      <div className='benroso-container'>
        <SectionHeader
          description='Find your next travel adventure — explore wildlife, enjoy the seaside, or book a curated safari package.'
          eyebrow='Latest Tour Packages'
          title='Popular Safari Tours & Packages'
        />
        <div className='mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {tours.length ? (
            tours.map((tour) => (
              <TourCard
                item={{
                  days: tour.days,
                  excerpt: tour.excerpt,
                  href: tour.href,
                  imageAlt: tour.imageAlt,
                  imageUrl: tour.imageUrl,
                  nights: tour.nights,
                  priceFrom: tour.priceFrom,
                  regionLabel: 'Safari',
                  title: tour.title
                }}
                key={tour.id}
              />
            ))
          ) : (
            <div className='col-span-full rounded-[var(--benroso-radius)] border border-dashed border-[var(--benroso-line)] bg-[var(--benroso-ivory)] px-8 py-14 text-center'>
              <p className='benroso-heading font-display text-2xl'>Safari tours coming soon</p>
              <p className='benroso-body mx-auto mt-3 max-w-xl'>
                Published tours from the CMS will appear here automatically once content is added in
                the admin.
              </p>
              <div className='mt-6'>
                <BenrosoButton href={localePath(locale, '/contact')}>
                  Tailor Make Your Tour
                </BenrosoButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function HomeTrustCta({
  locale,
  siteSettings
}: {
  locale: string;
  siteSettings: PublicSiteSettings;
}) {
  return (
    <section className='benroso-section bg-[var(--benroso-ivory)]'>
      <div className='benroso-container flex justify-center'>
        <div className='w-full max-w-xl rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white p-8 md:p-10'>
          <h3 className='benroso-heading font-display text-2xl'>Ready to start planning?</h3>
          <p className='benroso-body mt-3'>
            Tell us your dates, group size, and dream parks. Our safari planners will respond with a
            tailored proposal.
          </p>
          <div className='benroso-body mt-6 space-y-3 text-sm'>
            <p>{siteSettings.email}</p>
            <p>
              {siteSettings.phoneSecondary} / {siteSettings.phonePrimary}
            </p>
          </div>
          <div className='mt-6 flex flex-wrap gap-3'>
            <BenrosoButton href={localePath(locale, '/contact')} variant='accent'>
              Enquire Now
            </BenrosoButton>
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
  );
}

export function HomeServices() {
  const services = [
    {
      title: 'Tour Safaris',
      copy: 'Private and group game drives across Kenya and Tanzania national parks and reserves.'
    },
    {
      title: 'East Africa Safari Deals',
      copy: 'Curated packages combining parks, lodges, and seamless transfers at competitive prices.'
    },
    {
      title: 'Safari Vehicles',
      copy: 'Modern 4x4 safari cruisers with experienced driver-guides for safe, comfortable travel.'
    },
    {
      title: 'Tailor-Made Tours',
      copy: 'Itineraries built around your dates, budget, and interests — fully personalized.'
    }
  ];

  return (
    <section className='benroso-section bg-[var(--benroso-ivory)]'>
      <div className='benroso-container'>
        <SectionHeader eyebrow='Choose Safari' title='Find Your Next Travel Adventure' />
        <div className='mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
          {services.map((service) => (
            <article
              className='rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white p-6'
              key={service.title}
            >
              <h3 className='benroso-heading font-display text-xl'>{service.title}</h3>
              <p className='benroso-body mt-3 text-sm leading-7'>{service.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
