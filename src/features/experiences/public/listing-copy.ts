export const EXPERIENCE_LISTING_INTRO_TITLE =
  'Safari Experiences in Kenya, Tanzania, Uganda, Rwanda & South Africa';

export const EXPERIENCE_CATEGORY_BLURBS: Record<string, string> = {
  Family:
    'Family safaris balance game drives with shorter travel days, child-friendly lodges, and guides who know how to keep young travellers engaged without rushing the wildlife moments.',
  Honeymoon:
    'Honeymoon routes favour private vehicles, scenic sundowners, and intimate camps where you can slow the pace and celebrate together after long days on the plains.',
  Migration:
    'Migration safaris follow the herds across the Mara-Serengeti ecosystem, with timing built around river crossings, predator activity, and the season you want to witness.',
  Private:
    'Private safaris give you your own vehicle, flexible daily plans, and itineraries shaped around your interests rather than a fixed group schedule.',
  Group:
    'Group departures suit travellers who want a shared adventure with set dates, clear pricing, and the energy of exploring Kenya and Tanzania with like-minded guests.',
  Photography:
    'Photography-focused trips allow extra time at sightings, positioning for light, and guides who understand when to wait for the shot and when to move on.',
  Luxury:
    'Luxury experiences pair premium lodges with seamless logistics, from charter connections to private guiding and handpicked stays in the best wildlife locations.',
  Adventure:
    'Adventure safaris combine classic game viewing with active days, whether that means walking safaris, longer drives, or routes through varied landscapes and remote camps.'
};

export type IntroSegment = {
  emphasis?: 'green' | 'strong';
  text: string;
};

export type IntroParagraph = IntroSegment[];

export function getExperienceCategoryBlurb(category: string | undefined): string | null {
  if (!category) return null;
  return EXPERIENCE_CATEGORY_BLURBS[category] ?? null;
}

export function buildExperienceListingIntro(categories: string[]) {
  const categoryList =
    categories.length >= 3
      ? `${categories.slice(0, -1).join(', ')}, and ${categories[categories.length - 1]}`
      : categories.join(' and ');

  const tertiary: IntroParagraph = categoryList
    ? [
        { text: 'Browse curated routes for ' },
        { text: categoryList.toLowerCase(), emphasis: 'strong' },
        {
          text: ' travel, each built around real park access, lodge quality, and the pace that suits your group.'
        }
      ]
    : [
        { text: 'Browse curated routes for ' },
        {
          text: 'family trips, honeymoons, migration travel, and private guiding',
          emphasis: 'strong'
        },
        { text: ', each built around real park access and lodge quality.' }
      ];

  return {
    lead: [
      { text: 'At ' },
      { text: 'Benroso Safaris', emphasis: 'green' },
      {
        text: ', safari experiences are not one-size-fits-all products. They are travel styles that shape how long you stay in each park, which lodges we recommend, and how your days unfold on the ground.'
      }
    ] satisfies IntroParagraph,
    secondary: [
      { text: 'Whether you are planning a first family trip to the ' },
      { text: 'Maasai Mara', emphasis: 'green' },
      { text: ', a quiet honeymoon in the ' },
      { text: 'Serengeti', emphasis: 'green' },
      { text: ', or a ' },
      { text: 'migration', emphasis: 'strong' },
      {
        text: '-focused route timed for the herds, our planners match the right tours, camps, and guides to the way you actually want to travel.'
      }
    ] satisfies IntroParagraph,
    tertiary
  };
}
