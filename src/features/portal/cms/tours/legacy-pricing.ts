import {
  formatExperienceKeyLabel,
  mapExperienceKeyToTourTier,
  type ExperiencePricingTableKey
} from '@/lib/pricing/experience-to-tour-pricing';
import type { PublicTourPricingTier } from '@/lib/public/types';

import type { PricingTier } from './schema';

export const LEGACY_PAX_BANDS = ['1 PAX', '2-3 PAX', '4-5 PAX', '6 AND ABOVE'] as const;

export const DEFAULT_LEGACY_SEASONS = [
  '1st JAN - 31ST MARCH',
  '1st April – 31ST MAY',
  '1ST JUN – 30TH JUNE',
  '1ST JULY – 31ST AUG',
  '1ST SEPT – 31ST OCT',
  '1ST NOV – 22ND DEC',
  '23RD – 2ND JAN 2027'
] as const;

export const LEGACY_PRICING_TIER_OPTIONS: Array<{
  value: ExperiencePricingTableKey;
  label: string;
}> = [
  { value: 'economy', label: 'Economy' },
  { value: 'budget', label: 'Budget' },
  { value: 'mid_range', label: 'Mid-Range' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'high_end', label: 'High-End' },
  { value: 'custom', label: 'Custom' }
];

function toNumberOrNull(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function normalizeLegacySeasonCells(
  cells: PricingTier['seasons'][number]['cells']
): PricingTier['seasons'][number]['cells'] {
  const byBand = new Map(cells.map((cell) => [cell.groupBand, cell.price]));
  return LEGACY_PAX_BANDS.map((groupBand) => ({
    groupBand,
    price: byBand.get(groupBand) ?? ''
  }));
}

export function normalizeLegacyPricingTier(tier: PricingTier): PricingTier {
  return {
    ...tier,
    seasons: tier.seasons.map((season) => ({
      ...season,
      cells: normalizeLegacySeasonCells(season.cells)
    }))
  };
}

export function mapLegacyPricingTiersToPublic(
  tiers: PricingTier[],
  tourId = 'preview'
): PublicTourPricingTier[] {
  return tiers
    .filter((tier) => tier.seasons.some((season) => season.label.trim()))
    .map((tier, index) => ({
      id: `legacy-${tourId}-${tier.tier}-${index}`,
      tier: mapExperienceKeyToTourTier(tier.tier),
      label: tier.label.trim() || formatExperienceKeyLabel(tier.tier),
      blurb: tier.blurb.trim() || null,
      notes: tier.notes.trim() || null,
      currency: tier.currency || 'USD',
      seasons: tier.seasons
        .filter((season) => season.label.trim())
        .map((season, seasonIndex) => ({
          id: `legacy-${tourId}-${tier.tier}-season-${seasonIndex}`,
          label: season.label,
          dateStart: season.dateStart || null,
          dateEnd: season.dateEnd || null,
          cells: normalizeLegacySeasonCells(season.cells).map((cell) => {
            const price = toNumberOrNull(cell.price);
            return {
              groupBand: cell.groupBand,
              price: price ?? undefined
            };
          })
        }))
    }));
}

export function createLegacyPricingSeason(label: string): PricingTier['seasons'][number] {
  return {
    label,
    dateStart: '',
    dateEnd: '',
    cells: LEGACY_PAX_BANDS.map((groupBand) => ({ groupBand, price: '' }))
  };
}

export function createDefaultLegacyPricingTier(
  tier: PricingTier['tier'] = 'mid_range'
): PricingTier {
  return {
    tier,
    label: '',
    blurb: '',
    notes: '',
    currency: 'USD',
    seasons: DEFAULT_LEGACY_SEASONS.map((label) => createLegacyPricingSeason(label))
  };
}
