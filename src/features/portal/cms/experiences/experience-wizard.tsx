'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { revalidateLogic, useStore } from '@tanstack/react-form';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAppForm } from '@/components/ui/tanstack-form';
import { useFormStepper } from '@/hooks/use-stepper';
import { slugify } from '@/lib/utils';
import { getMediaByIds } from '../media/api/client';
import { mediaKeys } from '../media/api/queries';
import { MediaGalleryField } from '../media/components/media-picker';
import { SEO_LIMITS } from '../seo/analyze';
import { KeywordInput } from '../seo/components/keyword-input';
import { SeoAnalyzer } from '../seo/components/seo-analyzer';
import { Combobox, type ComboboxOption } from '../shared/combobox';
import { FaqInput } from '../shared/faq-input';
import { HighlightsInput } from '../shared/highlights-input';
import { htmlToText, RichTextEditor } from '../shared/rich-text-editor';
import { WizardShell, type WizardPendingAction } from '../shared/wizard-shell';
import {
  emptyExperienceValues,
  experienceFormSchema,
  experienceStepSchemas,
  experienceWizardSteps,
  type ExperienceFormValues,
  type PackagePricingLevel
} from './schema';
import { saveExperience, type SaveStatus } from './service';

interface ExperienceWizardProps {
  /** Present when editing an existing experience. */
  id?: string;
  initialValues?: ExperienceFormValues;
  /** Distinct categories already in use, for quick re-selection. */
  categoryOptions?: string[];
}

/** Common experience types, seeded as the main options on the type selector.
 *  Editors can still add bespoke types on the fly via the combobox. */
const CATEGORY_PRESETS: ComboboxOption[] = [
  { value: 'Honeymoon Safari', label: 'Honeymoon Safari' },
  { value: 'Fly-in Safari', label: 'Fly-in Safari' },
  { value: 'Group Joining Safari', label: 'Group Joining Safari' },
  { value: 'Private Safari', label: 'Private Safari' },
  { value: 'Beach Extension', label: 'Beach Extension' },
  { value: 'Mountain Hiking', label: 'Mountain Hiking' },
  { value: 'Conservation Safari', label: 'Conservation Safari' },
  { value: 'Family Safari', label: 'Family Safari' },
  { value: 'Luxury Safari', label: 'Luxury Safari' },
  { value: 'Budget Safari', label: 'Budget Safari' },
  { value: 'Hot Air Balloon Safari', label: 'Hot Air Balloon Safari' },
  { value: 'Walking Safari', label: 'Walking Safari' },
  { value: 'Cultural Safari', label: 'Cultural Safari' },
  { value: 'Bird Watching Safari', label: 'Bird Watching Safari' },
  { value: 'Gorilla Trekking', label: 'Gorilla Trekking' }
];

const MENU_GROUP_OPTIONS = [
  {
    value: 'top_experiences',
    label: 'Top Experiences',
    description: 'Main lifestyle and travel-style experiences column.'
  },
  {
    value: 'wildlife_safari',
    label: 'Wildlife Safari',
    description: 'Wildlife, activity, and field-safari experiences column.'
  }
] as const;

/** Merges preset options with values already stored in the database,
 *  de-duplicating case-insensitively. */
function buildOptions(presets: ComboboxOption[], fromDb: string[]): ComboboxOption[] {
  const byValue = new Map<string, ComboboxOption>();
  for (const option of presets) byValue.set(option.value.toLowerCase(), option);
  for (const value of fromDb) {
    const key = value.toLowerCase();
    if (!byValue.has(key)) byValue.set(key, { value, label: value });
  }
  return [...byValue.values()].toSorted((a, b) => a.label.localeCompare(b.label));
}

const PACKAGE_LEVEL_OPTIONS: Array<{
  label: string;
  value: PackagePricingLevel['key'];
}> = [
  { value: 'economy', label: 'Economy Package' },
  { value: 'budget', label: 'Budget Package' },
  { value: 'mid_range', label: 'Mid-Range Package' },
  { value: 'luxury', label: 'Luxury Package' },
  { value: 'high_end', label: 'High-End Package' },
  { value: 'custom', label: 'Custom Package' }
];

