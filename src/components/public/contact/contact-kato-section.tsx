'use client';

import Image from 'next/image';

import { ContactScrollReveal } from '@/components/public/contact/contact-scroll-reveal';
import { BENROSO_CONTACT_RESPONSE, BENROSO_KATO, BENROSO_SAFARI_BOOKINGS } from '@/config/benroso';

const TRUST_COLUMN = 'flex flex-col items-center px-4 text-center md:px-8';

const TRUST_IMAGE_ZONE = 'benroso-contact-trust-zone';

const TRUST_TITLE = 'benroso-heading mt-5 font-display text-lg';

const TRUST_DESC = 'mt-3 max-w-xs text-sm leading-7 text-[var(--benroso-muted)]';

export function ContactKatoSection() {
  return (
    <section className='border-t border-[var(--benroso-line)] bg-white'>
      <div className='benroso-container py-14 md:py-16'>
        <ContactScrollReveal className='grid gap-10 md:grid-cols-3 md:items-start md:gap-0' stagger>
          <div className={TRUST_COLUMN} data-contact-reveal>
            <div className={TRUST_IMAGE_ZONE}>
              <Image
                alt={BENROSO_CONTACT_RESPONSE.alt}
                className='benroso-contact-trust-image benroso-contact-trust-image--response'
                height={BENROSO_CONTACT_RESPONSE.imageHeight}
                src={BENROSO_CONTACT_RESPONSE.imagePath}
                width={BENROSO_CONTACT_RESPONSE.imageWidth}
              />
            </div>
            <h3 className={TRUST_TITLE}>24-Hour Response</h3>
            <p className={TRUST_DESC}>
              Safari quote requests are reviewed by our planning team and answered within one
              business day.
            </p>
          </div>

          <div
            className={`${TRUST_COLUMN} border-y border-[var(--benroso-line)] md:border-x md:border-y-0`}
            data-contact-reveal
          >
            <a
              className='group flex w-full flex-col items-center text-center'
              href={BENROSO_KATO.url}
              rel='noopener noreferrer'
              target='_blank'
            >
              <div className={TRUST_IMAGE_ZONE}>
                <Image
                  alt={BENROSO_KATO.alt}
                  className='benroso-contact-trust-image benroso-contact-trust-image--kato transition-transform group-hover:scale-[1.02]'
                  height={BENROSO_KATO.logoHeight}
                  src={BENROSO_KATO.logoPath}
                  width={BENROSO_KATO.logoWidth}
                />
              </div>
              <p className={TRUST_TITLE}>KATO Member</p>
              <p className={TRUST_DESC}>Registered Kenya Association of Tour Operators member.</p>
            </a>
          </div>

          <div className={TRUST_COLUMN} data-contact-reveal>
            <a
              className='group flex w-full flex-col items-center text-center'
              href={BENROSO_SAFARI_BOOKINGS.url}
              rel='noopener noreferrer'
              target='_blank'
            >
              <div className={TRUST_IMAGE_ZONE}>
                <Image
                  alt={BENROSO_SAFARI_BOOKINGS.alt}
                  className='benroso-contact-trust-image benroso-contact-trust-image--safari-bookings transition-transform group-hover:scale-[1.02]'
                  height={BENROSO_SAFARI_BOOKINGS.logoHeight}
                  src={BENROSO_SAFARI_BOOKINGS.logoPath}
                  width={BENROSO_SAFARI_BOOKINGS.logoWidth}
                />
              </div>
              <p className={TRUST_TITLE}>SafariBookings.com</p>
              <p className={TRUST_DESC}>
                Verified guest reviews and trusted safari operator representation online.
              </p>
            </a>
          </div>
        </ContactScrollReveal>
      </div>
    </section>
  );
}
