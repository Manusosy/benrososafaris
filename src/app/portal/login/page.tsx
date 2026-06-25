import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { PortalAuthRecovery } from '@/features/portal/components/portal-auth-recovery';
import { PortalLoginForm } from '@/features/portal/components/portal-login-form';
import { getPortalSession } from '@/lib/auth/portal';

export default async function PortalLoginPage() {
  const session = await getPortalSession();
  if (session) redirect('/portal');

  return (
    <PortalAuthRecovery>
      <Suspense
        fallback={
          <div className='bg-white flex min-h-svh items-center justify-center text-sm text-[#6B7280]'>
            Loading…
          </div>
        }
      >
        <PortalLoginForm />
      </Suspense>
    </PortalAuthRecovery>
  );
}
