import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/components/icons';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import type { PublicFleetVehicle } from '@/lib/public/types';

function labelOrFallback(value: string | null, fallback: string) {
  return value?.trim() || fallback;
}

export function FleetCard({ vehicle }: { vehicle: PublicFleetVehicle }) {
  const visibleFeatures = vehicle.features.slice(0, 3);

  return (
    <article className='group flex h-full flex-col overflow-hidden rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white shadow-sm transition-shadow hover:shadow-md'>
      <Link
        className='relative block aspect-[4/3] overflow-hidden bg-[var(--benroso-primary)]'
        href={vehicle.href}
      >
        {vehicle.imageUrl ? (
          <Image
            alt={vehicle.imageAlt || vehicle.title}
            className='object-cover transition-transform duration-500 group-hover:scale-105'
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
            src={vehicle.imageUrl}
          />
        ) : (
          <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--benroso-primary)] via-[var(--benroso-primary-dark)] to-[#19271f]'>
            <Icons.fleet className='size-12 text-white/25' />
            <span className='absolute bottom-4 left-4 right-4 font-display text-xl leading-tight text-white/90'>
              {vehicle.title}
            </span>
          </div>
        )}
        <span className='absolute left-3 top-3 rounded-[var(--benroso-radius)] border border-white/30 bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--benroso-ink)]'>
          {labelOrFallback(vehicle.vehicleType, 'Safari Vehicle')}
        </span>
        {vehicle.capacity ? (
          <span className='absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-[var(--benroso-radius)] bg-[var(--benroso-lime)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--benroso-primary-dark)]'>
            <Icons.teams className='size-3.5' />
            {vehicle.capacity} seats
          </span>
        ) : null}
      </Link>

      <div className='flex flex-1 flex-col p-5'>
        <h3 className='benroso-heading font-display text-2xl leading-tight'>
          <Link
            className='transition-colors hover:text-[var(--benroso-primary)]'
            href={vehicle.href}
          >
            {vehicle.title}
          </Link>
        </h3>
        {vehicle.summary ? (
          <p className='benroso-body mt-3 line-clamp-3 flex-1 text-[15px] leading-7'>
            {vehicle.summary}
          </p>
        ) : null}

        {visibleFeatures.length ? (
          <ul className='mt-5 space-y-2 border-t border-[var(--benroso-line)] pt-4 text-sm text-[var(--benroso-ink)]'>
            {visibleFeatures.map((feature) => (
              <li className='flex items-center gap-2' key={feature}>
                <Icons.check className='size-4 shrink-0 text-[var(--benroso-primary)]' />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className='mt-5'>
          <BenrosoButton href={vehicle.href} size='sm' variant='accent-outline'>
            View Vehicle
          </BenrosoButton>
        </div>
      </div>
    </article>
  );
}
