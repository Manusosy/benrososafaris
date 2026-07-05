import { cn } from '@/lib/utils';

type BenrosoButtonGroupProps = {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center';
};

export function BenrosoButtonGroup({
  children,
  className,
  align = 'start'
}: BenrosoButtonGroupProps) {
  return (
    <div
      className={cn(
        'benroso-dual-actions',
        align === 'center' && 'benroso-dual-actions--center',
        className
      )}
    >
      {children}
    </div>
  );
}
