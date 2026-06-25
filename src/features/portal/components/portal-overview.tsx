import Link from 'next/link';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PortalOverviewStats } from '@/features/portal/api/types';
import { cn } from '@/lib/utils';

interface PortalOverviewProps {
  stats: PortalOverviewStats;
  userName: string;
}

export function PortalOverview({ stats, userName }: PortalOverviewProps) {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 rounded-lg border border-[#E5E7EB] bg-white p-6 md:flex-row md:items-center md:justify-between'>
        <div className='border-[#3C5142] pl-4 md:border-l-4'>
          <p className='text-[#3C5142] text-xs font-semibold uppercase tracking-[0.14em]'>
            Benroso Safaris
          </p>
          <h2 className='mt-1 text-2xl font-semibold text-[#111827]'>Welcome back, {userName}</h2>
        </div>
        <div className='flex flex-wrap gap-3'>
          <Link
            className='inline-flex items-center gap-2 rounded-md bg-[#3C5142] px-4 py-2 text-sm font-medium text-white'
            href='/portal/enquiries'
          >
            <Icons.mail className='size-4' />
            {stats.newEnquiries} pending enquiries
          </Link>
          <a
            className='inline-flex items-center gap-2 rounded-md border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#111827] hover:bg-[#F9FAFB]'
            href='/en'
            rel='noopener noreferrer'
            target='_blank'
          >
            <Icons.world className='size-4' />
            View website
          </a>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {stats.modules.map((module) => (
          <Link href={module.href} key={module.key}>
            <Card className='h-full border-[#E5E7EB] bg-white transition-colors hover:border-[#3C5142]/40'>
              <CardHeader className='pb-2'>
                <CardTitle className='text-base text-[#111827]'>{module.label}</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-end justify-between'>
                  <div>
                    <p className='text-3xl font-semibold text-[#111827]'>{module.total}</p>
                    <p className='text-[#6B7280] text-xs uppercase tracking-wide'>Total</p>
                  </div>
                  <Icons.arrowRight className='text-[#9CA3AF] size-4' />
                </div>
                <div className='flex gap-2'>
                  <Badge variant='secondary'>{module.published} published</Badge>
                  <Badge variant='outline'>{module.draft} draft</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className='border-[#E5E7EB] bg-white'>
        <CardHeader>
          <CardTitle className='text-base text-[#111827]'>Quick links</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          {[
            { label: 'Site Settings', href: '/portal/settings', icon: Icons.settings },
            { label: 'Media Library', href: '/portal/media', icon: Icons.media },
            { label: 'Team & Roles', href: '/portal/team', icon: Icons.teams },
            { label: 'Redirects', href: '/portal/redirects', icon: Icons.externalLink }
          ].map((item) => (
            <Link
              className={cn(
                'flex items-center gap-3 rounded-md border border-[#E5E7EB] px-4 py-3 text-sm font-medium text-[#111827] hover:bg-[#F9FAFB]'
              )}
              href={item.href}
              key={item.href}
            >
              <item.icon className='text-[#3C5142] size-4' />
              {item.label}
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
