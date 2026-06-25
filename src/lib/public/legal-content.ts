import { BENROSO_CONTACT_DEFAULTS } from '@/config/benroso';
import { localePath } from '@/lib/public/locale-path';

export type LegalSection = {
  id: string;
  listItems?: string[];
  paragraphs: string[];
  title: string;
};

export type LegalPageDefinition = {
  description: string;
  eyebrow: string;
  lastUpdated: string;
  sections: LegalSection[];
  slug: string;
  title: string;
};

export type LegalFooterLink = {
  href: string;
  label: string;
};

const company = BENROSO_CONTACT_DEFAULTS.companyName;
const email = BENROSO_CONTACT_DEFAULTS.email;
const address = BENROSO_CONTACT_DEFAULTS.addressShort;

export const LEGAL_PAGES: LegalPageDefinition[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    eyebrow: 'Legal',
    description:
      'How Benroso Safaris collects, uses, stores, and protects personal data in line with GDPR and international privacy standards.',
    lastUpdated: '2026-06-22',
    sections: [
      {
        id: 'introduction',
        title: '1. Introduction',
        paragraphs: [
          `${company} ("Benroso Safaris", "we", "us") respects your privacy and is committed to protecting personal data. This Privacy Policy explains how we process information when you visit our website, enquire about a safari, book travel services, or communicate with us.`,
          'This policy is designed to meet the transparency requirements of the EU General Data Protection Regulation (GDPR), the UK GDPR, and comparable international privacy frameworks.'
        ]
      },
      {
        id: 'controller',
        title: '2. Data Controller',
        paragraphs: [
          `Data controller: ${company}`,
          `Registered address: ${address}`,
          `Email: ${email}`,
          'For privacy-related requests, contact us using the details above with the subject line "Privacy Request".'
        ]
      },
      {
        id: 'data-we-collect',
        title: '3. Personal Data We Collect',
        paragraphs: ['We may collect the following categories of personal data:'],
        listItems: [
          'Identity and contact data (name, email, phone, nationality, passport details where required for bookings)',
          'Booking and travel data (dates, destinations, group size, preferences, dietary or accessibility requirements)',
          'Payment-related data (billing details; card data is processed by our payment providers — we do not store full card numbers)',
          'Technical data (IP address, browser type, device identifiers, cookies — see our Cookie Policy)',
          'Communications (emails, calls, WhatsApp messages, enquiry forms, feedback and reviews)',
          'Marketing preferences (newsletter opt-in where applicable)'
        ]
      },
      {
        id: 'lawful-basis',
        title: '4. Lawful Bases for Processing',
        paragraphs: [
          'We process personal data only where a lawful basis applies under GDPR Article 6:'
        ],
        listItems: [
          'Contract — to prepare quotes, confirm bookings, and deliver safari services',
          'Legitimate interests — to respond to enquiries, improve our website, prevent fraud, and operate our business securely',
          'Consent — for optional marketing communications and non-essential cookies where required',
          'Legal obligation — for tax, accounting, tourism licensing, and regulatory record-keeping'
        ]
      },
      {
        id: 'sharing',
        title: '5. Sharing Personal Data',
        paragraphs: [
          'We share data only as necessary to deliver your safari or comply with law. Recipients may include lodges, airlines, park authorities, ground handlers, payment processors, IT providers, and professional advisers. All processors are required to protect data under contractual safeguards.',
          'We do not sell personal data.'
        ]
      },
      {
        id: 'international-transfers',
        title: '6. International Transfers',
        paragraphs: [
          'Your data may be processed in Kenya, the European Economic Area, the United Kingdom, the United States, or other countries where our service providers operate. Where transfers occur outside jurisdictions with adequacy decisions, we implement appropriate safeguards such as Standard Contractual Clauses or equivalent mechanisms.'
        ]
      },
      {
        id: 'retention',
        title: '7. Data Retention',
        paragraphs: [
          'We retain personal data only as long as necessary for the purposes described in this policy, including legal, tax, and dispute-resolution requirements. Enquiry records are typically retained for up to 24 months unless a booking proceeds; booking records are retained in accordance with applicable commercial and regulatory obligations.'
        ]
      },
      {
        id: 'your-rights',
        title: '8. Your Rights',
        paragraphs: ['Depending on your location, you may have the right to:'],
        listItems: [
          'Access a copy of your personal data',
          'Rectify inaccurate or incomplete data',
          'Erase data in certain circumstances ("right to be forgotten")',
          'Restrict or object to processing in certain circumstances',
          'Data portability where processing is based on consent or contract and automated',
          'Withdraw consent at any time for consent-based processing',
          'Lodge a complaint with a supervisory authority (e.g. ODPC in Kenya, ICO in the UK, or your local EU authority)'
        ]
      },
      {
        id: 'security',
        title: '9. Security',
        paragraphs: [
          'We implement appropriate technical and organisational measures to protect personal data against unauthorised access, loss, or misuse. No method of transmission over the internet is completely secure; we encourage you to use strong passwords and protect your devices.'
        ]
      },
      {
        id: 'children',
        title: '10. Children',
        paragraphs: [
          'Our services are not directed at children under 16. We do not knowingly collect personal data from children without appropriate parental or guardian consent.'
        ]
      },
      {
        id: 'changes',
        title: '11. Changes to This Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page indicates the latest revision. Material changes will be communicated where required by law.'
        ]
      }
    ]
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    eyebrow: 'Legal',
    description:
      'Information about cookies and similar technologies used on the Benroso Safaris website.',
    lastUpdated: '2026-06-22',
    sections: [
      {
        id: 'what-are-cookies',
        title: '1. What Are Cookies?',
        paragraphs: [
          'Cookies are small text files stored on your device when you visit a website. Similar technologies include local storage, pixels, and SDKs. They help websites function, remember preferences, and understand how visitors use the site.'
        ]
      },
      {
        id: 'how-we-use',
        title: '2. How We Use Cookies',
        paragraphs: ['We use cookies and similar technologies for the following purposes:'],
        listItems: [
          'Strictly necessary — essential for site security, session management, and core functionality',
          'Functional — remember language, locale, or form preferences',
          'Analytics — understand traffic patterns and improve content (only with consent where required)',
          'Marketing — measure campaign effectiveness (only with consent where required)'
        ]
      },
      {
        id: 'consent',
        title: '3. Consent and Control',
        paragraphs: [
          'Where required by law (including the EU ePrivacy Directive and UK PECR), we request your consent before placing non-essential cookies. You may withdraw consent at any time via your browser settings or our cookie preference controls when available.',
          'Strictly necessary cookies cannot be disabled without affecting site functionality.'
        ]
      },
      {
        id: 'third-party',
        title: '4. Third-Party Cookies',
        paragraphs: [
          'Third parties such as analytics providers, embedded maps, payment gateways, or social platforms may set their own cookies. Their use is governed by the respective third-party privacy policies.'
        ]
      },
      {
        id: 'manage',
        title: '5. Managing Cookies',
        paragraphs: [
          'Most browsers allow you to block or delete cookies through settings. Blocking all cookies may limit website functionality. For guidance, visit your browser help pages or www.allaboutcookies.org.'
        ]
      }
    ]
  },
  {
    slug: 'terms-conditions',
    title: 'Terms & Conditions',
    eyebrow: 'Legal',
    description:
      'General terms governing use of the Benroso Safaris website and safari booking services.',
    lastUpdated: '2026-06-22',
    sections: [
      {
        id: 'agreement',
        title: '1. Agreement',
        paragraphs: [
          `By accessing this website or booking services with ${company}, you agree to these Terms & Conditions together with our Privacy Policy, Cookie Policy, Payment Terms, and Service Level Agreement where applicable.`,
          'If you do not agree, please do not use our website or services.'
        ]
      },
      {
        id: 'services',
        title: '2. Our Services',
        paragraphs: [
          'Benroso Safaris arranges tailor-made and packaged safari tours, transfers, accommodation, and related travel services in East Africa. We act as an agent for certain suppliers and as a principal where stated in your booking confirmation.',
          'Itineraries, prices, and availability on this website are indicative until confirmed in writing.'
        ]
      },
      {
        id: 'bookings',
        title: '3. Bookings and Confirmations',
        paragraphs: [
          'A booking is confirmed only when you receive written confirmation and any required deposit has been received. We reserve the right to decline bookings at our discretion.',
          'You are responsible for ensuring passport validity, visas, vaccinations, and travel insurance meet destination requirements.'
        ]
      },
      {
        id: 'pricing',
        title: '4. Pricing',
        paragraphs: [
          'Prices are quoted in the currency stated in your proposal. They may change before confirmation due to park fee adjustments, fuel surcharges, exchange rates, or supplier price changes. Confirmed bookings are subject to our Payment Terms.'
        ]
      },
      {
        id: 'liability',
        title: '5. Limitation of Liability',
        paragraphs: [
          'Safari travel involves inherent risks including wildlife, road conditions, and weather. To the fullest extent permitted by law, our liability is limited to the value of services booked through us, except where liability cannot be excluded by applicable consumer protection law.',
          'We are not liable for events outside our reasonable control (force majeure), including strikes, pandemics, natural disasters, or government restrictions.'
        ]
      },
      {
        id: 'conduct',
        title: '6. Guest Conduct',
        paragraphs: [
          'Guests must follow guide and park authority instructions, respect wildlife and local communities, and comply with applicable laws. We may terminate services without refund where behaviour endangers others or violates park rules.'
        ]
      },
      {
        id: 'intellectual-property',
        title: '7. Intellectual Property',
        paragraphs: [
          'Website content, logos, and materials are owned by Benroso Safaris or licensors. You may not reproduce or distribute content without written permission.'
        ]
      },
      {
        id: 'governing-law',
        title: '8. Governing Law and Disputes',
        paragraphs: [
          'These terms are governed by the laws of Kenya unless mandatory consumer protection laws in your country require otherwise. Disputes should first be raised with us in writing at ' +
            email +
            '. We aim to resolve complaints in good faith before alternative dispute resolution or courts.'
        ]
      }
    ]
  },
  {
    slug: 'payment-terms',
    title: 'Payment Terms',
    eyebrow: 'Legal',
    description:
      'Deposits, payment methods, refunds, and billing conditions for Benroso Safaris bookings.',
    lastUpdated: '2026-06-22',
    sections: [
      {
        id: 'overview',
        title: '1. Overview',
        paragraphs: [
          'These Payment Terms apply to all confirmed safari bookings with Benroso Safaris. They should be read together with your booking confirmation, proposal, and our Terms & Conditions.'
        ]
      },
      {
        id: 'deposits',
        title: '2. Deposits and Balance Payments',
        paragraphs: [
          'A non-refundable deposit is typically required to secure reservations with lodges, parks, and suppliers. The deposit amount and due date will be stated in your booking confirmation.',
          'Final balance payment is due by the date specified in your confirmation — commonly 30–60 days before travel unless otherwise agreed for late bookings.'
        ]
      },
      {
        id: 'methods',
        title: '3. Payment Methods',
        paragraphs: ['We accept payment via methods stated in your invoice, which may include:'],
        listItems: [
          'Bank transfer (SWIFT / local Kenyan bank transfer)',
          'Card payments through our secure payment gateway where available',
          'Other methods as agreed in writing for corporate or agency bookings'
        ]
      },
      {
        id: 'currency',
        title: '4. Currency and Exchange Rates',
        paragraphs: [
          'Quotes may be issued in USD, EUR, GBP, or KES. If you pay in a different currency, your bank or payment provider exchange rate and fees apply. We are not responsible for intermediary bank charges.'
        ]
      },
      {
        id: 'refunds',
        title: '5. Refunds and Cancellations',
        paragraphs: [
          'Refund eligibility depends on cancellation timing, supplier policies, and non-refundable components (park fees, permits, peak-season lodges). Detailed cancellation charges will be provided before you confirm your booking.',
          'Refunds, when due, are processed to the original payment method where possible within a reasonable timeframe after supplier credits are received.'
        ]
      },
      {
        id: 'chargebacks',
        title: '6. Chargebacks and Failed Payments',
        paragraphs: [
          'If a payment fails or is charged back without prior contact, we may cancel affected services and apply applicable cancellation fees. Please contact us immediately if you experience payment issues.'
        ]
      },
      {
        id: 'taxes',
        title: '7. Taxes and Fees',
        paragraphs: [
          'Unless stated otherwise, quotes include applicable tourism levies and park fees as described in your itinerary. Government tax changes after confirmation may require price adjustment.'
        ]
      }
    ]
  },
  {
    slug: 'service-level-agreement',
    title: 'Service Level Agreement',
    eyebrow: 'Legal',
    description:
      'Response times, support standards, and service commitments for Benroso Safaris clients.',
    lastUpdated: '2026-06-22',
    sections: [
      {
        id: 'purpose',
        title: '1. Purpose',
        paragraphs: [
          'This Service Level Agreement (SLA) describes the service standards Benroso Safaris aims to provide before, during, and after your safari. It supplements your booking confirmation and Terms & Conditions.'
        ]
      },
      {
        id: 'enquiry-response',
        title: '2. Enquiry Response Times',
        paragraphs: [
          'We target the following initial response times during business hours (EAT, UTC+3):'
        ],
        listItems: [
          'Website and email enquiries: within 1 business day',
          'Urgent travel-within-72-hours enquiries: within 4 business hours where possible',
          'Confirmed booking amendments: within 2 business days depending on supplier availability'
        ]
      },
      {
        id: 'business-hours',
        title: '3. Business Hours and Emergency Support',
        paragraphs: [
          'Standard office hours: Monday–Friday, 08:00–17:00 EAT (excluding Kenyan public holidays).',
          'For guests on active safaris, emergency operational support is available via the contact number provided in your travel documents and on your voucher.'
        ]
      },
      {
        id: 'pre-travel',
        title: '4. Pre-Travel Services',
        paragraphs: [
          'Before departure we aim to provide: written itinerary confirmation, voucher pack, key contact numbers, and guidance on visas, health, and packing. Final documents are typically issued after balance payment clearance.'
        ]
      },
      {
        id: 'on-safari',
        title: '5. On-Safari Standards',
        paragraphs: [
          'We work with licensed guides, insured vehicles, and vetted accommodation partners. If a service issue arises during your trip, notify your guide and our operations team promptly so we can attempt resolution.'
        ]
      },
      {
        id: 'complaints',
        title: '6. Complaints and Escalation',
        paragraphs: [
          `Submit post-travel feedback or complaints within 14 days of service completion to ${email}. We will acknowledge within 3 business days and provide a substantive response within 14 business days where investigation is required.`,
          'Unresolved disputes may be escalated to relevant industry bodies including KATO where applicable.'
        ]
      },
      {
        id: 'exclusions',
        title: '7. SLA Exclusions',
        paragraphs: [
          'This SLA does not cover delays or failures caused by force majeure, third-party supplier failures beyond our control, incorrect information provided by the guest, or events outside agreed service scope.'
        ]
      }
    ]
  }
];

export function getLegalPage(slug: string): LegalPageDefinition | undefined {
  return LEGAL_PAGES.find((page) => page.slug === slug);
}

export function getLegalSlugs(): string[] {
  return LEGAL_PAGES.map((page) => page.slug);
}

export function buildLegalFooterLinks(locale: string): LegalFooterLink[] {
  return LEGAL_PAGES.map((page) => ({
    href: localePath(locale, `/${page.slug}`),
    label: page.title
  }));
}
