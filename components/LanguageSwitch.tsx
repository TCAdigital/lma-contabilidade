import { locales, localeMeta, type Locale } from '@/lib/i18n';

// Bandeiras simplificadas, desenhadas em SVG (sem arquivos externos).
function FlagBR() {
  return (
    <svg viewBox="0 0 720 504" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="720" height="504" fill="#009c3b" />
      <polygon points="360,42 684,252 360,462 36,252" fill="#ffdf00" />
      <circle cx="360" cy="252" r="126" fill="#002776" />
    </svg>
  );
}

function FlagUS() {
  const stripes = Array.from({ length: 13 });
  const stars: { x: number; y: number }[] = [];
  for (let row = 0; row < 9; row++) for (let col = 0; col < (row % 2 === 0 ? 6 : 5); col++) stars.push({ x: 40 + col * 52 + (row % 2) * 26, y: 34 + row * 40 });
  return (
    <svg viewBox="0 0 760 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {stripes.map((_, i) => (
        <rect key={i} x="0" y={i * (400 / 13)} width="760" height={400 / 13} fill={i % 2 === 0 ? '#b22234' : '#ffffff'} />
      ))}
      <rect width="330" height="215" fill="#3c3b6e" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x * 0.8} cy={s.y * 0.6} r="7" fill="#ffffff" />
      ))}
    </svg>
  );
}

function FlagAE() {
  // Desenho quadrado para o recorte circular manter a faixa vermelha (Emirados Árabes Unidos).
  return (
    <svg viewBox="0 0 600 600" aria-hidden="true" focusable="false">
      <rect width="600" height="200" fill="#00732f" />
      <rect y="200" width="600" height="200" fill="#ffffff" />
      <rect y="400" width="600" height="200" fill="#000000" />
      <rect width="160" height="600" fill="#ff0000" />
    </svg>
  );
}

const flags: Record<Locale, () => React.ReactElement> = { pt: FlagBR, en: FlagUS, ar: FlagAE };

// path: caminho da página atual sem o idioma (ex.: '/servicos/certificado-digital'). Vazio na página inicial.
export function LanguageSwitch({ current, label, className = '', path = '' }: { current: Locale; label: string; className?: string; path?: string }) {
  return (
    <nav className={`lang-switch ${className}`} aria-label={label}>
      {locales.map((l) => {
        const Flag = flags[l];
        return (
          <a
            key={l}
            href={`/${l}${path}`}
            hrefLang={localeMeta[l].htmlLang}
            lang={localeMeta[l].htmlLang}
            title={localeMeta[l].name}
            aria-label={localeMeta[l].name}
            aria-current={l === current ? 'page' : undefined}
          >
            <span className="flag-chip">
              <Flag />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
