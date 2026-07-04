'use client';

import dynamic from 'next/dynamic';

const AreaGraph = dynamic(
  () =>
    import('@/features/overview/components/area-graph').then((module) => ({
      default: module.AreaGraph
    })),
  { ssr: false }
);

const BarGraph = dynamic(
  () =>
    import('@/features/overview/components/bar-graph').then((module) => ({
      default: module.BarGraph
    })),
  { ssr: false }
);

const PieGraph = dynamic(
  () =>
    import('@/features/overview/components/pie-graph').then((module) => ({
      default: module.PieGraph
    })),
  { ssr: false }
);

const RecentSales = dynamic(
  () =>
    import('@/features/overview/components/recent-sales').then((module) => ({
      default: module.RecentSales
    })),
  { ssr: false }
);

export function LazyAreaGraph() {
  return <AreaGraph />;
}

export function LazyBarGraph() {
  return <BarGraph />;
}

export function LazyPieGraph() {
  return <PieGraph />;
}

export function LazyRecentSales() {
  return <RecentSales />;
}
