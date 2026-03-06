import { NextRequest, NextResponse } from "next/server";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_TEXT_LENGTH = 100 * 1024;

type PdfParseResult = { text: string; numpages: number; info: Record<string, string> };
type PdfParseFn = (buf: Buffer) => Promise<PdfParseResult>;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: "File too large (max 10MB)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const mod = await import("pdf-parse");
    const pdfParse: PdfParseFn = (mod as unknown as { default: PdfParseFn }).default ?? (mod as unknown as PdfParseFn);
    const data = await pdfParse(buffer);

    let text = data.text || "";
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
