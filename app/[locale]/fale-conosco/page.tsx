import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { InternalPage } from '@/components/InternalPage';
import { whatsappUrl } from '@/lib/content';
import { getDict, isLocale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return { title: d.pages.contactTitle, description: d.cta.text, alternates: { canonical: `/${locale}/fale-conosco` } };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  return (
    <InternalPage locale={locale} d={d} path="/fale-conosco" eyebrow={d.cta.eyebrow} title={d.pages.contactTitle} desc={d.cta.text}>
      <div className="internal-actions">
        <a className="button button-orange" href={whatsappUrl(d.cta.whatsappMessage)} target="_blank" rel="noopener noreferrer">
          {d.cta.whatsapp} <ArrowUpRight size={19} />
        </a>
      </div>
      <div className="internal-channels">
        {d.cta.channels.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
    </InternalPage>
  );
}
