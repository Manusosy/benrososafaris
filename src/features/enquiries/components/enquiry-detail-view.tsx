'use client';

import * as React from 'react';

import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { enquiryDetailQueryOptions, enquiryKeys } from '@/features/enquiries/api/queries';
import { updateEnquiryStatus } from '@/features/enquiries/api/service';
import type { EnquiryStatus } from '@/features/enquiries/api/types';
import { EnquiryDetailDocument } from '@/features/enquiries/components/enquiry-detail-document';
import { ENQUIRY_STATUS_OPTIONS } from '@/features/enquiries/constants/enquiry-labels';
import '@/features/enquiries/styles/enquiries-print.css';
import { CMS_SURFACE } from '@/features/portal/cms/shared/surface';
import {
  buildEnquiryMailtoUrl,
  buildEnquiryWhatsAppUrl,
  getEnquiryCallUrl
} from '@/lib/enquiries/enquiry-comms';
import { cn } from '@/lib/utils';

const PORTAL_SELECT_TRIGGER = cn(CMS_SURFACE, 'bg-white text-[#111827] shadow-xs hover:bg-white');

type EnquiryDetailViewProps = {
  id: string;
};

export function EnquiryDetailView({ id }: EnquiryDetailViewProps) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { data: enquiry } = useSuspenseQuery(enquiryDetailQueryOptions(id));

  if (!enquiry) {
    notFound();
  }

  const mailtoUrl = buildEnquiryMailtoUrl(enquiry);
  const whatsappUrl = buildEnquiryWhatsAppUrl(enquiry);
  const callUrl = getEnquiryCallUrl(enquiry);

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: enquiryKeys.all });
  };

  const statusMutation = useMutation({
    mutationFn: (status: EnquiryStatus) => updateEnquiryStatus({ id: enquiry.id, status }),
    onSuccess: () => {
      toast.success('Status updated.');
      invalidate();
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : 'Update failed.')
  });

  React.useEffect(() => {
    if (searchParams.get('print') !== '1') return;

    const timeout = window.setTimeout(() => {
      window.print();
    }, 400);

    return () => window.clearTimeout(timeout);
  }, [searchParams]);

  return (
    <div className='space-y-5'>
      <div className='enquiry-detail-no-print flex flex-col gap-3 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] p-4 lg:flex-row lg:items-center lg:justify-between'>
        <div className='space-y-1'>
          <p className='font-mono text-xs tracking-wide text-[#6B7280] uppercase'>
            {enquiry.referenceCode}
          </p>
          <div className='flex flex-wrap items-center gap-2'>
            <Button asChild size='sm' variant='outline'>
              <Link href='/portal/enquiries'>
                <Icons.chevronLeft className='size-4' />
                Back to list
              </Link>
            </Button>
            <Button onClick={() => window.print()} size='sm' type='button' variant='outline'>
              <Icons.page className='size-4' />
              Print
            </Button>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          <Button asChild className='bg-[#3C5142] hover:bg-[#324538]' size='sm'>
            <Link href={mailtoUrl}>
              <Icons.mail className='size-4' />
              Email
            </Link>
          </Button>
          {whatsappUrl ? (
            <Button asChild size='sm' variant='outline'>
              <Link href={whatsappUrl} rel='noopener noreferrer' target='_blank'>
                <Icons.whatsapp className='size-4' />
                WhatsApp
              </Link>
            </Button>
          ) : null}
          {callUrl ? (
            <Button asChild size='sm' variant='outline'>
              <Link href={callUrl}>
                <Icons.phone className='size-4' />
                Call
              </Link>
            </Button>
          ) : null}

          <Select
            disabled={statusMutation.isPending}
            onValueChange={(value) => statusMutation.mutate(value as EnquiryStatus)}
            value={enquiry.status}
          >
            <SelectTrigger className={cn(PORTAL_SELECT_TRIGGER, 'w-[160px]')}>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent className={CMS_SURFACE}>
              {ENQUIRY_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <EnquiryDetailDocument enquiry={enquiry} />
    </div>
  );
}
