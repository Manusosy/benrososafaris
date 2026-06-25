import Image from 'next/image';

import { BENROSO_SOCIAL_DEFAULTS } from '@/config/benroso';
import type { PublicSiteSettings } from '@/lib/public/types';

type FooterSocialLinksProps = {
  siteSettings: PublicSiteSettings;
};

const SOCIAL_BRANDS = [
  { key: 'facebook' as const, label: 'Facebook', icon: '/assets/social/facebook.svg' },
  { key: 'instagram' as const, label: 'Instagram', icon: '/assets/social/instagram.svg' },
  { key: 'twitter' as const, label: 'X', icon: '/assets/social/x.svg' },
  { key: 'linkedin' as const, label: 'LinkedIn', icon: '/assets/social/linkedin.svg' },
  { key: 'youtube' as const, label: 'YouTube', icon: '/assets/social/youtube.svg' }
];

export function FooterSocialLinks({ siteSettings }: FooterSocialLinksProps) {
  const social = {
    facebook: siteSettings.socialLinks.facebook ?? BENROSO_SOCIAL_DEFAULTS.facebook,
    instagram: siteSettings.socialLinks.instagram ?? BENROSO_SOCIAL_DEFAULTS.instagram,
    linkedin: siteSettings.socialLinks.linkedin ?? BENROSO_SOCIAL_DEFAULTS.linkedin,
    twitter: siteSettings.socialLinks.twitter ?? BENROSO_SOCIAL_DEFAULTS.twitter,
    youtube: siteSettings.socialLinks.youtube ?? BENROSO_SOCIAL_DEFAULTS.youtube
  };

  return (
    <div className='benroso-footer-socials'>
      {SOCIAL_BRANDS.map(({ key, label, icon }) => (
        <a
          aria-label={label}
          className='benroso-footer-social'
          href={social[key]}
          key={key}
          rel='noopener noreferrer'
          target='_blank'
        >
          <Image
            alt=''
            aria-hidden
            className='benroso-footer-social-icon'
            height={24}
            src={icon}
            width={24}
          />
        </a>
      ))}
    </div>
  );
}
