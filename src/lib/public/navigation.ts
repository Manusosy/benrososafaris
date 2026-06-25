import { localePath } from './locale-path';
import { buildLegalFooterLinks } from './legal-content';
import type {
  PublicDestination,
  PublicExperience,
  PublicFooterColumn,
  PublicNavItem
} from './types';

function lp(locale: string, path: string) {
  return localePath(locale, path);
}

function navSection(nav: PublicNavItem[], label: string): PublicNavItem[] {
  const item = nav.find((entry) => entry.label === label);
  if (!item) return [];
  return [{ label: item.label, href: item.href }, ...(item.items ?? [])];
}

function uniqueLinks(links: PublicNavItem[]): PublicNavItem[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export function buildPublicNavigation(
  locale: string,
  _destinations: PublicDestination[],
  experiences: PublicExperience[] = []
): PublicNavItem[] {
  const path = (route: string) => lp(locale, route);

  return [
    { label: 'Home', href: path('/'), variant: 'simple' },
    {
      label: 'About Us',
      href: path('/about'),
      items: [
        { label: 'Our Story', href: path('/about') },
        { label: 'Our Safari Vehicles', href: path('/our-fleet') },
        { label: 'Our Tour Guides', href: path('/about#guides') }
      ],
      variant: 'simple'
    },
    {
      label: 'Destinations',
      href: path('/destinations'),
      items: [
        { label: 'Kenya', href: path('/destinations?country=kenya') },
        { label: 'Tanzania', href: path('/destinations?country=tanzania') },
        { label: 'Uganda', href: path('/destinations?country=uganda') },
        { label: 'Rwanda', href: path('/destinations?country=rwanda') },
        { label: 'South Africa', href: path('/destinations?country=south-africa') }
      ],
      variant: 'dynamic'
    },
    {
      label: 'Safari Tours',
      href: path('/tours'),
      items: [
        { label: 'Tour Safaris', href: path('/tours') },
        { label: 'East Africa Safari Deals', href: path('/safari-packages') },
        { label: 'Safari Vehicles', href: path('/our-fleet') }
      ],
      variant: 'simple'
    },
    {
      label: 'Experiences',
      href: path('/experiences'),
      items: uniqueLinks([
        { label: 'All Experiences', href: path('/experiences') },
        ...[...new Set(experiences.map((experience) => experience.category).filter(Boolean))].map(
          (category) => ({
            label: category as string,
            href: path(`/experiences?category=${encodeURIComponent(category as string)}`)
          })
        ),
        ...experiences.slice(0, 6).map((experience) => ({
          label: experience.title,
          href: experience.href
        }))
      ]),
      variant: 'dynamic'
    },
    {
      label: 'Accommodations',
      href: path('/accommodations'),
      variant: 'simple'
    },
    {
      label: 'National Parks',
      href: path('/national-parks'),
      variant: 'simple'
    },
    { label: 'Blog', href: path('/blog'), variant: 'simple' },
    { label: 'Contact Us', href: path('/contact'), variant: 'simple' }
  ];
}

export function buildFooterNavigation(
  locale: string,
  destinations: PublicDestination[],
  experiences: PublicExperience[] = []
): PublicFooterColumn[] {
  const nav = buildPublicNavigation(locale, destinations, experiences);
  const path = (route: string) => lp(locale, route);

  const aboutLinks = uniqueLinks([
    { label: 'About Us', href: path('/about') },
    { label: 'Our Safari Vehicles', href: path('/our-fleet') },
    { label: 'Our Tour Guides', href: path('/safari-guides') },
    { label: 'Why Choose Us', href: `${path('/')}#why-choose-us` }
  ]);

  const safariLinks = uniqueLinks([
    { label: 'All Safari Tours', href: path('/tours') },
    ...(nav.find((entry) => entry.label === 'Safari Tours')?.items ?? []),
    { label: 'Safari Experiences', href: path('/experiences') }
  ]);

  const destinationLinks =
    destinations.length > 0
      ? uniqueLinks([
          { label: 'All Destinations', href: path('/destinations') },
          ...destinations.slice(0, 7).map((destination) => ({
            label: destination.name,
            href: destination.href
          }))
        ])
      : uniqueLinks([
          { label: 'All Destinations', href: path('/destinations') },
          ...navSection(nav, 'Destinations')
        ]);

  const experienceLinks =
    experiences.length > 0
      ? uniqueLinks([
          { label: 'All Experiences', href: path('/experiences') },
          ...experiences.slice(0, 6).map((experience) => ({
            label: experience.title,
            href: experience.href
          }))
        ])
      : [{ label: 'Safari Experiences', href: path('/experiences') }];

  const planLinks = uniqueLinks([
    ...experienceLinks,
    { label: 'Accommodations', href: path('/accommodations') },
    { label: 'National Parks', href: path('/national-parks') },
    { label: 'Travel Blog', href: path('/blog') },
    { label: 'Contact Us', href: path('/contact') }
  ]);

  const policyLinks = buildLegalFooterLinks(locale).map((link) => ({
    label: link.label,
    href: link.href
  }));

  return [
    { title: 'About Benroso', links: aboutLinks },
    { title: 'Safari Tours', links: safariLinks },
    { title: 'Destinations', links: destinationLinks },
    { title: 'Plan Your Safari', links: planLinks },
    { title: 'Help & Policies', links: policyLinks }
  ];
}
