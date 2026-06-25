/** WordPress-style status views for the experiences list table. */
export type ExperienceListStatus = 'all' | 'published' | 'draft' | 'trash';

export interface ExperienceListItem {
  id: string;
  title: string;
  slug: string;
  /** `published` | `draft` | `trash`. */
  status: string;
  category: string | null;
  /** Publish timestamp from the English translation (null when never published). */
  publishedAt: string | null;
  updatedAt: string;
  trashed: boolean;
}

export interface ExperienceListParams {
  status: ExperienceListStatus;
  search: string;
  /** Category filter; empty string means "all categories". */
  category: string;
  /** Month filter as `YYYY-MM`; empty string means "all dates". */
  month: string;
  /** 1-based page index. */
  page: number;
}

export interface ExperienceStatusCounts {
  all: number;
  published: number;
  draft: number;
  trash: number;
}

export interface ExperienceListResult {
  items: ExperienceListItem[];
  /** Total rows matching the active filters (drives pagination). */
  total: number;
  page: number;
  pageSize: number;
  counts: ExperienceStatusCounts;
  /** Distinct categories for the filter dropdown. */
  categories: string[];
  /** Distinct publish months for the date dropdown. */
  months: Array<{ value: string; label: string }>;
}

/** Fields editable from the inline Quick Edit row. */
export interface ExperienceQuickEditInput {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: 'published' | 'draft';
  /** ISO timestamp for the publish date/time, or empty to leave unset. */
  publishedAt: string;
}

export const EXPERIENCES_PAGE_SIZE = 20;
