import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  align?: 'center' | 'left';
  className?: string;
  description?: string;
  eyebrow?: string;
  title: string;
  titleId?: string;
};

export function SectionHeader({
  align = 'center',
  className,
  description,
  eyebrow,
  title,
  titleId
}: SectionHeaderProps) {
  return (
    <div
      className={cn(align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl', className)}
    >
      {eyebrow ? <p className='benroso-eyebrow'>{eyebrow}</p> : null}
      <h2
        className='benroso-heading mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.15]'
        id={titleId}
      >
        {title}
      </h2>
      <span className={cn('benroso-gold-line', align === 'left' && 'benroso-gold-line--left')} />
      {description ? <p className='benroso-body mt-6 text-lg leading-8'>{description}</p> : null}
    </div>
  );
}
