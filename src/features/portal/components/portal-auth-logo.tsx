import Image from 'next/image';

import { BENROSO_LOGO_HEIGHT, BENROSO_LOGO_PATH, BENROSO_LOGO_WIDTH } from '@/config/benroso';
import { cn } from '@/lib/utils';

interface PortalAuthLogoProps {
  className?: string;
}

export function PortalAuthLogo({ className }: PortalAuthLogoProps) {
  return (
    <div className={cn('mb-8 flex justify-center', className)}>
      <Image
        alt='Benroso Safaris'
        className='h-[52px] w-auto max-w-[220px] object-contain'
        height={BENROSO_LOGO_HEIGHT}
        priority
        src={BENROSO_LOGO_PATH}
        width={BENROSO_LOGO_WIDTH}
      />
    </div>
  );
}
