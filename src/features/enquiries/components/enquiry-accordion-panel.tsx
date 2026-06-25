'use client';

import * as React from 'react';

import type { Enquiry } from '@/features/enquiries/api/types';
import { EnquiryQuickActions } from '@/features/enquiries/components/enquiry-quick-actions';
import {
  getEnquiryAccordionDisplayFields,
  hasEnquiryDisplayValue
} from '@/features/enquiries/utils/enquiry-display-fields';
import { cn } from '@/lib/utils';

type EnquiryAccordionPanelProps = {
  enquiry: Enquiry;
  onClose?: () => void;
  onPrint: () => void;
};

function ContactBand({
  email,
  phone,
  country
}: {
  country: string | null;
  email: string;
  phone: string | null;
}) {
  const segments: React.ReactNode[] = [
    <span className='inline-flex min-w-0 items-center gap-1.5' key='email'>
      <span className='text-muted-foreground text-xs'>Email:</span>
      <a className='text-[#3C5142] hover:underline' href={`mailto:${email}`}>
        {email}
      </a>
    </span>
  ];

  if (hasEnquiryDisplayValue(phone)) {
    segments.push(
      <span className='inline-flex min-w-0 items-center gap-1.5' key='phone'>
        <span className='text-muted-foreground text-xs'>Phone:</span>
        <span className='text-[#111827]'>{phone}</span>
      </span>
    );
  }

  if (hasEnquiryDisplayValue(country)) {
    segments.push(
      <span className='inline-flex min-w-0 items-center gap-1.5' key='country'>
        <span className='text-muted-foreground text-xs'>Country:</span>
        <span className='text-[#111827]'>{country}</span>
      </span>
    );
  }

  return (
    <div className='flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm'>
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          {index > 0 ? (
            <span aria-hidden='true' className='hidden text-[#D1D5DB] sm:inline'>
              ·
            </span>
          ) : null}
          {segment}
        </React.Fragment>
      ))}
    </div>
  );
}

function TripDetailsTable({ rows }: { rows: Array<{ label: string; value: React.ReactNode }> }) {
  if (!rows.length) return null;

  return (
    <div className='overflow-x-auto rounded-md border border-[#E5E7EB]/80'>
      <table className='w-full border-collapse text-sm'>
        <thead>
          <tr className='border-b border-[#E5E7EB]/80 bg-[#F0EBE3]'>
            <th
              className='w-[38%] px-3 py-2 text-left text-[11px] font-semibold tracking-wide text-[#374151] uppercase'
              scope='col'
            >
              Field
            </th>
            <th
              className='px-3 py-2 text-left text-[11px] font-semibold tracking-wide text-[#374151] uppercase'
              scope='col'
            >
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              className={cn(
                'border-b border-[#E5E7EB]/80 last:border-b-0',
                index % 2 === 1 && 'bg-[#F5F0E8]/60'
              )}
              key={row.label}
            >
              <th
                className='px-3 py-2 text-left align-top text-xs font-medium text-[#374151]'
                scope='row'
              >
                {row.label}
              </th>
              <td className='px-3 py-2 align-top text-[#111827]'>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EnquiryAccordionPanel({ enquiry, onClose, onPrint }: EnquiryAccordionPanelProps) {
  const fields = getEnquiryAccordionDisplayFields(enquiry);

  return (
    <div className='border-t border-[#E5E7EB]/80'>
      <div className='space-y-4 px-4 py-4 sm:px-5'>
        <ContactBand
          country={fields.contact.country}
          email={fields.contact.email}
          phone={fields.contact.phone}
        />

        <TripDetailsTable rows={fields.tripTableRows} />

        {fields.detailFields.length ? (
          <dl className='space-y-3'>
            {fields.detailFields.map((field) => (
              <div key={field.label}>
                <dt className='text-muted-foreground text-xs'>{field.label}</dt>
                <dd className='mt-0.5 text-sm leading-6 text-[#111827]'>{field.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {fields.guestMessage ? (
          <div className='rounded-md border border-[#E5E7EB]/80 bg-[#F0EBE3] px-3 py-2.5'>
            <p className='text-muted-foreground mb-1 text-xs font-medium'>Message</p>
            <p className='text-sm leading-6 whitespace-pre-wrap text-[#374151]'>
              {fields.guestMessage}
            </p>
          </div>
        ) : null}
      </div>

      <EnquiryQuickActions
        className='bg-[#F0EBE3]'
        enquiry={enquiry}
        onDeleted={onClose}
        onPrint={onPrint}
      />
    </div>
  );
}
