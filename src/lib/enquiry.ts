// Shared between the enquiry form (client-side validation) and the API (authoritative validation).

export const serviceOptions = [
	{ value: 'accounts-and-tax', label: 'Accounts & tax returns' },
	{ value: 'bookkeeping-and-vat', label: 'Bookkeeping & VAT' },
	{ value: 'making-tax-digital', label: 'Making Tax Digital' },
	{ value: 'advisory-and-formations', label: 'Advisory & company formations' },
	{ value: 'switching', label: 'Switching accountant' },
	{ value: 'other', label: 'Something else' }
];

export type Enquiry = {
	name: string;
	email: string;
	phone: string;
	service: string;
	contactPreference: 'email' | 'phone';
	message: string;
};

export type FieldErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,20}$/;

export function validate(e: Enquiry): FieldErrors {
	const errors: FieldErrors = {};
	if (e.name.trim().length < 2) errors.name = 'Please enter your name.';
	if (!EMAIL.test(e.email.trim())) errors.email = 'Please enter a valid email address, like name@example.com.';
	if (e.phone.trim() && !PHONE.test(e.phone.trim())) errors.phone = 'Please enter a valid UK phone number.';
	if (e.contactPreference === 'phone' && !e.phone.trim()) errors.phone = 'Please add a phone number so we can call you.';
	if (!serviceOptions.some((o) => o.value === e.service)) errors.service = 'Please choose what you need help with.';
	if (e.message.trim().length < 10) errors.message = 'Please tell us a little more (at least 10 characters).';
	if (e.message.length > 5000) errors.message = 'Please keep your message under 5,000 characters.';
	return errors;
}

export function fromFormData(fd: FormData): Enquiry {
	const s = (k: string) => String(fd.get(k) ?? '').slice(0, 5000);
	return {
		name: s('name'),
		email: s('email'),
		phone: s('phone'),
		service: s('service'),
		contactPreference: s('contactPreference') === 'phone' ? 'phone' : 'email',
		message: s('message')
	};
}
