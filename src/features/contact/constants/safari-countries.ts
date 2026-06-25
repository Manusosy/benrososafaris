export const SAFARI_DESTINATION_COUNTRIES = [
  'Kenya',
  'Tanzania',
  'Uganda',
  'Rwanda',
  'South Africa'
] as const;

export type SafariDestinationCountry = (typeof SAFARI_DESTINATION_COUNTRIES)[number];

export const SAFARI_DESTINATION_OPTIONS: Array<{
  code: string;
  country: SafariDestinationCountry;
}> = [
  { code: 'KE', country: 'Kenya' },
  { code: 'TZ', country: 'Tanzania' },
  { code: 'UG', country: 'Uganda' },
  { code: 'RW', country: 'Rwanda' },
  { code: 'ZA', country: 'South Africa' }
];
