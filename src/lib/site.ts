// Single source of truth for firm details. Anything marked TODO must be confirmed before launch (see docs/LAUNCH.md).

export const site = {
	name: 'J&C Accountants',
	legalName: 'J & C Accountants Limited',
	url: 'https://jandc-accountants.co.uk',
	companyNumber: '07217279',
	founded: 2010,
	phone: { display: '0118 923 5812', href: 'tel:+441189235812', e164: '+441189235812' },
	// TODO: mailbox not yet set up
	email: 'hello@jandc-accountants.co.uk',
	address: {
		lines: ['Wyvols Court', 'Basingstoke Road', 'Swallowfield'],
		locality: 'Reading',
		region: 'Berkshire',
		postcode: 'RG7 1WY',
		country: 'GB'
	},
	geo: { lat: 51.3726, lng: -0.9592 },
	hours: { days: 'Monday to Friday', open: '09:00', close: '17:00', label: 'Mon–Fri, 9am–5pm' },
	responsePromise: {
		short: 'Reply within 1 working day',
		long: 'Every enquiry receives a personal reply from the team within one working day.'
	},
	directors: [
		{ name: 'Clifford Rumble', role: 'Director', since: 2010 },
		{ name: 'Joanne Wilson', role: 'Director', since: 2013 }
	]
} as const;

export const addressOneLine = [...site.address.lines, site.address.locality, site.address.postcode].join(', ');

const mapsQuery = encodeURIComponent(`${site.legalName}, ${addressOneLine}`);
export const maps = {
	embed: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
	google: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
	apple: `https://maps.apple.com/?daddr=${mapsQuery}`
};

export const yearsTrading = new Date().getFullYear() - site.founded;
