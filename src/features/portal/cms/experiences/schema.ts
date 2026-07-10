import * as z from 'zod';

import type { BenrosoCountryId } from '@/features/experiences/public/country-map-copy';

import { SEO_LIMITS } from '../seo/analyze';

export const benrosoCountryIdSchema = z.enum([
  'kenya',
  'tanzania',
  'uganda',
  'rwanda',
  'south-africa'
]);

export type ExperienceCountryId = BenrosoCountryId;

const faqItemSchema = z.object({
  answer: z.string(),
  question: z.string()
});

const packagePricingCellSchema = z.object({
  groupBand: z.string(),
  price: z.string()
});

const packagePricingSeasonSchema = z.object({
  cells: z.array(packagePricingCellSchema),
  label: z.string()
});

const packagePricingLevelSchema = z.object({
  blurb: z.string(),
  currency: z.string(),
  key: z.enum(['economy', 'budget', 'mid_range', 'luxury', 'high_end', 'custom']),
  label: z.string(),
  seasons: z.array(packagePricingSeasonSchema)
});

export type PackagePricingCell = z.infer<typeof packagePricingCellSchema>;
export type PackagePricingLevel = z.infer<typeof packagePricingLevelSchema>;
export type PackagePricingSeason = z.infer<typeof packagePricingSeasonSchema>;

export const experienceMenuGroupSchema = z.enum(['top_experiences', 'wildlife_safari']);
export type ExperienceMenuGroup = z.infer<typeof experienceMenuGroupSchema>;

export const experienceLayoutVariantSchema = z.enum(['safari', 'mountain']);
export type ExperienceLayoutVariant = z.infer<typeof experienceLayoutVariantSchema>;

/**
 * Experience wizard form contract.
 *
 * Flat shape spanning the base `experiences` row and its English
 * `experience_translations` row. The service layer splits these back out when
 * persisting. Only title (and the auto-generated slug) are required —
 * everything else is optional so a draft can be saved early.
 */
// Scalar fields are all-required strings (empty allowed for optional ones)
// rather than `.optional().default()`. This keeps the inferred type a flat
// record that matches the form's `defaultValues`, so the schema can be used
// directly as a TanStack Form validator (mirrors the multi-step convention).
export const experienceFormSchema = z.object({
  // Translation (en)
  title: z.string().min(2, 'Title must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens only'),
  summary: z.string().max(280, 'Keep the summary under 280 characters'),
  description: z.string(),
  faqs: z.array(faqItemSchema),
  // Base
  category: z.string(),
  /** Operating countries where this experience is offered. */
  countries: z.array(benrosoCountryIdSchema),
  menuGroup: experienceMenuGroupSchema,
  /** Public page layout: safari (default) or mountain (route tables, no package grid). */
  layoutVariant: experienceLayoutVariantSchema,
  /** Highlights list, stored directly as a jsonb array. */
  highlights: z.array(z.string()),
  /** Package price tables for this experience page. */
  packagePricing: z.array(packagePricingLevelSchema),
  /** Ordered media_assets ids; the first is the cover image. */
  gallery: z.array(z.string()),
  // SEO
  seoTitle: z.string().max(70, 'SEO title should be under 70 characters'),
  seoDescription: z
    .string()
    .max(SEO_LIMITS.metaMax, `SEO description should be under ${SEO_LIMITS.metaMax} characters`),
  focusKeyword: z.string(),
  keywords: z
    .array(z.string())
    .max(SEO_LIMITS.maxKeywords, `Up to ${SEO_LIMITS.maxKeywords} keywords`)
});

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

/** Per-step validators consumed by `useFormStepper`. */
export const experienceStepSchemas = [
  experienceFormSchema.pick({
    title: true,
    slug: true,
    category: true,
    countries: true,
    menuGroup: true,
    layoutVariant: true
  }),
  experienceFormSchema.pick({ gallery: true }),
  experienceFormSchema.pick({
    summary: true,
    description: true,
    highlights: true,
    faqs: true
  }),
  experienceFormSchema.pick({ packagePricing: true }),
  experienceFormSchema.pick({
    seoTitle: true,
    seoDescription: true,
    focusKeyword: true,
    keywords: true
  }),
  z.object({})
];

