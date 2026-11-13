import { error } from '@sveltejs/kit';
import { areaBySlug, areas } from '$lib/content/areas';
import { caseStudyBySlug } from '$lib/content/case-studies';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => areas.map((a) => ({ slug: a.slug }));

export const load: PageLoad = ({ params }) => {
	const area = areaBySlug(params.slug);
	if (!area) error(404, 'Area not found');
	return {
		area,
		caseStudy: area.caseStudy ? caseStudyBySlug(area.caseStudy) : undefined,
		others: areas.filter((a) => a.slug !== area.slug)
	};
};
