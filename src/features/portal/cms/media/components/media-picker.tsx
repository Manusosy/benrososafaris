'use client';

import * as React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { getMediaByIds } from '../api/client';
import { mediaKeys } from '../api/queries';
import { CMS_SURFACE } from '../../shared/surface';
import { MediaLibrary } from './media-library';

/**
 * The dialog is portaled to document.body, escaping the portal's dark theme, so
 * we re-scope the design tokens to the shared light CMS surface. Dialog-specific
 * sizing / radius is layered on top.
 */
const LIGHT_SURFACE = cn(
  CMS_SURFACE,
  'flex max-h-[88vh] w-[95vw] flex-col gap-3 overflow-hidden rounded-[3px] shadow-none sm:max-w-5xl'
);

interface MediaPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialSelected: string[];
  multiple?: boolean;
  onConfirm: (ids: string[]) => void;
}

/**
 * The media library wrapped in a dialog for selection. The dialog box keeps the
 * 3px-max radius house style (and drops the default shadow) for the media
 * picker surface.
 */
export function MediaPickerDialog({
  open,
  onOpenChange,
  initialSelected,
  multiple = true,
  onConfirm
}: MediaPickerDialogProps) {
  const [selected, setSelected] = React.useState<string[]>(initialSelected);

  // Reseed selection each time the dialog opens.
  React.useEffect(() => {
    if (open) setSelected(initialSelected);
  }, [open, initialSelected]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={LIGHT_SURFACE}>
        <DialogHeader>
          <DialogTitle>Media library</DialogTitle>
          <DialogDescription>
            Select existing images or upload new ones. Click a tile to select it.
          </DialogDescription>
        </DialogHeader>

        <MediaLibrary
          selectedIds={selected}
          onSelectedChange={setSelected}
          multiple={multiple}
          scrollable
        />

        <DialogFooter>
          <Button type='button' variant='ghost' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type='button'
            onClick={() => {
              onConfirm(selected);
              onOpenChange(false);
            }}
          >
            Use {selected.length > 0 ? `${selected.length} ` : ''}
            {selected.length === 1 ? 'image' : 'images'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface MediaGalleryFieldProps {
  value: string[];
  onChange: (ids: string[]) => void;
  multiple?: boolean;
  label?: string;
  description?: string;
  className?: string;
}

/**
 * Reusable gallery picker field: a row of square previews of the chosen assets
 * plus a button that opens the media picker dialog. Selection order is the
 * gallery order; the first image acts as the cover.
 */
export function MediaGalleryField({
  value,
  onChange,
  multiple = true,
  label = 'Gallery',
  description,
  className
}: MediaGalleryFieldProps) {
  const [open, setOpen] = React.useState(false);

  const { data: assets = [] } = useQuery({
    queryKey: [...mediaKeys.all, 'byIds', value],
    queryFn: () => getMediaByIds(value),
    enabled: value.length > 0
  });

  function removeAt(id: string) {
    onChange(value.filter((value) => value !== id));
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium'>{label}</p>
          {description ? <p className='text-muted-foreground text-xs'>{description}</p> : null}
        </div>
        <Button type='button' variant='outline' size='sm' onClick={() => setOpen(true)}>
          <Icons.media className='size-4' />
          {value.length > 0 ? 'Change images' : 'Select images'}
        </Button>
      </div>

      {value.length === 0 ? (
        <button
          type='button'
          onClick={() => setOpen(true)}
          className='flex h-28 flex-col items-center justify-center gap-1 rounded-[3px] border border-dashed border-[#D1D5DB] text-center'
        >
          <Icons.media className='text-muted-foreground size-6' />
          <span className='text-muted-foreground text-xs'>No images selected</span>
        </button>
      ) : (
        <div className='grid grid-cols-3 gap-1.5 sm:grid-cols-5 md:grid-cols-6'>
          {assets.map((asset, index) => (
            <div
              key={asset.id}
              className='group relative aspect-square overflow-hidden rounded-[3px] border border-[#E5E7EB] bg-muted'
            >
              {asset.url ? (
                <Image
                  src={asset.url}
                  alt={asset.alt ?? ''}
                  fill
                  sizes='160px'
                  className='object-cover'
                  unoptimized
                />
              ) : null}
              {index === 0 ? (
                <span className='absolute left-1 top-1 rounded-[3px] bg-[#3c5142] px-1 text-[10px] font-medium text-white'>
                  Cover
                </span>
              ) : null}
              <button
                type='button'
                onClick={() => removeAt(asset.id)}
                className='bg-background/90 absolute right-1 top-1 flex size-5 items-center justify-center rounded-[3px] border border-[#E5E7EB] opacity-0 transition-opacity group-hover:opacity-100'
                aria-label='Remove image'
              >
                <Icons.close className='size-3.5' />
              </button>
            </div>
          ))}
        </div>
      )}

      <MediaPickerDialog
        open={open}
        onOpenChange={setOpen}
        initialSelected={value}
        multiple={multiple}
        onConfirm={onChange}
      />
    </div>
  );
}
