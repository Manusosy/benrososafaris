import Image from 'next/image';

import { Icons } from '@/components/icons';
import { PersonProfileCard } from '@/components/public/about/person-profile-card';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { SectionHeader } from '@/components/public/ui/section-header';
import type { AboutPerson } from '@/lib/public/about-placeholders';

type AboutPeopleSectionProps = {
  contactHref: string;
  description: string;
  eyebrow: string;
  fleetHref?: string;
  introImage?: { alt: string; url: string };
  people: AboutPerson[];
  showCertifications?: boolean;
  title: string;
};

export function AboutPeopleSection({
  contactHref,
  description,
  eyebrow,
  fleetHref,
  introImage,
  people,
  showCertifications = false,
  title
}: AboutPeopleSectionProps) {
  const featured = people.filter((p) => p.featured);
  const rest = people.filter((p) => !p.featured);

  return (
    <div className='space-y-0'>
      <section className='benroso-section bg-white'>
        <div className='benroso-container'>
          <div className='grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center'>
            <SectionHeader align='left' description={description} eyebrow={eyebrow} title={title} />
            {introImage ? (
              <div className='relative aspect-[16/10] overflow-hidden rounded-[var(--benroso-radius)] bg-[var(--benroso-primary)]'>
                <Image
                  alt={introImage.alt}
                  className='object-cover'
                  fill
                  sizes='(max-width:1024px) 100vw, 45vw'
                  src={introImage.url}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {featured.length ? (
        <section className='border-t border-[var(--benroso-line)] bg-[var(--benroso-ivory)]'>
          <div className='benroso-container benroso-section'>
            <p className='benroso-eyebrow'>Featured</p>
            <h2 className='benroso-heading mt-3 font-display text-2xl md:text-3xl'>
              Spotlight Profiles
            </h2>
            <div className='mt-10 space-y-8'>
              {featured.map((person) => (
                <PersonProfileCard
                  key={person.id}
                  person={person}
                  showCertifications={showCertifications}
                  variant='featured'
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className='benroso-section bg-white'>
        <div className='benroso-container'>
          <h2 className='benroso-heading font-display text-2xl md:text-3xl'>Meet the Team</h2>
          <p className='benroso-body mt-3 max-w-2xl text-sm leading-7'>
            Profile photos and bios are placeholders — full team profiles will be managed from the
            dashboard.
          </p>
          <div className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {rest.map((person) => (
              <PersonProfileCard
                key={person.id}
                person={person}
                showCertifications={showCertifications}
              />
            ))}
          </div>
        </div>
      </section>

      {fleetHref ? (
        <section className='border-t border-[var(--benroso-line)] bg-[var(--benroso-ivory)]'>
          <div className='benroso-container benroso-section'>
            <div className='grid items-center gap-8 lg:grid-cols-2'>
              <div className='relative aspect-[16/10] overflow-hidden rounded-[var(--benroso-radius)] bg-[var(--benroso-primary)]'>
                <Image
                  alt='Safari Land Cruiser on a game drive'
                  className='object-cover'
                  fill
                  sizes='(max-width:1024px) 100vw, 50vw'
                  src='https://images.unsplash.com/photo-1523805009345-7448845a9e3?auto=format&fit=crop&w=1200&q=80'
                />
              </div>
              <div>
                <p className='benroso-eyebrow'>Your Driver-Guide & Vehicle</p>
                <h2 className='benroso-heading mt-3 font-display text-2xl md:text-3xl'>
                  Paired for Safety, Comfort, and the Best Sightings
                </h2>
                <p className='benroso-body mt-5 text-sm leading-7'>
                  Every driver-guide works with a maintained 4×4 safari cruiser — daily vehicle
                  checks, fuel, water, and roadside readiness before your game drive begins.
                </p>
                <ul className='mt-5 space-y-3 text-sm text-[var(--benroso-muted)]'>
                  <li className='flex gap-3'>
                    <Icons.check className='mt-0.5 h-4 w-4 shrink-0 text-[var(--benroso-accent)]' />
                    Modern Land Cruisers with pop-up roofs and charging points
                  </li>
                  <li className='flex gap-3'>
                    <Icons.check className='mt-0.5 h-4 w-4 shrink-0 text-[var(--benroso-accent)]' />
                    Defensive driving certification and first-aid trained staff
                  </li>
                  <li className='flex gap-3'>
                    <Icons.check className='mt-0.5 h-4 w-4 shrink-0 text-[var(--benroso-accent)]' />
                    Guest comfort: shade, seating, and pace matched to your group
                  </li>
                </ul>
                <div className='mt-8'>
                  <BenrosoButton href={fleetHref} variant='primary'>
                    View Full Safari Fleet
                  </BenrosoButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className='border-t border-[var(--benroso-line)] bg-[var(--benroso-primary-dark)] text-white'>
        <div className='benroso-container py-14 text-center md:py-16'>
          <h2 className='font-display text-2xl md:text-3xl'>Work With Our Team</h2>
          <p className='mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80'>
            Request a guide with specific specialties or ask us to match you with the right
            driver-guide for your route.
          </p>
          <div className='mt-8'>
            <BenrosoButton href={contactHref}>Contact Our Planners</BenrosoButton>
          </div>
        </div>
      </section>
    </div>
  );
}
