import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LegalDocument } from '@/components/public/legal/legal-document';
import { getLegalPage } from '@/lib/public/legal-content';

type LegalPageRouteProps = {
  params: Promise<{ locale: string }>;
};

export function createLegalPageRoute(slug: string) {
  async function LegalPage({ params }: LegalPageRouteProps) {
    const { locale } = await params;
    const page = getLegalPage(slug);
    if (!page) notFound();

    return <LegalDocument locale={locale} page={page} />;
  }

  return LegalPage;
}

export function createLegalPageMetadata(slug: string) {
  return async function generateMetadata(): Promise<Metadata> {
    const page = getLegalPage(slug);
    if (!page) return {};

    return {
      title: page.title,
      description: page.description,
      robots: { index: true, follow: true }
    };
  };
}
