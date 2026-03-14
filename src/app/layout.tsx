import Script from "next/script";
import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-heading", weight: ["400","500","600","700","800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pdf.toolboxlite.com";

export const metadata: Metadata = {
  title: "Free PDF Text Extractor Online — PDF to Text | PDFPull",
  description: "Extract text from any PDF file instantly. Upload or paste a URL — get clean, searchable text. Free, fast, no sign-up.",
  keywords: ["pdf to text", "pdf extractor", "extract text from pdf", "pdf text converter", "pdf reader online"],
  metadataBase: new URL(siteUrl), alternates: { canonical: "/" },
  openGraph: { title: "Free PDF Text Extractor | PDFPull", description: "Extract text from any PDF instantly. Free.", url: siteUrl, siteName: "PDFPull", type: "website" },
  twitter: { card: "summary_large_image", title: "Free PDF Extractor | PDFPull", description: "PDF to text in one click. Free, no sign-up." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5881105388002876" crossOrigin="anonymous" strategy="afterInteractive" />
      </head>
      <body className={`${manrope.variable} ${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}>{children}</body>
    </html>
  );
}
