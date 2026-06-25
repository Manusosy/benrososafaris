'use client';

import * as React from 'react';
import Image from 'next/image';

import { Icons } from '@/components/icons';

const REFERRAL_STORAGE_KEY = 'benroso-referral-step-dismissed';

export const REFERRAL_SOURCE_OPTIONS = [
  { label: 'Promotional campaigns', value: 'promotional' },
  { label: 'Social networks', value: 'social' },
  { label: 'Friends feedback', value: 'friends' },
  { label: 'Other', value: 'other' }
] as const;

type ContactReferralStepProps = {
  onChange: (value: string) => void;
  value: string;
};

export function ContactReferralStep({ onChange, value }: ContactReferralStepProps) {
  const [isDismissed, setIsDismissed] = React.useState(false);

  React.useEffect(() => {
    try {
      setIsDismissed(sessionStorage.getItem(REFERRAL_STORAGE_KEY) === 'true');
    } catch {
      // sessionStorage unavailable — keep step visible
    }
  }, []);

  function handleDismiss() {
    setIsDismissed(true);
    try {
      sessionStorage.setItem(REFERRAL_STORAGE_KEY, 'true');
    } catch {
      // sessionStorage unavailable
    }
  }

  if (isDismissed) return null;

  return (
    <section className='benroso-contact-step'>
      <div className='mb-5 flex items-center gap-3'>
        <span aria-hidden className='benroso-contact-step-number'>
          9
        </span>
        <h3 className='benroso-contact-step-title'>How did you hear about Benroso Safaris?</h3>
      </div>

      <div className='benroso-referral-step'>
        <button
          aria-label='Dismiss referral question'
          className='benroso-referral-step-close'
          onClick={handleDismiss}
          type='button'
        >
          <Icons.close className='h-4 w-4' />
        </button>

        <div className='benroso-referral-step-inner'>
          <div className='benroso-referral-step-art'>
            <Image
              alt=''
              aria-hidden
              className='h-auto w-full max-w-[140px] object-contain'
              height={180}
              src='/assets/TravellerQuestion@2x.png'
              width={140}
            />
          </div>

          <div className='benroso-referral-step-content'>
            <fieldset className='benroso-contact-radio-list benroso-contact-radio-list--inline'>
              <legend className='sr-only'>Referral source</legend>
              {REFERRAL_SOURCE_OPTIONS.map((option) => (
                <label className='benroso-contact-radio-option' key={option.value}>
                  <input
                    checked={value === option.value}
                    className='benroso-contact-radio-input'
                    name='referralSource'
                    onChange={() => onChange(option.value)}
                    type='radio'
                    value={option.value}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>
          </div>
        </div>
      </div>
    </section>
  );
}

/** @deprecated Use ContactReferralStep — kept for backwards compatibility */
export function ContactReferralCard(props: ContactReferralStepProps) {
  return <ContactReferralStep {...props} />;
}
