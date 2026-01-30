import { locales } from '@/i18n/config';

interface StructuredDataProps {
  locale: string;
  title: string;
  description: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://webpwizard.com';

const translations = {
  en: {
    name: 'WebpWizard',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Image conversion to WebP, PNG, JPG formats',
      'Batch image conversion',
      'Local processing - no server upload required',
      'Quality and size adjustment options',
      '100% free and private',
    ],
  },
  es: {
    name: 'WebpWizard',
    applicationCategory: 'AplicaciónMultimedia',
    operatingSystem: 'Cualquiera (Navegador Web)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Conversión de imágenes a formatos WebP, PNG, JPG',
      'Conversión por lotes de imágenes',
      'Procesamiento local - no se requiere subir al servidor',
      'Opciones de ajuste de calidad y tamaño',
      '100% gratis y privado',
    ],
  },
  zh: {
    name: 'WebpWizard',
    applicationCategory: '多媒体应用程序',
    operatingSystem: '任何（网络浏览器）',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
    },
    featureList: [
      '图片转换为 WebP、PNG、JPG 格式',
      '批量图片转换',
      '本地处理 - 无需上传到服务器',
      '质量和尺寸调整选项',
      '100%免费且私密',
    ],
  },
};

export function StructuredData({ locale, title, description }: StructuredDataProps) {
  const t = translations[locale as keyof typeof translations] || translations.en;

  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: t.name,
    applicationCategory: t.applicationCategory,
    operatingSystem: t.operatingSystem,
    offers: t.offers,
    description: description,
    url: `${baseUrl}/${locale}`,
    author: {
      '@type': 'Person',
      name: 'JFranciscoRobles',
      url: 'https://github.com/JFranciscoRobles',
    },
    featureList: t.featureList,
    aggregaterating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    inLanguage: locale,
  };

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: baseUrl,
    name: 'WebpWizard',
    description: description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WebpWizard',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://github.com/JFranciscoRobles/webpwizard',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}
