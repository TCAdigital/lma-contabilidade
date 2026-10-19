import { locales, localeMeta, type Locale } from '@/lib/i18n';

// path: caminho da página atual sem o idioma (ex.: '/servicos/certificado-digital'). Vazio na página inicial.
export function LanguageSwitch({ current, label, className = '', path = '' }: { current: Locale; label: string; className?: string; path?: string }) {
  return (
    <nav className={`lang-switch ${className}`} aria-label={label}>
      {locales.map((l) => (
        <a
          key={l}
          href={`/${l}${path}`}
          hrefLang={localeMeta[l].htmlLang}
          lang={localeMeta[l].htmlLang}
          aria-label={localeMeta[l].name}
          aria-current={l === current ? 'page' : undefined}
        >
          {localeMeta[l].label}
        </a>
      ))}
    </nav>
  );
}
