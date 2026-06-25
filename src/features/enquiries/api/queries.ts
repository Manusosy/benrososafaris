import { queryOptions } from '@tanstack/react-query';

import { getEnquiry, listEnquiries, listTrashedEnquiries } from './service';
import type { EnquiryListParams, EnquiryTrashedListParams } from './types';

export const enquiryKeys = {
  all: ['portal', 'enquiries'] as const,
  detail: (id: string) => [...enquiryKeys.all, 'detail', id] as const,
  list: (params: EnquiryListParams) => [...enquiryKeys.all, 'list', params] as const,
  trashedList: (params: EnquiryTrashedListParams) =>
    [...enquiryKeys.all, 'trashed', params] as const
};

export function enquiriesListQueryOptions(params: EnquiryListParams) {
  return queryOptions({
    queryKey: enquiryKeys.list(params),
    queryFn: () => listEnquiries(params)
  });
}

export function enquiryDetailQueryOptions(id: string) {
  return queryOptions({
    queryKey: enquiryKeys.detail(id),
    queryFn: () => getEnquiry(id),
    enabled: Boolean(id)
  });
}

export function trashedEnquiriesListQueryOptions(params: EnquiryTrashedListParams) {
  return queryOptions({
    queryKey: enquiryKeys.trashedList(params),
    queryFn: () => listTrashedEnquiries(params)
  });
}
