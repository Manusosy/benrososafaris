import Image from 'next/image';

import {
  BENROSO_CONTACT_DEFAULTS,
  BENROSO_LOGO_HEIGHT,
  BENROSO_LOGO_PATH,
  BENROSO_LOGO_WIDTH
} from '@/config/benroso';
import type { Enquiry } from '@/features/enquiries/api/types';
import { EnquiryStatusBadge } from '@/features/enquiries/components/enquiry-status-badge';
import { EnquiryTypeBadge } from '@/features/enquiries/components/enquiry-type-badge';
import {
  BUDGET_TIER_LABELS,
  ENQUIRY_DOCUMENT_SECTIONS,
  ENQUIRY_FORM_DATA_EXCLUDED_KEYS,
  REFERRAL_LABELS,
  TRAVEL_PLANNING_LABELS,
  TRIP_TYPE_LABELS,
  humanizeFormDataKey,
  labelFor
} from '@/features/enquiries/constants/enquiry-labels';
import { absoluteUrl } from '@/lib/seo/absolute-url';
import { formatPreferredDatesWithDuration } from '@/lib/travel-date-utils';
import { cn } from '@/lib/utils';

type DetailField = {
  label: string;
  span?: 'full';
  value: React.ReactNode;
};

type TripTableRow = {
  label: string;
  value: React.ReactNode;
};

function hasValue(value: React.ReactNode) {
  if (value === null || value === undefined || value === false) return false;
  if (typeof value === 'string') return value.trim() !== '' && value !== '—';
  return true;
}

function formatFormDataValue(value: unknown) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function DocumentSection({
  children,
  className,
  title
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <section className={cn('enquiry-detail-section border-t border-[#E5E7EB] pt-5', className)}>
      <h2 className='mb-4 text-[11px] font-semibold tracking-[0.14em] text-[#6B7280] uppercase'>
        {title}
      </h2>
      {children}
    </section>
  );
}

