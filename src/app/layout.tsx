import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pdftextpro.dev";

export const metadata: Metadata = {
  title: "Free PDF Text Extractor Online | Extract Text from PDF",
  description:
    "Extract text from any PDF online — free PDF text extractor. Upload a file or paste a URL, get copyable text & metadata instantly. No sign-up required.",
  keywords: [
    "pdf text extractor",
    "extract text from pdf online",
    "pdf to text online",
    "pdf to text converter",
    "copy text from pdf",
    "free pdf text extractor",
    "pdf reader online",
    "pdf content extractor",
    "extract text from pdf free",
    "pdf to plain text",
    "online pdf text extractor",
  ],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Free PDF Text Extractor Online | Extract Text from PDF",
    description:
      "Extract text from any PDF instantly — upload a file or paste a URL. Free, no sign-up.",
    url: siteUrl,
    siteName: "PDFTextPro",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "PDFTextPro — Free PDF Text Extractor Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Text Extractor Online | Extract Text from PDF",
    description:
      "Extract text from any PDF instantly — upload a file or paste a URL. Free, no sign-up.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: { index: true, follow: true },
  other: {
    "theme-color": "#059669",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>{children}</body>
    </html>
  );
}
