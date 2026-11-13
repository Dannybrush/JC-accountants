// Illustrative, anonymised scenarios. Each is labelled as such on the site. Replace with real client stories (with written consent) when available.

export type CaseStudy = {
	slug: string;
	title: string;
	client: string;
	sector: string;
	location: string;
	service: string;
	summary: string;
	metaDescription: string;
	results: { value: string; label: string }[];
	challenge: string[];
	approach: string[];
	outcome: string[];
};

export const caseStudies: CaseStudy[] = [
	{
		slug: 'landlord-mtd-transition',
		title: 'A landlord’s move to Making Tax Digital',
		client: 'Private landlord, six residential properties',
		sector: 'Property',
		location: 'Berkshire',
		service: 'making-tax-digital',
		summary:
			'A landlord with rental income above £50,000 needed to be ready for quarterly reporting from April 2026, with records kept across spreadsheets, paper receipts and two bank accounts.',
		metaDescription:
			'How a Berkshire landlord with six properties moved to Making Tax Digital for Income Tax with compatible software, bank feeds and quarterly updates filed for them.',
		results: [
			{ value: '4/4', label: 'Quarterly updates filed on time' },
			{ value: '1', label: 'System replacing three spreadsheets' },
			{ value: '0', label: 'Hours of quarterly admin for the client' }
		],
		challenge: [
			'Records for six properties were spread across separate spreadsheets, a shoebox of receipts and two bank accounts, one shared with personal spending.',
			'With qualifying income over £50,000, the client was required to keep digital records and submit quarterly updates from 6 April 2026, and was unsure which software to use.'
		],
		approach: [
			'We confirmed the client’s start date, chose HMRC-recognised software suited to a property portfolio and set up a dedicated bank feed for the letting business.',
			'Each property was set up as its own tracking category so income and costs could be reported per property. Receipts are now photographed and matched as they arrive.',
			'Each quarter we review the transactions, raise any questions and submit the update — the client simply approves it.'
		],
		outcome: [
			'Every quarterly update has been filed before the 7th-of-the-month deadline, and the client sees per-property profit throughout the year rather than once a year.',
			'The year-end final declaration is now a short review rather than a January scramble.'
		]
	},
	{
		slug: 'retailer-vat-recovery',
		title: 'Bringing a growing retailer’s books under control',
		client: 'Independent retailer, two shops and online sales',
		sector: 'Retail',
		location: 'Sheffield',
		service: 'bookkeeping-and-vat',
		summary:
			'A retailer had grown quickly online, but the bookkeeping had fallen eight months behind and VAT returns were being estimated.',
		metaDescription:
			'How a Sheffield retailer brought eight months of overdue bookkeeping up to date, corrected its VAT position and moved to monthly management accounts.',
		results: [
			{ value: '8', label: 'Months of backlog cleared' },
			{ value: '100%', label: 'VAT returns filed on time since' },
			{ value: 'Monthly', label: 'Management accounts now delivered' }
		],
		challenge: [
			'Sales from two tills, an online shop and a marketplace were landing in different places, and marketplace fees were not being recorded at all.',
			'VAT returns had been prepared from estimates, leaving the business unsure whether it had overpaid or underpaid.'
		],
		approach: [
			'We connected each sales channel to the accounting software, cleared the backlog and reconciled every bank and payment account.',
			'Previous VAT returns were reviewed against the corrected records, and an adjustment was made through the next return within HMRC’s error correction limits.',
			'We agreed a monthly routine with a short management-accounts pack and a call to go through it.'
		],
		outcome: [
			'The books are current every month, VAT is prepared from actual figures, and the owners can see margin by sales channel for the first time.',
			'With reliable numbers, the business secured stock financing on the strength of its management accounts.'
		]
	},
	{
		slug: 'contractor-year-end-clarity',
		title: 'Clarity for an IT contractor working through a limited company',
		client: 'IT contractor, single-director company',
		sector: 'Contracting',
		location: 'Weymouth',
		service: 'accounts-and-tax',
		summary:
			'A contractor moving from inside-IR35 roles to an outside-IR35 contract needed company accounts, a tax-efficient way to draw income, and certainty about status.',
		metaDescription:
			'How a Weymouth IT contractor gained clarity on IR35 status, director remuneration and year-end accounts through their own limited company.',
		results: [
			{ value: '1', label: 'Point of contact all year' },
			{ value: '3 mo', label: 'Tax bill known before deadline' },
			{ value: 'Reviewed', label: 'IR35 status of each contract' }
		],
		challenge: [
			'The client had formed a limited company but had no clear plan for salary, dividends or pension contributions, and no visibility of the corporation tax building up.',
			'A new contract had been assessed as outside IR35, and the client wanted assurance that the working practices matched the paperwork.'
		],
		approach: [
			'We reviewed the contract and working practices and recommended keeping a simple record of how the engagement operated in practice.',
			'A remuneration plan combined salary, dividends and employer pension contributions, and we set aside corporation tax monthly in a separate account.',
			'Year-end accounts and the CT600 were prepared within three months of the year end, so the tax position was known long before payment was due.'
		],
		outcome: [
			'The client knows what they can draw each month, what tax is due and when — and has one person to call with questions.',
			'Each new contract is reviewed before it is signed.'
		]
	}
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
