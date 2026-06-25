import type {
  ContactDestinationOption,
  SubmitEnquiryPayload,
  SubmitEnquiryResponse
} from './types';

export async function getContactDestinations(locale: string): Promise<ContactDestinationOption[]> {
  const params = new URLSearchParams({ locale });
  const response = await fetch(`/api/public/destinations?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Unable to load destinations.');
  }

  return response.json();
}

export async function submitEnquiry(payload: SubmitEnquiryPayload): Promise<SubmitEnquiryResponse> {
  const response = await fetch('/api/enquiries', {
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  });

  const data = (await response.json().catch(() => null)) as
    | SubmitEnquiryResponse
    | { error?: string }
    | null;

  if (!response.ok) {
    throw new Error(
      data && 'error' in data && data.error ? data.error : 'Unable to submit enquiry.'
    );
  }

  return (data ?? { ok: true }) as SubmitEnquiryResponse;
}
