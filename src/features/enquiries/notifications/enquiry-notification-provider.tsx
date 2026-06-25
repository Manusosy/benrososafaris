'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { createClient } from '@/lib/supabase/browser';
import { enquiryTypeLabel } from '@/features/enquiries/constants/enquiry-labels';
import { useEnquiryNotificationStore } from './enquiry-notification-store';

export function EnquiryNotificationProvider({ children }: { children: React.ReactNode }) {
  const addNotification = useEnquiryNotificationStore((state) => state.addNotification);
  const router = useRouter();

  React.useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel('portal-enquiries')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'enquiries' },
        (payload) => {
          const row = payload.new as {
            enquiry_type?: string;
            id?: string;
            name?: string;
          };

          if (!row.id || !row.name) return;

          const typeLabel = enquiryTypeLabel(row.enquiry_type ?? 'general');

          addNotification({
            body: `${row.name} submitted a ${typeLabel.toLowerCase()}.`,
            createdAt: new Date().toISOString(),
            enquiryId: row.id,
            enquiryType: row.enquiry_type ?? 'general',
            title: 'New enquiry received'
          });

          toast('New enquiry received', {
            description: `${row.name} · ${typeLabel}`,
            action: {
              label: 'View',
              onClick: () => router.push('/portal/enquiries')
            }
          });
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [addNotification, router]);

  return <>{children}</>;
}
