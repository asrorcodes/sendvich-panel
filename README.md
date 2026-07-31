# Europanel — multilanguage sandwich panel site

Next.js + TypeScript + Tailwind + **next-intl** (uz / ru / en).

## Run

```bash
cd sendvich-panel
npm install
npm run dev
```

- Uzbek: http://localhost:3000/uz  
- Russian: http://localhost:3000/ru  
- English: http://localhost:3000/en  

Root `/` redirects to `/uz`.

## Translations

Edit JSON files in `messages/`:
- `messages/uz.json`
- `messages/ru.json`
- `messages/en.json`

Keep the same key structure in all three files.

## Notes

- Language switcher is in the header (UZ / RU / EN)
- Product URL slugs stay the same across languages (`/en/devor-paneli`)
- Company contacts live in `src/lib/site.ts`
