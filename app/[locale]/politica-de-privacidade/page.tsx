import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InternalPage } from '@/components/InternalPage';
import { getDict, isLocale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDict(locale).pages.privacyTitle, alternates: { canonical: `/${locale}/politica-de-privacidade` } };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  return (
    <InternalPage locale={locale} d={d} path="/politica-de-privacidade" title={d.pages.privacyTitle}>
      <div className="internal-note">{d.pages.pending}</div>
    </InternalPage>
  );
}
