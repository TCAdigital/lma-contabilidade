import { ArrowUpRight, ArrowRight, ArrowDown, Check, Globe2, Building2, ChartNoAxesCombined, ArrowLeftRight, FileCheck2, BadgeCheck, ShieldCheck, Headphones, Lightbulb, MapPin, ArrowRightCircle, Minus, BriefcaseBusiness, Plane, Compass, MoveUpRight, Star, CheckCircle2, MessagesSquare, ClipboardList, CalendarCheck, TrendingUp } from 'lucide-react';
import { serviceMeta, marketMeta, planComparisonFlags, planPopular, aboutImages, website, whatsapp, whatsappUrl } from '@/lib/content';
import type { Locale } from '@/lib/i18n';
import type { Dict } from '@/lib/i18n/pt';
import { Brand } from './Brand';
import { Header } from './Header';
import { NavIcon } from './NavIcon';
import { FaqList } from './FaqList';
import { ScrollExperience } from './ScrollExperience';
import { HeroSlider, type HeroSlide } from './HeroSlider';
import { ImageSlider } from './ImageSlider';

const icons = { Building2, ChartNoAxesCombined, ArrowLeftRight, FileCheck2, BadgeCheck, Globe2 };
const benefitIcons = [ShieldCheck, Headphones, Lightbulb, Globe2];
const intlIcons = [Compass, BriefcaseBusiness, Plane];
const stepIcons = [MessagesSquare, ClipboardList, CalendarCheck, TrendingUp];
function ContactLink({ children, className = '', href }: { children: React.ReactNode; className?: string; href: string }) {
  return <a className={className} href={href}>{children}</a>;
}

