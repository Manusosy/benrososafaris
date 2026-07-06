import { revalidatePath } from 'next/cache';

import { SUPPORTED_LOCALES } from '@/lib/i18n';

export function revalidateTourPublicPaths() {
  for (const locale of SUPPORTED_LOCALES) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/tours`);
    revalidatePath(`/${locale}/safari-packages`);
  }
}
