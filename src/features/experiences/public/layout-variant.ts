export type ExperienceLayoutVariant = 'safari' | 'mountain';

export function normalizeExperienceLayoutVariant(
  value: string | null | undefined
): ExperienceLayoutVariant {
  return value === 'mountain' ? 'mountain' : 'safari';
}

export function isMountainExperienceLayout(input: {
  category?: string | null;
  layoutVariant?: ExperienceLayoutVariant | string | null;
  slug?: string | null;
}): boolean {
  if (input.layoutVariant === 'mountain') return true;
  if (input.slug === 'mountain-climbing') return true;
  const category = input.category?.trim().toLowerCase() ?? '';
  return category.includes('mountain');
}
