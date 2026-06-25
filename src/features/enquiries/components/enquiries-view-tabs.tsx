'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';

type EnquiriesViewTabsProps = {
  trashCount?: number;
  variant?: 'active' | 'trash';
};

export function EnquiriesViewTabs({ trashCount = 0, variant = 'active' }: EnquiriesViewTabsProps) {
  return (
    <nav aria-label='Enquiry views' className='flex items-center gap-2 text-sm'>
      <Link
        className={cn(
          'hover:text-[#3c5142]',
          variant === 'active' ? 'font-semibold text-[#3c5142]' : 'text-muted-foreground'
        )}
        href='/portal/enquiries'
      >
        Active
      </Link>
      <span className='text-muted-foreground'>|</span>
      <Link
        className={cn(
          'hover:text-[#3c5142]',
          variant === 'trash' ? 'font-semibold text-[#3c5142]' : 'text-muted-foreground'
        )}
        href='/portal/enquiries/trash'
      >
        Trash <span className='text-muted-foreground'>({trashCount})</span>
      </Link>
    </nav>
  );
}
