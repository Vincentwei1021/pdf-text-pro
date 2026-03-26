import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "How to Extract Text from a PDF Without Losing Formatting | PDFPull",
  description: "Learn the best methods for extracting text from PDF files — including scanned PDFs, multi-column layouts, and tables — and when to use each approach.",
  keywords: ["extract text from pdf", "pdf text extractor", "pdf to text", "copy text from pdf", "pdf text extraction"],
  alternates: { canonical: "/blog/extract-text-from-pdf" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Extract Text from a PDF Without Losing Formatting",
  description: "Learn the best methods for extracting text from PDF files — including scanned PDFs, multi-column layouts, and tables.",
  datePublished: "2026-03-10",
  dateModified: "2026-03-10",
  author: { "@type": "Organization", name: "PDFPull" },
  publisher: { "@type": "Organization", name: "PDFPull" },
};

export default function ExtractTextFromPdf() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Header />
      <main className="px-4 py-12 sm:px-6 sm:py-16">
        <article className="mx-auto max-w-3xl">
          <Link href="/blog" className="text-sm text-rose-600 hover:underline">← Back to Blog</Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How to Extract Text from a PDF Without Losing Formatting
          </h1>
          <time className="text-sm text-gray-400">March 10, 2026</time>

          <div className="mt-8 space-y-6 text-gray-700 leading-relaxed">
            <p>
              PDFs are designed for visual presentation, not for extracting content. When you need the text inside — to search it, edit it, feed it into another tool, or simply copy a paragraph — extracting it cleanly is often harder than it looks. This guide covers the main approaches and when to use each.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">Understanding PDF Types</h2>
            <p>
              Before choosing an extraction method, it helps to understand what kind of PDF you have:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Text-based PDF:</strong> Created from Word, InDesign, or a digital source. Text is stored as actual characters — easy to extract accurately.</li>
              <li><strong>Scanned PDF (image-only):</strong> A photograph of a printed document. Contains no text data at all — requires OCR (Optical Character Recognition) to extract text.</li>
              <li><strong>Scanned PDF with OCR layer:</strong> A scanned document where OCR has already been applied, adding an invisible text layer. Quality varies by the OCR process used.</li>
            </ul>
            <p>
              For text-based PDFs, <Link href="/" className="text-rose-600 hover:underline">PDFPull</Link> extracts text instantly and accurately. For image-only scans, you&apos;ll need a tool with OCR capability.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">Simple Copy-Paste vs. Proper Extraction</h2>
            <p>
              For short passages, copying text directly from a PDF reader often works. The problem is that PDFs store text in rendering order (optimized for display), not reading order. In multi-column layouts, copying a paragraph frequently produces garbled text that jumps between columns mid-sentence.
            </p>
            <p>
              Proper PDF text extraction tools (like <Link href="/" className="text-rose-600 hover:underline">PDFPull</Link>) use the underlying PDF structure to reconstruct reading order correctly, handling columns, footnotes, and captions more reliably than a naive copy-paste.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">Challenges with Complex Layouts</h2>
            <p>
              <strong>Multi-column layouts:</strong> Academic papers, newspapers, and magazines often use two or three columns. Text must be extracted column by column, in reading order, not left-to-right across the full page width.
            </p>
            <p>
              <strong>Tables:</strong> Tables in PDFs are visually structured but often stored as text in an order that doesn&apos;t map to rows and columns. Extracting a table as usable data typically requires a dedicated table extraction tool rather than general text extraction.
            </p>
            <p>
              <strong>Headers, footers, and page numbers:</strong> These appear on every page and will be embedded throughout your extracted text unless the tool filters them out. Look for tools that can handle this intelligently.
            </p>
            <p>
              <strong>Mathematical formulas:</strong> Most text extraction tools either skip or garble equations. For heavy math content, specialized tools (or manual copying) are more reliable.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">Step-by-Step: Extracting Text with PDFPull</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Visit <Link href="/" className="text-rose-600 hover:underline">PDFPull</Link> — no account required</li>
              <li>Upload your PDF file (processed locally in your browser — your document is never uploaded to a server)</li>
              <li>The extracted text appears in the output panel, ready to copy</li>
              <li>Copy all or select specific sections to paste into your target application</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900">When to Use OCR Instead</h2>
            <p>
              If your PDF is a scan (no selectable text at all), you need OCR. Free OCR options include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Drive:</strong> Upload a scanned PDF to Google Drive, right-click, and open with Google Docs. Google will OCR the document automatically.</li>
              <li><strong>Adobe Acrobat (paid):</strong> Industry standard for OCR quality, especially on complex layouts.</li>
              <li><strong>Tesseract (open source):</strong> Free, command-line OCR engine. Excellent for developers building text extraction pipelines.</li>
            </ul>

            <div className="rounded-lg border border-rose-200 bg-rose-50 p-5">
              <p className="font-semibold text-rose-800">Extract text from your PDF now</p>
              <p className="mt-1 text-rose-700">
                <Link href="/" className="underline">PDFPull</Link> — paste or upload a PDF and extract all text instantly. Free, private, no sign-up.
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
