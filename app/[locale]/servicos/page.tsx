import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Building2, ChartNoAxesCombined, ArrowLeftRight, FileCheck2, BadgeCheck, Globe2 } from 'lucide-react';
import { InternalPage } from '@/components/InternalPage';
import { serviceMeta } from '@/lib/content';
import { getDict, isLocale } from '@/lib/i18n';

const icons = { Building2, ChartNoAxesCombined, ArrowLeftRight, FileCheck2, BadgeCheck, Globe2 };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return {
    title: d.pages.servicesTitle,
    description: d.pages.servicesDesc,
    alternates: { canonical: `/${locale}/servicos` },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  return (
    <InternalPage locale={locale} d={d} path="/servicos" eyebrow={d.pages.servicesEyebrow} title={d.pages.servicesTitle} desc={d.pages.servicesDesc}>
      <div className="service-grid">
        {serviceMeta.map((m, i) => {
          const Icon = icons[m.icon as keyof typeof icons];
          const item = d.services.items[i];
          return (
            <article className="service-card" key={m.slug}>
              <div className="service-top">
                <span className="service-icon">
                  <Icon size={24} strokeWidth={1.7} />
                </span>
                <span className="service-number">{m.num} / 06</span>
              </div>
              <span className="service-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <a aria-label={d.services.ariaMore(item.title)} href={d.routes.service(m.slug)} className="service-arrow">
                <ArrowUpRight size={23} />
              </a>
            </article>
          );
        })}
      </div>
    </InternalPage>
  );
}
