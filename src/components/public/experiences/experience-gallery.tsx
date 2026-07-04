'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { Icons } from '@/components/icons';

type GalleryImage = {
  alt: string | null;
  id: string;
  url: string | null;
};

type ExperienceGalleryProps = {
  images: GalleryImage[];
  title: string;
};

function GalleryImageTile({
  image,
  index,
  title
}: {
  image: GalleryImage;
  index: number;
  title: string;
}) {
  return (
    <div className='relative aspect-[4/3] overflow-hidden rounded-[var(--benroso-radius)] bg-[var(--benroso-primary)]'>
      {image.url ? (
        <Image
          alt={image.alt || `${title} gallery ${index + 1}`}
          className='object-cover'
          fill
          sizes='(max-width:768px) 100vw, 33vw'
          src={image.url}
        />
      ) : null}
    </div>
  );
}

function ExperienceGalleryGrid({ images, title }: ExperienceGalleryProps) {
  return (
    <div className='grid gap-3 md:grid-cols-3'>
      {images.map((image, index) => (
        <GalleryImageTile image={image} index={index} key={image.id} title={title} />
      ))}
    </div>
  );
}

function ExperienceGalleryCarousel({ images, title }: ExperienceGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(images.length > 3);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(track.scrollLeft > 4);
    setCanScrollRight(track.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      track.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByStep = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;

    const firstSlide = track.firstElementChild as HTMLElement | null;
    const slideWidth = firstSlide?.offsetWidth ?? track.clientWidth;
    const gap = 12;
    track.scrollBy({
      left: direction === 'left' ? -(slideWidth + gap) : slideWidth + gap,
      behavior: 'smooth'
    });
  };

  return (
    <div className='relative'>
      {canScrollLeft ? (
        <button
          aria-label='Show previous gallery images'
          className='absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white text-[var(--benroso-primary)] shadow-md transition-colors hover:bg-[var(--benroso-primary)] hover:text-white md:-translate-x-0'
          onClick={() => scrollByStep('left')}
          type='button'
        >
          <Icons.chevronLeft className='h-5 w-5' />
        </button>
      ) : null}

      <div
        className='flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        ref={trackRef}
      >
        {images.map((image, index) => (
          <div
            className='w-[calc(100%-0px)] shrink-0 snap-start sm:w-[calc(50%-6px)] md:w-[calc(33.333%-8px)]'
            key={image.id}
          >
            <GalleryImageTile image={image} index={index} title={title} />
          </div>
        ))}
      </div>

      {canScrollRight ? (
        <button
          aria-label='Show more gallery images'
          className='absolute top-1/2 right-0 z-10 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white text-[var(--benroso-primary)] shadow-md transition-colors hover:bg-[var(--benroso-primary)] hover:text-white md:translate-x-0'
          onClick={() => scrollByStep('right')}
          type='button'
        >
          <Icons.chevronRight className='h-5 w-5' />
        </button>
      ) : null}
    </div>
  );
}

export function ExperienceGallery({ images, title }: ExperienceGalleryProps) {
  if (!images.length) return null;
  if (images.length <= 3) {
    return <ExperienceGalleryGrid images={images} title={title} />;
  }

  return <ExperienceGalleryCarousel images={images} title={title} />;
}
