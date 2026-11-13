import { services } from '$lib/content/services';
import { areas } from '$lib/content/areas';
import { caseStudies } from '$lib/content/case-studies';
import { faqs } from '$lib/content/faqs';
import { maps, site } from '$lib/site';

export const primaryNav = [
	{ label: 'Services', href: '/services', menu: 'services' as const },
	{ label: 'Where we work', href: '/areas', menu: 'areas' as const },
	{ label: 'Case studies', href: '/case-studies' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' }
];

export type Command = {
	id: string;
	group: 'Pages' | 'Services' | 'Where we work' | 'Case studies' | 'Questions' | 'Actions';
	label: string;
	hint?: string;
	keywords?: string;
	href?: string;
	external?: boolean;
	action?: 'copy-email' | 'copy-phone';
};

export const commands: Command[] = [
	{ id: 'contact', group: 'Actions', label: 'Send an enquiry', hint: 'Reply within 1 working day', href: '/contact#enquiry', keywords: 'contact email message quote' },
	{ id: 'call', group: 'Actions', label: `Call ${site.phone.display}`, hint: site.hours.label, href: site.phone.href, external: true, keywords: 'phone telephone ring' },
	{ id: 'copy-phone', group: 'Actions', label: 'Copy phone number', action: 'copy-phone', keywords: 'telephone' },
	{ id: 'copy-email', group: 'Actions', label: 'Copy email address', action: 'copy-email', keywords: 'mail' },
	{ id: 'directions', group: 'Actions', label: 'Get directions to our office', hint: 'Google Maps', href: maps.google, external: true, keywords: 'map location address swallowfield' },
	{ id: 'home', group: 'Pages', label: 'Home', href: '/' },
	{ id: 'services', group: 'Pages', label: 'All services', href: '/services' },
	{ id: 'about', group: 'Pages', label: 'About us & our team', href: '/about', keywords: 'directors clifford joanne team people' },
	{ id: 'case-studies', group: 'Pages', label: 'Case studies', href: '/case-studies', keywords: 'examples clients results' },
	{ id: 'privacy', group: 'Pages', label: 'Privacy & cookies', href: '/privacy', keywords: 'gdpr data cookies' },
	...services.map((s) => ({
		id: `s-${s.slug}`,
		group: 'Services' as const,
		label: s.title,
		hint: s.forWhom.slice(0, 2).join(', '),
		href: `/services/${s.slug}`,
		keywords: s.includes.map((i) => i.title).join(' ')
	})),
	...areas.map((a) => ({
		id: `a-${a.slug}`,
		group: 'Where we work' as const,
		label: a.title,
		href: `/areas/${a.slug}`,
		keywords: a.places.join(' ')
	})),
	...caseStudies.map((c) => ({
		id: `c-${c.slug}`,
		group: 'Case studies' as const,
		label: c.title,
		hint: c.location,
		href: `/case-studies/${c.slug}`,
		keywords: c.sector
	})),
	...faqs.map((f) => ({
		id: `f-${f.id}`,
		group: 'Questions' as const,
		label: f.question,
		href: `/#faq-${f.id}`,
		keywords: f.answer
	}))
];

/** Lightweight ranked search: label prefix > label word > label substring > keywords */
export function searchCommands(query: string) {
	const q = query.trim().toLowerCase();
	if (!q) return commands.filter((c) => c.group !== 'Questions');
	const terms = q.split(/\s+/);
	return commands
		.map((c) => {
			const label = c.label.toLowerCase();
			const hay = `${label} ${c.hint ?? ''} ${c.keywords ?? ''} ${c.group}`.toLowerCase();
			if (!terms.every((t) => hay.includes(t))) return null;
			let score = 0;
			if (label.startsWith(q)) score += 100;
			for (const t of terms) {
				if (new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(label)) score += 20;
				else if (label.includes(t)) score += 10;
				else score += 1;
			}
			return { c, score };
		})
		.filter((r): r is { c: Command; score: number } => r !== null)
		.sort((a, b) => b.score - a.score)
		.map((r) => r.c);
}
