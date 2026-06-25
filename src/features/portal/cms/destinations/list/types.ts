/** WordPress-style status views for the destinations list table. */
export type DestinationListStatus = 'all' | 'published' | 'draft' | 'trash';

export interface DestinationListItem {
  id: string;
  name: string;
  slug: string;
  /** `published` | `draft` | `trash`. */
  status: string;
  country: string | null;
  region: string | null;
  /** Publish timestamp from the English translation (null when never published). */
  publishedAt: string | null;
  updatedAt: string;
  trashed: boolean;
}

export interface DestinationListParams {
  status: DestinationListStatus;
  search: string;
  /** Country filter; empty string means "all countries". */
  country: string;
  /** Month filter as `YYYY-MM`; empty string means "all dates". */
  month: string;
  /** 1-based page index. */
  page: number;
}

export interface DestinationStatusCounts {
  all: number;
  published: number;
  draft: number;
  trash: number;
}

export interface DestinationListResult {
  items: DestinationListItem[];
  /** Total rows matching the active filters (drives pagination). */
  total: number;
  page: number;
  pageSize: number;
  counts: DestinationStatusCounts;
  /** Distinct countries for the filter dropdown. */
  countries: string[];
  /** Distinct publish months for the date dropdown. */
  months: Array<{ value: string; label: string }>;
}

/** Fields editable from the inline Quick Edit row. */
export interface DestinationQuickEditInput {
  id: string;
  name: string;
  slug: string;
  country: string;
  status: 'published' | 'draft';
  /** ISO timestamp for the publish date/time, or empty to leave unset. */
  publishedAt: string;
}

export const DESTINATIONS_PAGE_SIZE = 20;
