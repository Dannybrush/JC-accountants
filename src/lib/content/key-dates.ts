// Recurring UK tax deadlines shown on the home page. Dates are day/month; the next occurrence is computed at build time.

export type KeyDate = { day: number; month: number; title: string; detail: string };

export const keyDates: KeyDate[] = [
	{ day: 31, month: 1, title: 'Self assessment', detail: 'Online return and balancing payment due' },
	{ day: 7, month: 2, title: 'MTD quarterly update', detail: 'For the quarter to 5 January' },
	{ day: 7, month: 5, title: 'MTD quarterly update', detail: 'For the quarter to 5 April' },
	{ day: 31, month: 7, title: 'Payment on account', detail: 'Second self assessment payment on account' },
	{ day: 7, month: 8, title: 'MTD quarterly update', detail: 'For the quarter to 5 July' },
	{ day: 5, month: 10, title: 'Register for self assessment', detail: 'If you became self-employed last tax year' },
	{ day: 7, month: 11, title: 'MTD quarterly update', detail: 'For the quarter to 5 October' }
];

export function upcoming(from = new Date(), count = 4) {
	const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
	return keyDates
		.map((d) => {
			let date = new Date(today.getFullYear(), d.month - 1, d.day);
			if (date < today) date = new Date(today.getFullYear() + 1, d.month - 1, d.day);
			return { ...d, date };
		})
		.sort((a, b) => +a.date - +b.date)
		.slice(0, count);
}
