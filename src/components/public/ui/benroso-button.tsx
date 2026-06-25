import Link from 'next/link';

import { cn } from '@/lib/utils';

const variants = {
  primary:
    'border border-[var(--benroso-primary)] bg-[var(--benroso-primary)] text-white hover:bg-[var(--benroso-primary-dark)] hover:border-[var(--benroso-primary-dark)]',
  'accent-outline':
    'border border-[var(--benroso-primary)] bg-transparent text-[var(--benroso-primary)] hover:bg-[var(--benroso-primary)] hover:text-white',
  'gold-outline':
    'border border-[var(--benroso-gold)] bg-transparent text-white hover:bg-[var(--benroso-gold)] hover:text-[var(--benroso-primary-dark)]',
  gold: 'border border-[var(--benroso-gold)] bg-[var(--benroso-gold)] text-[var(--benroso-primary-dark)] hover:border-[var(--benroso-gold-hover)] hover:bg-[var(--benroso-gold-hover)]',
  accent:
    'border border-[var(--benroso-primary)] bg-[var(--benroso-primary)] text-white hover:bg-[var(--benroso-primary-dark)] hover:border-[var(--benroso-primary-dark)]',
  ghost: 'border border-transparent text-white hover:text-[var(--benroso-gold)]',
  white:
    'border border-white bg-white text-[var(--benroso-primary)] hover:bg-[var(--benroso-ivory)] hover:border-[var(--benroso-ivory)]'
} as const;

type BenrosoButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  size?: 'default' | 'sm';
  variant?: keyof typeof variants;
};

export function BenrosoButton({
  children,
  className,
  href,
  size = 'default',
  variant = 'accent'
}: BenrosoButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-[var(--benroso-button-radius)] font-semibold uppercase tracking-[0.08em] transition-colors duration-200',
    size === 'default' ? 'min-h-11 px-6 text-sm' : 'min-h-9 px-4 text-xs',
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
