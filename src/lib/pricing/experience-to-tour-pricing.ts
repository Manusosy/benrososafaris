import type { PublicTourPricingCell, PublicTourPricingTier } from '@/lib/public/types';

export const EXPERIENCE_PRICING_TABLE_KEYS = [
  'economy',
  'budget',
  'mid_range',
  'luxury',
  'high_end',
  'custom'
] as const;

export type ExperiencePricingTableKey = (typeof EXPERIENCE_PRICING_TABLE_KEYS)[number];

export type ExperiencePackagePricingLevel = {
  key: ExperiencePricingTableKey;
  label: string;
  blurb: string;
  currency: string;
  seasons: Array<{
    label: string;
    cells: PublicTourPricingCell[];
  }>;
};

function toFiniteNumber(value: unknown): number | null {
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) ? number : null;
}

export function mapExperienceKeyToTourTier(
  key: ExperiencePricingTableKey
): PublicTourPricingTier['tier'] {
  if (key === 'mid_range') return 'mid_range';
  if (key === 'budget' || key === 'economy') return 'budget';
  return 'luxury';
}

export function parseExperiencePackagePricing(value: unknown): ExperiencePackagePricingLevel[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (typeof item !== 'object' || item === null) return [];
    const record = item as Record<string, unknown>;
    const key = typeof record.key === 'string' ? record.key : 'custom';
    if (!EXPERIENCE_PRICING_TABLE_KEYS.includes(key as ExperiencePricingTableKey)) {
      return [];
    }

    const currency =
      typeof record.currency === 'string' && record.currency ? record.currency : 'USD';
    const seasons = Array.isArray(record.seasons)
      ? record.seasons.flatMap((season) => {
          if (typeof season !== 'object' || season === null) return [];
          const seasonRecord = season as Record<string, unknown>;
          const label = typeof seasonRecord.label === 'string' ? seasonRecord.label.trim() : '';
          const cells = Array.isArray(seasonRecord.cells)
            ? seasonRecord.cells.flatMap((cell) => {
                if (typeof cell !== 'object' || cell === null) return [];
                const cellRecord = cell as Record<string, unknown>;
                const groupBand =
                  typeof cellRecord.groupBand === 'string' ? cellRecord.groupBand.trim() : '';
                const price = toFiniteNumber(cellRecord.price);
                return groupBand && price != null ? [{ groupBand, price }] : [];
              })
            : [];
          return label ? [{ cells, label }] : [];
        })
      : [];

    return [
      {
        blurb: typeof record.blurb === 'string' ? record.blurb.trim() : '',
        currency,
        key: key as ExperiencePricingTableKey,
        label: typeof record.label === 'string' ? record.label.trim() : '',
        seasons
      }
    ];
  });
}

export function levelHasFilledPrices(level: ExperiencePackagePricingLevel): boolean {
  return level.seasons.some((season) => season.cells.length > 0);
}

export function parsePricingTableKeys(value: unknown): ExperiencePricingTableKey[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is ExperiencePricingTableKey =>
      typeof item === 'string' &&
      EXPERIENCE_PRICING_TABLE_KEYS.includes(item as ExperiencePricingTableKey)
  );
}

export function mapExperienceLevelsToTourTiers(
  levels: ExperiencePackagePricingLevel[],
  selectedKeys: ExperiencePricingTableKey[],
  experienceId: string
): PublicTourPricingTier[] {
  const keySet = new Set(selectedKeys);
  const usedTiers = new Set<PublicTourPricingTier['tier']>();

  return levels
    .filter((level) => keySet.has(level.key) && levelHasFilledPrices(level))
    .flatMap((level) => {
      const tier = mapExperienceKeyToTourTier(level.key);
      if (usedTiers.has(tier)) return [];
      usedTiers.add(tier);

      return [
        {
          id: `exp-${experienceId}-${level.key}`,
          tier,
          label: level.label || level.key.replace('_', ' '),
          blurb: level.blurb || null,
          notes: null,
          currency: level.currency || 'USD',
          seasons: level.seasons.map((season, index) => ({
            id: `exp-${experienceId}-${level.key}-season-${index}`,
            label: season.label,
            dateStart: null,
            dateEnd: null,
            cells: season.cells
          }))
        }
      ];
    });
}

export function minPriceFromTourTiers(tiers: PublicTourPricingTier[]): number | null {
  const prices = tiers.flatMap((tier) =>
    tier.seasons.flatMap((season) => season.cells.map((cell) => cell.price))
  );
  return prices.length ? Math.min(...prices) : null;
}

export function formatExperienceKeyLabel(key: ExperiencePricingTableKey): string {
  if (key === 'mid_range') return 'Mid-Range';
  if (key === 'high_end') return 'High-End';
  return key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
}
