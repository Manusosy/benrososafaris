'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Icons } from '@/components/icons';
import {
  BENROSO_LOGO_HEIGHT,
  BENROSO_LOGO_PATH,
  BENROSO_LOGO_WIDTH,
  BENROSO_TRIPADVISOR,
  BENROSO_WHATSAPP
} from '@/config/benroso';
import { localePath, stripLocalePrefix } from '@/lib/public/locale-path';
import { SUPPORTED_LOCALES } from '@/lib/i18n';
import type { PublicNavItem, PublicSiteSettings } from '@/lib/public/types';
import { cn } from '@/lib/utils';

type SiteHeaderProps = {
  locale: string;
  navItems: PublicNavItem[];
  siteSettings: PublicSiteSettings;
};

function phoneHref(phone: string) {
  return phone.replace(/[^\d+]/g, '');
}

function whatsAppHref(phone: string, message: string) {
  const digits = phone.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function getDropdownPositionClass(label: string) {
  if (label === 'About Us') {
    return 'left-0 translate-x-0';
  }

  return 'left-1/2 -translate-x-1/2';
}

export function SiteHeader({ locale, navItems, siteSettings }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setIsAtTop(window.scrollY <= 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  const homeHref = localePath(locale);
  const whatsappHref = whatsAppHref(
    BENROSO_WHATSAPP.phone,
    siteSettings.whatsappMessage || BENROSO_WHATSAPP.message
  );
  const navOnlyItems = navItems.filter((item) => item.label !== 'Home');

  return (
    <>
      {/* Top utility row — desktop only; scrolls away when not at top */}
      <div
        className={cn(
          'hidden border-b border-white/10 bg-[var(--benroso-primary-dark)] text-white transition-opacity duration-300 lg:block',
          isAtTop ? 'opacity-100' : 'hidden'
        )}
      >
        <div className='benroso-container flex min-h-[var(--benroso-topbar-h)] flex-wrap items-center justify-between gap-4 py-3 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center'>
          <Link className='inline-flex shrink-0 items-center' href={homeHref}>
            <Image
              alt={siteSettings.companyName}
              className='h-[54px] w-auto max-w-none'
              height={BENROSO_LOGO_HEIGHT}
              priority
              src={BENROSO_LOGO_PATH}
              width={BENROSO_LOGO_WIDTH}
            />
          </Link>

          <TripAdvisorBadge />

          <div className='hidden items-center justify-end gap-8 lg:flex'>
            <div className='text-right text-sm leading-6'>
              <div className='flex items-center justify-end gap-2'>
                <Icons.phone className='h-4 w-4 shrink-0 text-[var(--benroso-brand-gold)]' />
                <span className='whitespace-nowrap text-white/90'>
                  <a
                    className='hover:text-white'
                    href={`tel:${phoneHref(siteSettings.phoneSecondary)}`}
                  >
                    {siteSettings.phoneSecondary}
                  </a>
                  <span className='px-1 text-white/50'>/</span>
                  <a
                    className='hover:text-white'
                    href={`tel:${phoneHref(siteSettings.phonePrimary)}`}
                  >
                    {siteSettings.phonePrimary}
                  </a>
                </span>
              </div>
              <a
                className='mt-1 flex items-center justify-end gap-2 hover:text-white'
                href={`mailto:${siteSettings.email}`}
              >
                <Icons.mail className='h-4 w-4 shrink-0 text-[var(--benroso-brand-gold)]' />
                {siteSettings.email}
              </a>
            </div>
            <a
              aria-label='Help me plan my safari on WhatsApp'
              className='group inline-flex min-h-9 items-center justify-center gap-2 rounded-[var(--benroso-button-radius)] border border-[var(--benroso-brand-gold)] bg-transparent px-4 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--benroso-brand-gold)] transition-colors duration-200 hover:bg-[var(--benroso-brand-gold)] hover:text-[var(--benroso-primary-dark)]'
              href={whatsappHref}
              rel='noopener noreferrer'
              target='_blank'
            >
              <span>Help Me Plan</span>
              <Icons.whatsapp aria-hidden className='hidden h-5 w-5 shrink-0 group-hover:block' />
            </a>
          </div>
        </div>
      </div>

      {/* Nav pins to viewport top once user scrolls past the utility bar */}
      <header
        className={cn(
          'z-50 overflow-visible border-b border-white/10 bg-[var(--benroso-primary)] text-white',
          isAtTop
            ? 'relative'
            : 'fixed inset-x-0 top-0 border-b border-[var(--benroso-primary-dark)]'
        )}
      >
        <div className='benroso-container relative flex h-[var(--benroso-header-h)] items-center justify-between gap-3 overflow-visible lg:justify-center lg:pr-16'>
          <Link className='inline-flex shrink-0 items-center lg:hidden' href={homeHref}>
            <Image
              alt={siteSettings.companyName}
              className='h-11 w-auto max-w-[min(52vw,200px)]'
              height={BENROSO_LOGO_HEIGHT}
              priority
              src={BENROSO_LOGO_PATH}
              width={BENROSO_LOGO_WIDTH}
            />
          </Link>

          <nav aria-label='Primary' className='hidden overflow-visible lg:block'>
            <ul className='flex flex-nowrap items-center gap-x-4 overflow-visible xl:gap-x-7'>
              {navOnlyItems.map((item) => {
                const isOpen = openGroup === item.label;
                const hasChildren = !!item.items?.length;
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <li
                    className='relative shrink-0'
                    key={item.label}
                    onMouseEnter={() => hasChildren && setOpenGroup(item.label)}
                    onMouseLeave={() => hasChildren && setOpenGroup(null)}
                  >
                    <Link
                      className={cn(
                        'inline-flex items-center gap-1.5 whitespace-nowrap border-b-2 border-transparent py-6 text-[15px] font-normal uppercase leading-none tracking-normal transition-colors xl:text-base',
                        'hover:border-white hover:text-white',
                        isActive && 'border-white text-white'
                      )}
                      href={item.href}
                    >
                      {item.label}
                      {hasChildren ? (
                        <Icons.chevronDown className={cn('h-3.5 w-3.5', isOpen && 'rotate-180')} />
                      ) : null}
                    </Link>
                    {hasChildren && isOpen ? (
                      <div
                        className={cn(
                          'absolute top-full z-50 min-w-[210px] pt-0',
                          getDropdownPositionClass(item.label)
                        )}
                      >
                        <ul className='overflow-hidden rounded-b-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white py-1'>
                          {item.items!.map((child) => (
                            <li key={`${item.label}-${child.href}`}>
                              <Link
                                className='block px-4 py-2.5 text-[15px] leading-snug text-[var(--benroso-muted)] transition-colors hover:bg-[var(--benroso-primary)] hover:text-white'
                                href={child.href}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className='flex shrink-0 items-center gap-2 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:gap-3'>
            <LanguageSelector locale={locale} pathname={pathname} />
            <button
              aria-expanded={mobileOpen}
              aria-label='Toggle menu'
              className='inline-flex h-10 w-10 items-center justify-center rounded-[var(--benroso-button-radius)] border border-white/25 text-white transition-colors hover:border-white hover:text-white lg:hidden'
              onClick={() => setMobileOpen((v) => !v)}
              type='button'
            >
              {mobileOpen ? (
                <Icons.close className='h-5 w-5' />
              ) : (
                <Icons.menu className='h-5 w-5' />
              )}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className='border-t border-white/10 bg-[var(--benroso-primary)] lg:hidden'>
            <div className='benroso-container max-h-[min(70vh,520px)] overflow-y-auto py-4'>
              <a
                aria-label='Help me plan my safari on WhatsApp'
                className='group mb-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-[var(--benroso-button-radius)] border border-[var(--benroso-brand-gold)] bg-transparent px-4 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--benroso-brand-gold)] transition-colors hover:bg-[var(--benroso-brand-gold)] hover:text-[var(--benroso-primary-dark)]'
                href={whatsappHref}
                onClick={() => setMobileOpen(false)}
                rel='noopener noreferrer'
                target='_blank'
              >
                <span>Help Me Plan</span>
                <Icons.whatsapp aria-hidden className='h-5 w-5 shrink-0' />
              </a>

              {navOnlyItems.map((item) => {
                const expanded = openGroup === item.label;
                const hasChildren = !!item.items?.length;
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <div className='border-b border-white/10 py-1' key={item.label}>
                    <div className='flex items-center justify-between gap-3'>
                      <Link
                        className={cn(
                          'flex-1 py-3 text-[15px] font-normal uppercase tracking-normal transition-colors',
                          isActive ? 'text-white' : 'text-white hover:text-white'
                        )}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {hasChildren ? (
                        <button
                          aria-expanded={expanded}
                          aria-label={`Toggle ${item.label}`}
                          className='inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--benroso-button-radius)] text-white hover:text-white'
                          onClick={() => setOpenGroup(expanded ? null : item.label)}
                          type='button'
                        >
                          <Icons.chevronDown
                            className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180')}
                          />
                        </button>
                      ) : null}
                    </div>
                    {hasChildren && expanded ? (
                      <ul className='space-y-0.5 pb-2 pl-3'>
                        {item.items!.map((child) => (
                          <li key={`mobile-${child.href}`}>
                            <Link
                              className='block py-2.5 text-sm text-white/85 transition-colors hover:text-white'
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}

              <div className='mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-white/85'>
                <a
                  className='flex items-center gap-2 hover:text-white'
                  href={`tel:${phoneHref(siteSettings.phoneSecondary)}`}
                >
                  <Icons.phone className='h-4 w-4 shrink-0 text-[var(--benroso-brand-gold)]' />
                  {siteSettings.phoneSecondary}
                </a>
                <a
                  className='flex items-center gap-2 hover:text-white'
                  href={`mailto:${siteSettings.email}`}
                >
                  <Icons.mail className='h-4 w-4 shrink-0 text-[var(--benroso-brand-gold)]' />
                  {siteSettings.email}
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </header>
      {isAtTop ? null : <div aria-hidden className='h-[var(--benroso-header-h)] shrink-0' />}
    </>
  );
}

function TripAdvisorBadge() {
  return (
    <a
      className='hidden items-center justify-center gap-2.5 hover:opacity-90 lg:flex'
      href={BENROSO_TRIPADVISOR.url}
      rel='noopener noreferrer'
      target='_blank'
    >
      {/* Official TripAdvisor wordmark (dark-background variant) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt='Tripadvisor'
        className='h-7 w-[133px] shrink-0 object-contain object-left'
        height={28}
        src={BENROSO_TRIPADVISOR.wordmarkPath}
        width={133}
      />
      <span className='flex items-center gap-2'>
        <span className='text-sm font-normal leading-none text-white'>
          {BENROSO_TRIPADVISOR.rating}
        </span>
        <TripAdvisorRatingDots />
      </span>
      <span className='text-sm font-normal uppercase leading-none text-white'>
        {BENROSO_TRIPADVISOR.reviewLabel}
      </span>
    </a>
  );
}

function TripAdvisorRatingDots() {
  return (
    <svg aria-hidden className='h-4 w-[97px] shrink-0' fill='none' viewBox='0 0 97 16'>
      <circle cx='8.35156' cy='8' fill='#00AA6C' r='8' />
      <circle cx='28.3516' cy='8' fill='#00AA6C' r='8' />
      <circle cx='48.3516' cy='8' fill='#00AA6C' r='8' />
      <circle cx='68.3516' cy='8' fill='#00AA6C' r='8' />
      <circle cx='88.3516' cy='8' fill='#00AA6C' r='8' />
    </svg>
  );
}

function LanguageSelector({
  className,
  locale,
  pathname
}: {
  className?: string;
  locale: string;
  pathname: string;
}) {
  const basePath = stripLocalePrefix(pathname, locale);

  return (
    <details className={cn('relative', className)}>
      <summary className='flex h-10 min-w-10 cursor-pointer list-none items-center justify-center gap-1 rounded-[var(--benroso-button-radius)] border border-white/25 px-2.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:border-white hover:text-white [&::-webkit-details-marker]:hidden'>
        <Icons.world className='h-3.5 w-3.5 shrink-0' />
        <span>{locale}</span>
      </summary>
      <ul className='absolute right-0 top-full z-50 mt-2 min-w-[120px] overflow-hidden rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white py-1'>
        {SUPPORTED_LOCALES.map((code) => (
          <li key={code}>
            <Link
              className={cn(
                'block px-3 py-2 text-sm uppercase text-[var(--benroso-muted)] hover:bg-[var(--benroso-ivory)]',
                code === locale && 'font-semibold text-[var(--benroso-primary)]'
              )}
              href={localePath(code, basePath)}
            >
              {code}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
