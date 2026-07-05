import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ExperienceListingIntro } from '@/components/public/experiences/experience-listing-intro';
import { ExperiencesListingSection } from '@/components/public/experiences/experiences-listing-section';
import { PublicPageHero } from '@/components/public/public-page-hero';
import { BenrosoButton } from '@/components/public/ui/benroso-button';
import { BenrosoButtonGroup } from '@/components/public/ui/benroso-button-group';
import { BENROSO_PUBLIC_HERO_IMAGES } from '@/config/benroso';
import {
  buildExperienceListingIntro,
  getExperienceCategoryBlurb
} from '@/features/experiences/public/listing-copy';
import {
  getExperienceCategories,
  listPublishedExperiences
} from '@/features/experiences/public/service';
import { localePath } from '@/lib/public/locale-path';
import { getPageHero } from '@/lib/public/site-data';
import { absoluteUrl } from '@/lib/seo';

type ExperiencesPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; country?: string; group?: string }>;
};

const experiencesDescription =
  'Explore Benroso Safaris experiences for family travel, honeymoons, migration routes, private guiding, and special-interest trips across Kenya, Tanzania, Uganda, Rwanda, and South Africa.';

export async function generateMetadata({ params }: ExperiencesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const canonical = absoluteUrl(`/${locale}/experiences`);

  return {
    title: 'Safari Experiences | Benroso Safaris',
    description: experiencesDescription,
    alternates: { canonical },
    openGraph: {
      title: 'Safari Experiences | Benroso Safaris',
      description: experiencesDescription,
      url: canonical,
      type: 'website'
    }
  };
}

function ExperiencesListingFallback() {
  return (
    <div className='benroso-section bg-white'>
      <div className='benroso-container'>
        <div className='grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
          <div className='h-64 animate-pulse rounded-[var(--benroso-radius)] bg-[var(--benroso-line)]/40' />
          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                className='aspect-[4/5] animate-pulse rounded-[var(--benroso-radius)] bg-[var(--benroso-line)]/40'
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ExperiencesPage({ params, searchParams }: ExperiencesPageProps) {
  const { locale } = await params;
  const query = await searchParams;
  const legacyCategory = query.category?.trim() || undefined;

  const [experiences, categories, pageHero] = await Promise.all([
    listPublishedExperiences({ locale }),
    getExperienceCategories(locale),
    getPageHero('experiences')
  ]);

  const intro = buildExperienceListingIntro(categories);
  const categoryBlurb = getExperienceCategoryBlurb(legacyCategory);
  const hero = BENROSO_PUBLIC_HERO_IMAGES.experiences;

  return (
    <>
      <PublicPageHero
        breadcrumbStyle='pipe-uppercase'
        breadcrumbs={[{ href: localePath(locale), label: 'Home' }, { label: 'Safari Experiences' }]}
        eyebrow='Unforgettable Wildlife Encounters'
        eyebrowTone='white'
        hero={pageHero}
        imageAlt={hero.imageAlt}
        imageUrl={hero.imageUrl}
        overlayTone='black'
        showGoldLine={false}
        title='Safari Experiences'
        titleTone='white'
      >
        <BenrosoButtonGroup align='center' className='mt-8'>
          <BenrosoButton href={localePath(locale, '/contact')} variant='gold'>
            Help Me Plan
          </BenrosoButton>
          <BenrosoButton href='#experiences-list' variant='gold-outline'>
            View Experiences
          </BenrosoButton>
        </BenrosoButtonGroup>
      </PublicPageHero>
      <div className='bg-white'>
        <ExperienceListingIntro intro={intro} />
        <Suspense fallback={<ExperiencesListingFallback />}>
          <ExperiencesListingSection
            categoryBlurb={categoryBlurb}
            experiences={experiences}
            id='experiences-list'
            legacyCategory={legacyCategory}
            locale={locale}
          />
        </Suspense>
      </div>
    </>
  );
}
