'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { Icons } from '@/components/icons';
import type { PublicAccommodationMedia } from '@/features/accommodations/public/types';
import { cn } from '@/lib/utils';

type AccommodationGalleryProps = {
  images: PublicAccommodationMedia[];
  title: string;
};

export function AccommodationGallery({ images, title }: AccommodationGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      if (!images.length) return;
      setActiveIndex((current) => {
        const nextIndex = (index + images.length) % images.length;
        return nextIndex === current ? current : nextIndex;
      });
    },
    [images.length]
  );

  const showPrevious = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const showNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showNext, showPrevious]);

  if (!images.length) {
    return (
      <div className='aspect-[16/10] rounded-[var(--benroso-radius)] bg-[var(--benroso-primary-light)]' />
    );
  }

  const hasMultiple = images.length > 1;

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? 0;
    touchDeltaX.current = 0;
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    touchDeltaX.current = (event.touches[0]?.clientX ?? 0) - touchStartX.current;
  }

  function handleTouchEnd() {
    if (Math.abs(touchDeltaX.current) < 40) return;
    if (touchDeltaX.current < 0) showNext();
    else showPrevious();
  }

  return (
    <div className='space-y-4'>
      <div
        className='relative aspect-[16/10] overflow-hidden rounded-[var(--benroso-radius)] bg-[var(--benroso-primary-light)]'
        onTouchEnd={hasMultiple ? handleTouchEnd : undefined}
        onTouchMove={hasMultiple ? handleTouchMove : undefined}
        onTouchStart={hasMultiple ? handleTouchStart : undefined}
      >
        <div
          className='flex h-full will-change-transform transition-transform duration-300 ease-out motion-reduce:transition-none'
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {images.map((image, index) => (
            <div className='relative h-full min-w-full shrink-0' key={image.id}>
              {image.url ? (
                <Image
                  alt={image.alt || `${title} image ${index + 1}`}
                  className='object-cover'
                  fill
                  loading={
                    images.length <= 10 || Math.abs(index - activeIndex) <= 1 ? 'eager' : 'lazy'
                  }
                  priority={index === 0}
                  sizes='(max-width: 1024px) 100vw, 66vw'
                  src={image.url}
                />
              ) : null}
            </div>
          ))}
        </div>

        {hasMultiple ? (
          <>
            <button
              aria-label='Previous image'
              className='absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/65'
              onClick={showPrevious}
              type='button'
            >
              <Icons.chevronLeft className='size-5' />
            </button>
            <button
              aria-label='Next image'
              className='absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/65'
              onClick={showNext}
              type='button'
            >
              <Icons.chevronRight className='size-5' />
            </button>
            <div className='absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5'>
              {images.map((image, index) => (
                <button
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={index === activeIndex}
                  className={cn(
                    'size-1.5 rounded-full transition-all duration-200',
                    index === activeIndex ? 'w-4 bg-white' : 'bg-white/50 hover:bg-white/80'
                  )}
                  key={image.id}
                  onClick={() => goTo(index)}
                  type='button'
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {hasMultiple ? (
        <div className='flex gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                aria-label={`Show image ${index + 1}`}
                aria-pressed={isActive}
                className={cn(
                  'relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-[var(--benroso-radius)] border-2 transition-opacity duration-200 sm:w-24',
                  isActive
                    ? 'border-[var(--benroso-primary)] opacity-100'
                    : 'border-transparent opacity-80 hover:opacity-100'
                )}
                key={image.id}
                onClick={() => goTo(index)}
                type='button'
              >
                {image.url ? (
                  <Image
                    alt={image.alt || `${title} thumbnail ${index + 1}`}
                    className='object-cover'
                    fill
                    sizes='120px'
                    src={image.url}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
