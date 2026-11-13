import { error } from '@sveltejs/kit';
import { serviceBySlug, services } from '$lib/content/services';
import { caseStudyBySlug } from '$lib/content/case-studies';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => services.map((s) => ({ slug: s.slug }));

export const load: PageLoad = ({ params }) => {
	const service = serviceBySlug(params.slug);
	if (!service) error(404, 'Service not found');
	return {
		service,
		caseStudy: service.caseStudy ? caseStudyBySlug(service.caseStudy) : undefined,
		others: services.filter((s) => s.slug !== service.slug)
	};
};
