"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What does PDFTextPro do?",
    a: "PDFTextPro extracts all readable text from PDF files. Upload a PDF or paste a URL and get the full text content instantly — ready to copy, search, or download as a TXT file.",
  },
  {
    q: "Is PDFTextPro free?",
    a: "Yes, completely free with no sign-up or account required. Just upload your PDF and get the text.",
  },
  {
    q: "What is the maximum file size?",
    a: "You can upload PDFs up to 10MB. If the extracted text exceeds 100KB, it will be truncated with a notice.",
  },
  {
    q: "Can I extract text from scanned PDFs?",
    a: "PDFTextPro works best with text-based PDFs (where you can select text). Scanned PDFs (images of text) require OCR, which is not currently supported. If your PDF is a scan, the extraction may return little or no text.",
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
    a: "PDFTextPro extracts text as-is from the PDF, so it works with any language that is embedded as text in the document — English, Chinese, Arabic, and everything in between.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-medium text-gray-900 sm:text-base">{faq.q}</span>
                <svg className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${openIndex === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="border-t border-gray-100 px-5 pb-4 pt-3">
                  <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
