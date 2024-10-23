import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script"; // Importamos Script de Next.js
import "./globals.css";
import JotaiProvider from "@/context/JotaiProvider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Convert Images to WebP, PNG, or JPG – Fast & Free with WebpWizard",
  description:
    "Instantly convert images to WebP, PNG, or JPG using WebpWizard. No uploads required – all processes happen locally for maximum privacy and speed.",
  keywords: [
    "image converter online",
    "WebP converter tool",
    "PNG to WebP converter",
    "JPG to WebP online",
    "convert images to WebP",
    "free image conversion tool",
    "batch image converter",
    "optimize images for WebP",
    "convert JPG to PNG",
    "compress images online",
    "image format converter",
    "fast WebP conversion",
    "convert photos to WebP",
    "secure image converter"
  ],
  authors: [
    { name: "J. Francisco Robles", url: "https://github.com/JFranciscoRobles" },
  ],
  applicationName: "WebpWizard",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
  themeColor: "#ffffff",
  colorScheme: "light",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Convert Images to WebP, PNG, or JPG – Fast & Free with WebpWizard",
    description:
      "Instantly convert images to WebP, PNG, or JPG using WebpWizard. No uploads required – all processes happen locally for maximum privacy and speed.",
    url: "https://webpwizard.com",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Convert Images to WebP, PNG, or JPG – Fast & Free with WebpWizard.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JotaiProvider>
          {children}
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8656504095828628"
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
          <Toaster />
        </JotaiProvider>
      </body>
    </html>
  );
}
