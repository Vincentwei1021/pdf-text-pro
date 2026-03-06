import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pdftextpro.dev";

export const metadata: Metadata = {
  title: "Free PDF Text Extractor Online | PDFTextPro",
  description:
    "Extract text from any PDF file instantly. Upload a PDF or paste a URL — get copyable plain text, page count, and metadata. Free, no sign-up.",
  keywords: [
    "pdf text extractor",
    "extract text from pdf",
    "pdf to text online",
    "pdf to text converter",
    "copy text from pdf",
    "free pdf text extractor",
    "pdf reader online",
    "pdf content extractor",
  ],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Free PDF Text Extractor Online | PDFTextPro",
    description: "Extract text from any PDF instantly — upload or paste URL. Free, no sign-up.",
    url: siteUrl,
    siteName: "PDFTextPro",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Text Extractor | PDFTextPro",
    description: "Extract text from any PDF instantly — upload or paste URL. Free, no sign-up.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>{children}</body>
    </html>
  );
}
