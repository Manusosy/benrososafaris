import { SiteFooter } from '@/components/public/site-footer';
import { SiteHeader } from '@/components/public/site-header';
import { listPublishedExperiences } from '@/features/experiences/public/service';
import { buildFooterNavigation, buildPublicNavigation } from '@/lib/public/navigation';
import { getPublicDestinations, getPublicSiteSettings } from '@/lib/public/site-data';

type PublicShellProps = {
  children: React.ReactNode;
  locale: string;
};

export async function PublicShell({ children, locale }: PublicShellProps) {
  const [siteSettings, destinations, experiences] = await Promise.all([
    getPublicSiteSettings(),
    getPublicDestinations(locale),
    listPublishedExperiences({ locale })
  ]);

  const navItems = buildPublicNavigation(locale, destinations, experiences);
  const footerColumns = buildFooterNavigation(locale, destinations, experiences);

  return (
    <div className='public-site min-h-screen overflow-x-clip'>
      <SiteHeader locale={locale} navItems={navItems} siteSettings={siteSettings} />
      <main>{children}</main>
      <SiteFooter footerColumns={footerColumns} locale={locale} siteSettings={siteSettings} />
    </div>
  );
}
