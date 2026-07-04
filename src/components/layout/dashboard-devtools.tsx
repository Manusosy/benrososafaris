'use client';

import dynamic from 'next/dynamic';

const ReactQueryDevtools = dynamic(
  () =>
    import('@tanstack/react-query-devtools').then((module) => ({
      default: module.ReactQueryDevtools
    })),
  { ssr: false }
);

export function DashboardDevtools() {
  if (process.env.NODE_ENV !== 'development') return null;

  return <ReactQueryDevtools buttonPosition='bottom-right' initialIsOpen={false} />;
}
