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
  title: "WebpWizard - Converting images to WebP",
  description:
    "Webp Wizard is a tool for converting images to WebP, PNG, or JPG directly in your browser. All conversions happen locally, ensuring privacy, with no files uploaded to servers.",
  keywords: [
    "image converter",
    "WebP conversion",
    "PNG to WebP",
    "JPG to WebP",
    "convert images online",
    "image conversion tool",
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
    title: "WebpWizard - Convert Images Easily",
    description:
      "Convert images to WebP, PNG, or JPG directly in your browser with WebpWizard. All processes happen locally for maximum privacy.",
    url: "https://webpwizard.com",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WebpWizard - Convert Images Easily",
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
        <meta
          name="google-site-verification"
          content="vu3rh1BIO7dCcKijtQ5kTECJplwSejyqToQsW8Ve0Ik"
        />
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
          <Toaster />
        </JotaiProvider>
      </body>
    </html>
  );
}
