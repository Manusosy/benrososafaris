import { BENROSO_CONTACT_DEFAULTS } from '@/config/benroso';

import { absoluteUrl } from './absolute-url';

type FaqItem = {
  answer: string;
  question: string;
};

type BlogTranslation = {
  content?: string | null;
  excerpt?: string | null;
  locale: string;
  slug: string;
  title: string;
  post?: {
    published_at?: string | null;
    updated_at?: string | null;
  } | null;
};

type DestinationTranslation = {
  country?: string | null;
  description?: string | null;
  faqs?: FaqItem[] | null;
  latitude?: number | null;
  locale: string;
  longitude?: number | null;
  region?: string | null;
  slug: string;
  summary?: string | null;
  title?: string | null;
  name?: string | null;
};

type TouristTripTranslation = {
  days?: number | null;
  excerpt?: string | null;
  locale: string;
  price_from?: number | null;
  slug: string;
  title: string;
};

export function buildTravelAgencyJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: BENROSO_CONTACT_DEFAULTS.companyName,
    url: absoluteUrl('/'),
    email: BENROSO_CONTACT_DEFAULTS.email,
    telephone: BENROSO_CONTACT_DEFAULTS.phonePrimary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BENROSO_CONTACT_DEFAULTS.addressShort,
      addressLocality: 'Nairobi',
      addressCountry: 'KE'
    }
  };
}

export function buildBlogJsonLd(post: BlogTranslation, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || undefined,
    inLanguage: post.locale,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    datePublished: post.post?.published_at || undefined,
    dateModified: post.post?.updated_at || post.post?.published_at || undefined,
    publisher: buildTravelAgencyJsonLd()
  };
}

export function buildDestinationJsonLd(destination: DestinationTranslation, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.title || destination.name,
    description: destination.summary || destination.description || undefined,
    inLanguage: destination.locale,
    url: absoluteUrl(path),
    touristType: ['Safari travelers', 'Wildlife photographers', 'Family travelers'],
    address: destination.country
      ? {
          '@type': 'PostalAddress',
          addressCountry: destination.country
        }
      : undefined,
    geo:
      destination.latitude && destination.longitude
        ? {
            '@type': 'GeoCoordinates',
            latitude: destination.latitude,
            longitude: destination.longitude
          }
        : undefined
  };
}

export function buildTouristTripJsonLd(tour: TouristTripTranslation, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.excerpt || undefined,
    inLanguage: tour.locale,
    url: absoluteUrl(path),
    provider: buildTravelAgencyJsonLd(),
    itinerary: tour.days ? `${tour.days} days` : undefined,
    offers: tour.price_from
      ? {
          '@type': 'Offer',
          price: tour.price_from,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: absoluteUrl(path)
        }
      : undefined
  };
}

export function buildFaqJsonLd(faqs: FaqItem[] | null | undefined) {
  if (!faqs?.length) return undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
