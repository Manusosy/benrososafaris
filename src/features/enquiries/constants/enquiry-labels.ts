import type { EnquiryStatus, EnquiryType } from '../api/types';

export const ENQUIRY_TYPE_META: Record<
  EnquiryType,
  {
    description: string;
    label: string;
    variant: 'default' | 'secondary' | 'outline' | 'destructive';
  }
> = {
  'safari-quote': {
    description: 'Full safari quote request from the contact form',
    label: 'Safari Quote',
    variant: 'default'
  },
  general: {
    description: 'General contact or feedback',
    label: 'General',
    variant: 'secondary'
  },
  other: {
    description: 'Booking follow-up or other enquiry',
    label: 'Other Enquiry',
    variant: 'outline'
  },
  'accommodation-inquiry': {
    description: 'Accommodation-specific enquiry (future)',
    label: 'Accommodation',
    variant: 'outline'
  },
  'trip-inquiry': {
    description: 'Trip-specific enquiry (future)',
    label: 'Trip Inquiry',
    variant: 'outline'
  }
};

export const ENQUIRY_STATUS_OPTIONS: Array<{ label: string; value: EnquiryStatus }> = [
  { value: 'pending', label: 'Pending' },
  { value: 'deal', label: 'Deal' },
  { value: 'no-deal', label: 'No deal' }
];

export const ENQUIRY_STATUS_FILTERS: Array<{ label: string; value: EnquiryStatus | 'all' }> = [
  { value: 'all', label: 'All statuses' },
  ...ENQUIRY_STATUS_OPTIONS
];

export const BUDGET_TIER_LABELS: Record<string, string> = {
  budget: 'Budget',
  economy: 'Economy',
  luxury: 'Luxury',
  'high-end': 'High End'
};

export const TRAVEL_PLANNING_LABELS: Record<string, string> = {
  'booked-flights': 'I have booked flights and need help with experiences and or where to stay',
  'deciding-how-to-book': 'I am going on this trip and Deciding How to Book',
  'need-more-info': 'I need more information to decide, if this is my next trip'
};

export const TRIP_TYPE_LABELS: Record<string, string> = {
  'beach-holiday': 'Beach Holiday',
  'culture-safari': 'Culture Safari',
  'family-holiday': 'Family Holiday',
  honeymoon: 'Honeymoon',
  'nature-wildlife': 'Nature and Wildlife'
};

export const REFERRAL_LABELS: Record<string, string> = {
  friends: 'Friends feedback',
  other: 'Other',
  promotional: 'Promotional campaigns',
  social: 'Social networks'
};

export const ENQUIRY_DOCUMENT_SECTIONS = {
  additionalInformation: 'Additional information',
  message: 'Message',
  record: 'Record',
  tripDetails: 'Trip details'
} as const;

/** form_data keys already rendered in contact, trip table, additional info, message, or record */
export const ENQUIRY_FORM_DATA_EXCLUDED_KEYS = new Set([
  'adults',
  'bookingReference',
  'budget',
  'budgetTier',
  'children',
  'country',
  'destinations',
  'email',
  'enquiryType',
  'infants',
  'locale',
  'message',
  'name',
  'phone',
  'preferredDates',
  'referralSource',
  'sourcePath',
  'topic',
  'travelEndDate',
  'travelPlanningStage',
  'travelStartDate',
  'travelers',
  'tripType'
]);

export const ENQUIRY_FORM_DATA_LABELS: Record<string, string> = {
  bookingReference: 'Booking reference',
  referralSource: 'Referral source',
  topic: 'Topic',
  travelPlanningStage: 'Travel planning stage',
  tripType: 'Trip type'
};

export function labelFor(map: Record<string, string>, value: string | undefined | null) {
  if (!value) return '—';
  return map[value] ?? value;
}

export function humanizeFormDataKey(key: string) {
  if (ENQUIRY_FORM_DATA_LABELS[key]) {
    return ENQUIRY_FORM_DATA_LABELS[key];
  }

  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

export function enquiryTypeLabel(type: string) {
  return ENQUIRY_TYPE_META[type as EnquiryType]?.label ?? type;
}

export function enquiryStatusLabel(status: EnquiryStatus) {
  return ENQUIRY_STATUS_OPTIONS.find((option) => option.value === status)?.label ?? status;
}
