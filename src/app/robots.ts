import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://webpwizard.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/static/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
