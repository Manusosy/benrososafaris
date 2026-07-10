export type EnquiryType = 'safari-quote' | 'general' | 'other';

export interface ContactDestinationOption {
  country: string | null;
  id: string;
  name: string;
  slug: string;
}

export interface SubmitEnquiryPayload {
  adults?: number;
  bookingReference?: string;
  budget?: string;
  budgetTier?: string;
  children?: number;
  country?: string;
  destinations?: string;
  email: string;
  enquiryType: EnquiryType;
  infants?: number;
  locale: string;
  message?: string;
  name: string;
  phone?: string;
  preferredDates?: string;
  referralSource?: string;
  sourcePath?: string;
  topic?: string;
  travelEndDate?: string;
  travelPlanningStage?: string;
  travelStartDate?: string;
  travelers?: number;
  tripType?: string;
  /** Cloudflare Turnstile token — required when Turnstile is configured. */
  turnstileToken?: string;
  /** Honeypot — must stay empty; bots that fill it are rejected silently. */
  website?: string;
}

export interface SubmitEnquiryResponse {
  ok: boolean;
}
