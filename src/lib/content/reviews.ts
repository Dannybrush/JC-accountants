// Client reviews. Only add genuine reviews with the client's permission — publishing invented or
// edited reviews is unlawful under the Digital Markets, Competition and Consumers Act 2024.
// While `placeholder` is true the card renders as an obvious empty slot and is excluded from schema.org data.

export type Review = {
	author: string;
	context: string;
	rating: 1 | 2 | 3 | 4 | 5;
	body: string;
	date: string;
	source: 'Google' | 'Direct';
	placeholder?: boolean;
};

export const reviews: Review[] = [
	{
		author: 'Client name',
		context: 'Business type, location',
		rating: 5,
		body: 'Paste a genuine client review here, with their permission.',
		date: '2026-01-01',
		source: 'Google',
		placeholder: true
	},
	{
		author: 'Client name',
		context: 'Business type, location',
		rating: 5,
		body: 'Paste a genuine client review here, with their permission.',
		date: '2026-01-01',
		source: 'Google',
		placeholder: true
	},
	{
		author: 'Client name',
		context: 'Business type, location',
		rating: 5,
		body: 'Paste a genuine client review here, with their permission.',
		date: '2026-01-01',
		source: 'Google',
		placeholder: true
	}
];
