import { TourCard } from '@/components/public/cards/content-cards';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { localePath } from '@/lib/public/locale-path';
import type { PublicTour } from '@/lib/public/types';
import { cn } from '@/lib/utils';

type DestinationTripsSectionProps = {
  destinationName: string;
  description?: string;
  eyebrow?: string;
  id?: string;
  locale: string;
  title?: string;
  tours: PublicTour[];
  variant?: 'featured' | 'plain';
};

export function DestinationTripsSection({
  destinationName,
  description,
  eyebrow = 'Safari Tours',
  id = 'tours-safaris',
  locale,
  title,
  tours,
  variant = 'featured'
}: DestinationTripsSectionProps) {
  const heading = title ?? `Safaris to ${destinationName}`;
  const body =
    description ??
    `Hand-crafted itineraries that include ${destinationName}. Each one can be tailored to your dates, pace, and budget.`;

  return (
    <section
      className={cn(
        'scroll-mt-36',
        variant === 'plain'
          ? 'border-t border-[var(--benroso-line)] bg-white'
          : 'benroso-section bg-[var(--benroso-ivory)]'
      )}
      id={id}
    >
      <div
        className={cn(
          variant === 'plain' ? 'benroso-container py-10 md:py-12' : 'benroso-container'
        )}
      >
        <p className='benroso-eyebrow'>{eyebrow}</p>
        <h2 className='benroso-heading mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight'>
          {heading}
        </h2>
        <p className='benroso-body mt-3 max-w-2xl text-base leading-8'>{body}</p>

        {tours.length ? (
          <div className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {tours.map((tour) => (
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
            ))}
          </div>
        ) : (
          <div className='mt-8 rounded-[var(--benroso-radius)] border border-dashed border-[var(--benroso-line)] bg-white px-8 py-14 text-center'>
            <h3 className='benroso-heading font-display text-2xl'>
              Safaris to {destinationName} coming soon
            </h3>
            <p className='benroso-body mx-auto mt-3 max-w-xl'>
              We are putting together itineraries that visit {destinationName}. In the meantime, our
              team can build a custom safari around this destination for you.
            </p>
            <div className='mt-6'>
              <BenrosoButton href={localePath(locale, '/contact')}>
                Plan a Custom Safari
              </BenrosoButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
