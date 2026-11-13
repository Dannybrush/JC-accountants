import { error } from '@sveltejs/kit';
import { caseStudies, caseStudyBySlug } from '$lib/content/case-studies';
import { serviceBySlug } from '$lib/content/services';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => caseStudies.map((c) => ({ slug: c.slug }));

export const load: PageLoad = ({ params }) => {
	const study = caseStudyBySlug(params.slug);
	if (!study) error(404, 'Case study not found');
	return {
		study,
		service: serviceBySlug(study.service)!,
		others: caseStudies.filter((c) => c.slug !== study.slug)
	};
};
