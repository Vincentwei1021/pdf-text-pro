"use client";

import { useState, useRef } from "react";

interface ExtractResult {
  text: string;
  pages: number;
  info: {
    title: string | null;
    author: string | null;
    subject: string | null;
    creator: string | null;
  };
  truncated: boolean;
  fileSize?: number;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PDFExtractor() {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState<ExtractResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const extractFromUrl = async () => {
    const trimmed = url.trim();
    if (!trimmed) { setError("Please enter a PDF URL"); return; }
    try { new URL(trimmed); } catch { setError("Please enter a valid URL"); return; }

    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/extract-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json();
      if (data.success) setResult(data.data);
      else setError(data.error || "Extraction failed");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const extractFromFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large (max 10MB)");
      return;
    }

    setFileName(file.name);
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/extract-upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) setResult({ ...data.data, fileSize: file.size });
      else setError(data.error || "Extraction failed");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) extractFromFile(file);
  };

  const copyText = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    if (!result) return;
    const blob = new Blob([result.text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (fileName || "extracted").replace(/\.pdf$/i, "") + ".txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const wordCount = result ? result.text.split(/\s+/).filter(Boolean).length : 0;

  return (
    <section id="extractor" className="px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="sr-only">PDF Text Extraction Tool</h2>
      <div className="mx-auto max-w-3xl">
        {/* Mode toggle */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-300 p-0.5">
            <button onClick={() => setMode("upload")} className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${mode === "upload" ? "bg-emerald-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"}`}>
              Upload PDF
            </button>
            <button onClick={() => setMode("url")} className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${mode === "url" ? "bg-emerald-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"}`}>
              Paste URL
            </button>
          </div>
        </div>

        {mode === "upload" ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors ${dragOver ? "border-emerald-500 bg-emerald-50" : "border-gray-300 bg-gray-50 hover:border-emerald-400"}`}
          >
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-3 3m3-3l3 3M6.75 19.25h10.5A2.25 2.25 0 0019.5 17V7a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 7v10a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <p className="mt-3 text-sm font-medium text-gray-700">
              Drop your PDF here or <span className="text-emerald-600">click to browse</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">Max 10MB</p>
            <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) extractFromFile(f); }} />
          </div>
        ) : (
          <div className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && extractFromUrl()}
              placeholder="https://example.com/document.pdf"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              onClick={extractFromUrl}
              disabled={loading}
              className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 disabled:opacity-50"
            >
              Extract
            </button>
          </div>
        )}

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        {loading && (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-8">
            <svg className="h-10 w-10 animate-spin text-emerald-500" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            <p className="text-sm text-gray-500">Extracting text from PDF…</p>
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Stats bar */}
            <div className="flex flex-wrap gap-4 text-sm">
              {result.info.title && (
                <div><span className="text-gray-500">Title:</span> <span className="font-medium text-gray-900">{result.info.title}</span></div>
              )}
              {result.info.author && (
                <div><span className="text-gray-500">Author:</span> <span className="font-medium text-gray-900">{result.info.author}</span></div>
              )}
              <div><span className="text-gray-500">Pages:</span> <span className="font-semibold text-emerald-600">{result.pages}</span></div>
              <div><span className="text-gray-500">Words:</span> <span className="font-semibold text-emerald-600">{wordCount.toLocaleString()}</span></div>
              {result.fileSize && (
                <div><span className="text-gray-500">Size:</span> <span className="font-medium text-gray-900">{formatBytes(result.fileSize)}</span></div>
              )}
              {result.truncated && (
                <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">Truncated (100KB limit)</span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button onClick={copyText} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                {copied ? (
                  <><svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> Copied!</>
                ) : (
                  <><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg> Copy Text</>
                )}
              </button>
              <button onClick={downloadTxt} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download TXT
              </button>
            </div>

            {/* Text output */}
            <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">{result.text}</pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
