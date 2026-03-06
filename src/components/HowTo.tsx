export default function HowTo() {
  const steps = [
    {
      num: "1",
      title: "Upload PDF or Paste URL",
      desc: "Drag and drop a PDF file into the upload area, or switch to URL mode and paste a direct link to any PDF hosted online.",
    },
    {
      num: "2",
      title: "Wait for Extraction",
      desc: "Our PDF text extractor parses the document, extracts all readable text, and collects metadata including page count, author, and title — in just a few seconds.",
    },
    {
      num: "3",
      title: "Copy or Download Text",
      desc: "Review the extracted text in the preview panel. Copy to clipboard with one click or download as a plain TXT file — ready for research, analysis, or sharing.",
    },
  ];

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-gray-900">
          How to Extract Text from a PDF Online — Free &amp; Instant
        </h2>
        <p className="mb-10 text-center text-gray-500">
          Get plain text from any PDF in three simple steps with our free extractor.
        </p>
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                {s.num}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{s.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
