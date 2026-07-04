import {
  BENROSO_OPERATING_COUNTRIES,
  getCountryById,
  type BenrosoCountryId
} from './country-map-copy';

const CATEGORY_HEADINGS: Array<{ match: RegExp; heading: string }> = [
  {
    match: /gorilla|primate|chimp/i,
    heading: 'From Forest Trails to a Safari Shaped Around You'
  },
  {
    match: /migration|great wildebeest|wildebeest/i,
    heading: 'Follow the Herds, Then Shape the Route Your Way'
  },
  {
    match: /honeymoon|romantic|couple/i,
    heading: 'Start With the Setting, Then Craft the Journey Together'
  },
  {
    match: /balloon|fly.?in|aerial/i,
    heading: 'Take in the View, Then Design the Safari Below'
  },
  {
    match: /beach|coastal|zanzibar|island|diani|mombasa/i,
    heading: 'Between Safari Days and Coastline Calm'
  },
  {
    match: /family|children|kids/i,
    heading: 'Built for Every Pace in the Group'
  },
  {
    match: /group|joining/i,
    heading: 'Shared Departures With Room to Personalise'
  },
  {
    match: /private|exclusive|bespoke/i,
    heading: 'Private Guiding, Tailored to How You Travel'
  },
  {
    match: /conservation|community/i,
    heading: 'Travel With Purpose Across the Landscape'
  },
  {
    match: /hiking|mountain|trek|climb/i,
    heading: 'Beyond the Game Drive, on Foot and by Design'
  },
  {
    match: /bird|photography|special/i,
    heading: 'Focused Encounters, Carefully Timed'
  }
];

function parseCountries(value: unknown): BenrosoCountryId[] {
  if (!Array.isArray(value)) return [];

  const allowed = new Set(BENROSO_OPERATING_COUNTRIES.map((country) => country.id));

  return value.filter(
    (item): item is BenrosoCountryId =>
      typeof item === 'string' && allowed.has(item as BenrosoCountryId)
  );
}

export function buildExperienceGuideHeading({
  category,
  countries: countriesInput,
  title
}: {
  category: string | null;
  countries?: unknown;
  title: string;
}): string {
  const countries = parseCountries(countriesInput);
  const haystack = `${category ?? ''} ${title}`.trim();

  for (const { match, heading } of CATEGORY_HEADINGS) {
    if (match.test(haystack)) return heading;
  }

  if (countries.length === 1) {
    const name = getCountryById(countries[0]).name;
    return `On the Ground in ${name}, Planned Your Way`;
  }

  if (countries.length > 1) {
    const names = countries.slice(0, 2).map((id) => getCountryById(id).name);
    return `Across ${names.join(' & ')}, Planned Your Way`;
  }

  if (category?.trim()) {
    return `How This ${category.trim()} Comes Together`;
  }

  return 'On the Ground, Planned Your Way';
}
