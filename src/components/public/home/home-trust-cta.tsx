'use client';

import { Icons } from '@/components/icons';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { ScrollReveal } from '@/components/public/ui/scroll-reveal';
import { localePath } from '@/lib/public/locale-path';
import type { PublicSiteSettings } from '@/lib/public/types';

export function HomeTrustCta({
  locale,
  siteSettings
}: {
  locale: string;
  siteSettings: PublicSiteSettings;
}) {
  return (
    <section
      className='relative isolate bg-cover bg-center bg-fixed'
      style={{
        backgroundImage: "url('/assets/Saruni-Basecamp-The-Great-Migration-river-crossing.jpg')"
      }}
    >
      <div aria-hidden className='absolute inset-0 bg-black/60' />

      <div className='benroso-container benroso-section relative flex justify-center'>
        <ScrollReveal className='w-full max-w-lg rounded-[var(--benroso-radius)] bg-white p-8 text-center shadow-2xl md:p-10'>
          <h3 className='benroso-heading font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-tight'>
            Ready to Start Planning?
          </h3>
          <p className='benroso-body mx-auto mt-3 max-w-md'>
            Tell us your dates, group size, and the parks you want to see. Our planners will respond
            with a tailored proposal, usually within one business day.
          </p>
          <div className='benroso-body mt-6 space-y-1.5 text-sm'>
            <p>
              <a
                className='transition-colors hover:text-[var(--benroso-primary)]'
                href={`mailto:${siteSettings.email}`}
              >
                {siteSettings.email}
              </a>
            </p>
            <p>
              {siteSettings.phoneSecondary} / {siteSettings.phonePrimary}
            </p>
          </div>
          <div className='mt-7 flex justify-center'>
            <BenrosoButton
              className='border-[var(--benroso-lime)] bg-[var(--benroso-lime)] text-white [--benroso-fill:var(--benroso-primary)]'
              href={localePath(locale, '/contact')}
              variant='accent'
            >
              Enquire Now
              <Icons.arrowRight className='h-4 w-4' />
            </BenrosoButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
