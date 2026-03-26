import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PDFExtractor from "@/components/PDFExtractor";
import HowTo from "@/components/HowTo";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

/* ── FAQ data (shared between component + JSON-LD) ── */
const faqItems = [
  {
    q: "What does this PDF text extractor do?",
    a: "PDFPull extracts all readable text from PDF files. Upload a PDF or paste a URL and get the full text content instantly \u2014 ready to copy, search, or download as a TXT file.",
  },
  {
    q: "Is PDFPull free?",
    a: "Yes, completely free with no sign-up or account required. Extract text from as many PDFs as you need \u2014 no limits, no watermarks.",
  },
  {
    q: "What is the maximum file size?",
    a: "You can upload PDFs up to 10MB. If the extracted text exceeds 100KB, it will be truncated with a notice.",
  },
  {
    q: "Can I extract text from scanned PDFs?",
    a: "PDFPull works best with text-based PDFs (where you can select text). Scanned PDFs (images of text) require OCR, which is not currently supported. If your PDF is a scan, the extraction may return little or no text.",
  },
  {
    q: "What information do I get from extraction?",
    a: "You get the full extracted text, page count, word count, file size, and metadata (title, author, subject, creator) when available in the PDF.",
  },
  {
    q: "Can I extract text from a PDF URL?",
    a: "Yes! Switch to the URL mode and paste a direct link to a PDF file. The file will be downloaded and processed server-side. The URL must point directly to a .pdf file.",
  },
  {
    q: "Is my PDF data stored?",
    a: "No. Uploaded PDFs are processed in memory and immediately discarded. We never store your files or the extracted text on our servers.",
  },
  {
    q: "What languages are supported?",
    a: "PDFPull extracts text as-is from the PDF, so it works with any language that is embedded as text in the document \u2014 English, Chinese, Arabic, and everything in between.",
  },
];

/* ── JSON-LD: WebApplication ── */
const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PDFPull",
  url: "https://pdf.toolboxlite.com",
  description:
    "Free online PDF text extractor. Upload a PDF or paste a URL to extract text, metadata, and page count instantly.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  browserRequirements: "Requires a modern web browser",
};

/* ── JSON-LD: FAQPage ── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

/* ── JSON-LD: HowTo ── */
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Extract Text from a PDF Online for Free",
  description:
    "Follow these simple steps to extract text from any PDF using PDFPull \u2014 a free online PDF text extractor.",
  step: [
    {
      "@type": "HowToStep",
      name: "Upload your PDF or paste a URL",
      text: "Drag and drop a PDF file into the upload area, or switch to URL mode and paste a direct link to a PDF hosted online.",
    },
    {
      "@type": "HowToStep",
      name: "Wait for extraction",
      text: "PDFPull parses the PDF, extracts all readable text, and collects metadata including page count, author, and title \u2014 typically in just a few seconds.",
    },
    {
      "@type": "HowToStep",
      name: "Copy or download the text",
      text: "Review the extracted text in the preview panel. Copy it to your clipboard with one click or download it as a plain TXT file.",
    },
  ],
  tool: { "@type": "HowToTool", name: "PDFPull \u2014 Free PDF Text Extractor" },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PDFExtractor />
        <HowTo />

        {/* Features section */}
        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-900">
              Why Use Our PDF Text Extractor?
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: "\uD83D\uDCC4",
                  title: "Upload or Paste URL",
                  desc: "Drag-and-drop a PDF file from your device or paste a direct URL to a PDF hosted online. Two ways to extract text from any PDF instantly.",
                },
                {
                  icon: "\uD83D\uDCCB",
                  title: "Copy & Download",
                  desc: "One-click copy to clipboard or download the extracted text as a plain TXT file. Ready for pasting into docs, spreadsheets, or notes.",
                },
                {
                  icon: "\uD83D\uDCC8",
                  title: "Rich Metadata",
                  desc: "Get more than just text \u2014 see page count, word count, file size, title, author, and other PDF metadata at a glance.",
                },
                {
                  icon: "\uD83D\uDD12",
                  title: "Private & Free",
                  desc: "No sign-up, no data stored, no tracking. Your PDFs are processed in memory and immediately discarded \u2014 100% private.",
                },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                  <div className="mb-3 text-3xl">{f.icon}</div>
                  <h3 className="mb-2 text-base font-semibold text-gray-900">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQ items={faqItems} />

        {/* About — keyword-rich */}
        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              About PDFPull
            </h2>
            <div className="mt-4 space-y-4 text-gray-600 leading-relaxed text-left sm:text-center">
              <p>
                <strong>PDFPull</strong> is a <strong>free PDF text extractor</strong> that
                lets you <strong>extract text from any PDF online</strong> in seconds. Upload a
                file from your device or paste a direct URL \u2014 our tool parses the document
                and returns all readable text, page count, word count, and metadata instantly.
              </p>
              <p>
                Whether you need to <strong>copy text from a PDF</strong> for research, convert a
                document to <strong>plain text</strong> for analysis, or simply check the metadata
                of a report \u2014 PDFPull handles it all without installing any software. It
                works directly in your browser on any device.
              </p>
              <p>
                Your privacy comes first. Every PDF is processed in memory on our server and
                immediately discarded \u2014 we never store files, text, or metadata. No sign-up,
                no tracking, no fees. Just the fastest way to{" "}
                <strong>extract text from PDF files</strong> online for free.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}
