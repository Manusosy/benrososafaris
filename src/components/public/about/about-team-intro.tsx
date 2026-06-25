import Image from 'next/image';

import { Icons } from '@/components/icons';

const BEHIND_THE_SCENES = [
  {
    title: 'Reservations & planning',
    description:
      'Quotes, itinerary refinements, and lodge confirmations tailored to your dates and budget.'
  },
  {
    title: 'Permits & park fees',
    description:
      'Park entries, gorilla permits, and cross-border paperwork handled before you arrive.'
  },
  {
    title: 'Fleet & logistics',
    description:
      'Vehicle assignments, maintenance schedules, and daily route coordination across East Africa.'
  },
  {
    title: 'Guest support',
    description:
      'On-trip assistance when plans shift — weather, flight changes, or special requests.'
  }
] as const;

export function AboutTeamIntro() {
  return (
    <section className='border-b border-[var(--benroso-line)] bg-[var(--benroso-ivory)]'>
      <div className='benroso-container benroso-section'>
        <div className='grid gap-10 lg:grid-cols-2 lg:items-center'>
          <div>
            <p className='benroso-eyebrow'>Behind Every Safari</p>
            <h2 className='benroso-heading mt-3 font-display text-2xl md:text-3xl'>
              The Operations Team That Makes Field Magic Happen
            </h2>
            <p className='benroso-body mt-5 text-sm leading-7'>
              While our guides and driver-guides are in the parks, our Nairobi team coordinates the
              details guests rarely see — but always depend on. From first enquiry to final airport
              transfer, committed personnel keep your safari seamless.
            </p>
          </div>
          <div className='relative aspect-[16/10] overflow-hidden rounded-[var(--benroso-radius)] bg-[var(--benroso-primary)]'>
            <Image
              alt='Benroso Safaris operations team coordinating safari logistics'
              className='object-cover'
              fill
              sizes='(max-width:1024px) 100vw, 50vw'
              src='https://images.unsplash.com/photo-1573497019940-884f9a4a87e8?auto=format&fit=crop&w=1200&q=80'
            />
          </div>
        </div>
        <div className='mt-12 grid gap-4 sm:grid-cols-2'>
          {BEHIND_THE_SCENES.map((item) => (
            <article
              className='rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white p-5'
              key={item.title}
            >
              <Icons.check className='h-4 w-4 text-[var(--benroso-accent)]' />
              <h3 className='benroso-heading mt-3 font-display text-lg'>{item.title}</h3>
              <p className='benroso-body mt-2 text-sm leading-7'>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
