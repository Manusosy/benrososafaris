import type { Metadata } from 'next';

import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { localePath } from '@/lib/public/locale-path';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Your enquiry has been received. Our safari team will be in touch shortly.',
  robots: { index: false, follow: false }
};

type ThankYouPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ source?: string | string[] }>;
};

function resolveSource(source: string | string[] | undefined) {
  const value = Array.isArray(source) ? source[0] : source;
  if (value === 'tour' || value === 'contact') return value;
  return 'contact';
}

export default async function ThankYouPage({ params, searchParams }: ThankYouPageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const source = resolveSource(sp.source);

  const heading =
    source === 'tour'
      ? 'Thank you — your trip enquiry is with us'
      : 'Thank you — your enquiry is with us';

  const body =
    source === 'tour'
      ? 'Our safari planners have received your trip request and will reply with a tailored quote. We aim to respond within 24 hours.'
      : 'Our safari team has received your message and will be in touch shortly. We aim to respond within 24 hours.';

  return (
    <main className='bg-[var(--benroso-contact-body-bg)]'>
      <section className='benroso-container benroso-section'>
        <div className='mx-auto max-w-2xl text-center'>
          <p className='text-xs font-semibold uppercase tracking-[0.14em] text-[var(--benroso-muted)]'>
            Enquiry received
          </p>
          <h1 className='font-display mt-3 text-3xl text-[var(--benroso-heading)] sm:text-4xl'>
            {heading}
          </h1>
          <p className='mt-5 text-base leading-7 text-[var(--benroso-body)]'>{body}</p>
          <p className='mt-3 text-sm text-[var(--benroso-muted)]'>
            No payment is collected on this website. We listen first and tailor suggestions to your
            interests.
          </p>

          <div className='mt-10 flex flex-wrap items-center justify-center gap-3'>
            <BenrosoButton href={localePath(locale)} variant='gold'>
              Back to homepage
            </BenrosoButton>
            <BenrosoButton href={localePath(locale, '/tours')} variant='accent-outline'>
              Browse safari trips
            </BenrosoButton>
          </div>
        </div>
      </section>
    </main>
  );
}
