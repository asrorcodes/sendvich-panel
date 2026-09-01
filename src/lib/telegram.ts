function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export type ContactPayload = {
  name: string;
  phone: string;
  message: string;
  locale: string;
  pageUrl?: string;
};

export function formatContactMessage(payload: ContactPayload) {
  const lines = [
    "<b>🆕 Yangi murojaat — Europanel</b>",
    "",
    `<b>Ism:</b> ${escapeHtml(payload.name)}`,
    `<b>Telefon:</b> ${escapeHtml(payload.phone)}`,
    `<b>Xabar:</b> ${escapeHtml(payload.message)}`,
    "",
    `<b>Til:</b> ${escapeHtml(payload.locale.toUpperCase())}`,
  ];

  if (payload.pageUrl) {
    lines.push(`<b>Sahifa:</b> ${escapeHtml(payload.pageUrl)}`);
  }

  return lines.join("\n");
}

export async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram is not configured");
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram API error: ${response.status} ${body}`);
  }
}
