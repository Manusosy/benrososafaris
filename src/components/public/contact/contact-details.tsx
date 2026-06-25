'use client';

import { ContactAdvantagesList } from '@/components/public/contact/contact-advantages-list';
import { ContactScrollReveal } from '@/components/public/contact/contact-scroll-reveal';
import { ContactSidebarMap } from '@/components/public/contact/contact-sidebar-map';
import { Icons } from '@/components/icons';
import { BENROSO_CONTACT_DEFAULTS, BENROSO_WHATSAPP } from '@/config/benroso';
import type { PublicSiteSettings } from '@/lib/public/types';
import { whatsAppHref } from '@/lib/public/whatsapp';

type ContactDetailsProps = {
  siteSettings: PublicSiteSettings;
};

export function ContactDetails({ siteSettings }: ContactDetailsProps) {
  const whatsappLink = whatsAppHref(
    BENROSO_WHATSAPP.phone,
    siteSettings.whatsappMessage || BENROSO_WHATSAPP.message
  );

  const phonePrimaryHref = `tel:${siteSettings.phonePrimary.replace(/[^\d+]/g, '')}`;
  const phoneSecondaryHref = `tel:${siteSettings.phoneSecondary.replace(/[^\d+]/g, '')}`;

  return (
    <aside className='benroso-contact-sidebar-inner space-y-8'>
      <ContactScrollReveal>
        <div className='benroso-contact-details-block'>
          <h2 className='benroso-contact-sidebar-heading'>Contact Details</h2>

          <div className='benroso-contact-credentials-box'>
            <dl className='benroso-contact-sidebar-list'>
              <div className='benroso-contact-sidebar-row'>
                <dt className='benroso-contact-sidebar-label'>Mobile &amp; Whatsapp:</dt>
                <dd className='benroso-contact-sidebar-value'>
                  <span className='benroso-contact-sidebar-phones'>
                    <a className='benroso-contact-sidebar-link' href={phonePrimaryHref}>
                      {siteSettings.phonePrimary}
                    </a>
                    <span aria-hidden className='benroso-contact-sidebar-separator'>
                      |
                    </span>
                    <a className='benroso-contact-sidebar-link' href={phoneSecondaryHref}>
                      {siteSettings.phoneSecondary}
                    </a>
                  </span>
                  <a
                    className='benroso-contact-sidebar-link benroso-contact-sidebar-link--whatsapp'
                    href={whatsappLink}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    WhatsApp chat
                    <Icons.externalLink aria-hidden />
                  </a>
                </dd>
              </div>

              <div className='benroso-contact-sidebar-row'>
                <dt className='benroso-contact-sidebar-label'>Email:</dt>
                <dd className='benroso-contact-sidebar-value'>
                  <a
                    className='benroso-contact-sidebar-link benroso-contact-sidebar-link--email'
                    href={`mailto:${siteSettings.email}`}
                  >
                    {siteSettings.email}
                  </a>
                </dd>
              </div>

              <div className='benroso-contact-sidebar-row'>
                <dt className='benroso-contact-sidebar-label'>Address:</dt>
                <dd className='benroso-contact-sidebar-value benroso-contact-sidebar-address'>
                  <p>{siteSettings.addressShort}</p>
                  <p>{siteSettings.postalAddress || BENROSO_CONTACT_DEFAULTS.postalAddress}</p>
                </dd>
              </div>
            </dl>
          </div>

          <ContactSidebarMap />
        </div>
      </ContactScrollReveal>

      <ContactScrollReveal>
        <div className='benroso-contact-advantages-block'>
          <h3 className='benroso-contact-sidebar-heading benroso-contact-sidebar-heading--sm'>
            Advantages of Booking with Benroso Safaris
          </h3>
          <div className='benroso-contact-credentials-box'>
            <ContactAdvantagesList />
          </div>
        </div>
      </ContactScrollReveal>
    </aside>
  );
}
