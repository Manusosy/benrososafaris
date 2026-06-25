'use client';

import { ContactDetails } from '@/components/public/contact/contact-details';
import { ContactForm } from '@/components/public/contact/contact-form';
import { ContactScrollReveal } from '@/components/public/contact/contact-scroll-reveal';
import type { PublicSiteSettings } from '@/lib/public/types';

type ContactFormSectionProps = {
  locale: string;
  siteSettings: PublicSiteSettings;
};

export function ContactFormSection({ locale, siteSettings }: ContactFormSectionProps) {
  return (
    <ContactScrollReveal>
      <ContactForm locale={locale} sidebar={<ContactDetails siteSettings={siteSettings} />} />
    </ContactScrollReveal>
  );
}
