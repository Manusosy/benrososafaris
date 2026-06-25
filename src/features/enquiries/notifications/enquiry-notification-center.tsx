'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useEnquiryNotificationStore } from '@/features/enquiries/notifications/enquiry-notification-store';
import { CMS_SURFACE } from '@/features/portal/cms/shared/surface';
import { cn } from '@/lib/utils';

const MAX_VISIBLE = 8;

export function EnquiryNotificationCenter() {
  const router = useRouter();
  const { notifications, markAllRead, markRead, unreadCount } = useEnquiryNotificationStore();
  const count = unreadCount();
  const visible = notifications.slice(0, MAX_VISIBLE);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='relative size-8' size='icon' type='button' variant='ghost'>
          <Icons.notification className='size-4' />
          {count > 0 ? (
            <span className='bg-destructive text-destructive-foreground absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium'>
              {count > 9 ? '9+' : count}
            </span>
          ) : null}
          <span className='sr-only'>Enquiry notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='end'
        className={cn(CMS_SURFACE, 'w-[calc(100vw-2rem)] p-0 sm:w-[380px]')}
        sideOffset={8}
      >
        <div className='flex items-center justify-between px-4 py-3'>
          <Link className='group flex items-center gap-1' href='/portal/enquiries'>
            <h4 className='text-sm font-semibold group-hover:underline'>Enquiries</h4>
            <Icons.chevronRight className='text-muted-foreground size-3.5 transition-transform group-hover:translate-x-0.5' />
          </Link>
          {count > 0 ? (
            <Button
              className='text-muted-foreground h-auto px-2 py-1 text-xs'
              onClick={markAllRead}
              size='sm'
              type='button'
              variant='ghost'
            >
              Mark all read
            </Button>
          ) : null}
        </div>
        <Separator />
        <ScrollArea className='h-[320px]'>
          {visible.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12'>
              <Icons.notification className='text-muted-foreground/40 mb-2 size-8' />
              <p className='text-muted-foreground text-sm'>No new enquiry alerts</p>
            </div>
          ) : (
            <div className='flex flex-col gap-1 p-2'>
              {visible.map((notification) => (
                <button
                  className={cn(
                    'hover:bg-muted/60 rounded-md px-3 py-2.5 text-left transition-colors',
                    !notification.read && 'bg-[#3C5142]/5'
                  )}
                  key={notification.id}
                  onClick={() => {
                    markRead(notification.id);
                    router.push(`/portal/enquiries/${notification.enquiryId}`);
                  }}
                  type='button'
                >
                  <p className='text-sm font-medium'>{notification.title}</p>
                  <p className='text-muted-foreground mt-0.5 text-xs leading-5'>
                    {notification.body}
                  </p>
                  <p className='text-muted-foreground mt-1 text-[10px]'>
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
