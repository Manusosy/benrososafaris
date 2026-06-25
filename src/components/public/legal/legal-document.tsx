import Link from 'next/link';

import { PageHero } from '@/components/public/page-shell';
import type { LegalPageDefinition } from '@/lib/public/legal-content';
import { localePath } from '@/lib/public/locale-path';

type LegalDocumentProps = {
  locale: string;
  page: LegalPageDefinition;
};

export function LegalDocument({ locale, page }: LegalDocumentProps) {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(page.lastUpdated));

  return (
    <>
      <PageHero
        breadcrumbs={[{ href: localePath(locale), label: 'Home' }, { label: page.title }]}
        description={page.description}
        eyebrow={page.eyebrow}
        title={page.title}
      />
      <section className='benroso-section bg-white'>
        <div className='benroso-container'>
          <p className='benroso-body text-sm'>Last updated: {formattedDate}</p>

          <nav
            aria-label='On this page'
            className='mt-8 rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-[var(--benroso-ivory)] p-5 md:p-6'
          >
            <h2 className='benroso-heading text-sm font-semibold uppercase tracking-[0.12em]'>
              On this page
            </h2>
            <ol className='mt-3 grid gap-2 sm:grid-cols-2'>
              {page.sections.map((section) => (
                <li key={section.id}>
                  <a
                    className='text-sm text-[var(--benroso-primary)] hover:text-[var(--benroso-accent)] hover:underline'
                    href={`#${section.id}`}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className='benroso-legal-prose mt-10 max-w-3xl'>
            {page.sections.map((section) => (
              <section className='benroso-legal-section' id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
                {section.listItems?.length ? (
                  <ul>
                    {section.listItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>

          <div className='mt-12 border-t border-[var(--benroso-line)] pt-8'>
            <p className='benroso-body text-sm'>
              Related policies:{' '}
              {page.slug !== 'privacy-policy' ? (
                <Link
                  className='text-[var(--benroso-primary)] hover:underline'
                  href={localePath(locale, '/privacy-policy')}
                >
                  Privacy Policy
                </Link>
              ) : null}
              {page.slug !== 'cookie-policy' ? (
                <>
                  {page.slug !== 'privacy-policy' ? ' · ' : null}
                  <Link
                    className='text-[var(--benroso-primary)] hover:underline'
                    href={localePath(locale, '/cookie-policy')}
                  >
                    Cookie Policy
                  </Link>
                </>
              ) : null}
              {page.slug !== 'terms-conditions' ? (
                <>
                  {' · '}
                  <Link
                    className='text-[var(--benroso-primary)] hover:underline'
                    href={localePath(locale, '/terms-conditions')}
                  >
                    Terms &amp; Conditions
                  </Link>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
