import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 text-sm text-gray-500 sm:flex-row sm:justify-between sm:px-6">
        <p>&copy; {new Date().getFullYear()} PDFTextPro. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/" className="transition-colors hover:text-emerald-600">Home</Link>
          <Link href="/#extractor" className="transition-colors hover:text-emerald-600">Extractor</Link>
          <Link href="/#faq" className="transition-colors hover:text-emerald-600">FAQ</Link>
          <Link href="/blog" className="transition-colors hover:text-emerald-600">Blog</Link>
        </div>
      </div>
    </footer>
  );
}