const SEASON_OPTIONS = [
  'Low Season',
  'High Season',
  'Peak Season',
  'Green Season',
  'Festive Season'
];
const PAX_BANDS = ['2 pax', '3 pax', '4 pax', '5 pax', '6 pax'];

function emptyPackageLevel(key: PackagePricingLevel['key'] = 'budget'): PackagePricingLevel {
  const label = PACKAGE_LEVEL_OPTIONS.find((option) => option.value === key)?.label ?? 'Package';
  return {
    blurb: '',
    currency: 'USD',
    key,
    label,
    seasons: SEASON_OPTIONS.slice(0, 3).map((season) => ({
      label: season,
      cells: PAX_BANDS.map((groupBand) => ({ groupBand, price: '' }))
    }))
  };
}

function PackagePricingInput({
  value,
  onChange
}: {
  value: PackagePricingLevel[];
  onChange: (next: PackagePricingLevel[]) => void;
}) {
  const levels = value.length ? value : [emptyPackageLevel('budget')];

  function updateLevel(index: number, patch: Partial<PackagePricingLevel>) {
    onChange(
      levels.map((level, levelIndex) => (levelIndex === index ? { ...level, ...patch } : level))
    );
  }

  function updateSeason(levelIndex: number, seasonIndex: number, label: string) {
    updateLevel(levelIndex, {
      seasons: levels[levelIndex].seasons.map((season, index) =>
        index === seasonIndex ? { ...season, label } : season
      )
    });
  }

  function updatePrice(levelIndex: number, seasonIndex: number, cellIndex: number, price: string) {
    updateLevel(levelIndex, {
      seasons: levels[levelIndex].seasons.map((season, index) =>
        index === seasonIndex
          ? {
              ...season,
              cells: season.cells.map((cell, nextCellIndex) =>
                nextCellIndex === cellIndex ? { ...cell, price } : cell
              )
            }
          : season
      )
    });
  }

  function removeLevel(index: number) {
    onChange(levels.filter((_, levelIndex) => levelIndex !== index));
  }

  return (
    <div className='grid gap-5'>
      <div className='rounded-lg border bg-muted/25 p-4'>
        <h3 className='text-sm font-semibold'>Experience package price tables</h3>
        <p className='mt-1 text-sm text-muted-foreground'>
          Use one table per package level. The pax columns are fixed for consistency; enter only the
          per-person figures. Leave a cell blank when that option is on request.
        </p>
      </div>

      {levels.map((level, levelIndex) => (
        <div
          className='overflow-hidden rounded-lg border border-[#3C5142]/30 bg-background shadow-sm'
          key={`${level.key}-${levelIndex}`}
        >
          <div className='grid gap-3 border-b bg-muted/30 p-4 lg:grid-cols-[180px_180px_minmax(0,1fr)]'>
            <div className='grid gap-2'>
              <Label htmlFor={`package-level-${levelIndex}`}>Package level</Label>
              <select
                className='border-input bg-background h-10 rounded-md border px-3 text-sm'
                id={`package-level-${levelIndex}`}
                value={level.key}
                onChange={(event) => {
                  const key = event.target.value as PackagePricingLevel['key'];
                  updateLevel(levelIndex, {
                    key,
                    label:
                      PACKAGE_LEVEL_OPTIONS.find((option) => option.value === key)?.label ??
                      level.label
                  });
                }}
              >
                {PACKAGE_LEVEL_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor={`package-currency-${levelIndex}`}>Currency</Label>
              <select
                className='border-input bg-background h-10 rounded-md border px-3 text-sm'
                id={`package-currency-${levelIndex}`}
                value={level.currency}
                onChange={(event) => updateLevel(levelIndex, { currency: event.target.value })}
              >
                <option value='USD'>USD</option>
                <option value='KES'>KES</option>
                <option value='EUR'>EUR</option>
                <option value='GBP'>GBP</option>
              </select>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor={`package-title-${levelIndex}`}>Table title</Label>
              <Input
                id={`package-title-${levelIndex}`}
                value={level.label}
                onChange={(event) => updateLevel(levelIndex, { label: event.target.value })}
                placeholder='e.g. Budget Mountain Hiking Package'
              />
            </div>
          </div>

          <div className='grid gap-4 p-4'>
            <div className='grid gap-2'>
              <Label htmlFor={`package-blurb-${levelIndex}`}>Package note</Label>
              <Textarea
                id={`package-blurb-${levelIndex}`}
                value={level.blurb}
                onChange={(event) => updateLevel(levelIndex, { blurb: event.target.value })}
                placeholder='Short note shown beside this public price table.'
                rows={2}
              />
            </div>

            <div className='overflow-x-auto rounded-md border border-[#3C5142]/20'>
              <table className='w-full min-w-[760px] text-sm'>
                <thead>
                  <tr className='border-b border-[#C8A84E] bg-[#3C5142] text-left text-xs font-semibold uppercase tracking-wide text-white'>
                    <th className='w-48 px-3 py-3'>Season</th>
                    {PAX_BANDS.map((band) => (
                      <th className='px-3 py-3' key={band}>
                        {band}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {level.seasons.map((season, seasonIndex) => (
                    <tr className='border-b last:border-b-0' key={`${season.label}-${seasonIndex}`}>
                      <th className='px-3 py-3'>
                        <select
                          aria-label={`Season ${seasonIndex + 1}`}
                          className='border-input bg-background h-10 w-full rounded-md border px-2 text-sm font-normal'
                          value={season.label}
                          onChange={(event) =>
                            updateSeason(levelIndex, seasonIndex, event.target.value)
                          }
                        >
                          {SEASON_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </th>
                      {season.cells.map((cell, cellIndex) => (
                        <td className='px-3 py-3' key={cell.groupBand}>
                          <Input
                            aria-label={`${level.label} ${season.label} ${cell.groupBand} price`}
                            inputMode='numeric'
                            value={cell.price}
                            onChange={(event) =>
                              updatePrice(levelIndex, seasonIndex, cellIndex, event.target.value)
                            }
                            placeholder='0'
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='flex justify-end'>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => removeLevel(levelIndex)}
              >
                Remove table
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button
        type='button'
        variant='outline'
        className='justify-self-start'
        onClick={() => onChange([...levels, emptyPackageLevel('high_end')])}
      >
        Add package table
      </Button>
    </div>
  );
}

export function ExperienceWizard({
  id,
  initialValues,
  categoryOptions = []
}: ExperienceWizardProps) {
  const router = useRouter();
  const [pendingAction, setPendingAction] = React.useState<WizardPendingAction>(null);

  const categoryItems = React.useMemo(
    () => buildOptions(CATEGORY_PRESETS, categoryOptions),
    [categoryOptions]
  );

  // When creating, the slug and SEO title track the title until the editor
  // overrides them manually. When editing, leave existing values untouched.
  const autoSlugRef = React.useRef(!id);
  const autoTitleRef = React.useRef(!id);

  const {
    currentStep,
    isFirstStep,
    step,
    currentValidator,
    handleNextStepOrSubmit,
    handleCancelOrBack
  } = useFormStepper(experienceStepSchemas);

  const form = useAppForm({
    defaultValues: initialValues ?? emptyExperienceValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: currentValidator as typeof experienceFormSchema
    },
    onSubmit: () => {
      // Submission is driven explicitly by Save draft / Publish below.
    }
  });

  const values = useStore(form.store, (state) => state.values);

  // Resolve the chosen gallery assets so the SEO panel can report alt-text
  // coverage. Only fetches when at least one image is selected.
  const { data: galleryAssets = [] } = useQuery({
    queryKey: [...mediaKeys.all, 'byIds', values.gallery],
    queryFn: () => getMediaByIds(values.gallery),
    enabled: values.gallery.length > 0
  });
  const imagesWithAlt = galleryAssets.filter((asset) => (asset.alt ?? '').trim().length > 0).length;

  React.useEffect(() => {
    if (currentStep === 4 && values.packagePricing.length === 0) {
      form.setFieldValue('packagePricing', [
        emptyPackageLevel('budget'),
        emptyPackageLevel('mid_range'),
        emptyPackageLevel('luxury')
      ]);
    }
  }, [currentStep, form, values.packagePricing.length]);

  async function persist(status: SaveStatus) {
    // Publishing requires the full schema; a draft only needs the basics.
    const schema = status === 'published' ? experienceFormSchema : experienceStepSchemas[0];
    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      await form.handleSubmit();
      toast.error(
        status === 'published'
          ? 'Fix the highlighted fields before publishing.'
          : 'Add a title and slug to save a draft.'
      );
      return;
    }

    setPendingAction(status === 'published' ? 'publish' : 'draft');
    try {
      await saveExperience({ id, values, status });
      toast.success(status === 'published' ? 'Experience published.' : 'Draft saved.');
      router.push('/portal/experiences');
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setPendingAction(null);
    }
  }

  return (
    <form.AppForm>
      <WizardShell
        steps={experienceWizardSteps}
        currentStep={currentStep}
        isFirstStep={isFirstStep}
        isLastStep={step.isCompleted}
        pendingAction={pendingAction}
        onBack={() => handleCancelOrBack({ onBack: () => {} })}
        onNext={() => void handleNextStepOrSubmit(form)}
        onSaveDraft={() => void persist('draft')}
        onPublish={() => void persist('published')}
      >
        {currentStep === 1 ? (
          <div className='grid gap-4'>
            <form.AppField
              name='title'
              listeners={{
                onChange: ({ value }) => {
                  if (autoSlugRef.current) form.setFieldValue('slug', slugify(value));
                  if (autoTitleRef.current) form.setFieldValue('seoTitle', value);
                }
              }}
            >
              {(field) => (
                <field.TextField
                  label='Experience title'
                  required
                  placeholder='e.g. Hot air balloon over the Mara'
                />
              )}
            </form.AppField>
            <form.AppField
              name='slug'
              listeners={{
                onChange: ({ value }) => {
                  // Manual edits stop the slug from tracking the title.
                  if (value !== slugify(form.getFieldValue('title'))) autoSlugRef.current = false;
                }
              }}
            >
              {(field) => (
                <field.TextField
                  label='URL slug'
                  required
                  placeholder='auto-generated-from-title'
                  description='Auto-generated from the title. Edit only if you need a custom URL.'
                />
              )}
            </form.AppField>
            <form.AppField name='category'>
              {(field) => (
                <div className='grid gap-2'>
                  <Label htmlFor='experience-category'>Package / experience style</Label>
                  <Combobox
                    id='experience-category'
                    options={categoryItems}
                    value={field.state.value}
                    onChange={field.handleChange}
                    placeholder='Select a package style'
                    searchPlaceholder='Search or add a style...'
                    emptyText='No package styles yet.'
                    creatable
                    createLabel='Add style'
                  />
                  <p className='text-muted-foreground text-xs'>
                    Use the client-facing style: Honeymoon, Fly-in, Group Joining, Beach Extension,
                    Mountain Hiking, Conservation, or another package theme.
                  </p>
                </div>
              )}
            </form.AppField>
            <form.AppField name='menuGroup'>
              {(field) => (
                <div className='grid gap-2'>
                  <Label htmlFor='experience-menu-group'>Navigation menu classification</Label>
                  <select
                    className='border-input bg-background h-10 rounded-md border px-3 text-sm'
                    id='experience-menu-group'
                    value={field.state.value}
                    onChange={(event) =>
                      field.handleChange(event.target.value as ExperienceFormValues['menuGroup'])
                    }
                  >
                    {MENU_GROUP_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className='text-muted-foreground text-xs'>
                    {
                      MENU_GROUP_OPTIONS.find((option) => option.value === field.state.value)
                        ?.description
                    }
                  </p>
                </div>
              )}
            </form.AppField>
          </div>
        ) : null}

        {currentStep === 2 ? (
          <MediaGalleryField
            value={values.gallery}
            onChange={(ids) => form.setFieldValue('gallery', ids)}
            label='Experience gallery'
            description='The first image is used as the cover. Pick from the library or upload new ones.'
          />
        ) : null}

        {currentStep === 3 ? (
          <div className='grid gap-4'>
            <form.AppField name='summary'>
              {(field) => (
                <field.TextareaField
                  label='Summary'
                  placeholder='One or two sentences shown on listing cards.'
                  rows={3}
                  maxLength={280}
                />
              )}
            </form.AppField>
            <form.AppField name='description'>
              {(field) => (
                <div className='grid gap-2'>
                  <Label htmlFor='experience-description'>Full description</Label>
                  <RichTextEditor
                    value={field.state.value}
                    onChange={field.handleChange}
                    placeholder='The main body shown on the experience page.'
                  />
                </div>
              )}
            </form.AppField>
            <form.AppField name='highlights'>
              {(field) => (
                <HighlightsInput
                  label='What guests can expect'
                  value={field.state.value}
                  onChange={field.handleChange}
                  placeholder='e.g. Private sundowner setup - press Enter to add'
                  description='Add one highlight at a time. Press Enter or comma to add each.'
                />
              )}
            </form.AppField>
            <form.AppField name='faqs'>
              {(field) => (
                <FaqInput
                  label='Experience FAQs'
                  value={field.state.value}
                  onChange={field.handleChange}
                  description='Answer package-style questions guests ask before choosing trips.'
                />
              )}
            </form.AppField>
          </div>
        ) : null}

        {currentStep === 4 ? (
          <PackagePricingInput
            value={values.packagePricing}
            onChange={(next) => form.setFieldValue('packagePricing', next)}
          />
        ) : null}

        {currentStep === 5 ? (
          <div className='grid gap-4 lg:grid-cols-[1fr_320px]'>
            <div className='grid gap-4'>
              <form.AppField name='seoTitle'>
                {(field) => (
                  <field.TextField
                    label='SEO title'
                    placeholder={values.title || 'Defaults to the experience title'}
                    maxLength={70}
                    description='Pre-filled from the experience title. Override for a custom search title.'
                  />
                )}
              </form.AppField>
              <form.AppField name='seoDescription'>
                {(field) => (
                  <field.TextareaField
                    label='Meta description'
                    placeholder='Shown in Google results and social shares.'
                    rows={3}
                    maxLength={SEO_LIMITS.metaMax}
                  />
                )}
              </form.AppField>

              <KeywordInput
                focusKeyword={values.focusKeyword}
                keywords={values.keywords}
                onFocusKeywordChange={(value) => form.setFieldValue('focusKeyword', value)}
                onKeywordsChange={(value) => form.setFieldValue('keywords', value)}
              />
            </div>

            <div className='lg:sticky lg:top-4 lg:self-start'>
              <SeoAnalyzer
                input={{
                  title: values.seoTitle || values.title,
                  metaDescription: values.seoDescription,
                  slug: values.slug,
                  focusKeyword: values.focusKeyword,
                  keywords: values.keywords,
                  body: `${values.summary} ${htmlToText(values.description)} ${values.highlights.join(' ')}`,
                  imageCount: values.gallery.length,
                  imagesWithAlt
                }}
              />
            </div>
          </div>
        ) : null}

        {currentStep === 6 ? <ReviewSummary values={values} /> : null}
      </WizardShell>
    </form.AppForm>
  );
}

function ReviewSummary({ values }: { values: ExperienceFormValues }) {
  const rows: Array<{ label: string; value: string }> = [
    { label: 'Title', value: values.title },
    { label: 'Slug', value: values.slug },
    { label: 'Package style', value: values.category },
    {
      label: 'Menu group',
      value:
        MENU_GROUP_OPTIONS.find((option) => option.value === values.menuGroup)?.label ??
        'Top Experiences'
    },
    {
      label: 'Gallery',
      value: values.gallery.length ? `${values.gallery.length} image(s)` : ''
    },
    { label: 'Summary', value: values.summary },
    { label: 'Guest expectations', value: values.highlights.join(', ') },
    {
      label: 'FAQs',
      value: values.faqs.length ? `${values.faqs.length} question(s)` : ''
    },
    {
      label: 'Package tables',
      value: values.packagePricing.length ? `${values.packagePricing.length} table(s)` : ''
    },
    { label: 'SEO title', value: values.seoTitle || values.title },
    { label: 'Focus keyword', value: values.focusKeyword },
    { label: 'Keywords', value: values.keywords.join(', ') }
  ];

  return (
    <dl className='grid gap-3'>
      {rows.map((row) => (
        <div
          key={row.label}
          className='grid grid-cols-[160px_1fr] gap-3 border-b py-2 last:border-b-0'
        >
          <dt className='text-muted-foreground text-xs font-medium uppercase tracking-wide'>
            {row.label}
          </dt>
          <dd className='text-sm'>{row.value || '—'}</dd>
        </div>
      ))}
    </dl>
  );
}
