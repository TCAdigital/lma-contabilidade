import type { MetadataRoute } from 'next';
import { website } from '@/lib/content';
import { locales, localeMeta } from '@/lib/i18n';
import { allServiceSlugs } from '@/lib/pages';

// A página inicial fica de fora até ser aprovada. Quando for liberada, adicionar '' à lista de caminhos.
const paths = ['/servicos', '/fale-conosco', '/politica-de-privacidade', '/termos-de-servico', ...allServiceSlugs.map((s) => `/servicos/${s}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((l) =>
    paths.map((p) => ({
      url: `${website.domain}/${l}${p}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((x) => [localeMeta[x].htmlLang, `${website.domain}/${x}${p}`])),
      },
    })),
  );
}
