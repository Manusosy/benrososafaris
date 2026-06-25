'use client';

import Link from 'next/link';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

type PublicHeroGhostCtaProps = {
  className?: string;
  href: string;
  label: string;
};

export function PublicHeroGhostCta({ className, href, label }: PublicHeroGhostCtaProps) {
  return (
    <Link
      className={cn(
        'group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-[3px] border border-white px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white',
        className
      )}
      href={href}
    >
      <span
        aria-hidden
        className='absolute inset-0 origin-left scale-x-0 bg-[var(--benroso-primary)] transition-transform duration-300 ease-out group-hover:scale-x-100'
      />
      <span className='relative z-10'>{label}</span>
      <Icons.arrowRight
        aria-hidden
        className='relative z-10 ml-0 h-4 w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-4 group-hover:opacity-100'
      />
    </Link>
  );
}
