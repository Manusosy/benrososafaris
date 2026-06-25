import Link from 'next/link';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import type { MissingPrerequisite } from './prerequisites';

/**
 * Blocking notice rendered in place of a wizard when an entity's prerequisites
 * are not yet satisfied. Lists each missing dependency with a link to create it.
 */
export function PrerequisiteGate({
  entityLabel,
  missing
}: {
  entityLabel: string;
  missing: MissingPrerequisite[];
}) {
  return (
    <div className='rounded-md border p-6'>
      <div className='flex items-start gap-3'>
        <Icons.warning className='text-muted-foreground mt-0.5 size-5 shrink-0' />
        <div>
          <h2 className='text-base font-semibold'>Set up prerequisites first</h2>
          <p className='text-muted-foreground mt-1 text-sm'>
            Before adding a {entityLabel.toLowerCase().replace(/s$/, '')}, finish the content it
            depends on:
          </p>
        </div>
      </div>

      <ul className='mt-4 space-y-3'>
        {missing.map((item) => (
          <li
            key={item.href}
            className='flex flex-wrap items-center justify-between gap-3 rounded-md border px-4 py-3'
          >
            <div className='min-w-0'>
              <p className='text-sm font-medium'>
                {item.label}
                <span className='text-muted-foreground ml-2 text-xs'>
                  {item.have} of {item.need} required
                </span>
              </p>
              <p className='text-muted-foreground mt-0.5 text-sm'>{item.reason}</p>
            </div>
            <Button asChild size='sm' variant='outline'>
              <Link href={item.href}>
                <Icons.add className='mr-1 size-4' />
                Add {item.label.replace(/s$/, '')}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
