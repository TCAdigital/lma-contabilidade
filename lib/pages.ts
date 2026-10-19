import { serviceMeta, marketMeta } from './content';
import type { Dict } from './i18n/pt';

export const serviceSlugs = serviceMeta.map((s) => s.slug);
export const marketSlugs = marketMeta.map((m) => m.slug);
export const allServiceSlugs = [...serviceSlugs, ...marketSlugs];

// Título, descrição e rótulo de uma página de serviço ou de mercado, a partir do dicionário.
export function getServicePage(d: Dict, slug: string) {
  const si = serviceSlugs.indexOf(slug);
  if (si >= 0) {
    const it = d.services.items[si];
    return { title: it.title, desc: it.desc, tag: it.tag, eyebrow: d.services.eyebrow };
  }
  const mi = marketSlugs.indexOf(slug);
  if (mi >= 0) {
    const it = d.expansion.markets[mi];
    return { title: it.country, desc: it.text, tag: d.expansion.label, eyebrow: d.expansion.eyebrow };
  }
  return null;
}
