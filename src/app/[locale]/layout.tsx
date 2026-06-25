import { notFound } from 'next/navigation';

import { PublicShell } from '@/components/public/public-shell';
import { isSupportedLocale, SUPPORTED_LOCALES } from '@/lib/i18n';
import { buildTravelAgencyJsonLd } from '@/lib/seo';

import '../../styles/public.css';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildTravelAgencyJsonLd()) }}
      />
      <PublicShell locale={locale}>{children}</PublicShell>
    </>
  );
}
