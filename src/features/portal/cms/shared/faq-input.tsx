'use client';

import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export type FaqFieldValue = {
  answer: string;
  question: string;
};

interface FaqInputProps {
  description?: string;
  label?: string;
  onChange: (next: FaqFieldValue[]) => void;
  value: FaqFieldValue[];
}

const emptyFaq = (): FaqFieldValue => ({ question: '', answer: '' });

export function FaqInput({ description, label, onChange, value }: FaqInputProps) {
  const listId = React.useId();

  function updateItem(index: number, patch: Partial<FaqFieldValue>) {
    onChange(value.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  function addItem() {
    onChange([...value, emptyFaq()]);
  }

  function removeItem(index: number) {
    onChange(value.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className='grid gap-3'>
      {label ? <Label id={listId}>{label}</Label> : null}

      {value.length === 0 ? (
        <p className='text-muted-foreground text-sm'>
          No FAQs yet. Add common traveler questions below.
        </p>
      ) : null}

      <div aria-labelledby={label ? listId : undefined} className='grid gap-4'>
        {value.map((item, index) => (
          <div
            className='grid gap-3 rounded-[3px] border border-[var(--border)] p-4'
            key={`faq-${index}`}
          >
            <div className='flex items-center justify-between gap-3'>
              <p className='text-sm font-medium'>Question {index + 1}</p>
              <Button
                aria-label={`Remove question ${index + 1}`}
                onClick={() => removeItem(index)}
                size='icon'
                type='button'
                variant='ghost'
              >
                <Icons.trash className='h-4 w-4' />
              </Button>
            </div>
            <Input
              onChange={(event) => updateItem(index, { question: event.target.value })}
              placeholder='e.g. What is the best time to visit?'
              value={item.question}
            />
            <Textarea
              onChange={(event) => updateItem(index, { answer: event.target.value })}
              placeholder='Write a concise, helpful answer for travelers.'
              rows={3}
              value={item.answer}
            />
          </div>
        ))}
      </div>

      <Button className='w-fit' onClick={addItem} type='button' variant='outline'>
        <Icons.add className='h-4 w-4' />
        Add FAQ
      </Button>

      {description ? <p className='text-muted-foreground text-xs'>{description}</p> : null}
    </div>
  );
}
