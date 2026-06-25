'use client';

import { Badge } from '@/components/ui/badge';
import { ENQUIRY_TYPE_META, enquiryTypeLabel } from '@/features/enquiries/constants/enquiry-labels';
import type { EnquiryType } from '@/features/enquiries/api/types';
import { cn } from '@/lib/utils';

type EnquiryTypeBadgeProps = {
  className?: string;
  type: string;
};

export function EnquiryTypeBadge({ className, type }: EnquiryTypeBadgeProps) {
  const meta = ENQUIRY_TYPE_META[type as EnquiryType];
  const label = enquiryTypeLabel(type);

  return (
    <Badge
      className={cn('font-normal whitespace-nowrap', className)}
      variant={meta?.variant ?? 'outline'}
    >
      {label}
    </Badge>
  );
}
