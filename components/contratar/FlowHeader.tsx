import type { Locale } from '@/lib/i18n';
import { Brand } from '../Brand';
import { LanguageSwitch } from '../LanguageSwitch';

// Barra de topo enxuta das telas de contratação: logo (sem link) + idioma.
export function FlowHeader({ locale, brandAria, langLabel, path }: { locale: Locale; brandAria: string; langLabel: string; path: string }) {
  return (
    <header className="flow-header">
      <div className="container flow-header-inner">
        <Brand label={brandAria} href={null} />
        <LanguageSwitch current={locale} label={langLabel} path={path} />
      </div>
    </header>
  );
}
