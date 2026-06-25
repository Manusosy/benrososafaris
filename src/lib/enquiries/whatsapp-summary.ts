type EnquirySummaryInput = {
  adults?: number | null;
  bookingReference?: string | null;
  budget?: string | null;
  budgetTier?: string | null;
  children?: number | null;
  country?: string | null;
  destinations?: string | null;
  email: string;
  enquiryType: 'safari-quote' | 'general' | 'other';
  infants?: number | null;
  message: string;
  name: string;
  phone?: string | null;
  preferredDates?: string | null;
  referralSource?: string | null;
  topic?: string | null;
  travelPlanningStage?: string | null;
  travelers?: number | null;
  tripType?: string | null;
};

const BUDGET_TIER_LABELS: Record<string, string> = {
  budget: 'Budget',
  economy: 'Economy',
  luxury: 'Luxury',
  'high-end': 'High End'
};

export function buildWhatsAppEnquirySummary(enquiry: EnquirySummaryInput) {
  const lines = [
    '*New Benroso Safaris enquiry*',
    `Type: ${enquiry.enquiryType}`,
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`
  ];

  if (enquiry.phone) lines.push(`Phone: ${enquiry.phone}`);
  if (enquiry.country) lines.push(`Country: ${enquiry.country}`);
  if (enquiry.destinations) lines.push(`Destinations: ${enquiry.destinations}`);
  if (enquiry.preferredDates) lines.push(`Travel: ${enquiry.preferredDates}`);
  if (enquiry.budgetTier) {
    lines.push(
      `Budget preference: ${BUDGET_TIER_LABELS[enquiry.budgetTier] ?? enquiry.budgetTier}`
    );
  }
  if (enquiry.budget) lines.push(`Tour budget per person: ${enquiry.budget}`);
  if (enquiry.travelers) lines.push(`Travelers: ${enquiry.travelers}`);
  if (enquiry.adults != null) lines.push(`Adults: ${enquiry.adults}`);
  if (enquiry.children != null) lines.push(`Children: ${enquiry.children}`);
  if (enquiry.infants != null) lines.push(`Infants: ${enquiry.infants}`);
  if (enquiry.travelPlanningStage) lines.push(`Planning: ${enquiry.travelPlanningStage}`);
  if (enquiry.tripType) lines.push(`Trip type: ${enquiry.tripType}`);
  if (enquiry.referralSource) lines.push(`Referral: ${enquiry.referralSource}`);
  if (enquiry.topic) lines.push(`Topic: ${enquiry.topic}`);
  if (enquiry.bookingReference) lines.push(`Booking ref: ${enquiry.bookingReference}`);
  lines.push('', enquiry.message);

  return lines.join('\n');
}

/**
 * Stub for WhatsApp Business API / Twilio integration.
 * Set WHATSAPP_API_ENABLED=true and configure provider credentials when ready.
 */
export async function notifyWhatsAppTeam(summary: string) {
  if (
    process.env.ENABLE_ENQUIRY_NOTIFICATIONS !== 'true' ||
    process.env.WHATSAPP_API_ENABLED !== 'true'
  ) {
    return { ok: false, skipped: true as const };
  }

  const phone = process.env.WHATSAPP_NOTIFICATION_PHONE?.replace(/\D/g, '');
  const token = process.env.WHATSAPP_API_TOKEN;

  if (!phone || !token) {
    console.warn('[enquiry-whatsapp] Missing WHATSAPP_NOTIFICATION_PHONE or WHATSAPP_API_TOKEN.');
    return { ok: false, skipped: true as const };
  }

  // Example placeholder for a future provider call:
  // await fetch('https://graph.facebook.com/v21.0/{phone-number-id}/messages', { ... })
  void summary;

  return { ok: true, skipped: false as const };
}
