import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Always add locale prefix (e.g., /en, /es, /zh)
  localePrefix: 'always',

  // Default locale handling
  localeDetection: true
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh|en|es)/:path*']
};
