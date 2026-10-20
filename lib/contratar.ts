// Estado da contratação, guardado só no navegador (prototipo front-end, sem servidor).
export type Plano = 'business' | 'elite';

export type DocItem = { nome: string; arquivo: string | null };

export type Contratacao = {
  plano: Plano;
  pessoais: { nome: string; email: string; celular: string; senha: string };
  empresa: { atividade: string; cep: string; logradouro: string; numero: string; complemento: string; bairro: string; cidade: string; uf: string; situacao: string };
  documentos: DocItem[];
  pagamento: { metodo: string };
  status: 'em_analise';
  atualizadoEm: string;
};

const DATA_KEY = 'lma-contratacao';
const AUTH_KEY = 'lma-auth';

export function planoFromParam(v?: string | string[]): Plano {
  const s = Array.isArray(v) ? v[0] : v;
  return s === 'elite' ? 'elite' : 'business';
}

export const planoNome = (p: Plano) => (p === 'elite' ? 'ELITE' : 'BUSINESS');

export function emptyContratacao(plano: Plano): Contratacao {
  return {
    plano,
    pessoais: { nome: '', email: '', celular: '', senha: '' },
    empresa: { atividade: '', cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', uf: '', situacao: '' },
    documentos: [],
    pagamento: { metodo: '' },
    status: 'em_analise',
    atualizadoEm: new Date().toISOString(),
  };
}

export function loadContratacao(): Contratacao | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(DATA_KEY);
    return raw ? (JSON.parse(raw) as Contratacao) : null;
  } catch {
    return null;
  }
}

export function saveContratacao(c: Contratacao): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(DATA_KEY, JSON.stringify({ ...c, atualizadoEm: new Date().toISOString() }));
  } catch {
    /* ignora: modo privado / armazenamento bloqueado */
  }
}

export function setAuth(email: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(AUTH_KEY, email);
  } catch {
    /* ignora */
  }
}

export function getAuth(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(AUTH_KEY);
  } catch {
    return null;
  }
}

export function clearAuth(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(AUTH_KEY);
  } catch {
    /* ignora */
  }
}
