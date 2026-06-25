import { EmptyState, PageHero } from '@/components/public/page-shell';
import { localePath } from '@/lib/public/locale-path';

type ListingPageProps = {
  params: Promise<{ locale: string }>;
};

export function createListingPage({
  breadcrumbsLabel,
  description,
  eyebrow,
  title
}: {
  breadcrumbsLabel: string;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return async function ListingPage({ params }: ListingPageProps) {
    const { locale } = await params;

    return (
      <>
        <PageHero
          breadcrumbs={[{ href: localePath(locale), label: 'Home' }, { label: breadcrumbsLabel }]}
          description={description}
          eyebrow={eyebrow}
          title={title}
        />
        <section className='benroso-section bg-[var(--benroso-ivory)]'>
          <div className='benroso-container'>
            <EmptyState
              actionHref={localePath(locale, '/contact')}
              actionLabel='Contact Our Team'
              message='Published CMS content for this section will appear here automatically once added in the admin.'
              title='Content coming soon'
            />
          </div>
        </section>
      </>
    );
  };
}
