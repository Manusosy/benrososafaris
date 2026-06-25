import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { PortalAuthRecovery } from '@/features/portal/components/portal-auth-recovery';
import { PortalSignUpForm } from '@/features/portal/components/portal-sign-up-form';
import { getPortalSession } from '@/lib/auth/portal';

export default async function PortalSignUpPage() {
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
        <PortalSignUpForm />
      </Suspense>
    </PortalAuthRecovery>
  );
}
