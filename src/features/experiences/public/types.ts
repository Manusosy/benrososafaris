export type PublicExperienceMedia = {
  alt: string | null;
  id: string;
  url: string | null;
};

export type PublicExperienceFaq = {
  answer: string;
  question: string;
};

export type PublicExperience = {
  category: string | null;
  href: string;
  id: string;
  imageAlt: string | null;
  imageUrl: string | null;
  slug: string;
  summary: string | null;
  title: string;
};

export type PublicExperienceDetail = PublicExperience & {
  contentHtml: string | null;
  experienceId: string;
  faqs: PublicExperienceFaq[];
  gallery: PublicExperienceMedia[];
  highlights: string[];
  seoDescription: string | null;
  seoTitle: string | null;
};

export type PublicExperienceRelatedTour = {
  days: number | null;
  excerpt: string | null;
  href: string;
  id: string;
  imageAlt: string | null;
  imageUrl: string | null;
  nights: number | null;
  parksLabel: string | null;
  priceFrom: number | null;
  slug: string;
  title: string;
};

export type PublicExperienceRelatedAccommodation = {
  country: string | null;
  href: string;
  id: string;
  imageAlt: string | null;
  imageUrl: string | null;
  locationLabel: string | null;
  name: string;
  slug: string;
  summary: string | null;
};
