'use client';

import dynamic from 'next/dynamic';

import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { InfoSidebar } from '@/components/layout/info-sidebar';
import { InfobarProvider } from '@/components/ui/infobar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const KBar = dynamic(() => import('@/components/kbar'), { ssr: false });

const DashboardDevtools = dynamic(
  () =>
    import('@/components/layout/dashboard-devtools').then((module) => ({
      default: module.DashboardDevtools
    })),
  { ssr: false }
);

type DashboardShellProps = {
  children: React.ReactNode;
  defaultOpen: boolean;
};

export function DashboardShell({ children, defaultOpen }: DashboardShellProps) {
  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <InfobarProvider defaultOpen={false}>
            {children}
            <InfoSidebar side='right' />
            <DashboardDevtools />
          </InfobarProvider>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
