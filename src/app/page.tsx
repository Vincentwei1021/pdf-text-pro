import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PDFExtractor from "@/components/PDFExtractor";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PDFExtractor />
        <FAQ />
        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">About PDFTextPro</h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              PDFTextPro is a free, privacy-first PDF text extraction tool. Upload a file or paste
              a URL — we extract all readable text, metadata, and page info. Your files are processed
              in memory and never stored. Built for researchers, students, and professionals.
            </p>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "PDFTextPro",
            url: "https://pdftextpro.dev",
            description: "Free online PDF text extractor. Upload a PDF or paste a URL to extract text, metadata, and page count instantly.",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            browserRequirements: "Requires a modern web browser",
          }),
        }}
      />
    </>
  );
}
