import { site } from '$lib/site';

export type Faq = { id: string; question: string; answer: string };

export const faqs: Faq[] = [
	{
		id: 'switching',
		question: 'How easy is it to switch accountants?',
		answer:
			'Very easy. Once you decide to move, we contact your current accountant for the professional clearance and handover information, set up our authority with HMRC, and take it from there. Most clients only need to sign our engagement letter and complete a short identity check.'
	},
	{
		id: 'fees',
		question: 'How are your fees worked out?',
		answer:
			'Fees depend on the work you need, the size of your business and the state of your records. After an initial conversation we confirm the fee in writing before any work begins, so there are no surprises.'
	},
	{
		id: 'mtd',
		question: 'Does Making Tax Digital for Income Tax apply to me?',
		answer:
			'It applies to sole traders and landlords with qualifying income over £50,000 from April 2026, over £30,000 from April 2027 and over £20,000 from April 2028. Qualifying income is your total self-employment and property income before expenses. We can confirm your position in a short call.'
	},
	{
		id: 'location',
		question: 'Do I need to be near your office?',
		answer:
			'No. Our office is in Swallowfield, Berkshire, and we work with clients across the UK, including Sheffield and Weymouth. Everything can be handled by phone, video and secure cloud software, and local clients are welcome to meet us at the office by appointment.'
	},
	{
		id: 'response',
		question: 'How quickly will you respond?',
		answer: `${site.responsePromise.long} Our office hours are ${site.hours.label}, and existing clients have a named contact who knows their affairs.`
	}
];
