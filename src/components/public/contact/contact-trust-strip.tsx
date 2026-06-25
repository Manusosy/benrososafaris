import { Icons } from '@/components/icons';

const TRUST_POINTS = [
  {
    description:
      'Registered Kenya Association of Tour Operators member with professional on-the-ground support.',
    icon: Icons.badgeCheck,
    title: 'KATO & KPSGA Member'
  },
  {
    description:
      'Safari quote requests are reviewed by our planning team and answered within one business day.',
    icon: Icons.clock,
    title: '24-Hour Response'
  },
  {
    description: 'Guest reviews and verified representation on SafariBookings.com.',
    icon: Icons.exclusive,
    title: 'SafariBookings.com'
  }
] as const;

export function ContactTrustStrip() {
  return (
    <section className='border-t border-[var(--benroso-line)] bg-white'>
      <div className='benroso-container py-14 md:py-16'>
        <div className='grid gap-10 md:grid-cols-3 md:gap-8'>
          {TRUST_POINTS.map((point) => (
            <div className='max-w-sm' key={point.title}>
              <point.icon className='h-6 w-6 text-[var(--benroso-accent)]' />
              <h3 className='benroso-heading mt-4 font-display text-xl'>{point.title}</h3>
              <p className='mt-3 text-sm leading-7 text-[var(--benroso-muted)]'>
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
