import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import localFont from "next/font/local";
import Script from "next/script";
import JotaiProvider from "@/context/JotaiProvider";
import { Toaster } from "@/components/ui/toaster";
import { StructuredData } from "@/components/seo/structured-data";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import "../globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://webpwizard.com';
  const canonicalUrl = `${baseUrl}/${locale}`;
  const ogImageUrl = `${baseUrl}/og-image.png`;

  // Build hreflang links for all locales
  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${baseUrl}/${loc}`;
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'JFranciscoRobles' }],
    creator: 'JFranciscoRobles',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: canonicalUrl,
      title: t('title'),
      description: t('description'),
      siteName: 'WebpWizard',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [ogImageUrl],
      creator: '@jfranciscorobles',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'meta' });

  // Generate hreflang links
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://webpwizard.com';
  const hreflangLinks = locales.map((loc) => ({
    rel: 'alternate',
    hrefLang: loc === defaultLocale ? 'x-default' : loc,
    href: `${baseUrl}/${loc}`,
  }));

  // Configure locale-specific font settings for better CJK text rendering
  const fontClassName = locale === 'zh'
    ? `${geistSans.variable} ${geistMono.variable} antialiased`
    : `${geistSans.variable} ${geistMono.variable} antialiased`;

  return (
    <html lang={locale} suppressHydrationWarning className={locale === 'zh' ? 'font-zh' : ''}>
      <head>
        {hreflangLinks.map((link) => (
          <link
            key={link.hrefLang}
            rel={link.rel}
            hrefLang={link.hrefLang}
            href={link.href}
          />
        ))}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <StructuredData locale={locale} title={t('title')} description={t('description')} />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-PYBW8TQPP0`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PYBW8TQPP0', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <div className={fontClassName}>
            <JotaiProvider>
              {children}
              <Toaster />
            </JotaiProvider>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
