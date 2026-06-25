import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { PortalKBar } from '@/components/kbar/portal-kbar';
import { PortalHeader } from '@/components/layout/portal-header';
import { PortalSidebar } from '@/components/layout/portal-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { EnquiryNotificationProvider } from '@/features/enquiries/notifications/enquiry-notification-provider';
import { PortalRoleProvider } from '@/hooks/use-nav';
import { requirePortalSession } from '@/lib/auth/portal';

export const metadata: Metadata = {
  title: 'Portal',
  description: 'Benroso Safaris content management portal',
  robots: {
    index: false,
    follow: false
  }
};

export default async function PortalShellLayout({ children }: { children: React.ReactNode }) {
  const session = await requirePortalSession();
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <div className='bg-white text-[#111827] min-h-svh' data-theme='benroso'>
      <PortalRoleProvider role={session.role}>
        <EnquiryNotificationProvider>
          <PortalKBar>
            <SidebarProvider defaultOpen={defaultOpen}>
              <PortalSidebar
                email={session.email}
                fullName={session.fullName}
                role={session.role}
              />
              <SidebarInset className='bg-white'>
                <PortalHeader role={session.role} />
                {children}
              </SidebarInset>
            </SidebarProvider>
          </PortalKBar>
        </EnquiryNotificationProvider>
      </PortalRoleProvider>
    </div>
  );
}
