// Dados que não mudam entre idiomas. Os textos ficam em lib/i18n/.
// Todos os links do site apontam para páginas internas, exceto o WhatsApp (canal de atendimento).
export const website = {
  domain: 'https://lmacontabilidade.com.br',
  address: 'Av. Paulista, 2073, Horsa 1, Grupo 912, Bela Vista, São Paulo - SP',
};

export const whatsapp = {
  number: '5511932609988',
  display: '+55 (11) 93260-9988',
};

export const whatsappUrl = (message: string) =>
  `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`;

// Mesma ordem dos textos em lib/i18n/*.ts (services.items)
export const serviceMeta = [
  { icon: 'Building2', num: '01', slug: 'abertura-de-empresas' },
  { icon: 'ChartNoAxesCombined', num: '02', slug: 'contabilidade-empresarial' },
  { icon: 'ArrowLeftRight', num: '03', slug: 'migracao-contabil' },
  { icon: 'FileCheck2', num: '04', slug: 'imposto-de-renda' },
  { icon: 'BadgeCheck', num: '05', slug: 'certificado-digital' },
  { icon: 'Globe2', num: '06', slug: 'negocios-internacionais' },
];

// Mesma ordem dos textos em lib/i18n/*.ts (expansion.markets)
export const marketMeta = [
  { n: '01', img: '/market-brasil.webp', slug: 'abertura-de-empresa-no-brasil' },
  { n: '02', img: '/market-eua.webp', slug: 'abertura-de-empresa-nos-estados-unidos' },
  { n: '03', img: '/market-emirados.webp', slug: 'abertura-de-empresa-no-emirados-arabes-unidos' },
];

export const planPopular = [true, false];

// [BUSINESS, ELITE] para cada linha da tabela de comparação
export const planComparisonFlags: [boolean, boolean][] = [
  [true, true],
  [true, true],
  [true, true],
  [true, true],
  [false, true],
  [false, true],
  [false, true],
  [false, true],
];
