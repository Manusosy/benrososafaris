'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function DashboardDevtools() {
  if (process.env.NODE_ENV !== 'development') return null;

  return <ReactQueryDevtools buttonPosition='bottom-right' initialIsOpen={false} />;
}
