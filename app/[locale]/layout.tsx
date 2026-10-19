import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { website, whatsapp } from '@/lib/content';
import { getDict, isLocale, localeMeta, locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return {
    metadataBase: new URL(website.domain),
    title: { default: d.meta.title, template: '%s | LMA Contabilidade' },
    description: d.meta.description,
    applicationName: 'LMA Contabilidade',
    alternates: {
      canonical: `/${locale}`,
      languages: { 'pt-BR': '/pt', en: '/en', ar: '/ar', 'x-default': '/pt' },
    },
    openGraph: {
      type: 'website',
      locale: d.meta.ogLocale,
      siteName: 'LMA Contabilidade',
      title: d.meta.ogTitle,
      description: d.meta.ogDescription,
      url: `/${locale}`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'LMA Contabilidade' }],
    },
    twitter: { card: 'summary_large_image', title: d.meta.ogTitle, images: ['/opengraph-image'] },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
    category: 'business',
  };
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#172a83' };

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const meta = localeMeta[locale];
  const d = getDict(locale);

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      '@id': `${website.domain}/#organization`,
      name: 'LMA Contabilidade',
      url: website.domain,
      telephone: `+${whatsapp.number}`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: `+${whatsapp.number}`,
        contactType: 'sales',
        availableLanguage: ['Portuguese', 'English', 'Arabic'],
        url: `https://wa.me/${whatsapp.number}`,
      },
      logo: `${website.domain}/lma-logo.png`,
      description: d.meta.ogDescription,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Paulista, 2073, Horsa 1, Grupo 912',
        addressLocality: 'São Paulo',
        addressRegion: 'SP',
        addressCountry: 'BR',
      },
      areaServed: [
        { '@type': 'Country', name: 'Brasil' },
        { '@type': 'Country', name: 'Estados Unidos' },
        { '@type': 'Country', name: 'Emirados Árabes Unidos' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${website.domain}/#website`,
      url: website.domain,
      name: 'LMA Contabilidade',
      inLanguage: meta.htmlLang,
      publisher: { '@id': `${website.domain}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: d.faq.items.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ];

  return (
    <html lang={meta.htmlLang} dir={meta.dir}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
}
