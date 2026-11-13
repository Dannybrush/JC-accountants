export type Area = {
	slug: string;
	name: string;
	title: string;
	metaDescription: string;
	headline: string;
	intro: string[];
	places: string[];
	howWeWork: string;
	caseStudy?: string;
};

export const areas: Area[] = [
	{
		slug: 'berkshire',
		name: 'Berkshire',
		title: 'Accountants in Berkshire',
		metaDescription:
			'Accountants based in Swallowfield, serving Reading, Wokingham, Bracknell, Newbury and across Berkshire. Accounts, tax, bookkeeping, VAT and Making Tax Digital.',
		headline: 'Accountants for Berkshire businesses, based in Swallowfield.',
		intro: [
			'Our office is at Wyvols Court in Swallowfield, between Reading and Basingstoke. We have worked with businesses, landlords and contractors across Berkshire since 2010.',
			'Clients nearby are welcome to meet us at the office by appointment. Many prefer to work with us by phone, video and email — whichever suits you.'
		],
		places: ['Reading', 'Wokingham', 'Bracknell', 'Newbury', 'Thatcham', 'Crowthorne', 'Arborfield', 'Basingstoke'],
		howWeWork: 'Meetings at our Swallowfield office by appointment, or by phone and video.',
		caseStudy: 'landlord-mtd-transition'
	},
	{
		slug: 'sheffield',
		name: 'Sheffield',
		title: 'Accountants for Sheffield businesses',
		metaDescription:
			'Accountants for Sheffield and South Yorkshire businesses, landlords and contractors. Accounts, tax returns, bookkeeping, VAT and Making Tax Digital, delivered remotely.',
		headline: 'Trusted accountants for Sheffield and South Yorkshire.',
		intro: [
			'We act for a growing number of businesses, landlords and contractors in Sheffield and across South Yorkshire.',
			'Everything we do is delivered through secure cloud software, phone and video, so you receive the same partner-level attention as a client down the road from our office.'
		],
		places: ['Sheffield', 'Rotherham', 'Barnsley', 'Chesterfield', 'Doncaster'],
		howWeWork: 'Delivered remotely by phone, video and secure cloud software.',
		caseStudy: 'retailer-vat-recovery'
	},
	{
		slug: 'weymouth',
		name: 'Weymouth',
		title: 'Accountants for Weymouth & Dorset',
		metaDescription:
			'Accountants for Weymouth, Dorchester, Portland and Dorset businesses, landlords and contractors. Accounts, tax, bookkeeping, VAT and Making Tax Digital, delivered remotely.',
		headline: 'Reliable accountants for Weymouth and Dorset.',
		intro: [
			'From seasonal businesses to holiday let owners and contractors, we look after clients in Weymouth and across Dorset.',
			'We understand the rhythm of a coastal economy — uneven cash flow, seasonal staff and property income — and plan around it.'
		],
		places: ['Weymouth', 'Dorchester', 'Portland', 'Bridport', 'Poole'],
		howWeWork: 'Delivered remotely by phone, video and secure cloud software.',
		caseStudy: 'contractor-year-end-clarity'
	}
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);
