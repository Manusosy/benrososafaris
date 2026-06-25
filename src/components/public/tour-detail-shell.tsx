import Link from 'next/link';

import { Icons } from '@/components/icons';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { localePath } from '@/lib/public/locale-path';

const tabs = ['Description', 'Itinerary', 'Price & Seasons', "What's Included"];

type TourDetailShellProps = {
  days?: number | null;
  excerpt?: string | null;
  locale: string;
  priceFrom?: number | null;
  title: string;
};

export function TourDetailShell({ days, excerpt, locale, priceFrom, title }: TourDetailShellProps) {
  const price =
    priceFrom != null
      ? new Intl.NumberFormat('en-US', {
          currency: 'USD',
          maximumFractionDigits: 0,
          style: 'currency'
        }).format(priceFrom)
      : null;

  return (
    <>
      <section className='bg-white pt-8'>
        <div className='benroso-container'>
          <div className='aspect-[21/9] overflow-hidden rounded-[var(--benroso-radius)] bg-[var(--benroso-primary-light)]' />
        </div>
      </section>

      <nav className='sticky top-[calc(var(--benroso-topbar-h)+var(--benroso-header-h))] z-40 border-y border-white/10 bg-[var(--benroso-primary-dark)] text-white'>
        <div className='benroso-container flex flex-wrap'>
          {tabs.map((tab) => (
            <a
              className='border-b-2 border-transparent px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] hover:border-white hover:text-white'
              href={`#${tab.toLowerCase().replace(/\s+/g, '-')}`}
              key={tab}
            >
              {tab}
            </a>
          ))}
        </div>
      </nav>

      <section className='benroso-section bg-[var(--benroso-ivory)]'>
        <div className='benroso-container grid gap-10 xl:grid-cols-[minmax(0,1fr)_340px]'>
          <article className='space-y-8'>
            <div id='description'>
              <h1 className='benroso-heading mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-tight'>
                {title}
              </h1>
              {excerpt ? (
                <p className='mt-4 text-lg leading-8 text-[var(--benroso-muted)]'>{excerpt}</p>
              ) : null}
            </div>
            <div
              className='rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white p-6'
              id='itinerary'
            >
              <h2 className='benroso-heading font-display text-2xl'>Day-by-Day Itinerary</h2>
              <p className='mt-3 text-sm text-[var(--benroso-muted)]'>
                Full itinerary content will render from CMS once published.
              </p>
            </div>
          </article>

          <aside className='h-fit space-y-4 xl:sticky xl:top-[calc(var(--benroso-topbar-h)+var(--benroso-header-h)+4rem)]'>
            <div className='rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white p-6'>
              {days ? (
                <p className='text-sm font-semibold uppercase tracking-wide text-[var(--benroso-muted)]'>
                  {days} Days
                </p>
              ) : null}
              {price ? (
                <p className='mt-2'>
                  <span className='text-xs uppercase tracking-wide text-[var(--benroso-muted)]'>
                    From
                  </span>
                  <strong className='block text-3xl text-[var(--benroso-brown)]'>{price}</strong>
                </p>
              ) : null}
              <div className='mt-5 space-y-3'>
                <BenrosoButton
                  className='w-full justify-center'
                  href={localePath(locale, '/contact')}
                >
                  Enquire Now
                </BenrosoButton>
                <Link
                  className='inline-flex w-full items-center justify-center gap-2 rounded-[var(--benroso-button-radius)] border border-[var(--benroso-accent)] px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-[var(--benroso-accent)]'
                  href={localePath(locale, '/contact')}
                >
                  Help Me Choose
                </Link>
              </div>
            </div>
            <div className='rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white p-6'>
              <h3 className='benroso-heading font-display text-lg'>Why Benroso Safaris?</h3>
              <ul className='mt-4 space-y-2 text-sm text-[var(--benroso-muted)]'>
                <li className='flex gap-2'>
                  <Icons.check className='mt-0.5 h-4 w-4 text-[var(--benroso-accent)]' />
                  Customizable private safaris
                </li>
                <li className='flex gap-2'>
                  <Icons.check className='mt-0.5 h-4 w-4 text-[var(--benroso-accent)]' />
                  Local expert guides
                </li>
                <li className='flex gap-2'>
                  <Icons.check className='mt-0.5 h-4 w-4 text-[var(--benroso-accent)]' />
                  Secure booking support
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
