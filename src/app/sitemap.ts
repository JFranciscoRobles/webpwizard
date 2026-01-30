import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://webpwizard.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls = [''];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate entries for each locale
  locales.forEach((locale) => {
    staticUrls.forEach((path) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}${path}`])
          ),
        },
      });
    });
  });

  return sitemap;
}
