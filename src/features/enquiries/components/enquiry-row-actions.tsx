'use client';

import type { Enquiry } from '@/features/enquiries/api/types';
import { EnquiryQuickActions } from '@/features/enquiries/components/enquiry-quick-actions';

type EnquiryRowActionsProps = {
  enquiry: Enquiry;
  onDeleted?: () => void;
  onView: () => void;
};

/** @deprecated Prefer EnquiryQuickActions in accordion expanded panels. */
export function EnquiryRowActions({ enquiry, onDeleted, onView }: EnquiryRowActionsProps) {
  return <EnquiryQuickActions enquiry={enquiry} onDeleted={onDeleted} onPrint={onView} />;
}

export { EnquiryQuickActions } from '@/features/enquiries/components/enquiry-quick-actions';
