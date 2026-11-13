# Launch checklist

Everything below is a placeholder or an assumption that must be confirmed before the site goes live.

## Must do before launch

- [ ] **Reviews** — replace the three placeholder slots in `src/lib/content/reviews.ts` with genuine reviews (client permission required; never edit wording). Remove `placeholder: true`. Consider wiring `src/routes/api/reviews/+server.ts` to the Google Places API so reviews stay current.
- [ ] **Photos** — drop real photos into `assets/photos/` with the same file names (`team.jpg`, `clifford-rumble.jpg`, `joanne-wilson.jpg`, `office.jpg`), then run `npm run images`. Portraits work best at 4:5 ratio, team photo at roughly 16:10.
- [ ] **Director bios** — `src/routes/about/+page.svelte` contains draft bios for Clifford and Joanne. Have each director approve or rewrite theirs.
- [ ] **Email** — set up `hello@jandc-accountants.co.uk` (or change `email` in `src/lib/site.ts`).
- [ ] **Resend** — create an account, verify the `jandc-accountants.co.uk` domain (SPF/DKIM DNS records), and set `RESEND_API_KEY`, `ENQUIRY_TO` and `ENQUIRY_FROM` in Vercel → Project → Environment Variables.
- [ ] **Google Analytics** — create a GA4 property, set data retention to 14 months (as stated in the privacy policy), and set `PUBLIC_GA_ID` in Vercel. The consent banner only appears once this is set.
- [ ] **ICO registration** — add the firm's ICO registration number to the privacy policy (`src/routes/privacy/+page.svelte`, marked TODO).
- [ ] **Office coordinates** — confirm `geo` in `src/lib/site.ts` matches Wyvols Court exactly (used in LocalBusiness schema).
- [ ] **Case studies** — they are labelled "illustrative". Check each one reflects work the firm genuinely does, or replace with real (consented) client stories.
- [ ] **AML supervision** — accountancy firms must be supervised for anti-money laundering. Consider adding the supervisory body (e.g. HMRC or a professional body) to the footer.
- [ ] **Professional indemnity / body membership** — no accreditation is claimed anywhere on the site. If the firm or a director is a member of a professional body, add it to the About page and footer.

## Deploy

1. Push the repository to GitHub and import it in Vercel (framework preset: SvelteKit).
2. Add the environment variables above.
3. Add the domain `jandc-accountants.co.uk` (and `www.` redirecting to it).
4. After launch: submit `https://jandc-accountants.co.uk/sitemap.xml` in Google Search Console, and create or claim the Google Business Profile with the same name, address and phone (NAP) as the site.

## Content facts used (verify periodically)

- Company details from Companies House, company 07217279, incorporated 8 April 2010.
- MTD for Income Tax thresholds: £50k from April 2026, £30k from April 2027, £20k from April 2028.
- Quarterly MTD update deadlines: 7 Aug, 7 Nov, 7 Feb, 7 May.
