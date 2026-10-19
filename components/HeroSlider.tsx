'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDown, Check, Globe2 } from 'lucide-react';

export type HeroSlide = {
  bg: string;
  pos?: string;
  theme: 'dark' | 'light';
  shade?: boolean;
  first?: boolean; // slide com prova social e cards flutuantes
  kicker: string;
  titleA: string;
  titleEm: string;
  text: string;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string; external?: boolean };
};

type Props = {
  slides: HeroSlide[];
  dotsLabel: string;
  bottom: string;
  goHref: string;
  goAria: string;
  floatTop: { title: string; text: string };
  floatBottom: { title: string; text: string };
  proof: { title: string; text: string };
};

const INTERVAL_MS = 7000;

export function HeroSlider({ slides, dotsLabel, bottom, goHref, goAria, floatTop, floatBottom, proof }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % slides.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  const s = slides[active];

  return (
    <section id="inicio" className={`hero ${s.theme === 'light' ? 'hero-light' : ''}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero-slides" aria-hidden="true">
        {slides.map((sl, i) => (
          <div
            key={sl.bg}
            className={`hero-bg ${i === active ? 'is-active' : ''} ${sl.shade ? 'hero-bg-shade' : ''}`}
            style={{ backgroundImage: `url('${sl.bg}')`, backgroundPosition: sl.pos }}
          />
        ))}
      </div>
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="container hero-layout">
        <div className="hero-copy hero-copy-anim" key={active}>
          <div className="hero-kicker">
            <span className="live-pulse" /> {s.kicker}
          </div>
          <h1>
            {s.titleA} <em>{s.titleEm}</em>
          </h1>
          <p>{s.text}</p>
          <div className="hero-buttons">
            <a className="button button-orange" href={s.primary.href} target={s.primary.external ? '_blank' : undefined} rel={s.primary.external ? 'noopener noreferrer' : undefined}>
              {s.primary.label} <ArrowUpRight size={19} />
            </a>
            {s.secondary && (
              <a className="button button-ghost" href={s.secondary.href} target={s.secondary.external ? '_blank' : undefined} rel={s.secondary.external ? 'noopener noreferrer' : undefined}>
                {s.secondary.label} <ArrowUpRight size={17} />
              </a>
            )}
          </div>
          {s.first && (
            <div className="hero-proof">
              <div className="avatar-stack">
                <span>LM</span>
                <span>BR</span>
                <span>GL</span>
              </div>
              <div>
                <strong>{proof.title}</strong>
                <small>{proof.text}</small>
              </div>
            </div>
          )}
        </div>
        <div className="hero-art">
          {s.first && (
            <>
              <div className="floating-card floating-card-top">
                <span className="floating-icon">
                  <Globe2 size={19} />
                </span>
                <span>
                  <strong>{floatTop.title}</strong>
                  <small>{floatTop.text}</small>
                </span>
              </div>
              <div className="floating-card floating-card-bottom">
                <span className="floating-check">
                  <Check size={17} />
                </span>
                <span>
                  <strong>{floatBottom.title}</strong>
                  <small>{floatBottom.text}</small>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="hero-bottom container">
        <span>{bottom}</span>
        <div className="hero-dots" role="group" aria-label={dotsLabel}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`hero-dot ${i === active ? 'is-active' : ''}`}
              aria-label={`${dotsLabel} ${i + 1}`}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <a href={goHref} aria-label={goAria}>
          <ArrowDown size={19} />
        </a>
      </div>
    </section>
  );
}
