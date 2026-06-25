'use client';

import * as React from 'react';

import { Icons } from '@/components/icons';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface HighlightsInputProps {
  value: string[];
  onChange: (next: string[]) => void;
  label?: string;
  placeholder?: string;
  description?: string;
}

/** Brand green used for the tick icon and other accents. */
const BRAND_GREEN = '#3c5142';

/** One highlight per line: split on newlines, trim, drop empties. */
function parseHighlights(raw: string): string[] {
  return raw
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function highlightsToText(highlights: string[]): string {
  return highlights.join('\n');
}

/**
 * Simple line-based highlights input.
 *
 * Each line in the textarea is one highlight. Values sync to `string[]` on
 * change and blur. A preview list below shows committed lines with brand ticks.
 */
export function HighlightsInput({
  value,
  onChange,
  label,
  placeholder,
  description
}: HighlightsInputProps) {
  const inputId = React.useId();
  const [text, setText] = React.useState(() => highlightsToText(value));
  const skipExternalSync = React.useRef(false);

  React.useEffect(() => {
    if (skipExternalSync.current) {
      skipExternalSync.current = false;
      return;
    }
    setText(highlightsToText(value));
  }, [value]);

  function syncToForm(raw: string) {
    const next = parseHighlights(raw);
    skipExternalSync.current = true;
    onChange(next);
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const raw = event.target.value;
    setText(raw);
    syncToForm(raw);
  }

  function handleBlur() {
    const normalized = highlightsToText(parseHighlights(text));
    setText(normalized);
    syncToForm(normalized);
  }

  const previewItems = parseHighlights(text);

  return (
    <div className='grid min-w-0 gap-2'>
      {label ? <Label htmlFor={inputId}>{label}</Label> : null}
      <Textarea
        id={inputId}
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder ?? 'One highlight per line. Press Enter to add another.'}
        rows={4}
        className='min-h-24 rounded-[3px] shadow-none'
      />

      {previewItems.length > 0 ? (
        <ul className='min-w-0 space-y-2'>
          {previewItems.map((item, index) => (
            <li key={`${index}-${item}`} className='flex min-w-0 items-start gap-2'>
              <Icons.circleCheck
                className='mt-0.5 size-4 shrink-0'
                style={{ color: BRAND_GREEN }}
                aria-hidden
              />
              <span className='min-w-0 break-words text-sm'>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {description ? <p className='text-muted-foreground text-xs'>{description}</p> : null}
    </div>
  );
}
