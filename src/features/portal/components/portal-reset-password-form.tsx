'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PortalAuthButton } from '@/features/portal/components/portal-auth-button';
import { PortalAuthLogo } from '@/features/portal/components/portal-auth-logo';
import { PortalAuthShell } from '@/features/portal/components/portal-auth-shell';
import { createClient } from '@/lib/supabase/browser';
import { cn } from '@/lib/utils';

const fieldClassName =
  'h-12 rounded-lg border-[#E5E7EB] bg-white px-4 text-[15px] text-[#2A2A2A] shadow-none placeholder:text-[#9CA3AF] focus-visible:border-[#3C5142] focus-visible:ring-[#3C5142]/20';

const labelClassName = 'text-[13px] font-normal text-[#9CA3AF]';

export function PortalResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setIsLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.push('/portal/login');
    router.refresh();
  }

  return (
    <PortalAuthShell>
      <div className='mx-auto w-full max-w-[360px]'>
        <PortalAuthLogo />

        <div className='mb-8 text-center'>
          <h1 className='text-[28px] font-semibold tracking-tight text-[#111827]'>
            Set new password
          </h1>
          <p className='mt-2 text-[15px] text-[#6B7280]'>
            Choose a strong password for your Benroso portal account.
          </p>
        </div>

        <form className='space-y-5' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <Label className={labelClassName} htmlFor='password'>
              Enter password
            </Label>
            <div className='relative'>
              <Input
                autoComplete='new-password'
                className={cn(fieldClassName, 'pr-12')}
                id='password'
                minLength={8}
                onChange={(event) => setPassword(event.target.value)}
                placeholder='••••••••'
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
              />
              <button
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className='text-[#9CA3AF] hover:text-[#6B7280] absolute inset-y-0 right-0 flex items-center px-4'
                onClick={() => setShowPassword((current) => !current)}
                type='button'
              >
                {showPassword ? (
                  <Icons.eyeOff className='size-5' />
                ) : (
                  <Icons.eye className='size-5' />
                )}
              </button>
            </div>
          </div>

          <div className='space-y-2'>
            <Label className={labelClassName} htmlFor='confirm-password'>
              Confirm password
            </Label>
            <Input
              autoComplete='new-password'
              className={fieldClassName}
              id='confirm-password'
              minLength={8}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder='••••••••'
              required
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
            />
          </div>

          {error ? <p className='text-[14px] text-red-600'>{error}</p> : null}

          <PortalAuthButton isLoading={isLoading} type='submit'>
            Update password
          </PortalAuthButton>
        </form>

        <p className='mt-8 text-center text-[15px] text-[#6B7280]'>
          <Link className='font-medium text-[#3C5142] hover:underline' href='/portal/login'>
            Back to login
          </Link>
        </p>
      </div>
    </PortalAuthShell>
  );
}
