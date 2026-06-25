export type BenrosoCountryId = 'kenya' | 'tanzania' | 'uganda' | 'rwanda' | 'south-africa';

export type BenrosoCountryMapEntry = {
  id: BenrosoCountryId;
  isoA3: string;
  name: string;
  headline: string;
  blurb: string;
  image: string;
  /** Operating-country polygon fill on the map */
  fill: string;
  /** Label dot marker — matches brand color per country */
  dotFill: string;
};

export const BENROSO_OPERATING_COUNTRIES: BenrosoCountryMapEntry[] = [
  {
    id: 'kenya',
    isoA3: 'KEN',
    name: 'Kenya',
    headline: 'Maasai Mara, Amboseli & the Great Migration',
    blurb:
      'Benroso Safaris routes across Kenya pair Maasai Mara big-cat country, Amboseli elephants below Kilimanjaro, and migration river crossings with sensible drives and lodges matched to your style.',
    image: '/assets/benroso-safaris-kenya.webp',
    fill: '#2a9d8f',
    dotFill: '#2a9d8f'
  },
  {
    id: 'tanzania',
    isoA3: 'TZA',
    name: 'Tanzania',
    headline: 'Serengeti, Ngorongoro & Kilimanjaro horizons',
    blurb:
      'Tanzania stretches from the endless Serengeti grasslands to the Ngorongoro Crater and the spice coast. We plan migration timing, crater days, and northern circuit combinations so you see wildlife without rushing between parks.',
    image: '/assets/Saruni-Basecamp-The-Great-Migration-river-crossing.jpg',
    fill: '#3d7a4a',
    dotFill: '#3d7a4a'
  },
  {
    id: 'uganda',
    isoA3: 'UGA',
    name: 'Uganda',
    headline: 'Mountain gorillas & the Pearl of Africa',
    blurb:
      'Benroso Safaris handles Uganda gorilla permits, forest logistics, and lodge access so you can combine Bwindi or Mgahinga trekking with Queen Elizabeth or Murchison Falls savannah days.',
    image: '/assets/Elephant-in-Amboseli-National-Park-2.jpeg',
    fill: '#c9a227',
    dotFill: '#c9a227'
  },
  {
    id: 'rwanda',
    isoA3: 'RWA',
    name: 'Rwanda',
    headline: 'Volcanoes National Park & conservation travel',
    blurb:
      'Rwanda is compact, polished, and built around gorilla trekking in the Virunga volcanoes. Short stays work well combined with Kenya or Tanzania, with time for Kigali and forest hikes that support serious conservation tourism.',
    image: '/assets/maasai-showing-1300by700-600x332.jpg',
    fill: '#d4682a',
    dotFill: '#d4682a'
  },
  {
    id: 'south-africa',
    isoA3: 'ZAF',
    name: 'South Africa',
    headline: 'Kruger, private reserves & Cape extensions',
    blurb:
      'Benroso Safaris connects Kruger and private reserve Big Five viewing with optional Cape Town, wine country, or coast extensions for a longer southern Africa journey.',
    image:
      '/assets/The-Ultimate-Guided-Rhino-Tracking-on-Foot-in-Kenya-Conservation-Safari-A-Journey-to-Save-the-Giants.jpg',
    fill: '#007749',
    dotFill: '#007749'
  }
];

export const DEFAULT_BENROSO_COUNTRY_ID: BenrosoCountryId = 'kenya';

export const OPERATING_ISO_TO_ID = Object.fromEntries(
  BENROSO_OPERATING_COUNTRIES.map((country) => [country.isoA3, country.id])
) as Record<string, BenrosoCountryId>;

export function getCountryById(id: BenrosoCountryId) {
  return BENROSO_OPERATING_COUNTRIES.find((country) => country.id === id)!;
}
