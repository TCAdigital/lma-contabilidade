import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MinhaConta } from '@/components/contratar/MinhaConta';
import { isLocale } from '@/lib/i18n';
import { getFormDict } from '@/lib/i18n/form';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getFormDict(locale).conta.title, robots: { index: false, follow: false }, alternates: { canonical: `/${locale}/minha-conta` } };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <MinhaConta locale={locale} loginHref={`/${locale}/entrar`} plansHref={`/${locale}#planos`} />;
}
