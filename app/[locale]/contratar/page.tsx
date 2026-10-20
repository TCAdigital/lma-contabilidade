import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContratarFlow } from '@/components/contratar/ContratarFlow';
import { isLocale } from '@/lib/i18n';
import { getFormDict } from '@/lib/i18n/form';
import { planoFromParam } from '@/lib/contratar';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getFormDict(locale).topTitle, robots: { index: false, follow: false }, alternates: { canonical: `/${locale}/contratar` } };
}

export default async function Page({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ plano?: string | string[] }> }) {
  const { locale } = await params;
  const sp = await searchParams;
  if (!isLocale(locale)) notFound();
  return <ContratarFlow locale={locale} plano={planoFromParam(sp?.plano)} accountHref={`/${locale}/minha-conta`} plansHref={`/${locale}#planos`} />;
}
