import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog | PDFTextPro",
  description: "Guides on PDF text extraction, document processing workflows, and practical use cases for getting content out of PDF files.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    slug: "extract-text-from-pdf",
    title: "How to Extract Text from a PDF Without Losing Formatting",
    excerpt: "Learn the best methods for extracting text from PDF files — covering text-based PDFs, scanned documents, multi-column layouts, and when you need OCR.",
    date: "2026-03-10",
  },
  {
    slug: "pdf-to-text-use-cases",
    title: "PDF to Text: 6 Use Cases That Save You Hours",
    excerpt: "From research and contract review to content repurposing and AI workflows — six practical situations where PDF text extraction makes a real difference.",
    date: "2026-03-08",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Blog</h1>
          <p className="mt-2 text-gray-600">Guides on PDF text extraction, document workflows, and productivity.</p>
          <div className="mt-10 space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <time className="text-xs font-medium text-gray-400">{post.date}</time>
                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  <Link href={`/blog/${post.slug}`} className="hover:text-rose-600">{post.title}</Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-3 inline-block text-sm font-semibold text-rose-600 hover:text-rose-700">Read more →</Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
