import { cn } from '@/lib/utils';

function LoadingDots({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn('inline-flex items-center gap-1.5', className)}>
      {[0, 1, 2].map((index) => (
        <span
          className='size-2 animate-bounce rounded-full bg-current'
          key={index}
          style={{ animationDelay: `${index * 0.15}s`, animationDuration: '0.9s' }}
        />
      ))}
    </span>
  );
}

interface PortalAuthButtonProps extends React.ComponentProps<'button'> {
  isLoading?: boolean;
}

export function PortalAuthButton({
  children,
  className,
  isLoading = false,
  disabled,
  type = 'submit',
  ...props
}: PortalAuthButtonProps) {
  return (
    <button
      aria-busy={isLoading || undefined}
      className={cn(
        'grid h-12 w-full place-items-center rounded-lg bg-[#3C5142] text-[15px] font-semibold text-white transition-colors hover:bg-[#2F4034] disabled:pointer-events-none disabled:opacity-70 [&>*]:col-start-1 [&>*]:row-start-1',
        className
      )}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      <span className={cn('inline-flex items-center justify-center', isLoading && 'invisible')}>
        {children}
      </span>
      <span
        className={cn('flex items-center justify-center text-white', !isLoading && 'invisible')}
      >
        <LoadingDots />
      </span>
    </button>
  );
}
