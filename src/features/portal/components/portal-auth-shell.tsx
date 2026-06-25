import Image from 'next/image';

import { BENROSO_PORTAL_AUTH_IMAGE } from '@/config/benroso';
import { cn } from '@/lib/utils';

interface PortalAuthShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PortalAuthShell({ children, className }: PortalAuthShellProps) {
  return (
    <main className='bg-white flex min-h-svh items-center justify-center px-4 py-8 font-sans sm:px-6 lg:px-8'>
      <div
        className={cn(
          'grid w-full max-w-[980px] overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(42,42,42,0.08)] md:min-h-[620px] md:grid-cols-2',
          className
        )}
      >
        <div className='relative hidden min-h-[620px] md:block'>
          <Image
            alt={BENROSO_PORTAL_AUTH_IMAGE.alt}
            className='object-cover'
            fill
            priority
            sizes='(min-width: 768px) 490px, 0px'
            src={BENROSO_PORTAL_AUTH_IMAGE.src}
          />
          <div className='absolute inset-0 bg-linear-to-t from-[#2A2A2A]/35 via-transparent to-transparent' />
          <div className='absolute inset-x-0 bottom-0 p-8'>
            <p className='text-sm font-medium uppercase tracking-[0.14em] text-white/90'>
              Benroso Safaris
            </p>
            <p className='mt-1 max-w-xs text-lg font-semibold leading-snug text-white'>
              Kenya &amp; East Africa safari experiences
            </p>
          </div>
        </div>
        <div className='flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14'>{children}</div>
      </div>
    </main>
  );
}
