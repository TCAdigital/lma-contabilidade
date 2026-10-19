import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InternalPage } from '@/components/InternalPage';
import { getDict, isLocale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDict(locale).pages.termsTitle, alternates: { canonical: `/${locale}/termos-de-servico` } };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  return (
    <InternalPage locale={locale} d={d} path="/termos-de-servico" title={d.pages.termsTitle}>
      <div className="internal-note">{d.pages.pending}</div>
    </InternalPage>
  );
}
