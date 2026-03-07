export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-rose-50/30 px-4 pb-10 pt-20 text-center sm:px-6 sm:pb-16 sm:pt-28">
      <div className="pointer-events-none absolute left-[10%] top-20 text-4xl opacity-20 animate-float">📑</div>
      <div className="pointer-events-none absolute right-[15%] top-32 text-3xl opacity-15 animate-float" style={{animationDelay:'1s'}}>✨</div>
      <div className="pointer-events-none absolute left-[70%] top-16 text-2xl opacity-10 animate-float" style={{animationDelay:'2s'}}>📋</div>
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-sm font-medium text-rose-700">
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
          Free &middot; No Sign-up &middot; Upload or URL
        </div>
        <h1 className="font-[family-name:var(--font-heading)] text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          Extract Text From{" "}
          <span className="bg-gradient-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent">Any PDF</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 sm:text-xl leading-relaxed">
          Upload a PDF or paste a URL — get clean, searchable text instantly. Supports multi-page documents up to 10MB.
        </p>
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><span className="text-rose-500">✓</span> Upload or URL</span>
          <span className="flex items-center gap-1.5"><span className="text-rose-500">✓</span> Multi-page</span>
          <span className="flex items-center gap-1.5"><span className="text-rose-500">✓</span> Copy & Download</span>
        </div>
      </div>
    </section>
  );
}