function WhatsAppLink({ children, className = '', message }: { children: React.ReactNode; className?: string; message: string }) {
  return (
    <a className={className} href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.55 4.19 1.6 6.02L4 29l8.13-1.56a12.1 12.1 0 0 0 3.9.65h.01C22.68 28.09 28.08 22.7 28.08 16.06 28.08 8.4 22.68 3 16.04 3Zm0 22.2c-1.2 0-2.38-.18-3.5-.53l-.25-.08-4.82.93.96-4.7-.16-.26a10.06 10.06 0 0 1-1.55-5.52c0-5.57 4.53-10.1 10.1-10.1 5.57 0 10.1 4.53 10.1 10.1 0 5.57-4.53 10.1-10.1 10.1Zm5.54-7.56c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.24-.24-.59-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.52 0 1.49 1.08 2.93 1.23 3.13.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.79-.73 2.04-1.44.25-.7.25-1.31.18-1.44-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

export function WhatsAppWidget({ d }: { d: Dict }) {
  return (
    <a className="whatsapp-widget" href={whatsappUrl(d.ui.whatsappDefaultMessage)} target="_blank" rel="noopener noreferrer" aria-label={d.ui.whatsappAria(whatsapp.display)}>
      <span className="whatsapp-widget-label">
        <strong>{d.ui.whatsappLabel}</strong>
        <small>{d.ui.whatsappSub}</small>
      </span>
      <span className="whatsapp-widget-button">
        <WhatsAppIcon size={29} />
      </span>
    </a>
  );
}

function SectionHeading({ eyebrow, title, desc, light = false }: { eyebrow: string; title: React.ReactNode; desc?: string; light?: boolean }) {
  return (
    <div className={`section-heading ${light ? 'light' : ''}`}>
      <div className="eyebrow">
        <span className="eyebrow-dot" />
        {eyebrow}
      </div>
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </div>
  );
}

function Hero({ d }: { d: Dict }) {
  const h = d.hero;
  const wa = whatsappUrl(h.ctaPrimaryMessage);
  const s2 = d.heroSlides[0];
  const s3 = d.heroSlides[1];
  const slides: HeroSlide[] = [
    {
      bg: '/hero.webp',
      theme: 'dark',
      first: true,
      kicker: h.kicker,
      titleA: h.titleA,
      titleEm: h.titleEm,
      text: h.text,
      primary: { label: h.ctaPrimary, href: wa, external: true },
      secondary: { label: h.ctaSecondary, href: '#servicos' },
    },
    {
      bg: '/hero-servicos.webp',
      theme: 'dark',
      kicker: s2.kicker,
      titleA: s2.titleA,
      titleEm: s2.titleEm,
      text: s2.text,
      primary: { label: s2.cta, href: d.routes.services },
      secondary: { label: h.ctaPrimary, href: wa, external: true },
    },
    {
      bg: '/hero-global.webp',
      theme: 'dark',
      kicker: s3.kicker,
      titleA: s3.titleA,
      titleEm: s3.titleEm,
      text: s3.text,
      primary: { label: s3.cta, href: d.routes.service('abertura-de-empresas') },
      secondary: { label: h.ctaPrimary, href: wa, external: true },
    },
  ];
  return (
    <HeroSlider
      slides={slides}
      dotsLabel={d.heroDots}
      prevLabel={d.heroPrev}
      nextLabel={d.heroNext}
      bottom={h.bottom}
      goHref="#servicos"
      goAria={d.ui.goToServices}
      floatTop={h.floatTop}
      floatBottom={h.floatBottom}
      proof={{ title: h.proofTitle, text: h.proofText }}
    />
  );
}

function TrustStrip({ d }: { d: Dict }) {
  return (
    <section className="trust-strip">
      <div className="container trust-inner">
        <span className="trust-label">{d.trust.label}</span>
        <div className="trust-items">
          {d.trust.items.map((t) => (
            <span key={t}>
              <CheckCircle2 size={18} /> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services({ d }: { d: Dict }) {
  const s = d.services;
  return (
    <section id="servicos" className="section services-section">
      <div className="container">
        <div className="split-intro">
          <SectionHeading
            eyebrow={s.eyebrow}
            title={
              <>
                {s.titleA}
                <br />
                <span className="text-orange">{s.titleB}</span>
              </>
            }
            desc={s.desc}
          />
          <a href={d.routes.services} className="text-link">
            {s.all} <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="service-grid">
          {serviceMeta.map((m, i) => {
            const Icon = icons[m.icon as keyof typeof icons];
            const item = s.items[i];
            return (
              <article className="service-card" key={m.num}>
                <div className="service-top">
                  <span className="service-icon">
                    <Icon size={24} strokeWidth={1.7} />
                  </span>
                  <span className="service-number">{m.num} / 06</span>
                </div>
                <span className="service-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a aria-label={s.ariaMore(item.title)} href={d.routes.service(m.slug)} className="service-arrow">
                  <ArrowUpRight size={23} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About({ d }: { d: Dict }) {
  const a = d.about;
  return (
    <section id="quem-somos" className="section about-section">
      <div className="container about-grid">
        <div className="about-visual">
          <ImageSlider images={aboutImages} label={a.float} className="about-slider" />
          <div className="about-float about-float-one">
            <Globe2 size={23} /> <span>{a.float}</span>
          </div>
          <div className="about-visual-footer">
            <span>{a.footerA}</span>
            <span>{a.footerB}</span>
          </div>
        </div>
        <div className="about-content">
          <SectionHeading
            eyebrow={a.eyebrow}
            title={
              <>
                {a.titleA} <span className="text-blue">{a.titleB}</span>
              </>
            }
            desc={a.desc}
          />
          <div className="about-benefits">
            {a.benefits.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <div key={b.title}>
                  <span className="benefit-icon">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="about-offices">
            {a.offices.map((o) => (
              <span key={o}>
                <MapPin size={13} /> {o}
              </span>
            ))}
          </div>
          <a className="button button-navy" href="#planos">
            {a.cta} <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Expansion({ d }: { d: Dict }) {
  const e = d.expansion;
  return (
    <section id="expansao" className="section expansion-section">
      <div className="container">
        <div className="expansion-head">
          <SectionHeading
            eyebrow={e.eyebrow}
            title={
              <>
                {e.titleA}
                <br />
                {e.titleB} <i>{e.titleEm}</i>
              </>
            }
            desc={e.desc}
            light
          />
          <div className="expansion-stamp">
            <Globe2 size={28} />
            <span>
              {e.stamp[0]}
              <br />
              {e.stamp[1]}
            </span>
          </div>
        </div>
        <div className="market-grid">
          {marketMeta.map((m, i) => {
            const item = e.markets[i];
            return (
              <a href={d.routes.service(m.slug)} className="market-card" key={m.n} style={{ backgroundImage: `url('${m.img}')` }}>
                <span className="market-top">
                  <span>
                    {m.n} — {e.label}
                  </span>
                  <ArrowUpRight size={22} />
                </span>
                <h3>{item.country}</h3>
                <p>{item.text}</p>
                <span className="market-link">
                  {e.linkText} <ArrowRight size={17} />
                </span>
              </a>
            );
          })}
        </div>
        <div className="expansion-foot">
          <span>{e.foot}</span>
          <ContactLink className="expansion-contact" href={d.routes.contact}>
            {e.footCta} <ArrowUpRight size={18} />
          </ContactLink>
        </div>
      </div>
    </section>
  );
}

function Plans({ d, locale }: { d: Dict; locale: Locale }) {
  const p = d.plans;
  return (
    <section id="planos" className="section plans-section">
      <div className="container">
        <div className="plans-heading">
          <SectionHeading
            eyebrow={p.eyebrow}
            title={
              <>
                {p.titleA}
                <br />
                <span className="text-orange">{p.titleB}</span>
              </>
            }
            desc={p.desc}
          />
          <div className="price-disclaimer">
            <span className="disclaimer-dot" /> {p.disclaimer}
          </div>
        </div>
        <div className="plan-grid">
          {p.items.map((plan, i) => {
            const popular = planPopular[i];
            return (
              <div className={`plan-card ${popular ? 'plan-featured' : ''}`} key={plan.name}>
                {popular && (
                  <div className="plan-ribbon">
                    {p.ribbon} <Star size={13} fill="currentColor" />
                  </div>
                )}
                <div className="plan-head">
                  <span>{plan.highlight}</span>
                  <h3 className={plan.name === 'ELITE' ? 'elite-title' : undefined}>
                    {plan.name === 'ELITE' && <Star size={16} fill="currentColor" aria-hidden="true" className="elite-star" />}
                    {plan.name}
                  </h3>
                  <p>{plan.subtitle}</p>
                </div>
                <div className="plan-price">
                  <span>{p.investment}</span>
                  <div>
                    <strong className="plan-price-consult">{p.consult}</strong>
                  </div>
                </div>
                <div className="plan-divider" />
                <ul>
                  {plan.features.map((f) => (
                    <li key={f}>
                      <Check size={17} /> {f}
                    </li>
                  ))}
                </ul>
                <a className={`button ${popular ? 'button-orange' : 'button-outline'}`} href={`/${locale}/contratar?plano=${plan.name.toLowerCase()}`}>
                  {p.talkAbout(plan.name)} <ArrowUpRight size={18} />
                </a>
              </div>
            );
          })}
        </div>
        <div className="plan-compare" role="table" aria-label={p.tableLabel}>
          <div className="plan-compare-head" role="row">
            <span role="columnheader">{p.tableHead}</span>
            <span role="columnheader">BUSINESS</span>
            <span role="columnheader" className="compare-elite elite-title"><Star size={14} fill="currentColor" aria-hidden="true" className="elite-star" />
              ELITE
            </span>
          </div>
          {p.compareRows.map((label, i) => (
            <div className="plan-compare-row" role="row" key={label}>
              <span role="cell">{label}</span>
              <span role="cell">{planComparisonFlags[i][0] ? <Check size={18} /> : <Minus size={18} />}</span>
              <span role="cell" className="compare-elite">
                {planComparisonFlags[i][1] ? <Check size={18} /> : <Minus size={18} />}
              </span>
            </div>
          ))}
        </div>
        <p className="plans-fineprint">{p.fineprint}</p>
      </div>
    </section>
  );
}

function International({ d }: { d: Dict }) {
  const n = d.international;
  return (
    <section id="internacional" className="section international-section">
      <div className="container international-grid">
        <div className="international-copy">
          <SectionHeading
            eyebrow={n.eyebrow}
            title={
              <>
                {n.titleA}
                <br />
                <span className="text-orange">{n.titleB}</span>
              </>
            }
            desc={n.desc}
          />
          <div className="international-list">
            {n.items.map((it, i) => {
              const Icon = intlIcons[i];
              return (
                <div key={it.title}>
                  <Icon size={21} />
                  <span>
                    <b>{it.title}</b>
                    <small>{it.text}</small>
                  </span>
                  <ArrowUpRight size={18} />
                </div>
              );
            })}
          </div>
          <ContactLink className="button button-navy" href={d.routes.contact}>
            {n.cta} <ArrowUpRight size={18} />
          </ContactLink>
        </div>
        <div className="world-panel">
          <div className="world-panel-top">
            <span>{n.panelTop}</span>
            <Globe2 size={21} />
          </div>
          <div className="world-rings">
            <div className="world-ring r1" />
            <div className="world-ring r2" />
            <div className="world-ring r3" />
          </div>
          <div className="world-panel-bottom">
            <span>{n.panelBottom}</span>
            <MoveUpRight size={22} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Steps({ d }: { d: Dict }) {
  const s = d.steps;
  return (
    <section id="como-funciona" className="section steps-section">
      <div className="container">
        <SectionHeading
          eyebrow={s.eyebrow}
          title={
            <>
              {s.titleA}
              <br />
              <span className="text-orange">{s.titleB}</span>
            </>
          }
          desc={s.desc}
        />
        <div className="steps-grid">
          {s.items.map((st, i) => {
            const Icon = stepIcons[i];
            return (
            <div className="step" key={st.title}>
              <div className="step-top">
                <span className="step-icon"><Icon size={26} strokeWidth={1.7} /></span>
                <ArrowRightCircle size={22} />
              </div>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </div>
            );
          })}
        </div>
        <div className="steps-note">
          <FileCheck2 size={20} />
          <span>
            <strong>{s.noteStrong}</strong> {s.noteText}
          </span>
        </div>
      </div>
    </section>
  );
}

function Faq({ d }: { d: Dict }) {
  const f = d.faq;
  return (
    <section id="faq" className="section faq-section">
      <div className="container faq-grid">
        <div>
          <SectionHeading
            eyebrow={f.eyebrow}
            title={
              <>
                {f.titleA}
                <br />
                <span className="text-orange">{f.titleB}</span>
              </>
            }
            desc={f.desc}
          />
          <div className="faq-prompt">
            <span>{f.prompt}</span>
            <ContactLink href={d.routes.contact}>
              {f.promptLink} <ArrowUpRight size={16} />
            </ContactLink>
          </div>
        </div>
        <FaqList items={f.items} />
      </div>
    </section>
  );
}

function FinalCTA({ d }: { d: Dict }) {
  const c = d.cta;
  return (
    <section id="contato" className="cta-section">
      <div className="container">
        <div className="cta-box">
          <div className="cta-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" /> {c.eyebrow}
            </div>
            <h2>
              {c.titleA}
              <br />
              {c.titleB} <em>{c.titleEm}</em>
            </h2>
            <p>{c.text}</p>
            <div className="cta-actions">
              <WhatsAppLink className="button button-orange" message={c.whatsappMessage}>
                {c.whatsapp} <ArrowUpRight size={19} />
              </WhatsAppLink>
              <a className="cta-secondary" href={d.routes.contact}>
                {c.form} <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="cta-channels">
              {c.channels.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ d }: { d: Dict }) {
  const u = d.ui;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand inverse label={u.brandAria} />
            <p>{u.footerBrandText}</p>
            <span className="footer-location">
              <MapPin size={17} /> {u.footerLocation}
            </span>
          </div>
          <div className="footer-links">
            <div>
              <h4>{u.footerColExplore}</h4>
              {d.nav.map((n, i) => (
                <a key={n.href} href={n.href} className="footer-nav-link">
                  <NavIcon i={i} size={15} />
                  {n.label}
                </a>
              ))}
            </div>
            <div>
              <h4>{u.footerColServices}</h4>
              {d.footerServices.map((s) => (
                <a key={s.href} href={s.href}>
                  {s.label}
                </a>
              ))}
            </div>
            <div>
              <h4>{u.footerColContact}</h4>
              <a href={whatsappUrl(u.whatsappDefaultMessage)} target="_blank" rel="noopener noreferrer">
                {u.footerWhatsapp} {whatsapp.display} <ArrowUpRight size={14} />
              </a>
              <a href={d.routes.contact}>
                {u.footerForm} <ArrowUpRight size={14} />
              </a>
              <a href={d.routes.privacy}>{u.footerPrivacy}</a>
              <a href={d.routes.terms}>{u.footerTerms}</a>
              <span className="footer-address">{website.address}</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} LMA Contabilidade. {u.rights}
          </span>
          <span>
            {u.footerTag} <span className="orange-dot">●</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function Home({ locale, dict: d }: { locale: Locale; dict: Dict }) {
  return (
    <>
      <ScrollExperience />
      <a href="#conteudo" className="skip-link">
        {d.ui.skip}
      </a>
      <Header
        locale={locale}
        nav={d.nav}
        labels={{
          navLabel: d.ui.navLabel,
          openMenu: d.ui.openMenu,
          closeMenu: d.ui.closeMenu,
          headerCta: d.ui.headerCta,
          loginCta: d.ui.loginCta,
          loginHref: d.routes.login,
          brandAria: d.ui.brandAria,
          mobileNote: d.ui.mobileNote,
          languageLabel: d.ui.languageLabel,
        }}
      />
      <main id="conteudo">
        <Hero d={d} />
        <TrustStrip d={d} />
        <Services d={d} />
        <About d={d} />
        <Expansion d={d} />
        <Plans d={d} locale={locale} />
        <International d={d} />
        <Steps d={d} />
        <Faq d={d} />
        <FinalCTA d={d} />
      </main>
      <Footer d={d} />
      <WhatsAppWidget d={d} />
    </>
  );
}
