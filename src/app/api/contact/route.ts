import { NextResponse } from "next/server";
import { parseInternationalPhone } from "@/lib/phone-countries";
import { formatContactMessage, sendTelegramMessage } from "@/lib/telegram";

const MAX_NAME = 120;
const MAX_PHONE = 40;
const MAX_MESSAGE = 2000;

function trim(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (typeof body.website === "string" && body.website.trim()) {
      return NextResponse.json({ ok: true });
    }

    const name = trim(body.name, MAX_NAME);
    const phone = trim(body.phone, MAX_PHONE);
    const message = trim(body.message, MAX_MESSAGE);
    const locale = trim(body.locale, 8) || "uz";
    const pageUrl = trim(body.pageUrl, 500);

    if (!name || !phone || !message) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    const parsedPhone = parseInternationalPhone(phone);
    if (!parsedPhone) {
      return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
    }

    const text = formatContactMessage({
      name,
      phone: parsedPhone.e164,
      message,
      locale,
      pageUrl,
    });
    await sendTelegramMessage(text);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}
