'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { revalidateLogic, useStore } from '@tanstack/react-form';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Label } from '@/components/ui/label';
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
import { HighlightsInput } from '../shared/highlights-input';
import { htmlToText, RichTextEditor } from '../shared/rich-text-editor';
import { WizardShell, type WizardPendingAction } from '../shared/wizard-shell';
import {
  emptyExperienceValues,
  experienceFormSchema,
  experienceStepSchemas,
  experienceWizardSteps,
  type ExperienceFormValues
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
  { value: 'Game drive', label: 'Game drive' },
  { value: 'Hot air balloon safari', label: 'Hot air balloon safari' },
  { value: 'Walking safari', label: 'Walking safari' },
  { value: 'Cultural visit', label: 'Cultural visit' },
  { value: 'Bird watching', label: 'Bird watching' },
  { value: 'Night drive', label: 'Night drive' },
  { value: 'Boat safari', label: 'Boat safari' },
  { value: 'Gorilla trekking', label: 'Gorilla trekking' }
];

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
                  <Label htmlFor='experience-category'>Experience type</Label>
                  <Combobox
                    id='experience-category'
                    options={categoryItems}
                    value={field.state.value}
                    onChange={field.handleChange}
                    placeholder='Select a type'
                    searchPlaceholder='Search or add a type…'
                    emptyText='No types yet.'
                    creatable
                    createLabel='Add type'
                  />
                  <p className='text-muted-foreground text-xs'>
                    Pick a type or add a new one (e.g. “Sundowner”). New types join the list for
                    next time.
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
                  label='Highlights'
                  value={field.state.value}
                  onChange={field.handleChange}
                  placeholder='e.g. Sunrise launch — press Enter to add'
                  description='Add one highlight at a time. Press Enter or comma to add each.'
                />
              )}
            </form.AppField>
          </div>
        ) : null}

        {currentStep === 4 ? (
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
                  body: `${values.summary} ${htmlToText(values.description)}`,
                  imageCount: values.gallery.length,
                  imagesWithAlt
                }}
              />
            </div>
          </div>
        ) : null}

        {currentStep === 5 ? <ReviewSummary values={values} /> : null}
      </WizardShell>
    </form.AppForm>
  );
}

function ReviewSummary({ values }: { values: ExperienceFormValues }) {
  const rows: Array<{ label: string; value: string }> = [
    { label: 'Title', value: values.title },
    { label: 'Slug', value: values.slug },
    { label: 'Type', value: values.category },
    {
      label: 'Gallery',
      value: values.gallery.length ? `${values.gallery.length} image(s)` : ''
    },
    { label: 'Summary', value: values.summary },
    { label: 'Highlights', value: values.highlights.join(', ') },
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
