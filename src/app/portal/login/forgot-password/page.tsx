import { Suspense } from 'react';

import { PortalForgotPasswordForm } from '@/features/portal/components/portal-forgot-password-form';

export default function PortalForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className='bg-white flex min-h-svh items-center justify-center text-sm text-[#6B7280]'>
          Loading…
        </div>
      }
    >
      <PortalForgotPasswordForm />
    </Suspense>
  );
}
