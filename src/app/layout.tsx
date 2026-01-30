import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://webpwizard.com"),
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
