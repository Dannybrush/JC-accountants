# J&C Accountants — website

SvelteKit 2 / Svelte 5, deployed to Vercel. Every page is pre-rendered except the enquiry API.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build && npm run preview
npm run images     # regenerate favicons, social share images and blur placeholders
```

Copy `.env.example` to `.env` and fill in the values. See `docs/LAUNCH.md` for everything that must be confirmed before going live.

## Where things live

| What | Where |
| --- | --- |
| Firm details (phone, address, hours, response promise) | `src/lib/site.ts` |
| Services, areas, case studies, FAQs, reviews | `src/lib/content/*.ts` |
| Design tokens | `src/app.css` |
| Image metadata and blur placeholders (generated) | `src/lib/images.json` |
| Social share images (generated) | `static/og/*.png` |
