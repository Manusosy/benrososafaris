'use client';

import * as React from 'react';

import Link from 'next/link';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Icons } from '@/components/icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { enquiryKeys } from '@/features/enquiries/api/queries';
import { trashEnquiry, updateEnquiryStatus } from '@/features/enquiries/api/service';
import type { Enquiry, EnquiryStatus } from '@/features/enquiries/api/types';
import { ENQUIRY_STATUS_OPTIONS } from '@/features/enquiries/constants/enquiry-labels';
import { CMS_SURFACE } from '@/features/portal/cms/shared/surface';
import {
  buildEnquiryMailtoUrl,
  buildEnquiryWhatsAppUrl,
  getEnquiryCallUrl
} from '@/lib/enquiries/enquiry-comms';
import { cn } from '@/lib/utils';

const PORTAL_SELECT_TRIGGER = cn(CMS_SURFACE, 'bg-white text-[#111827] shadow-xs hover:bg-white');

type EnquiryQuickActionsProps = {
  className?: string;
  enquiry: Enquiry;
  onDeleted?: () => void;
  onPrint: () => void;
};

export function EnquiryQuickActions({
  className,
  enquiry,
  onDeleted,
  onPrint
}: EnquiryQuickActionsProps) {
  const queryClient = useQueryClient();
  const [trashOpen, setTrashOpen] = React.useState(false);
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

  const trashMutation = useMutation({
    mutationFn: () => trashEnquiry(enquiry.id),
    onSuccess: () => {
      toast.success('Enquiry moved to trash.');
      setTrashOpen(false);
      invalidate();
      onDeleted?.();
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : 'Delete failed.')
  });

  return (
    <div
      className={cn(
        'flex flex-col gap-3 border-t border-[#E5E7EB]/80 bg-[#F9FAFB] px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between',
        className
      )}
    >
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
          <SelectTrigger className={cn(PORTAL_SELECT_TRIGGER, 'w-[140px]')}>
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

      <div className='flex flex-wrap items-center gap-2'>
        <Button onClick={onPrint} size='sm' type='button' variant='outline'>
          <Icons.print className='size-4' />
          Print
        </Button>

        <AlertDialog onOpenChange={setTrashOpen} open={trashOpen}>
          <AlertDialogTrigger asChild>
            <Button
              className='text-muted-foreground hover:text-red-600'
              size='sm'
              type='button'
              variant='ghost'
            >
              <Icons.trash className='size-4' />
              Trash
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className={cn(CMS_SURFACE, 'rounded-[3px] shadow-none sm:max-w-md')}>
            <AlertDialogHeader>
              <AlertDialogTitle>Move enquiry to trash?</AlertDialogTitle>
              <AlertDialogDescription>
                {enquiry.name} will be hidden from the enquiries list. You can restore trashed
                enquiries later if needed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={trashMutation.isPending}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className='bg-red-600 text-white hover:bg-red-700'
                disabled={trashMutation.isPending}
                onClick={(event) => {
                  event.preventDefault();
                  trashMutation.mutate();
                }}
              >
                {trashMutation.isPending ? 'Moving…' : 'Move to trash'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
