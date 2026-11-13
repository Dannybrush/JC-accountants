// Generates favicons, social share images, placeholder photos and blur-up metadata.
// Run with `npm run images` after changing the logo, page titles or any photo in assets/photos.
import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { services } from '../src/lib/content/services.ts';
import { areas } from '../src/lib/content/areas.ts';
import { caseStudies } from '../src/lib/content/case-studies.ts';

const BRAND = '#5B1418';
const CREAM = '#F3EBDD';
const root = new URL('../', import.meta.url);
const path = (p) => new URL(p, root).pathname.replace(/^\/([A-Z]:)/, '$1');

for (const dir of ['static/og', 'static/images', 'assets/photos']) mkdirSync(path(dir), { recursive: true });

// --- Favicons and brand marks ---------------------------------------------------------------
const logo = path('assets/logo.webp');
await sharp(logo).resize(48).png().toFile(path('static/favicon.png'));
// Browsers request /favicon.ico regardless of <link>; modern ones accept PNG data in it
await sharp(logo).resize(32).png().toFile(path('static/favicon.ico'));
await sharp(logo).resize(180).png().toFile(path('static/apple-touch-icon.png'));
await sharp(logo).resize(512).png().toFile(path('static/icon-512.png'));
await sharp(logo).resize(640).webp({ quality: 88 }).toFile(path('static/images/logo.webp'));

// --- Placeholder photos (only created when no real photo exists) ------------------------------
const placeholders = {
	'team.jpg': { w: 1800, h: 1100, label: 'Team photograph' },
	'clifford-rumble.jpg': { w: 900, h: 1100, label: 'Clifford Rumble' },
	'joanne-wilson.jpg': { w: 900, h: 1100, label: 'Joanne Wilson' },
	'office.jpg': { w: 1600, h: 1100, label: 'Wyvols Court office' }
};
for (const [file, { w, h, label }] of Object.entries(placeholders)) {
	const target = path(`assets/photos/${file}`);
	if (existsSync(target)) continue;
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
		<defs>
			<radialGradient id="g" cx="30%" cy="25%" r="90%">
				<stop offset="0" stop-color="#E9DDCB"/><stop offset=".55" stop-color="#C9B49B"/><stop offset="1" stop-color="#7A3A33"/>
			</radialGradient>
		</defs>
		<rect width="100%" height="100%" fill="url(#g)"/>
		<text x="50%" y="50%" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(w / 22)}" fill="${CREAM}" opacity=".9">${label}</text>
		<text x="50%" y="${h / 2 + w / 16}" text-anchor="middle" font-family="Arial, sans-serif" letter-spacing="6" font-size="${Math.round(w / 60)}" fill="${CREAM}" opacity=".75">PLACEHOLDER — REPLACE BEFORE LAUNCH</text>
	</svg>`;
	await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(target);
}

// --- Optimised photos + blur placeholders ----------------------------------------------------
const manifest = {};
for (const file of readdirSync(path('assets/photos')).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))) {
	const src = path(`assets/photos/${file}`);
	const name = file.replace(/\.[^.]+$/, '');
	const { width, height } = await sharp(src).metadata();
	const widths = [480, 960, 1600].filter((w) => w < width).concat(width > 1600 ? [] : [width]);
	for (const w of widths) {
		await sharp(src).resize(w).avif({ quality: 55 }).toFile(path(`static/images/${name}-${w}.avif`));
		await sharp(src).resize(w).webp({ quality: 78 }).toFile(path(`static/images/${name}-${w}.webp`));
	}
	const blur = await sharp(src).resize(20).blur(1).webp({ quality: 40 }).toBuffer();
	manifest[name] = { width, height, widths, blur: `data:image/webp;base64,${blur.toString('base64')}` };
}
writeFileSync(path('src/lib/images.json'), JSON.stringify(manifest, null, '\t') + '\n');

// --- Social share images (1200 × 630) --------------------------------------------------------
const pages = [
	{ key: 'home', eyebrow: 'Independent accountants since 2010', title: 'Accounts, tax and advice you can rely on' },
	{ key: 'services', eyebrow: 'Services', title: 'Accounts, tax, bookkeeping, VAT and advice' },
	...services.map((s) => ({ key: `service-${s.slug}`, eyebrow: 'Services', title: s.title })),
	{ key: 'areas', eyebrow: 'Where we work', title: 'Berkshire, Sheffield, Weymouth and across the UK' },
	...areas.map((a) => ({ key: `area-${a.slug}`, eyebrow: 'Where we work', title: a.title })),
	{ key: 'case-studies', eyebrow: 'Case studies', title: 'How we help clients' },
	...caseStudies.map((c) => ({ key: `case-${c.slug}`, eyebrow: 'Case study', title: c.title })),
	{ key: 'about', eyebrow: 'About us', title: 'An independent practice, run by its directors' },
	{ key: 'contact', eyebrow: 'Contact', title: 'Speak to J&C Accountants' }
];

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/’/g, '&#8217;');
function wrap(text, max) {
	const lines = [''];
	for (const word of text.split(' ')) {
		const line = lines[lines.length - 1];
		if ((line + ' ' + word).trim().length > max) lines.push(word);
		else lines[lines.length - 1] = (line + ' ' + word).trim();
	}
	return lines;
}

const mark = await sharp(logo).resize(220).toBuffer();
for (const { key, eyebrow, title } of pages) {
	const lines = wrap(title, 26);
	const size = lines.length > 2 ? 64 : 76;
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
		<rect width="1200" height="630" fill="${BRAND}"/>
		<rect x="0" y="618" width="1200" height="12" fill="${CREAM}" opacity=".9"/>
		<line x1="300" y1="80" x2="300" y2="550" stroke="${CREAM}" stroke-opacity=".25"/>
		<text x="350" y="150" font-family="Arial, sans-serif" font-size="22" letter-spacing="4" fill="${CREAM}" opacity=".75">${escape(eyebrow.toUpperCase())}</text>
		${lines.map((l, i) => `<text x="346" y="${245 + i * size * 1.15}" font-family="Georgia, serif" font-size="${size}" fill="${CREAM}">${escape(l)}</text>`).join('')}
		<text x="350" y="540" font-family="Arial, sans-serif" font-size="24" fill="${CREAM}" opacity=".8">jandc-accountants.co.uk  ·  0118 923 5812</text>
	</svg>`;
	await sharp(Buffer.from(svg))
		.composite([{ input: mark, left: 50, top: 205 }])
		.png({ compressionLevel: 9, palette: true })
		.toFile(path(`static/og/${key}.png`));
}

console.log(`Generated ${pages.length} share images and ${Object.keys(manifest).length} photos.`);
