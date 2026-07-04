'use client';

import dynamic from 'next/dynamic';

import { PortalHeader } from '@/components/layout/portal-header';
import { PortalSidebar } from '@/components/layout/portal-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { EnquiryNotificationProvider } from '@/features/enquiries/notifications/enquiry-notification-provider';
import { PortalRoleProvider } from '@/hooks/use-nav';
import type { PortalRole } from '@/lib/auth/roles';

const PortalKBar = dynamic(
  () => import('@/components/kbar/portal-kbar').then((module) => ({ default: module.PortalKBar })),
  { ssr: false }
);

type PortalShellClientProps = {
  children: React.ReactNode;
  defaultOpen: boolean;
  email: string;
  fullName: string | null;
  role: PortalRole;
};

export function PortalShellClient({
  children,
  defaultOpen,
  email,
  fullName,
  role
}: PortalShellClientProps) {
  return (
    <PortalRoleProvider role={role}>
      <EnquiryNotificationProvider>
        <PortalKBar>
          <SidebarProvider defaultOpen={defaultOpen}>
            <PortalSidebar email={email} fullName={fullName} role={role} />
            <SidebarInset className='bg-white'>
              <PortalHeader role={role} />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </PortalKBar>
      </EnquiryNotificationProvider>
    </PortalRoleProvider>
  );
}
