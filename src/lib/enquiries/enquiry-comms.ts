import { BENROSO_CONTACT_DEFAULTS, BENROSO_WHATSAPP } from '@/config/benroso';
import type { Enquiry, EnquiryFormData } from '@/features/enquiries/api/types';
import { BUDGET_TIER_LABELS, labelFor } from '@/features/enquiries/constants/enquiry-labels';
import { formatPreferredDatesWithDuration } from '@/lib/travel-date-utils';
import { whatsAppHref } from '@/lib/public/whatsapp';

export type EnquiryCommsInput = Pick<
  Enquiry,
  | 'email'
  | 'enquiryType'
  | 'name'
  | 'referenceCode'
  | 'phone'
  | 'preferredDates'
  | 'destinations'
  | 'travelers'
  | 'budget'
  | 'country'
  | 'topic'
  | 'message'
> & {
  formData?: EnquiryFormData;
};

function normalizePhone(phone: string) {
  return phone.replace(/\s/g, '');
}

export function getGuestFirstName(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return 'there';
  return trimmed.split(/\s+/)[0] ?? trimmed;
}

function buildTripSummaryLines(enquiry: EnquiryCommsInput) {
  const form = enquiry.formData ?? {};
  const destinations = enquiry.destinations ?? form.destinations ?? null;
  const preferredDatesRaw = enquiry.preferredDates ?? form.preferredDates ?? null;
  const preferredDates = preferredDatesRaw
    ? formatPreferredDatesWithDuration({
        preferredDates: preferredDatesRaw,
        travelEndDate: form.travelEndDate ?? null,
        travelStartDate: form.travelStartDate ?? null
      })
    : null;
  const travelers = enquiry.travelers ?? form.travelers ?? null;
  const budgetTier = labelFor(
    BUDGET_TIER_LABELS,
    form.budgetTier ?? enquiry.budget?.split('|')[0]?.trim() ?? null
  );

  const lines: string[] = [];

  if (destinations) {
    lines.push(`Destinations: ${destinations}`);
  }
  if (preferredDates) {
    lines.push(`Travel dates: ${preferredDates}`);
  }
  if (travelers != null) {
    lines.push(`Travelers: ${travelers}`);
  }
  if (budgetTier !== '—') {
    lines.push(`Budget preference: ${budgetTier}`);
  }

  return lines;
}

function buildEmailSubject(enquiry: EnquiryCommsInput) {
  const reference = enquiry.referenceCode?.trim();
  const enquiryLabel =
    enquiry.enquiryType === 'safari-quote'
      ? 'safari enquiry'
      : enquiry.enquiryType === 'general'
        ? 'message'
        : 'enquiry';

  if (reference && reference !== 'BENS-PENDING') {
    return `Re: Your ${enquiryLabel} ${reference} – Benroso Safaris`;
  }

  return `Re: Your ${enquiryLabel} – Benroso Safaris`;
}

function buildEmailBody(enquiry: EnquiryCommsInput) {
  const firstName = getGuestFirstName(enquiry.name);
  const reference = enquiry.referenceCode?.trim();
  const tripLines = buildTripSummaryLines(enquiry);
  const lines = [`Hello ${firstName},`, ''];

  if (enquiry.enquiryType === 'safari-quote') {
    lines.push(
      'Thank you for your safari enquiry with Benroso Safaris. It was a pleasure to receive your travel plans, and we are reviewing the details carefully.'
    );
  } else if (enquiry.enquiryType === 'general') {
    const topic = enquiry.topic ?? enquiry.formData?.topic;
    lines.push(
      `Thank you for contacting Benroso Safaris${topic ? ` regarding ${topic.toLowerCase()}` : ''}. We appreciate you reaching out.`
    );
  } else {
    lines.push(
      'Thank you for your message to Benroso Safaris. We have received your enquiry and will review it shortly.'
    );
  }

  lines.push('');

  if (tripLines.length) {
    lines.push('A brief summary of your enquiry:');
    tripLines.forEach((line) => lines.push(`• ${line}`));
    lines.push('');
  }

  if (reference && reference !== 'BENS-PENDING') {
    lines.push(`Reference: ${reference}`);
    lines.push('');
  }

  lines.push(
    'Our team will be in touch shortly — usually within 24 hours. We listen first and tailor suggestions to your interests, never a hard sell.',
    '',
    'Warm regards,',
    'The Benroso Safaris Team',
    BENROSO_CONTACT_DEFAULTS.email,
    BENROSO_CONTACT_DEFAULTS.phonePrimary
  );

  return lines.join('\n');
}

export function buildEnquiryEmailDraft(enquiry: EnquiryCommsInput) {
  return {
    body: buildEmailBody(enquiry),
    subject: buildEmailSubject(enquiry),
    to: enquiry.email
  };
}

export function buildEnquiryMailtoUrl(enquiry: EnquiryCommsInput) {
  const draft = buildEnquiryEmailDraft(enquiry);
  const params = new URLSearchParams({
    body: draft.body,
    subject: draft.subject
  });

  return `mailto:${draft.to}?${params.toString()}`;
}

export function buildEnquiryWhatsAppMessage(enquiry: EnquiryCommsInput) {
  const firstName = getGuestFirstName(enquiry.name);
  const reference = enquiry.referenceCode?.trim();
  const tripLines = buildTripSummaryLines(enquiry);
  const lines = [`Hello ${firstName},`];

  lines.push('');
  lines.push(
    'This is the team at Benroso Safaris following up on your enquiry. We wanted to connect and see how we can help with your travel plans.'
  );

  if (tripLines.length) {
    lines.push('');
    lines.push('Your enquiry summary:');
    tripLines.forEach((line) => lines.push(`• ${line}`));
  }

  if (reference && reference !== 'BENS-PENDING') {
    lines.push('');
    lines.push(`Reference: ${reference}`);
  }

  lines.push('');
  lines.push(
    'We aim to respond within 24 hours and will tailor suggestions to your interests — no hard sell, just thoughtful guidance.'
  );

  return lines.join('\n');
}

export function getBenrosoWhatsAppPhone() {
  return (
    process.env.BENROSO_WHATSAPP_PHONE?.trim() ||
    process.env.NEXT_PUBLIC_BENROSO_WHATSAPP_PHONE?.trim() ||
    BENROSO_WHATSAPP.phone
  );
}

export function getEnquiryGuestPhone(enquiry: EnquiryCommsInput) {
  return enquiry.phone ?? enquiry.formData?.phone ?? null;
}

export function buildEnquiryWhatsAppUrl(enquiry: EnquiryCommsInput) {
  const guestPhone = getEnquiryGuestPhone(enquiry);
  if (!guestPhone?.trim()) return null;

  const message = buildEnquiryWhatsAppMessage(enquiry);

  return whatsAppHref(guestPhone, message);
}

export function getEnquiryCallUrl(enquiry: EnquiryCommsInput) {
  const phone = getEnquiryGuestPhone(enquiry);
  if (!phone?.trim()) return null;
  return `tel:${normalizePhone(phone)}`;
}
