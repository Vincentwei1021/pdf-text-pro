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

// Allow up to 4.5MB body (Vercel hobby limit)
export const maxDuration = 30;

const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5MB (Vercel limit)
const MAX_TEXT_LENGTH = 100 * 1024;

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
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // pdf-parse v1.x exports a simple function
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require("pdf-parse");
    const data = await pdfParse(buffer);

    let text: string = data.text || "";
    let truncated = false;
    if (text.length > MAX_TEXT_LENGTH) {
      text = text.slice(0, MAX_TEXT_LENGTH) + "\n\n[Truncated at 100KB]";
      truncated = true;
    }

    return NextResponse.json({
      success: true,
      data: {
        text,
        pages: data.numpages || 0,
        info: {
          title: data.info?.Title || null,
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