function DocumentFieldGrid({ fields }: { fields: DetailField[] }) {
  const visible = fields.filter((field) => hasValue(field.value));
  if (!visible.length) return null;

  return (
    <dl className='grid gap-x-8 gap-y-5 sm:grid-cols-2'>
      {visible.map((field) => (
        <div className={cn(field.span === 'full' && 'sm:col-span-2')} key={field.label}>
          <dt className='text-[11px] font-semibold tracking-wide text-[#374151] uppercase'>
            {field.label}
          </dt>
          <dd className='mt-1.5 text-sm leading-6 text-[#111827]'>{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function TripDetailsTable({ rows }: { rows: TripTableRow[] }) {
  const visible = rows.filter((row) => hasValue(row.value));
  if (!visible.length) return null;

  return (
    <div className='enquiry-trip-table overflow-x-auto rounded-md border border-[#E5E7EB] print:overflow-visible'>
      <table className='w-full border-collapse text-sm'>
        <thead>
          <tr className='enquiry-trip-table-head border-b border-[#2F4034] bg-[#3C5142] print:bg-[#3C5142]'>
            <th
              className='w-[38%] px-4 py-3 text-left text-[11px] font-semibold tracking-wide text-white uppercase'
              scope='col'
            >
              Field
            </th>
            <th
              className='px-4 py-3 text-left text-[11px] font-semibold tracking-wide text-white uppercase'
              scope='col'
            >
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {visible.map((row, index) => (
            <tr
              className={cn(
                'border-b border-[#E5E7EB] last:border-b-0',
                index % 2 === 1 && 'bg-[#FAFAFA] print:bg-[#FAFAFA]'
              )}
              key={row.label}
            >
              <th
                className='px-4 py-3 text-left align-top text-sm font-semibold text-[#374151]'
                scope='row'
              >
                {row.label}
              </th>
              <td className='px-4 py-3 align-top leading-6 text-[#111827]'>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getGuestMessage(enquiry: Enquiry) {
  if (enquiry.enquiryType === 'safari-quote') {
    return enquiry.formData.message?.trim() || null;
  }

  return enquiry.message?.trim() || null;
}

function buildEnquiryFields(enquiry: Enquiry) {
  const form = enquiry.formData;
  const country = enquiry.country ?? form.country ?? null;
  const destinations = enquiry.destinations ?? form.destinations ?? null;
  const preferredDatesRaw = enquiry.preferredDates ?? form.preferredDates ?? null;
  const preferredDates = preferredDatesRaw
    ? formatPreferredDatesWithDuration({
        preferredDates: preferredDatesRaw,
        travelEndDate: form.travelEndDate ?? null,
        travelStartDate: form.travelStartDate ?? null
      })
    : null;
  const topic = enquiry.topic ?? form.topic ?? null;
  const bookingReference = enquiry.bookingReference ?? form.bookingReference ?? null;
  const phone = enquiry.phone ?? form.phone ?? null;
  const travelers = enquiry.travelers ?? form.travelers ?? null;
  const budget = form.budget ?? enquiry.budget ?? null;
  const sourcePath = enquiry.sourcePath ?? form.sourcePath ?? null;
  const guestMessage = getGuestMessage(enquiry);

  const travelerBreakdown =
    form.adults !== undefined
      ? `${form.adults ?? 0} adult(s), ${form.children ?? 0} child(ren), ${form.infants ?? 0} infant(s)`
      : null;

  const receivedAt = new Date(enquiry.createdAt);
  const updatedAt = new Date(enquiry.updatedAt);

  const tripTableRows: TripTableRow[] = [
    { label: 'Date', value: preferredDates },
    { label: 'Destination(s)', value: destinations },
    { label: 'Traveller breakdown', value: travelerBreakdown },
    { label: 'Tier', value: labelFor(BUDGET_TIER_LABELS, form.budgetTier) },
    { label: 'Total travellers', value: travelers },
    { label: 'Budget (per person)', value: budget }
  ];

  const hasTripTable = tripTableRows.some((row) => hasValue(row.value));

  const additionalFields: DetailField[] = [
    {
      label: 'Trip type',
      value: labelFor(TRIP_TYPE_LABELS, form.tripType)
    },
    {
      label: 'Travel planning stage',
      value: labelFor(TRAVEL_PLANNING_LABELS, form.travelPlanningStage),
      span: 'full'
    },
    {
      label: 'Referral source',
      value: labelFor(REFERRAL_LABELS, form.referralSource)
    },
    { label: 'Topic', value: topic },
    { label: 'Booking reference', value: bookingReference }
  ];

  const extraFormFields: DetailField[] = Object.entries(form)
    .filter(
      ([key, value]) =>
        !ENQUIRY_FORM_DATA_EXCLUDED_KEYS.has(key) && hasValue(formatFormDataValue(value))
    )
    .map(([key, value]) => ({
      label: humanizeFormDataKey(key),
      value: formatFormDataValue(value)
    }));

  const allAdditionalFields = [...additionalFields, ...extraFormFields];
  const visibleAdditionalFields = allAdditionalFields.filter((field) => hasValue(field.value));

  return {
    country,
    guestMessage,
    hasTripTable,
    phone,
    receivedAt,
    sourcePath,
    tripTableRows,
    updatedAt,
    visibleAdditionalFields
  };
}

type EnquiryDetailDocumentProps = {
  enquiry: Enquiry;
};

export function EnquiryDetailDocument({ enquiry }: EnquiryDetailDocumentProps) {
  const websiteUrl = absoluteUrl('/');
  const websiteLabel = websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const fields = buildEnquiryFields(enquiry);

  return (
    <article className='enquiry-detail-document mx-auto max-w-4xl rounded-md border border-[#E5E7EB] bg-white shadow-sm print:max-w-none print:rounded-none print:border-0 print:shadow-none'>
      <header className='border-b border-[#E5E7EB] px-6 py-5 print:px-0 print:py-4'>
        <div className='flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between'>
          <div className='shrink-0'>
            <Image
              alt='Benroso Safaris'
              className='h-auto w-[180px] max-w-full object-contain sm:w-[220px]'
              height={BENROSO_LOGO_HEIGHT}
              priority
              src={BENROSO_LOGO_PATH}
              width={BENROSO_LOGO_WIDTH}
            />
          </div>

          <address className='text-right text-sm leading-6 text-[#374151] not-italic sm:max-w-xs'>
            <p className='font-semibold text-[#111827]'>{BENROSO_CONTACT_DEFAULTS.companyName}</p>
            <p>{BENROSO_CONTACT_DEFAULTS.phonePrimary}</p>
            <p>{BENROSO_CONTACT_DEFAULTS.phoneSecondary}</p>
            <p>
              <a
                className='text-[#3C5142] print:text-[#111827]'
                href={`mailto:${BENROSO_CONTACT_DEFAULTS.email}`}
              >
                {BENROSO_CONTACT_DEFAULTS.email}
              </a>
            </p>
            <p>
              <a className='text-[#3C5142] print:text-[#111827]' href={websiteUrl}>
                {websiteLabel}
              </a>
            </p>
          </address>
        </div>
      </header>

      <div className='space-y-5 px-6 py-6 print:space-y-4 print:px-0 print:py-4'>
        <div className='rounded-md border border-[#E5E7EB] bg-[#FAFAFA] px-5 py-4 print:border-[#D1D5DB] print:bg-white'>
          <div className='flex flex-wrap items-center gap-2'>
            <EnquiryTypeBadge type={enquiry.enquiryType} />
            <EnquiryStatusBadge status={enquiry.status} />
          </div>

          <h1 className='mt-3 text-2xl font-semibold tracking-tight text-[#111827] print:text-xl'>
            {enquiry.name}
          </h1>

          <p className='mt-1 text-sm text-[#6B7280]'>
            Reference{' '}
            <span className='font-semibold tracking-wide text-[#3C5142] print:text-[#111827]'>
              {enquiry.referenceCode}
            </span>
            {' · '}
            Received{' '}
            {fields.receivedAt.toLocaleString(undefined, {
              dateStyle: 'long',
              timeStyle: 'short'
            })}
          </p>

          <dl className='mt-4 grid gap-x-8 gap-y-3 border-t border-[#E5E7EB] pt-4 sm:grid-cols-2'>
            <div>
              <dt className='text-[11px] font-medium tracking-wide text-[#6B7280] uppercase'>
                Email
              </dt>
              <dd className='mt-1 text-sm leading-6 text-[#111827]'>
                <a className='text-[#3C5142] print:text-[#111827]' href={`mailto:${enquiry.email}`}>
                  {enquiry.email}
                </a>
              </dd>
            </div>
            {hasValue(fields.phone) ? (
              <div>
                <dt className='text-[11px] font-medium tracking-wide text-[#6B7280] uppercase'>
                  Phone
                </dt>
                <dd className='mt-1 text-sm leading-6 text-[#111827]'>{fields.phone}</dd>
              </div>
            ) : null}
            {hasValue(fields.country) ? (
              <div>
                <dt className='text-[11px] font-medium tracking-wide text-[#6B7280] uppercase'>
                  Country of residence
                </dt>
                <dd className='mt-1 text-sm leading-6 text-[#111827]'>{fields.country}</dd>
              </div>
            ) : null}
          </dl>
        </div>

        {fields.hasTripTable ? (
          <DocumentSection title={ENQUIRY_DOCUMENT_SECTIONS.tripDetails}>
            <TripDetailsTable rows={fields.tripTableRows} />
          </DocumentSection>
        ) : null}

        {fields.visibleAdditionalFields.length ? (
          <DocumentSection title={ENQUIRY_DOCUMENT_SECTIONS.additionalInformation}>
            <DocumentFieldGrid fields={fields.visibleAdditionalFields} />
          </DocumentSection>
        ) : null}

        {fields.guestMessage ? (
          <DocumentSection title={ENQUIRY_DOCUMENT_SECTIONS.message}>
            <div className='rounded-md border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 print:border-[#D1D5DB] print:bg-white'>
              <p className='text-sm leading-7 whitespace-pre-wrap text-[#111827]'>
                {fields.guestMessage}
              </p>
            </div>
          </DocumentSection>
        ) : null}

        <DocumentSection title={ENQUIRY_DOCUMENT_SECTIONS.record}>
          <DocumentFieldGrid
            fields={[
              {
                label: 'Reference',
                value: (
                  <span className='font-semibold tracking-wide text-[#3C5142] print:text-[#111827]'>
                    {enquiry.referenceCode}
                  </span>
                )
              },
              {
                label: 'Last updated',
                value: fields.updatedAt.toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })
              },
              { label: 'Locale', value: enquiry.locale.toUpperCase() },
              { label: 'Source page', value: fields.sourcePath }
            ]}
          />
        </DocumentSection>
      </div>
    </article>
  );
}
