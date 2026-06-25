import { Suspense } from 'react';

import { PortalResetPasswordForm } from '@/features/portal/components/portal-reset-password-form';

export default function PortalResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className='bg-white flex min-h-svh items-center justify-center text-sm text-[#6B7280]'>
          Loading…
        </div>
      }
    >
      <PortalResetPasswordForm />
    </Suspense>
  );
}
