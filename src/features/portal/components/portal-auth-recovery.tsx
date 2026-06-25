'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { bootstrapPortalProfile } from '@/features/portal/api/bootstrap-profile';
import { createClient } from '@/lib/supabase/browser';
import { isPortalRole } from '@/lib/auth/roles';

async function readActivePortalProfile(userId: string) {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, status')
    .eq('id', userId)
    .maybeSingle();

  if (profile?.status === 'active' && isPortalRole(profile.role)) {
    return true;
  }

  return false;
}

export function PortalAuthRecovery({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function recoverSession() {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        if (!cancelled) setReady(true);
        return;
      }

      if (await readActivePortalProfile(user.id)) {
        router.replace('/portal');
        return;
      }

      try {
        await bootstrapPortalProfile();
      } catch (bootstrapError) {
        if (!cancelled) {
          setError(
            bootstrapError instanceof Error
              ? bootstrapError.message
              : 'Could not finish setting up your account.'
          );
          setReady(true);
        }
        return;
      }

      if (await readActivePortalProfile(user.id)) {
        router.replace('/portal');
        router.refresh();
        return;
      }

      if (!cancelled) {
        setError(
          'Your account is signed in but the portal profile is still unavailable. Try again or contact support.'
        );
        setReady(true);
      }
    }

    void recoverSession();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ready) {
    return (
      <div className='bg-white flex min-h-svh items-center justify-center text-sm text-[#6B7280]'>
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-white flex min-h-svh items-center justify-center px-6'>
        <div className='max-w-md text-center'>
          <p className='text-[15px] font-medium text-[#111827]'>Account setup incomplete</p>
          <p className='mt-2 text-[14px] text-red-600'>{error}</p>
          <button
            className='mt-6 text-[14px] font-medium text-[#3C5142] hover:underline'
            onClick={() => window.location.reload()}
            type='button'
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return children;
}
