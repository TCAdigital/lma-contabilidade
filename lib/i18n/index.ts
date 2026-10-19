import { pt, type Dict } from './pt';
import { en } from './en';
import { ar } from './ar';

export const locales = ['pt', 'en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const localeMeta: Record<Locale, { htmlLang: string; dir: 'ltr' | 'rtl'; label: string; name: string }> = {
  pt: { htmlLang: 'pt-BR', dir: 'ltr', label: 'PT', name: 'Português' },
  en: { htmlLang: 'en', dir: 'ltr', label: 'EN', name: 'English' },
  ar: { htmlLang: 'ar', dir: 'rtl', label: 'AR', name: 'العربية' },
};

const dicts: Record<Locale, Dict> = { pt, en, ar };

export const getDict = (locale: Locale) => dicts[locale];

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);
