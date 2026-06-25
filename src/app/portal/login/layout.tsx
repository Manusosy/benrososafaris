import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false }
};

export default function PortalLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-white font-sans text-[#111827]' data-theme='benroso'>
      {children}
    </div>
  );
}
