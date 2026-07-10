import { formatTourPrice } from '@/lib/public/tour-format';
import type { PublicMountainRoutePricingRow } from '@/features/experiences/public/types';

type MountainRoutePricingTableProps = {
  currency: string;
  notes?: string | null;
  rows: PublicMountainRoutePricingRow[];
};

export function MountainRoutePricingTable({
  currency,
  notes,
  rows
}: MountainRoutePricingTableProps) {
  if (!rows.length) return null;

  return (
    <div>
      <div className='overflow-hidden rounded-[var(--benroso-radius)] border border-[var(--benroso-line)]'>
        <table className='w-full border-collapse text-left text-sm'>
          <thead className='bg-[var(--benroso-primary)] text-white'>
            <tr>
              <th className='px-4 py-3 font-display text-sm uppercase tracking-wide'>
                Accommodation type
              </th>
              <th className='px-4 py-3 font-display text-sm uppercase tracking-wide'>
                Price per person
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className='border-t border-[var(--benroso-line)]' key={row.label}>
                <td className='px-4 py-3 font-medium text-[var(--benroso-ink)]'>{row.label}</td>
                <td className='px-4 py-3 text-[var(--benroso-primary)]'>
                  {row.price != null ? formatTourPrice(row.price, currency) : 'On request'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {notes ? <p className='mt-3 text-sm text-[var(--benroso-muted)]'>{notes}</p> : null}
    </div>
  );
}
