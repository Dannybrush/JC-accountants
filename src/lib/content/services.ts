export type Service = {
	slug: string;
	title: string;
	nav: string;
	/** Mid-sentence form, e.g. "help with bookkeeping and VAT" */
	phrase: string;
	summary: string;
	metaDescription: string;
	headline: string;
	intro: string[];
	includes: { title: string; detail: string }[];
	forWhom: string[];
	outcome: string;
	caseStudy?: string;
};

export const services: Service[] = [
	{
		slug: 'accounts-and-tax',
		title: 'Accounts & Tax Returns',
		nav: 'Accounts & tax returns',
		phrase: 'accounts and tax returns',
		summary: 'Year-end accounts, corporation tax and self assessment — prepared accurately and filed early.',
		metaDescription:
			'Statutory year-end accounts, corporation tax returns and self assessment for limited companies, sole traders, landlords and contractors. Prepared accurately and filed ahead of deadline.',
		headline: 'Year-end accounts and tax returns, filed well before the deadline.',
		intro: [
			'Your annual accounts and tax returns are the documents HMRC, Companies House, lenders and investors judge you by. We prepare them with the care they deserve, and we prepare them early — so you know what you owe months before it is due.',
			'Whether you run a limited company, trade as a sole trader, let property or contract through your own company, you will have one point of contact who knows your affairs and answers your questions directly.'
		],
		includes: [
			{ title: 'Statutory accounts', detail: 'Year-end accounts prepared to FRS 102 or FRS 105 and filed with Companies House.' },
			{ title: 'Corporation tax', detail: 'CT600 returns, computations and payment reminders well ahead of the nine-month deadline.' },
			{ title: 'Self assessment', detail: 'Personal tax returns for directors, sole traders, partners and landlords.' },
			{ title: 'Rental income', detail: 'Property income and expenses, mortgage interest restrictions and capital allowances reviewed.' },
			{ title: 'Director remuneration', detail: 'Salary and dividend planning so you draw income tax-efficiently.' },
			{ title: 'HMRC correspondence', detail: 'We deal with HMRC on your behalf as your authorised agent.' }
		],
		forWhom: ['Limited companies', 'Sole traders', 'Landlords', 'Contractors'],
		outcome: 'Accurate accounts, no late-filing penalties and a clear view of your tax bill months in advance.',
		caseStudy: 'contractor-year-end-clarity'
	},
	{
		slug: 'bookkeeping-and-vat',
		title: 'Bookkeeping & VAT',
		nav: 'Bookkeeping & VAT',
		phrase: 'bookkeeping and VAT',
		summary: 'Accurate, up-to-date books and VAT returns submitted correctly, every quarter.',
		metaDescription:
			'Bookkeeping and VAT returns for UK businesses on Xero, QuickBooks, FreeAgent, Sage and more. Accurate records, quarterly VAT submitted under Making Tax Digital.',
		headline: 'Books that are always current. VAT that is always right.',
		intro: [
			'Good decisions depend on reliable numbers. We keep your books reconciled and up to date so you can see where your business stands at any point in the year — not just at year end.',
			'We work in whichever software you already use, or help you choose the right one. VAT returns are prepared, reviewed and submitted digitally, with the figures explained before anything is filed.'
		],
		includes: [
			{ title: 'Bookkeeping', detail: 'Bank reconciliations, sales and purchase ledgers, and expense coding kept up to date.' },
			{ title: 'VAT returns', detail: 'Quarterly or monthly returns prepared, reviewed and submitted under Making Tax Digital.' },
			{ title: 'VAT registration', detail: 'Advice on when to register and which scheme suits you — standard, flat rate or cash accounting.' },
			{ title: 'Management accounts', detail: 'Monthly or quarterly profit and loss, balance sheet and cash position.' },
			{ title: 'Software set-up', detail: 'Xero, QuickBooks, FreeAgent, Sage and others — set up, migrated or tidied up.' },
			{ title: 'Receipt capture', detail: 'Digital receipt tools so paperwork never piles up.' }
		],
		forWhom: ['Limited companies', 'Sole traders', 'VAT-registered businesses'],
		outcome: 'Clean books throughout the year and VAT returns filed correctly and on time.',
		caseStudy: 'retailer-vat-recovery'
	},
	{
		slug: 'making-tax-digital',
		title: 'Making Tax Digital',
		nav: 'Making Tax Digital',
		phrase: 'Making Tax Digital',
		summary: 'MTD for Income Tax and VAT — software, quarterly updates and final declarations handled for you.',
		metaDescription:
			'Making Tax Digital for Income Tax and VAT. We set up compatible software, submit quarterly updates and file your final declaration for sole traders and landlords.',
		headline: 'Making Tax Digital, handled from set-up to final declaration.',
		intro: [
			'Making Tax Digital for Income Tax began in April 2026 for sole traders and landlords with qualifying income over £50,000, and extends to those over £30,000 from April 2027 and over £20,000 from April 2028. It replaces one annual tax return with four quarterly updates and a final declaration.',
			'We get you ready before your start date: choosing and setting up compatible software, connecting your bank feeds, and agreeing a simple routine. Then we submit every quarterly update and your final declaration on your behalf.'
		],
		includes: [
			{ title: 'Readiness check', detail: 'We confirm whether and when MTD applies to you, based on your qualifying income.' },
			{ title: 'Software set-up', detail: 'HMRC-recognised software chosen, configured and connected to your bank.' },
			{ title: 'Quarterly updates', detail: 'Submitted by the 7th of the month after each quarter ends.' },
			{ title: 'Final declaration', detail: 'Year-end adjustments, reliefs and your final declaration filed by 31 January.' },
			{ title: 'MTD for VAT', detail: 'Digital records and VAT submissions for every VAT-registered business.' },
			{ title: 'Landlord portfolios', detail: 'Multiple properties and joint ownership handled in one place.' }
		],
		forWhom: ['Sole traders', 'Landlords', 'VAT-registered businesses'],
		outcome: 'Full compliance with MTD without adding admin to your week.',
		caseStudy: 'landlord-mtd-transition'
	},
	{
		slug: 'advisory-and-formations',
		title: 'Advisory & Company Formations',
		nav: 'Advisory & formations',
		phrase: 'advice and company formations',
		summary: 'Company formations, tax planning and practical business advice from people who know your numbers.',
		metaDescription:
			'Company formations, incorporation advice, tax planning and business advisory for owner-managed businesses and contractors. Practical advice from accountants who know your figures.',
		headline: 'Structured properly from day one. Advised properly every year after.',
		intro: [
			'The most valuable advice comes before a decision, not after it. Whether you are deciding to incorporate, taking on your first employee, buying property or planning an exit, we will set out the options and the tax consequences in plain English.',
			'For new companies we handle the whole formation: registration, Companies House identity verification for directors, HMRC registrations and a structure that suits how you intend to draw income.'
		],
		includes: [
			{ title: 'Company formation', detail: 'Incorporation, share structure, registered office and HMRC registrations.' },
			{ title: 'Sole trader to limited', detail: 'An honest comparison of whether incorporating will actually save you tax.' },
			{ title: 'Tax planning', detail: 'Year-round planning on remuneration, pensions, allowances and reliefs.' },
			{ title: 'Contractors & IR35', detail: 'Status reviews and advice on working through your own company.' },
			{ title: 'Companies House', detail: 'Confirmation statements, director changes and identity verification.' },
			{ title: 'Business advice', detail: 'Cash flow forecasts, funding applications and growth planning.' }
		],
		forWhom: ['New businesses', 'Limited companies', 'Contractors', 'Growing SMEs'],
		outcome: 'The right structure, fewer surprises and decisions made with the full picture.',
		caseStudy: 'contractor-year-end-clarity'
	}
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
