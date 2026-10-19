import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { InternalPage } from '@/components/InternalPage';
import { marketMeta, whatsappUrl } from '@/lib/content';
import { getDict, isLocale, locales } from '@/lib/i18n';
import { allServiceSlugs, getServicePage } from '@/lib/pages';

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return locales.flatMap((locale) => allServiceSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const p = getServicePage(getDict(locale), slug);
  if (!p) return {};
  return { title: p.title, description: p.desc, alternates: { canonical: `/${locale}/servicos/${slug}` } };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const p = getServicePage(d, slug);
  if (!p) notFound();

  return (
    <InternalPage locale={locale} d={d} path={`/servicos/${slug}`} eyebrow={p.eyebrow} title={p.title} desc={p.desc}>
      <div className="internal-actions">
        <a className="button button-orange" href={whatsappUrl(d.pages.talkMessage(p.title))} target="_blank" rel="noopener noreferrer">
          {d.pages.talk} <ArrowUpRight size={18} />
        </a>
        <a className="button button-outline" href={d.routes.services}>
          {d.pages.backToServices}
        </a>
      </div>
      {slug === 'abertura-de-empresas' && (
        <div>
          <h2 className="internal-subtitle">{d.pages.marketsTitle}</h2>
          <div className="internal-link-list">
            {marketMeta.map((m, i) => (
              <a key={m.slug} href={d.routes.service(m.slug)}>
                <span>{d.expansion.markets[i].country}</span>
                <ArrowUpRight size={20} />
              </a>
            ))}
          </div>
        </div>
      )}
    </InternalPage>
  );
}
