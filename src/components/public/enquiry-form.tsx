'use client';

import { useState } from 'react';

type EnquiryFormProps = {
  locale: string;
  sourcePath?: string;
};

export function EnquiryForm({ locale, sourcePath }: EnquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/enquiries', {
        body: JSON.stringify({
          budget: String(formData.get('budget') || ''),
          email: String(formData.get('email') || ''),
          locale,
          message: String(formData.get('message') || ''),
          name: String(formData.get('name') || ''),
          phone: String(formData.get('phone') || ''),
          preferredDates: String(formData.get('preferredDates') || ''),
          sourcePath: sourcePath || window.location.pathname,
          travelers: formData.get('travelers') ? Number(formData.get('travelers')) : undefined
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      });

      if (!response.ok) throw new Error('Failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className='space-y-4' onSubmit={onSubmit}>
      <div className='grid gap-4 md:grid-cols-2'>
        <label className='benroso-heading block text-sm font-medium'>
          Full Name
          <input
            className='mt-1.5 w-full rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white px-3 py-2.5 outline-none focus:border-[var(--benroso-primary)]'
            name='name'
            required
          />
        </label>
        <label className='benroso-heading block text-sm font-medium'>
          Email
          <input
            className='mt-1.5 w-full rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white px-3 py-2.5 outline-none focus:border-[var(--benroso-primary)]'
            name='email'
            required
            type='email'
          />
        </label>
        <label className='benroso-heading block text-sm font-medium'>
          Phone
          <input
            className='mt-1.5 w-full rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white px-3 py-2.5 outline-none focus:border-[var(--benroso-primary)]'
            name='phone'
            type='tel'
          />
        </label>
        <label className='benroso-heading block text-sm font-medium'>
          Travelers
          <input
            className='mt-1.5 w-full rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white px-3 py-2.5 outline-none focus:border-[var(--benroso-primary)]'
            min={1}
            name='travelers'
            type='number'
          />
        </label>
        <label className='benroso-heading block text-sm font-medium'>
          Preferred Dates
          <input
            className='mt-1.5 w-full rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white px-3 py-2.5 outline-none focus:border-[var(--benroso-primary)]'
            name='preferredDates'
            placeholder='e.g. July 2026'
          />
        </label>
        <label className='benroso-heading block text-sm font-medium'>
          Budget (optional)
          <input
            className='mt-1.5 w-full rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white px-3 py-2.5 outline-none focus:border-[var(--benroso-primary)]'
            name='budget'
            placeholder='e.g. USD 4,000 per person'
          />
        </label>
      </div>
      <label className='benroso-heading block text-sm font-medium'>
        Message
        <textarea
          className='mt-1.5 min-h-32 w-full rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white px-3 py-2.5 outline-none focus:border-[var(--benroso-primary)]'
          name='message'
          placeholder='Tell us where you want to go, how many days, and any special interests.'
          required
        />
      </label>
      <button
        className='inline-flex min-h-11 items-center justify-center rounded-[var(--benroso-button-radius)] border border-[var(--benroso-primary)] bg-[var(--benroso-primary)] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--benroso-primary-dark)] disabled:opacity-60'
        disabled={status === 'loading'}
        type='submit'
      >
        {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
      </button>
      {status === 'success' ? (
        <p className='text-sm text-[var(--benroso-primary)]'>
          Thank you — your enquiry has been sent.
        </p>
      ) : null}
      {status === 'error' ? (
        <p className='text-sm text-red-700'>
          Something went wrong. Please try again or call us directly.
        </p>
      ) : null}
    </form>
  );
}
