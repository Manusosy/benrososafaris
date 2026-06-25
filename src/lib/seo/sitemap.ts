export type LocalizedSitemapEntry = {
  lastModified?: Date | string;
  locale: string;
  slug: string;
};

export function mapLocalizedEntriesToUrls(entries: LocalizedSitemapEntry[], pathPrefix: string) {
  return entries.map((entry) => ({
    url: `/${entry.locale}/${pathPrefix}/${entry.slug}`,
    lastModified: entry.lastModified
  }));
}
