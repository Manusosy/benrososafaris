import {
  BENROSO_OPERATING_COUNTRIES,
  type BenrosoCountryId,
  getCountryById
} from './country-map-copy';

export const TOUR_EAST_AFRICA_MARKET_ID = 'east-africa' as const;

export const TOUR_SAFARI_MARKET_IDS = [
  'kenya',
  'tanzania',
  'uganda',
  'rwanda',
  'south-africa',
  TOUR_EAST_AFRICA_MARKET_ID
] as const;

export type TourSafariMarketId = (typeof TOUR_SAFARI_MARKET_IDS)[number];

export type TourSafariMarketOption = {
  id: TourSafariMarketId;
  label: string;
};

export const TOUR_SAFARI_MARKETS: TourSafariMarketOption[] = [
  ...BENROSO_OPERATING_COUNTRIES.map((country) => ({
    id: country.id as TourSafariMarketId,
    label: `${country.name} Safaris`
  })),
  {
    id: TOUR_EAST_AFRICA_MARKET_ID,
    label: 'East Africa Safaris'
  }
];

const MARKET_LABELS = Object.fromEntries(
  TOUR_SAFARI_MARKETS.map((market) => [market.id, market.label])
) as Record<TourSafariMarketId, string>;

const EAST_AFRICAN_COUNTRY_IDS: BenrosoCountryId[] = ['kenya', 'tanzania', 'uganda', 'rwanda'];

export function parseTourSafariMarkets(value: unknown): TourSafariMarketId[] {
  if (!Array.isArray(value)) return [];

  const allowed = new Set<TourSafariMarketId>(TOUR_SAFARI_MARKET_IDS);

  return value.filter(
    (item): item is TourSafariMarketId =>
      typeof item === 'string' && allowed.has(item as TourSafariMarketId)
  );
}

export function formatTourSafariMarketLabel(id: TourSafariMarketId): string {
  return MARKET_LABELS[id] ?? id;
}

export function formatTourSafariMarketSummary(ids: TourSafariMarketId[]): string {
  return ids.map(formatTourSafariMarketLabel).join(', ');
}

/** Union operating countries from linked experiences into tour market ids. */
export function tourMarketsFromExperienceCountries(
  countries: BenrosoCountryId[]
): TourSafariMarketId[] {
  const uniqueCountries = [...new Set(countries)];
  const markets = new Set<TourSafariMarketId>(uniqueCountries as TourSafariMarketId[]);

  const eastAfricanCount = uniqueCountries.filter((id) =>
    EAST_AFRICAN_COUNTRY_IDS.includes(id)
  ).length;
  if (eastAfricanCount >= 2) {
    markets.add(TOUR_EAST_AFRICA_MARKET_ID);
  }

  return TOUR_SAFARI_MARKET_IDS.filter((id) => markets.has(id));
}

export function tourMarketCatalogLabel(id: TourSafariMarketId): string {
  if (id === TOUR_EAST_AFRICA_MARKET_ID) return 'East Africa Safaris';
  return `${getCountryById(id).name} Safaris`;
}
