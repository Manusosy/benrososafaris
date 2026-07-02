import { redirect } from 'next/navigation';

type SafariPackagesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SafariPackagesPage({ params }: SafariPackagesPageProps) {
  const { locale } = await params;
  redirect(`/${locale}/experiences`);
}
