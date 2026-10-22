import { ArrowUpRight, Briefcase, MapPin } from 'lucide-react';
import { website, whatsapp, whatsappUrl } from '@/lib/content';
import type { Locale } from '@/lib/i18n';
import type { Dict } from '@/lib/i18n/pt';
import { Brand } from './Brand';
import { LanguageSwitch } from './LanguageSwitch';
import { ScrollExperience } from './ScrollExperience';
import { WhatsAppWidget } from './Home';

// Layout das páginas internas. Não tem link para a página inicial (logo e menu ficam fora).
export function InternalPage({
  locale,
  d,
  path,
  eyebrow,
  title,
  desc,
  children,
}: {
  locale: Locale;
  d: Dict;
  path: string;
  eyebrow?: string;
  title: string;
  desc?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <ScrollExperience />
      <a href="#conteudo" className="skip-link">
        {d.ui.skip}
      </a>
      <header className="header header-internal">
        <div className="container header-inner">
          <Brand label={d.ui.brandAria} href={null} />
          <div className="header-actions">
            <LanguageSwitch current={locale} label={d.ui.languageLabel} path={path} />
            <a className="button button-outline header-login" href={d.routes.login}>
              {d.ui.loginCta}
            </a>
            <a className="button button-navy header-cta" href={d.routes.contact}>
              {d.pages.talk} <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </header>
      <main id="conteudo">
        <section className="internal-hero">
          <div className="container">
            {eyebrow && (
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                {eyebrow}
              </div>
            )}
            <h1 className="internal-title">{title}</h1>
            {desc && <p className="internal-desc">{desc}</p>}
          </div>
        </section>
        <section className="internal-body">
          <div className="container">{children}</div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <Brand inverse href={null} label={d.ui.brandAria} />
              <p>{d.ui.footerBrandText}</p>
              <span className="footer-location">
                <MapPin size={17} /> {d.ui.footerLocation}
              </span>
            </div>
            <div className="footer-links">
              <div>
                <h4>{d.ui.footerColContact}</h4>
                <a href={whatsappUrl(d.ui.whatsappDefaultMessage)} target="_blank" rel="noopener noreferrer">
                  {d.ui.footerWhatsapp} {whatsapp.display} <ArrowUpRight size={14} />
                </a>
                <a href={d.routes.contact}>{d.ui.footerForm}</a>
                <a href={d.routes.privacy}>{d.ui.footerPrivacy}</a>
                <a href={d.routes.terms}>{d.ui.footerTerms}</a>
                <span className="footer-address">{website.address}</span>
              </div>
              <div>
                <h4>{d.ui.footerColServices}</h4>
                <a href={d.routes.services} className="footer-icon-link">
                  <Briefcase size={15} strokeWidth={1.7} className="nav-icon" aria-hidden="true" />
                  {d.pages.servicesTitle}
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} LMA Contabilidade. {d.ui.rights}
            </span>
            <span>
              {d.ui.footerTag} <span className="orange-dot">●</span>
            </span>
          </div>
        </div>
      </footer>
      <WhatsAppWidget d={d} />
    </>
  );
}
