'use client';

import { Badge } from '@/components/ui/badge';
import type { EnquiryStatus } from '@/features/enquiries/api/types';
import { enquiryStatusLabel } from '@/features/enquiries/constants/enquiry-labels';
import { cn } from '@/lib/utils';

const STATUS_CLASS: Record<EnquiryStatus, string> = {
  pending: 'border-amber-200 bg-amber-50 text-amber-800',
  deal: 'border-green-200 bg-green-50 text-green-800',
  'no-deal': 'border-neutral-200 bg-neutral-50 text-neutral-700'
};

const FALLBACK_STATUS_CLASS = 'border-neutral-200 bg-neutral-50 text-neutral-700';

type EnquiryStatusBadgeProps = {
  className?: string;
  status: EnquiryStatus | string;
};

export function EnquiryStatusBadge({ className, status }: EnquiryStatusBadgeProps) {
  const statusClass = STATUS_CLASS[status as EnquiryStatus] ?? FALLBACK_STATUS_CLASS;

  return (
    <Badge className={cn('border font-normal', statusClass, className)} variant='outline'>
      {enquiryStatusLabel(status as EnquiryStatus)}
    </Badge>
  );
}
