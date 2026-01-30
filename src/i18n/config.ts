export const locales = ['en', 'es', 'zh'];
export type Locale = 'en' | 'es' | 'zh';

export const defaultLocale: Locale = 'zh';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  zh: '中文',
};
