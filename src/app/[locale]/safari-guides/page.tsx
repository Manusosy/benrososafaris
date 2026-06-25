import { redirect } from 'next/navigation';

import { localePath } from '@/lib/public/locale-path';

type SafariGuidesPageProps = {
  params: Promise<{ locale: string }>;
};

/** Legacy route — tour guides live on the About page guides tab. */
export default async function SafariGuidesPage({ params }: SafariGuidesPageProps) {
  const { locale } = await params;
  redirect(localePath(locale, '/about#guides'));
}
