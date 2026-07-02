import { redirect } from 'next/navigation';

type SafariPackageDetailPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function SafariPackageDetailPage({ params }: SafariPackageDetailPageProps) {
  const { locale } = await params;
  redirect(`/${locale}/experiences`);
}
