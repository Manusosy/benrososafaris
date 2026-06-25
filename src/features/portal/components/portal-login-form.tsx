'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Icons } from '@/components/icons';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PortalAuthButton } from '@/features/portal/components/portal-auth-button';
import { PortalAuthLogo } from '@/features/portal/components/portal-auth-logo';
import { PortalAuthShell } from '@/features/portal/components/portal-auth-shell';
import { bootstrapPortalProfile } from '@/features/portal/api/bootstrap-profile';
import { createClient } from '@/lib/supabase/browser';
import { cn } from '@/lib/utils';

const REMEMBER_EMAIL_KEY = 'portal_remember_email';

const fieldClassName =
  'h-12 rounded-lg border-[#E5E7EB] bg-white px-4 text-[15px] text-[#2A2A2A] shadow-none placeholder:text-[#9CA3AF] focus-visible:border-[#3C5142] focus-visible:ring-[#3C5142]/20';

const labelClassName = 'text-[13px] font-normal text-[#9CA3AF]';

export function PortalLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('confirm') === '1') {
      setInfo('Account created. Sign in with your email and password to access the portal.');
    }
    if (searchParams.get('setup') === '1') {
      setInfo('Finishing account setup…');
    }
  }, [searchParams]);

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (rememberMe) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, email);
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }
    } catch {
      // ignore
    }

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setIsLoading(false);
      setError(signInError.message);
      return;
    }

    try {
      await bootstrapPortalProfile();
    } catch (bootstrapError) {
      setIsLoading(false);
      setError(
        bootstrapError instanceof Error
          ? bootstrapError.message
          : 'Signed in but profile setup failed.'
      );
      return;
    }

    setIsLoading(false);

    const next = searchParams.get('next') || '/portal';
    router.push(next);
    router.refresh();
  }

  return (
    <PortalAuthShell>
      <div className='mx-auto w-full max-w-[360px]'>
        <PortalAuthLogo />

        <div className='mb-8 text-center'>
          <h1 className='text-[28px] font-semibold tracking-tight text-[#111827]'>Welcome back</h1>
          <p className='mt-2 text-[15px] text-[#6B7280]'>
            New here?{' '}
            <Link
              className='font-medium text-[#3C5142] hover:underline'
              href='/portal/login/sign-up'
            >
              Create an account
            </Link>
          </p>
        </div>

        <form className='space-y-5' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <Label className={labelClassName} htmlFor='email'>
              Enter email id
            </Label>
            <Input
              autoComplete='email'
              className={fieldClassName}
              id='email'
              onChange={(event) => setEmail(event.target.value)}
              placeholder='user@email.com'
              required
              type='email'
              value={email}
            />
          </div>

          <div className='space-y-2'>
            <Label className={labelClassName} htmlFor='password'>
              Enter password
            </Label>
            <div className='relative'>
              <Input
                autoComplete='current-password'
                className={cn(fieldClassName, 'pr-12')}
                id='password'
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

          <div className='flex items-center justify-between gap-3 pt-1'>
            <label className='flex cursor-pointer items-center gap-2.5'>
              <Checkbox
                checked={rememberMe}
                className='border-[#D1D5DB] data-[state=checked]:border-[#3C5142] data-[state=checked]:bg-[#3C5142]'
                id='remember-me'
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <span className='text-[14px] text-[#6B7280]'>Remember me?</span>
            </label>
            <Link
              className='text-[14px] font-medium text-[#3C5142] hover:underline'
              href='/portal/login/forgot-password'
            >
              Forgot password?
            </Link>
          </div>

          {info ? <p className='text-[14px] text-[#3C5142]'>{info}</p> : null}
          {error ? <p className='text-[14px] text-red-600'>{error}</p> : null}

          <PortalAuthButton isLoading={isLoading} type='submit'>
            Login
          </PortalAuthButton>
        </form>

        <div className='mt-8 flex items-center gap-3'>
          <div className='h-px flex-1 bg-[#E5E7EB]' />
          <span className='text-[13px] text-[#9CA3AF]'>Or sign in with</span>
          <div className='h-px flex-1 bg-[#E5E7EB]' />
        </div>

        <p className='mt-6 text-center text-[13px] leading-relaxed text-[#9CA3AF]'>
          Benroso Safaris team portal. Access is limited to approved staff accounts.
        </p>
      </div>
    </PortalAuthShell>
  );
}
