import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { PortalShellClient } from '@/components/layout/portal-shell-client';
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
      <PortalShellClient
        defaultOpen={defaultOpen}
        email={session.email}
        fullName={session.fullName}
        role={session.role}
      >
        {children}
      </PortalShellClient>
    </div>
  );
}
