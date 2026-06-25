import { AboutHero } from '@/components/public/about/about-hero';
import { AboutTabs } from '@/components/public/about/about-tabs';
import { localePath } from '@/lib/public/locale-path';
import { getPublicSiteSettings } from '@/lib/public/site-data';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const siteSettings = await getPublicSiteSettings();

  return (
    <>
      <AboutHero
        breadcrumbs={[{ href: localePath(locale), label: 'Home' }, { label: 'About Us' }]}
        description='Experts in lodge and camping safaris — professionally guided, personalized East Africa experiences since 2000.'
        eyebrow='About Benroso Safaris'
        title={siteSettings.companyName}
      />
      <AboutTabs locale={locale} siteSettings={siteSettings} />
    </>
  );
}
