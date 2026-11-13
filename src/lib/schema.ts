import { site } from '$lib/site';
import { areas } from '$lib/content/areas';
import { services } from '$lib/content/services';
import type { Faq } from '$lib/content/faqs';

export type Crumb = { label: string; href: string };

const abs = (path: string) => new URL(path, site.url).href;
const businessId = `${site.url}/#business`;

export function localBusiness() {
	return {
		'@context': 'https://schema.org',
		'@type': ['AccountingService', 'LocalBusiness'],
		'@id': businessId,
		name: site.name,
		legalName: site.legalName,
		url: site.url,
		logo: abs('/icon-512.png'),
		image: abs('/og/home.png'),
		telephone: site.phone.e164,
		email: site.email,
		foundingDate: String(site.founded),
		identifier: { '@type': 'PropertyValue', propertyID: 'Companies House', value: site.companyNumber },
		address: {
			'@type': 'PostalAddress',
			streetAddress: site.address.lines.join(', '),
			addressLocality: site.address.locality,
			addressRegion: site.address.region,
			postalCode: site.address.postcode,
			addressCountry: site.address.country
		},
		geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				opens: site.hours.open,
				closes: site.hours.close
			}
		],
		areaServed: [
			{ '@type': 'Country', name: 'United Kingdom' },
			...areas.map((a) => ({ '@type': 'AdministrativeArea', name: a.name }))
		],
		founder: site.directors.map((d) => ({ '@type': 'Person', name: d.name, jobTitle: d.role })),
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Accountancy services',
			itemListElement: services.map((s) => ({
				'@type': 'Offer',
				itemOffered: { '@type': 'Service', name: s.title, url: abs(`/services/${s.slug}`) }
			}))
		}
	};
}

export function breadcrumbs(crumbs: Crumb[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: c.label,
			item: abs(c.href)
		}))
	};
}

export function faqPage(faqs: Faq[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((f) => ({
			'@type': 'Question',
			name: f.question,
			acceptedAnswer: { '@type': 'Answer', text: f.answer }
		}))
	};
}

export function serviceSchema(name: string, description: string, path: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name,
		description,
		url: abs(path),
		serviceType: name,
		provider: { '@id': businessId },
		areaServed: { '@type': 'Country', name: 'United Kingdom' }
	};
}

export function articleSchema(headline: string, description: string, path: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline,
		description,
		url: abs(path),
		image: abs(`/og/case-${path.split('/').pop()}.png`),
		publisher: { '@id': businessId },
		author: { '@id': businessId }
	};
}
