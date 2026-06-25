import type { Metadata } from 'next';

import { absoluteUrl } from './absolute-url';

type BuildMetadataInput = {
  canonicalPath: string;
  description?: string | null;
  imageAlt?: string | null;
  imageUrl?: string | null;
  languages?: Record<string, string>;
  noIndex?: boolean;
  title: string;
  type?: 'article' | 'website';
};

export function buildMetadata({
  canonicalPath,
  description,
  imageAlt,
  imageUrl,
  languages,
  noIndex,
  title,
  type = 'website'
}: BuildMetadataInput): Metadata {
  const canonical = absoluteUrl(canonicalPath);
  const safeDescription = description || 'Plan a tailored East Africa safari with Benroso Safaris.';

  return {
    title,
    description: safeDescription,
    alternates: {
      canonical,
      languages
    },
    robots: noIndex
      ? {
          index: false,
          follow: true
        }
      : undefined,
    openGraph: {
      title,
      description: safeDescription,
      url: canonical,
      type,
      images: imageUrl ? [{ url: imageUrl, alt: imageAlt || title }] : []
    }
  };
}
