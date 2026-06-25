'use client';

import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * WizardShell — presentational chrome for every CMS wizard.
 *
 * It is intentionally state-free: the owning entity wizard holds the form/step
 * state (via `useFormStepper` + `useAppForm`) and passes the current position
 * and handlers down. This keeps a single, consistent layout (numbered step rail,
 * progress, Back / Next / Save draft / Publish actions) across all content types
 * while each wizard composes its own step bodies.
 *
 * Design: hairline borders only (no shadows), inherits the 3px theme radius.
 */

export interface WizardStepMeta {
  title: string;
  description?: string;
}

/** Which save action is currently in flight, so only that button spins. */
export type WizardPendingAction = 'draft' | 'publish' | null;

interface WizardShellProps {
  steps: WizardStepMeta[];
  /** 1-based index of the active step. */
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  /** The save action currently running (drives a single button's spinner). */
  pendingAction?: WizardPendingAction;
  /** Disables the publish action (e.g. unmet prerequisites). */
  canPublish?: boolean;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  children: React.ReactNode;
}

export function WizardShell({
  steps,
  currentStep,
  isFirstStep,
  isLastStep,
  pendingAction = null,
  canPublish = true,
  onBack,
  onNext,
  onSaveDraft,
  onPublish,
  children
}: WizardShellProps) {
  // Any in-flight save locks navigation, but only the active button shows a
  // spinner — see the per-button `isLoading` wiring below.
  const isSubmitting = pendingAction !== null;
  const active = steps[currentStep - 1];

  return (
    <div className='grid gap-6 lg:grid-cols-[220px_1fr]'>
      <StepRail steps={steps} currentStep={currentStep} />

      <div className='min-w-0'>
        <div className='rounded-md border p-5'>
          <div className='mb-5'>
            <p className='text-muted-foreground text-xs font-medium uppercase tracking-wide'>
              Step {currentStep} of {steps.length}
            </p>
            <h2 className='mt-1 text-lg font-semibold'>{active?.title}</h2>
            {active?.description ? (
              <p className='text-muted-foreground mt-1 text-sm'>{active.description}</p>
            ) : null}
          </div>

          <div className='min-h-[260px]'>{children}</div>
        </div>

        <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
          <Button
            type='button'
            variant='outline'
            size='sm'
            disabled={isFirstStep || isSubmitting}
            onClick={onBack}
          >
            <Icons.chevronLeft className='mr-1 size-4' />
            Back
          </Button>

          <div className='flex items-center gap-2'>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              isLoading={pendingAction === 'draft'}
              disabled={isSubmitting && pendingAction !== 'draft'}
              onClick={onSaveDraft}
            >
              Save draft
            </Button>

            {isLastStep ? (
              <Button
                type='button'
                size='sm'
                isLoading={pendingAction === 'publish'}
                disabled={!canPublish || (isSubmitting && pendingAction !== 'publish')}
                onClick={onPublish}
              >
                Publish
              </Button>
            ) : (
              <Button type='button' size='sm' disabled={isSubmitting} onClick={onNext}>
                Next
                <Icons.chevronRight className='ml-1 size-4' />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepRail({ steps, currentStep }: { steps: WizardStepMeta[]; currentStep: number }) {
  return (
    <ol className='hidden gap-1 lg:flex lg:flex-col'>
      {steps.map((step, index) => {
        const position = index + 1;
        const isActive = position === currentStep;
        const isComplete = position < currentStep;
        return (
          <li
            key={step.title}
            className={cn(
              'flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-sm',
              isActive && 'border-border bg-muted/50 font-medium'
            )}
          >
            <span
              className={cn(
                'flex size-6 shrink-0 items-center justify-center rounded-md border text-xs',
                isActive && 'border-primary text-primary',
                isComplete && 'border-primary bg-primary text-primary-foreground'
              )}
            >
              {isComplete ? <Icons.check className='size-3.5' /> : position}
            </span>
            <span className={cn(!isActive && 'text-muted-foreground')}>{step.title}</span>
          </li>
        );
      })}
    </ol>
  );
}
