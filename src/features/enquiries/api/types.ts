export type EnquiryType =
  | 'safari-quote'
  | 'general'
  | 'other'
  | 'accommodation-inquiry'
  | 'trip-inquiry';

export type EnquiryStatus = 'pending' | 'deal' | 'no-deal';

export interface EnquiryFormData {
  adults?: number;
  bookingReference?: string;
  budget?: string;
  budgetTier?: string;
  children?: number;
  country?: string;
  destinations?: string;
  email?: string;
  enquiryType?: EnquiryType;
  infants?: number;
  locale?: string;
  message?: string;
  name?: string;
  phone?: string | null;
  preferredDates?: string;
  referralSource?: string;
  sourcePath?: string | null;
  topic?: string;
  travelEndDate?: string;
  travelPlanningStage?: string;
  travelStartDate?: string;
  travelers?: number;
  tripType?: string;
}

export interface Enquiry {
  assignedTo: string | null;
  bookingReference: string | null;
  budget: string | null;
  country: string | null;
  createdAt: string;
  deletedAt: string | null;
  destinations: string | null;
  email: string;
  enquiryType: EnquiryType;
  formData: EnquiryFormData;
  id: string;
  locale: string;
  message: string;
  name: string;
  phone: string | null;
  preferredDates: string | null;
  /** Branded enquiry reference (BENS-YYYY-NNNNN), linked to id for audit. */
  referenceCode: string;
  sourcePath: string | null;
  status: EnquiryStatus;
  topic: string | null;
  travelers: number | null;
  updatedAt: string;
}

export interface EnquiryListParams {
  enquiryType?: EnquiryType | 'all';
  page?: number;
  search?: string;
  status?: EnquiryStatus | 'all';
}

export interface EnquiryListResult {
  counts: {
    all: number;
    pending: number;
    trash: number;
  };
  items: Enquiry[];
  page: number;
  pageSize: number;
  total: number;
}

export interface EnquiryTrashedListParams {
  page?: number;
  search?: string;
}

export interface EnquiryTrashedListResult {
  items: Enquiry[];
  page: number;
  pageSize: number;
  total: number;
  trashCount: number;
}

export interface UpdateEnquiryStatusInput {
  id: string;
  status: EnquiryStatus;
}
