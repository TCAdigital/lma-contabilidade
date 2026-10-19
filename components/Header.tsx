'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { Brand } from './Brand';
import { LanguageSwitch } from './LanguageSwitch';

type NavItem = { label: string; href: string };

export type HeaderLabels = {
  navLabel: string;
  openMenu: string;
  closeMenu: string;
  headerCta: string;
  brandAria: string;
  mobileNote: string;
  languageLabel: string;
};

export function Header({ locale, nav, labels }: { locale: Locale; nav: NavItem[]; labels: HeaderLabels }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-inner">
          <Brand label={labels.brandAria} />
          <nav className="desktop-nav" aria-label={labels.navLabel}>
            {nav.map((n) => (
              <a href={n.href} key={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <LanguageSwitch current={locale} label={labels.languageLabel} />
            <a className="button button-navy header-cta" href="#contato">
              {labels.headerCta} <ArrowUpRight size={17} />
            </a>
            <button
              className="menu-toggle"
              aria-label={open ? labels.closeMenu : labels.openMenu}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
      </header>
      <div id="mobile-nav" className={`mobile-nav ${open ? 'mobile-nav-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-nav-items">
          {nav.map((n, i) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              <span>0{i + 1}</span>
              {n.label}
              <ArrowUpRight size={20} />
            </a>
          ))}
        </div>
        <div className="mobile-nav-bottom">
          <span>{labels.mobileNote}</span>
          <LanguageSwitch current={locale} label={labels.languageLabel} className="lang-switch-mobile" />
        </div>
      </div>
    </>
  );
}
