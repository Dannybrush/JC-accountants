import { site } from '$lib/site';
import { services } from '$lib/content/services';
import { areas } from '$lib/content/areas';
import { caseStudies } from '$lib/content/case-studies';

export const prerender = true;

export function GET() {
	const paths = [
		'/',
		'/services',
		...services.map((s) => `/services/${s.slug}`),
		'/areas',
		...areas.map((a) => `/areas/${a.slug}`),
		'/case-studies',
		...caseStudies.map((c) => `/case-studies/${c.slug}`),
		'/about',
		'/contact',
		'/privacy'
	];
	const lastmod = new Date().toISOString().slice(0, 10);
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `	<url><loc>${new URL(p, site.url).href.replace(/\/$/, p === '/' ? '/' : '')}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}
</urlset>`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
