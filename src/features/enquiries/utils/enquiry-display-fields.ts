import type { ReactNode } from 'react';

import type { Enquiry } from '@/features/enquiries/api/types';
import {
  BUDGET_TIER_LABELS,
  ENQUIRY_FORM_DATA_EXCLUDED_KEYS,
  REFERRAL_LABELS,
  TRAVEL_PLANNING_LABELS,
  TRIP_TYPE_LABELS,
  humanizeFormDataKey,
  labelFor
} from '@/features/enquiries/constants/enquiry-labels';
import { formatPreferredDatesWithDuration } from '@/lib/travel-date-utils';

export type EnquiryDisplayRow = {
  label: string;
  value: ReactNode;
};

export type EnquiryDetailField = {
  label: string;
  value: ReactNode;
};

export function hasEnquiryDisplayValue(value: ReactNode) {
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

export function getEnquiryBudgetTierLabel(enquiry: Enquiry) {
  const tier = labelFor(BUDGET_TIER_LABELS, enquiry.formData.budgetTier);
  return tier !== '—' ? tier : null;
}

export function getEnquiryDestinationLabel(enquiry: Enquiry) {
  if (enquiry.enquiryType !== 'safari-quote') {
    return '—';
  }

  const destinations = enquiry.destinations ?? enquiry.formData.destinations ?? null;
  return destinations?.trim() || '—';
}

export function getEnquiryGuestMessage(enquiry: Enquiry) {
  if (enquiry.enquiryType === 'safari-quote') {
    return enquiry.formData.message?.trim() || null;
  }

  return enquiry.message?.trim() || null;
}

export function getEnquiryAccordionDisplayFields(enquiry: Enquiry) {
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
  const phone = enquiry.phone ?? form.phone ?? null;
  const travelers = enquiry.travelers ?? form.travelers ?? null;
  const budget = form.budget ?? enquiry.budget ?? null;
  const budgetTier = labelFor(BUDGET_TIER_LABELS, form.budgetTier);
  const tripType = labelFor(TRIP_TYPE_LABELS, form.tripType);
  const planningStage = labelFor(TRAVEL_PLANNING_LABELS, form.travelPlanningStage);
  const referralSource = labelFor(REFERRAL_LABELS, form.referralSource);
  const topic = enquiry.topic ?? form.topic ?? null;
  const bookingReference = enquiry.bookingReference ?? form.bookingReference ?? null;

  const travelerBreakdown =
    form.adults !== undefined
      ? `${form.adults ?? 0} adult(s), ${form.children ?? 0} child(ren), ${form.infants ?? 0} infant(s)`
      : null;

  const tripTableRows: EnquiryDisplayRow[] = [
    { label: 'Date', value: preferredDates },
    { label: 'Destination(s)', value: destinations },
    { label: 'Traveller breakdown', value: travelerBreakdown },
    { label: 'Total travellers', value: travelers },
    { label: 'Budget tier', value: budgetTier !== '—' ? budgetTier : null },
    { label: 'Budget (per person)', value: budget },
    { label: 'Trip type', value: tripType !== '—' ? tripType : null }
  ].filter((row) => hasEnquiryDisplayValue(row.value));

  const detailFields: EnquiryDetailField[] = [
    { label: 'Travel planning stage', value: planningStage !== '—' ? planningStage : null },
    { label: 'Referral source', value: referralSource !== '—' ? referralSource : null },
    { label: 'Topic', value: topic },
    { label: 'Booking reference', value: bookingReference }
  ].filter((field) => hasEnquiryDisplayValue(field.value));

  const extraFormFields: EnquiryDetailField[] = Object.entries(form)
    .filter(
      ([key, value]) =>
        !ENQUIRY_FORM_DATA_EXCLUDED_KEYS.has(key) &&
        hasEnquiryDisplayValue(formatFormDataValue(value))
    )
    .map(([key, value]) => ({
      label: humanizeFormDataKey(key),
      value: formatFormDataValue(value)
    }));

  const guestMessage = getEnquiryGuestMessage(enquiry);

  return {
    contact: {
      country,
      email: enquiry.email,
      phone
    },
    detailFields: [...detailFields, ...extraFormFields],
    guestMessage,
    tripTableRows
  };
}
