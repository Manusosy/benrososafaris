import { absoluteUrl } from './absolute-url';

export function buildBreadcrumbJsonLd(items: Array<{ href: string; label: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href)
    }))
  };
}