export const experienceWizardSteps = [
  {
    title: 'Experience Basics',
    description: 'Title, package style, and the public URL slug.'
  },
  {
    title: 'Gallery',
    description: 'Choose the images shown on this experience.'
  },
  {
    title: 'Story & FAQs',
    description: 'Summary, full description, highlights, and FAQs.'
  },
  {
    title: 'Package Tables',
    description: 'Ready-made pricing tables; enter only the figures.'
  },
  {
    title: 'SEO',
    description: 'Search appearance, keywords, and readiness score.'
  },
  { title: 'Review', description: 'Confirm everything, then save or publish.' }
];

export const emptyExperienceValues: ExperienceFormValues = {
  title: '',
  slug: '',
  summary: '',
  description: '',
  faqs: [],
  category: '',
  countries: [],
  menuGroup: 'top_experiences',
  layoutVariant: 'safari',
  highlights: [],
  packagePricing: [
    {
      blurb: 'Good-value package option for this experience.',
      currency: 'USD',
      key: 'budget',
      label: 'Budget Package',
      seasons: [
        {
          label: 'Low Season',
          cells: [
            { groupBand: '2 pax', price: '' },
            { groupBand: '3 pax', price: '' },
            { groupBand: '4 pax', price: '' },
            { groupBand: '5 pax', price: '' },
            { groupBand: '6 pax', price: '' }
          ]
        },
        {
          label: 'High Season',
          cells: [
            { groupBand: '2 pax', price: '' },
            { groupBand: '3 pax', price: '' },
            { groupBand: '4 pax', price: '' },
            { groupBand: '5 pax', price: '' },
            { groupBand: '6 pax', price: '' }
          ]
        },
        {
          label: 'Peak Season',
          cells: [
            { groupBand: '2 pax', price: '' },
            { groupBand: '3 pax', price: '' },
            { groupBand: '4 pax', price: '' },
            { groupBand: '5 pax', price: '' },
            { groupBand: '6 pax', price: '' }
          ]
        }
      ]
    },
    {
      blurb: 'Comfortable package option with stronger lodge positioning.',
      currency: 'USD',
      key: 'mid_range',
      label: 'Mid-Range Package',
      seasons: [
        {
          label: 'Low Season',
          cells: [
            { groupBand: '2 pax', price: '' },
            { groupBand: '3 pax', price: '' },
            { groupBand: '4 pax', price: '' },
            { groupBand: '5 pax', price: '' },
            { groupBand: '6 pax', price: '' }
          ]
        },
        {
          label: 'High Season',
          cells: [
            { groupBand: '2 pax', price: '' },
            { groupBand: '3 pax', price: '' },
            { groupBand: '4 pax', price: '' },
            { groupBand: '5 pax', price: '' },
            { groupBand: '6 pax', price: '' }
          ]
        },
        {
          label: 'Peak Season',
          cells: [
            { groupBand: '2 pax', price: '' },
            { groupBand: '3 pax', price: '' },
            { groupBand: '4 pax', price: '' },
            { groupBand: '5 pax', price: '' },
            { groupBand: '6 pax', price: '' }
          ]
        }
      ]
    },
    {
      blurb: 'Premium package option for elevated camps, lodges, and service.',
      currency: 'USD',
      key: 'luxury',
      label: 'Luxury Package',
      seasons: [
        {
          label: 'Low Season',
          cells: [
            { groupBand: '2 pax', price: '' },
            { groupBand: '3 pax', price: '' },
            { groupBand: '4 pax', price: '' },
            { groupBand: '5 pax', price: '' },
            { groupBand: '6 pax', price: '' }
          ]
        },
        {
          label: 'High Season',
          cells: [
            { groupBand: '2 pax', price: '' },
            { groupBand: '3 pax', price: '' },
            { groupBand: '4 pax', price: '' },
            { groupBand: '5 pax', price: '' },
            { groupBand: '6 pax', price: '' }
          ]
        },
        {
          label: 'Peak Season',
          cells: [
            { groupBand: '2 pax', price: '' },
            { groupBand: '3 pax', price: '' },
            { groupBand: '4 pax', price: '' },
            { groupBand: '5 pax', price: '' },
            { groupBand: '6 pax', price: '' }
          ]
        }
      ]
    }
  ],
  gallery: [],
  seoTitle: '',
  seoDescription: '',
  focusKeyword: '',
  keywords: []
};
