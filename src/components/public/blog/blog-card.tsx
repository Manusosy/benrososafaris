import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/components/icons';
import type { PublicBlogPost } from '@/lib/public/types';

function formatDate(iso: string | null): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

type BlogCardProps = {
  post: PublicBlogPost;
  titleTag?: 'h2' | 'h3';
};

export function BlogCard({ post, titleTag: TitleTag = 'h2' }: BlogCardProps) {
  const date = formatDate(post.publishedAt);

  return (
    <article className='group flex h-full flex-col overflow-hidden rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white transition-shadow hover:shadow-md'>
      <Link
        className='relative block aspect-[16/10] overflow-hidden bg-[var(--benroso-primary)]'
        href={post.href}
      >
        {post.imageUrl ? (
          <Image
            alt={post.imageAlt || post.title}
            className='object-cover transition-transform duration-500 group-hover:scale-105'
            fill
            sizes='(max-width:768px) 100vw, 33vw'
            src={post.imageUrl}
          />
        ) : (
          <div className='absolute inset-0 bg-[var(--benroso-primary-light)]' />
        )}
        {post.category ? (
          <span className='absolute left-3 top-3 rounded-[var(--benroso-radius)] border border-[var(--benroso-line)] bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--benroso-ink)]'>
            {post.category}
          </span>
        ) : null}
      </Link>
      <div className='flex flex-1 flex-col p-5'>
        {date ? (
          <p className='text-xs font-semibold uppercase tracking-wide text-[var(--benroso-muted)]'>
            {date}
          </p>
        ) : null}
        <TitleTag className='benroso-heading mt-2 font-display text-2xl leading-tight'>
          <Link className='transition-colors hover:text-[var(--benroso-primary)]' href={post.href}>
            {post.title}
          </Link>
        </TitleTag>
        {post.excerpt ? (
          <p className='benroso-body mt-3 line-clamp-3 flex-1 text-[15px] leading-7'>
            {post.excerpt}
          </p>
        ) : null}
        <div className='mt-5 border-t border-[var(--benroso-line)] pt-4'>
          <Link
            className='inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[var(--benroso-primary)] transition-colors hover:gap-2'
            href={post.href}
          >
            Read More
            <Icons.arrowRight className='h-3.5 w-3.5' />
          </Link>
        </div>
      </div>
    </article>
  );
}
