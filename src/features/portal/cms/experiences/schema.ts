import * as z from 'zod';

import { SEO_LIMITS } from '../seo/analyze';

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
  // Base
  category: z.string(),
  /** Highlights list, stored directly as a jsonb array. */
  highlights: z.array(z.string()),
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
  experienceFormSchema.pick({ title: true, slug: true, category: true }),
  experienceFormSchema.pick({ gallery: true }),
  experienceFormSchema.pick({ summary: true, description: true, highlights: true }),
  experienceFormSchema.pick({
    seoTitle: true,
    seoDescription: true,
    focusKeyword: true,
    keywords: true
  }),
  z.object({})
];

export const experienceWizardSteps = [
  { title: 'Basics', description: 'Title, type, and the auto-generated URL slug.' },
  { title: 'Gallery', description: 'Choose the images shown on this experience.' },
  { title: 'Story', description: 'Summary, full description, and highlights.' },
  { title: 'SEO', description: 'Search appearance, keywords, and readiness score.' },
  { title: 'Review', description: 'Confirm everything, then save or publish.' }
];

export const emptyExperienceValues: ExperienceFormValues = {
  title: '',
  slug: '',
  summary: '',
  description: '',
  category: '',
  highlights: [],
  gallery: [],
  seoTitle: '',
  seoDescription: '',
  focusKeyword: '',
  keywords: []
};
