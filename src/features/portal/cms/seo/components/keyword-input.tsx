'use client';

import * as React from 'react';

import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { parseKeywords, SEO_LIMITS } from '../analyze';

interface KeywordInputProps {
  focusKeyword: string;
  keywords: string[];
  onFocusKeywordChange: (value: string) => void;
  onKeywordsChange: (keywords: string[]) => void;
  /** Maximum supporting keywords. Defaults to the SEO limit (5). */
  max?: number;
  className?: string;
}

/**
 * Focus keyword + supporting keyword chips with comma detection.
 *
 * Typing a comma (or pressing Enter) commits the buffer as one or more chips;
 * pasting a comma-separated list splits it automatically. De-duplication and
 * the max-count cap are handled here so consumers only deal with a clean array.
 */
export function KeywordInput({
  focusKeyword,
  keywords,
  onFocusKeywordChange,
  onKeywordsChange,
  max = SEO_LIMITS.maxKeywords,
  className
}: KeywordInputProps) {
  const [buffer, setBuffer] = React.useState('');
  const atLimit = keywords.length >= max;

  function commit(raw: string) {
    const additions = parseKeywords(raw);
    if (additions.length === 0) return;

    const existing = new Set(keywords.map((k) => k.toLowerCase()));
    const next = [...keywords];
    for (const value of additions) {
      if (next.length >= max) break;
      if (existing.has(value.toLowerCase())) continue;
      existing.add(value.toLowerCase());
      next.push(value);
    }
    onKeywordsChange(next);
    setBuffer('');
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    // Comma detection: commit everything up to the last comma, keep the rest.
    if (value.includes(',')) {
      commit(value);
      return;
    }
    setBuffer(value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      commit(buffer);
    } else if (event.key === 'Backspace' && buffer === '' && keywords.length > 0) {
      onKeywordsChange(keywords.slice(0, -1));
    }
  }

  function removeAt(index: number) {
    onKeywordsChange(keywords.filter((_, i) => i !== index));
  }

  return (
    <div className={cn('grid gap-4', className)}>
      <div className='grid gap-2'>
        <Label htmlFor='seo-focus-keyword'>Focus keyword</Label>
        <Input
          id='seo-focus-keyword'
          value={focusKeyword}
          onChange={(event) => onFocusKeywordChange(event.target.value)}
          placeholder='e.g. Masai Mara safari'
        />
        <p className='text-muted-foreground text-xs'>
          The main phrase this page should rank for in Google.
        </p>
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='seo-keywords'>
          Supporting keywords{' '}
          <span className='text-muted-foreground font-normal'>
            ({keywords.length}/{max})
          </span>
        </Label>
        <div className='flex flex-wrap items-center gap-1.5 rounded-[3px] border border-input bg-transparent px-2 py-1.5 focus-within:border-ring'>
          {keywords.map((keyword, index) => (
            <span
              key={`${keyword}-${index}`}
              className='inline-flex items-center gap-1 rounded-[3px] border border-[#E5E7EB] bg-muted px-2 py-0.5 text-xs'
            >
              {keyword}
              <button
                type='button'
                onClick={() => removeAt(index)}
                className='text-muted-foreground hover:text-foreground'
                aria-label={`Remove ${keyword}`}
              >
                <Icons.close className='size-3' />
              </button>
            </span>
          ))}
          <input
            id='seo-keywords'
            value={buffer}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={() => commit(buffer)}
            disabled={atLimit}
            placeholder={atLimit ? 'Limit reached' : 'Type and press comma…'}
            className='min-w-[8rem] flex-1 bg-transparent text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50'
          />
        </div>
        <p className='text-muted-foreground text-xs'>
          Separate with commas. These are submitted as meta keywords for ranking.
        </p>
      </div>
    </div>
  );
}
