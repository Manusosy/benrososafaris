import Image from 'next/image';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import type { AboutPerson } from '@/lib/public/about-placeholders';

type PersonProfileCardProps = {
  person: AboutPerson;
  showCertifications?: boolean;
  variant?: 'default' | 'featured';
};

export function PersonProfileCard({
  person,
  showCertifications = false,
  variant = 'default'
}: PersonProfileCardProps) {
  const isFeatured = variant === 'featured' || person.featured;

  return (
    <article
      className={cn(
        'overflow-hidden rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white',
        isFeatured && 'lg:flex lg:items-stretch'
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden bg-[var(--benroso-primary)]',
          isFeatured ? 'aspect-[4/3] lg:aspect-auto lg:w-[42%] lg:min-h-[280px]' : 'aspect-[4/3]'
        )}
      >
        <Image
          alt={person.imageAlt}
          className='object-cover'
          fill
          sizes={isFeatured ? '(max-width:1024px) 100vw, 400px' : '(max-width:768px) 100vw, 33vw'}
          src={person.imageUrl}
        />
        {person.department ? (
          <span className='absolute left-3 top-3 rounded-[var(--benroso-radius)] bg-[var(--benroso-primary-dark)]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white'>
            {person.department}
          </span>
        ) : null}
      </div>

      <div className={cn('p-5 md:p-6', isFeatured && 'lg:flex-1 lg:p-8')}>
        <h3 className='benroso-heading font-display text-xl leading-tight md:text-2xl'>
          {person.name}
        </h3>
        <p className='mt-1 text-sm font-semibold text-[var(--benroso-accent)]'>{person.role}</p>

        {person.yearsExperience ? (
          <p className='mt-3 flex items-center gap-2 text-xs text-[var(--benroso-muted)]'>
            <Icons.clock className='h-3.5 w-3.5 text-[var(--benroso-accent)]' />
            {person.yearsExperience} years experience
          </p>
        ) : null}

        <p className='benroso-body mt-4 text-sm leading-7'>{person.bio}</p>

        {person.languages.length ? (
          <div className='mt-4'>
            <p className='text-[10px] font-bold uppercase tracking-wider text-[var(--benroso-muted)]'>
              Languages
            </p>
            <div className='mt-2 flex flex-wrap gap-2'>
              {person.languages.map((lang) => (
                <span
                  className='rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-[var(--benroso-ivory)] px-2.5 py-1 text-xs text-[var(--benroso-muted)]'
                  key={lang}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {person.specialties.length ? (
          <div className='mt-4'>
            <p className='text-[10px] font-bold uppercase tracking-wider text-[var(--benroso-muted)]'>
              Specialties
            </p>
            <div className='mt-2 flex flex-wrap gap-2'>
              {person.specialties.map((item) => (
                <span
                  className='rounded-[var(--benroso-radius)] bg-[var(--benroso-primary)] px-2.5 py-1 text-xs font-medium text-white'
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {showCertifications && person.certifications?.length ? (
          <div className='mt-4'>
            <p className='text-[10px] font-bold uppercase tracking-wider text-[var(--benroso-muted)]'>
              Certifications
            </p>
            <ul className='mt-2 space-y-1.5'>
              {person.certifications.map((cert) => (
                <li
                  className='flex items-center gap-2 text-xs text-[var(--benroso-muted)]'
                  key={cert}
                >
                  <Icons.badgeCheck className='h-3.5 w-3.5 shrink-0 text-[var(--benroso-accent)]' />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
