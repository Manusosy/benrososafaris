import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/lib/i18n';

/** Maps site locale codes to Google Cloud Translation API target codes. */
const GOOGLE_LOCALE_MAP: Record<string, string> = {
  zh: 'zh-CN'
};

export function isAutoTranslateEnabled(): boolean {
  return process.env.AUTO_TRANSLATE_ENABLED === 'true' && !!process.env.GOOGLE_TRANSLATE_API_KEY;
}

export function getAutoTranslateLocales(): string[] {
  const configured = process.env.AUTO_TRANSLATE_LOCALES?.split(',')
    .map((locale) => locale.trim())
    .filter(Boolean);

  const locales = configured?.length
    ? configured
    : SUPPORTED_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

  return locales.filter((locale) => locale !== DEFAULT_LOCALE);
}

export function shouldAutoPublishTranslations(): boolean {
  return process.env.AUTO_TRANSLATE_AUTO_PUBLISH !== 'false';
}

export function toGoogleTargetLocale(locale: string): string {
  return GOOGLE_LOCALE_MAP[locale] ?? locale;
}
