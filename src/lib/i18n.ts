import type { NextRequest } from 'next/server';

export const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

export const SUPPORTED_LOCALES = (
  process.env.NEXT_PUBLIC_SUPPORTED_LOCALES || 'en,sw,fr,de,es,it,zh'
)
  .split(',')
  .map((locale) => locale.trim())
  .filter(Boolean);

export const COUNTRY_TO_LOCALE: Record<string, string> = {
  KE: 'sw',
  TZ: 'sw',
  UG: 'en',
  RW: 'en',
  US: 'en',
  GB: 'en',
  CA: 'en',
  AU: 'en',
  FR: 'fr',
  BE: 'fr',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  ES: 'es',
  MX: 'es',
  IT: 'it',
  CN: 'zh'
};

export function isSupportedLocale(locale: string | undefined): locale is string {
  return !!locale && SUPPORTED_LOCALES.includes(locale);
}

function localeFromAcceptLanguage(header: string | null) {
  if (!header) return undefined;

  const requestedLocales = header
    .split(',')
    .map((part) => part.split(';')[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const requested of requestedLocales) {
    const exact = SUPPORTED_LOCALES.find((locale) => locale.toLowerCase() === requested);
    if (exact) return exact;

    const language = requested.split('-')[0];
    const languageMatch = SUPPORTED_LOCALES.find((locale) => locale.toLowerCase() === language);
    if (languageMatch) return languageMatch;
  }

  return undefined;
}

export function detectLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (isSupportedLocale(cookieLocale)) return cookieLocale;

  const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry');
  const countryLocale = country ? COUNTRY_TO_LOCALE[country.toUpperCase()] : undefined;
  if (isSupportedLocale(countryLocale)) return countryLocale;

  const languageLocale = localeFromAcceptLanguage(request.headers.get('accept-language'));
  if (isSupportedLocale(languageLocale)) return languageLocale;

  return DEFAULT_LOCALE;
}

export function pathnameHasLocale(pathname: string) {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return isSupportedLocale(firstSegment);
}
