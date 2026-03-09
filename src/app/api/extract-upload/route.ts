import { NextRequest, NextResponse } from "next/server";

// Polyfill DOMMatrix for serverless environments (pdfjs-dist dependency)
if (typeof globalThis.DOMMatrix === "undefined") {
  globalThis.DOMMatrix = class DOMMatrix {
    m11 = 1; m12 = 0; m13 = 0; m14 = 0;
    m21 = 0; m22 = 1; m23 = 0; m24 = 0;
    m31 = 0; m32 = 0; m33 = 1; m34 = 0;
    m41 = 0; m42 = 0; m43 = 0; m44 = 1;
    a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
    isIdentity = true;
    is2D = true;
    inverse() { return new DOMMatrix(); }
    multiply() { return new DOMMatrix(); }
    translate() { return new DOMMatrix(); }
    scale() { return new DOMMatrix(); }
    rotate() { return new DOMMatrix(); }
    transformPoint(p: unknown) { return p; }
    toFloat32Array() { return new Float32Array(16); }
    toFloat64Array() { return new Float64Array(16); }
  } as unknown as typeof globalThis.DOMMatrix;
}

export const maxDuration = 30;

const MAX_FILE_SIZE = 4.5 * 1024 * 1024;
const MAX_TEXT_LENGTH = 100 * 1024;

// ── Markdown conversion ────────────────────────────────────────────

const LIST_BULLET_RE = /^[\s]*[•●◦▪▸►-]\s+/;
const LIST_NUMBERED_RE = /^[\s]*\d{1,3}[.)]\s+/;
const ALL_CAPS_RE = /^[A-Z][A-Z\s\d:,.&/()-]{2,}$/;

function isLikelyHeading(line: string, prevEmpty: boolean, nextEmpty: boolean): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  // Short, standalone line surrounded by blanks — likely heading
  if (trimmed.length <= 80 && prevEmpty && nextEmpty && !trimmed.endsWith(".") && !trimmed.endsWith(",")) return true;
  // ALL-CAPS line
  if (ALL_CAPS_RE.test(trimmed) && trimmed.length >= 3 && trimmed.length <= 100) return true;
  return false;
}

function textToMarkdown(raw: string, docTitle?: string | null): string {
  const lines = raw.split("\n");
  const out: string[] = [];

  // Optional document title
  if (docTitle) {
    out.push(`# ${docTitle}`, "");
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const prevEmpty = i === 0 || lines[i - 1].trim() === "";
    const nextEmpty = i === lines.length - 1 || lines[i + 1]?.trim() === "";

    // Empty line → paragraph break
    if (!trimmed) {
      // Avoid consecutive blank lines
      if (out.length > 0 && out[out.length - 1] !== "") {
        out.push("");
      }
      continue;
    }

    // Bullet list items
    if (LIST_BULLET_RE.test(line)) {
      const content = trimmed.replace(LIST_BULLET_RE, "").trim();
      out.push(`- ${content}`);
      continue;
    }

    // Numbered list items
    if (LIST_NUMBERED_RE.test(line)) {
      const content = trimmed.replace(LIST_NUMBERED_RE, "").trim();
      const match = trimmed.match(/^[\s]*(\d{1,3})[.)]/);
      out.push(`${match?.[1] || "1"}. ${content}`);
      continue;
    }

    // Heading detection
    if (isLikelyHeading(trimmed, prevEmpty, nextEmpty)) {
      // Use ## for detected headings (# reserved for doc title)
      const level = docTitle ? "##" : "#";
      out.push("", `${level} ${trimmed}`, "");
      continue;
    }

    // Regular text line
    out.push(trimmed);
  }

  // Clean up: remove trailing blank lines, collapse triple+ blanks
  let md = out.join("\n").replace(/\n{3,}/g, "\n\n").trim();

  // Simple table detection: lines with multiple tab or multi-space separators
  // (basic heuristic — won't catch all tables)
  md = detectTables(md);

  return md;
}

function detectTables(md: string): string {
  const lines = md.split("\n");
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    // Look for consecutive lines with consistent tab/multi-space columns
    const tableLines: string[][] = [];
    let j = i;

    while (j < lines.length) {
      const line = lines[j].trim();
      if (!line) break;
      // Split on 2+ spaces or tabs
      const cells = line.split(/\t|\s{2,}/).map((c) => c.trim()).filter(Boolean);
      if (cells.length >= 2 && cells.length <= 10) {
        tableLines.push(cells);
        j++;
      } else {
        break;
      }
    }

    // Need at least 2 rows with same column count to be a table
    if (tableLines.length >= 2) {
      const colCount = tableLines[0].length;
      const consistent = tableLines.every((r) => r.length === colCount);

      if (consistent && colCount >= 2) {
        // Emit markdown table
        result.push("| " + tableLines[0].join(" | ") + " |");
        result.push("| " + tableLines[0].map(() => "---").join(" | ") + " |");
        for (let k = 1; k < tableLines.length; k++) {
          result.push("| " + tableLines[k].join(" | ") + " |");
        }
        i = j;
        continue;
      }
    }

    result.push(lines[i]);
    i++;
  }

  return result.join("\n");
}

// ── Route handler ──────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max 4.5MB on this plan.` },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require("pdf-parse/lib/pdf-parse.js");
    const data = await pdfParse(buffer);

    let text: string = data.text || "";
    let truncated = false;
    if (text.length > MAX_TEXT_LENGTH) {
      text = text.slice(0, MAX_TEXT_LENGTH) + "\n\n[Truncated at 100KB]";
      truncated = true;
    }

    const title = data.info?.Title || null;
    const markdown = textToMarkdown(text, title);

    return NextResponse.json({
      success: true,
      data: {
        text,
        markdown,
        pages: data.numpages || 0,
        info: {
          title,
          author: data.info?.Author || null,
          subject: data.info?.Subject || null,
          creator: data.info?.Creator || null,
        },
        truncated,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "PDF extraction failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
