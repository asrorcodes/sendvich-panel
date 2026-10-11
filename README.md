# Europanel — multilanguage sandwich panel site

Next.js + TypeScript + Tailwind + **next-intl** (uz / ru / en), deployed to Cloudflare Workers via OpenNext.

## Run

```bash
cd europanel
npm install
npm run dev
```

- Uzbek: http://localhost:3000/uz  
- Russian: http://localhost:3000/ru  
- English: http://localhost:3000/en  

Root `/` redirects to `/uz`.

## Contact form (Telegram)

Copy `.env.example` to `.env.local` and set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
For Cloudflare, set the same values as Worker secrets (`wrangler secret put ...`).

## Deploy

```bash
npm run deploy
```

Keep `src/middleware.ts` (do not rename to `proxy.ts`): OpenNext for Cloudflare does not support the Node.js `proxy` runtime.

## Translations

Edit JSON files in `messages/`:
- `messages/uz.json`
- `messages/ru.json`
- `messages/en.json`

Keep the same key structure in all three files.

## Notes

- Language switcher is in the header (UZ / RU / EN)
- Product URL slugs stay the same across languages (`/en/devor-paneli`)
- Company contacts (phone, email, WhatsApp) live in `src/lib/site.ts`
