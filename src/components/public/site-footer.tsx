import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/components/icons';
import { FooterSocialLinks } from '@/components/public/footer-social-links';
import {
  BENROSO_KATO,
  BENROSO_LOGO_HEIGHT,
  BENROSO_LOGO_PATH,
  BENROSO_LOGO_WIDTH
} from '@/config/benroso';
import { localePath } from '@/lib/public/locale-path';
import type { PublicFooterColumn, PublicSiteSettings } from '@/lib/public/types';

type SiteFooterProps = {
  footerColumns: PublicFooterColumn[];
  locale: string;
  siteSettings: PublicSiteSettings;
};

function phoneHref(phone: string) {
  return phone.replace(/[^\d+]/g, '');
}

function FooterLinkColumn({ column }: { column: PublicFooterColumn }) {
  return (
    <nav aria-label={column.title}>
      <h3 className='benroso-footer-heading'>{column.title}</h3>
      <ul className='space-y-2.5'>
        {column.links.map((link) => (
          <li key={`${column.title}-${link.href}`}>
            <Link className='benroso-footer-link' href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter({ footerColumns, locale, siteSettings }: SiteFooterProps) {
  const homeHref = localePath(locale);
  const whyChooseHref = `${homeHref}#why-choose-us`;

  const linkColumns = footerColumns.filter((column) => column.title !== 'Help & Policies');
  const policyColumn = footerColumns.find((column) => column.title === 'Help & Policies');

  return (
    <footer className='benroso-footer bg-[var(--benroso-primary)] text-white'>
      {/* Brand + contact strip */}
      <div className='border-b border-white/10'>
        <div className='benroso-container py-8 lg:py-9'>
          <div className='benroso-footer-brand-grid'>
            <Link
              className='benroso-footer-brand-logo inline-flex shrink-0 items-center'
              href={homeHref}
            >
              <Image
                alt={siteSettings.companyName}
                className='h-[52px] w-auto max-w-none'
                height={BENROSO_LOGO_HEIGHT}
                src={BENROSO_LOGO_PATH}
                width={BENROSO_LOGO_WIDTH}
              />
            </Link>

            <div className='benroso-footer-contact'>
              <ul className='benroso-footer-contact-row'>
                <li className='flex items-center gap-2'>
                  <Icons.phone className='h-4 w-4 shrink-0 text-white' />
                  <span>
                    <a
                      className='hover:text-white'
                      href={`tel:${phoneHref(siteSettings.phoneSecondary)}`}
                    >
                      {siteSettings.phoneSecondary}
                    </a>
                    <span className='px-1.5 text-white/35'>/</span>
                    <a
                      className='hover:text-white'
                      href={`tel:${phoneHref(siteSettings.phonePrimary)}`}
                    >
                      {siteSettings.phonePrimary}
                    </a>
                  </span>
                </li>
                <li className='flex items-center gap-2'>
                  <Icons.mail className='h-4 w-4 shrink-0 text-white' />
                  <a className='hover:text-white' href={`mailto:${siteSettings.email}`}>
                    {siteSettings.email}
                  </a>
                </li>
              </ul>
              <p className='flex items-center gap-2 text-sm text-white/90'>
                <Icons.mapPin className='h-4 w-4 shrink-0 text-white' />
                <span>{siteSettings.addressShort}</span>
              </p>
            </div>

            <FooterSocialLinks siteSettings={siteSettings} />
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className='benroso-container py-10 lg:py-12'>
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
          {linkColumns.map((column) => (
            <FooterLinkColumn column={column} key={column.title} />
          ))}
        </div>
      </div>

      {/* KATO trust — compact reference, full story lives on homepage */}
      <div className='border-t border-white/10 bg-[var(--benroso-primary-dark)]'>
        <div className='benroso-container py-5'>
          <div className='flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-6'>
            <a
              className='inline-flex shrink-0 items-center hover:opacity-90'
              href={BENROSO_KATO.url}
              rel='noopener noreferrer'
              target='_blank'
            >
              {/* Official KATO bonded member seal */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={BENROSO_KATO.alt}
                className='h-8 w-8 shrink-0 object-contain'
                height={32}
                src={BENROSO_KATO.logoPath}
                width={32}
              />
            </a>
            <p className='text-sm font-medium text-white sm:text-base'>
              KATO Registered · Licensed Tour Operator · KPSGA Member
            </p>
            <Link
              className='text-sm font-medium text-white underline decoration-white/40 underline-offset-2 hover:text-white'
              href={whyChooseHref}
            >
              Why choose Benroso
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright + legal */}
      <div className='border-t border-white/10 bg-[#263528]'>
        <div className='benroso-container flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between'>
          <p className='text-xs leading-5 text-white/55'>
            © {new Date().getFullYear()} {siteSettings.companyName}. All rights reserved.
            {siteSettings.postalAddress ? (
              <span className='mt-1 block md:mt-0 md:inline md:before:mx-2 md:before:text-white/30 md:before:content-["|"]'>
                {siteSettings.postalAddress}
              </span>
            ) : null}
          </p>
          {policyColumn ? (
            <nav aria-label='Legal policies'>
              <ul className='flex flex-wrap gap-x-4 gap-y-2'>
                {policyColumn.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      className='text-xs text-white/55 transition-colors hover:text-white'
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
