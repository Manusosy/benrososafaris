'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

type HomeNewsletterProps = {
  className?: string;
};

export function HomeNewsletter({ className }: HomeNewsletterProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      aria-labelledby='home-newsletter-heading'
      className={cn('bg-[var(--benroso-primary)] text-white', className)}
    >
      <div className='benroso-container py-8 md:py-10'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10'>
          <div className='shrink-0'>
            <h2
              className='text-xl font-bold leading-tight md:text-2xl'
              id='home-newsletter-heading'
            >
              Join Our Newsletter
            </h2>
            <p className='mt-1 text-sm text-white/90 md:text-base'>
              Receive safari deals, travel tips, and exclusive offers.
            </p>
          </div>

          {submitted ? (
            <p className='text-sm text-white/90 lg:text-right'>
              Thank you — safari inspiration is on its way to your inbox.
            </p>
          ) : (
            <form
              className='flex w-full max-w-xl flex-col sm:flex-row lg:ml-auto lg:max-w-2xl'
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <label className='sr-only' htmlFor='home-newsletter-email'>
                Email address
              </label>
              <input
                className='min-h-12 flex-1 border-0 bg-[#E8E8E8] px-4 text-sm text-[var(--benroso-charcoal)] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--benroso-accent)]'
                id='home-newsletter-email'
                name='email'
                placeholder='Enter Your Email'
                required
                type='email'
              />
              <button
                className='min-h-12 shrink-0 bg-[var(--benroso-charcoal)] px-8 text-sm font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-black'
                type='submit'
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
