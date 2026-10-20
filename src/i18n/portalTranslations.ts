import { Language } from './translations';

export const PORTAL_LANGUAGE_OPTIONS: { code: Language; label: string; nativeName: string }[] = [
  { code: 'en', label: 'EN', nativeName: 'English' },
  { code: 'ru', label: 'RU', nativeName: 'Русский' },
  { code: 'uk', label: 'UA', nativeName: 'Українська' },
  { code: 'he', label: 'HE', nativeName: 'עברית' },
];

export function tr(
  lang: Language,
  en: string,
  ru: string,
  uk: string,
  he: string
): string {
  switch (lang) {
    case 'ru':
      return ru;
    case 'uk':
      return uk;
    case 'he':
      return he;
    default:
      return en;
  }
}
