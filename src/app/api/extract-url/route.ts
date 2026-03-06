import { NextRequest, NextResponse } from "next/server";

const TOOLBOX_URL = process.env.TOOLBOX_API_URL || "http://localhost:3100";
const TOOLBOX_KEY = process.env.TOOLBOX_API_KEY || "test-key-123";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ success: false, error: "url is required" }, { status: 400 });
    }

    try { new URL(url); } catch {
      return NextResponse.json({ success: false, error: "Invalid URL" }, { status: 400 });
    }

    const res = await fetch(`${TOOLBOX_URL}/v1/pdf-extract`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOOLBOX_KEY}`,
      },
      body: JSON.stringify({ url }),
      signal: AbortSignal.timeout(30000),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ success: false, error: data.error?.message || "Extraction failed" }, { status: 502 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ success: false, error: "PDF extraction failed" }, { status: 500 });
  }
}
