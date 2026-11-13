import { error, json, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { fromFormData, serviceOptions, validate, type Enquiry } from '$lib/enquiry';
import { site } from '$lib/site';
import type { RequestHandler } from './$types';

export const prerender = false;

// --- Idempotency -------------------------------------------------------------------------------
// Each form render carries a unique key. Retries and double-submits with the same key return the
// first result instead of sending a second email. The key is also forwarded to Resend, which
// de-duplicates for 24 hours across all server instances.
const DAY = 24 * 60 * 60 * 1000;
const processed = new Map<string, { at: number; result: Promise<Result> }>();
type Result = { ok: true } | { ok: false; status: number; message: string };

// --- Basic rate limit (per instance) -----------------------------------------------------------
const hits = new Map<string, number[]>();
function limited(ip: string) {
	const now = Date.now();
	const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
	recent.push(now);
	hits.set(ip, recent);
	return recent.length > 5;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

async function sendEmail(body: Record<string, unknown>, idempotencyKey: string) {
	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${env.RESEND_API_KEY}`,
			'Content-Type': 'application/json',
			'Idempotency-Key': idempotencyKey
		},
		body: JSON.stringify(body)
	});
	if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

async function deliver(e: Enquiry, key: string): Promise<Result> {
	const service = serviceOptions.find((o) => o.value === e.service)?.label ?? e.service;

	if (!env.RESEND_API_KEY) {
		if (dev) {
			console.info('[enquiry] RESEND_API_KEY not set — enquiry logged instead of emailed:', { ...e, key });
			return { ok: true };
		}
		console.error('[enquiry] RESEND_API_KEY missing in production');
		return { ok: false, status: 503, message: `Our form is temporarily unavailable. Please call ${site.phone.display}.` };
	}

	const rows: [string, string][] = [
		['Name', e.name],
		['Email', e.email],
		['Phone', e.phone || '—'],
		['Service', service],
		['Prefers', e.contactPreference === 'phone' ? 'A phone call' : 'An email reply'],
		['Reference', key.slice(0, 8).toUpperCase()]
	];

	try {
		await sendEmail(
			{
				from: env.ENQUIRY_FROM || `J&C Website <website@${new URL(site.url).hostname}>`,
				to: [env.ENQUIRY_TO || site.email],
				reply_to: e.email,
				subject: `New enquiry: ${service} — ${e.name}`,
				text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${e.message}`,
				html: `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows
					.map(([k, v]) => `<tr><td style="color:#6b6062">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
					.join('')}</table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(e.message)}</p>`
			},
			key
		);

		// Acknowledgement to the enquirer (best effort — failure here doesn't fail the enquiry)
		sendEmail(
			{
				from: env.ENQUIRY_FROM || `J&C Accountants <website@${new URL(site.url).hostname}>`,
				to: [e.email],
				reply_to: env.ENQUIRY_TO || site.email,
				subject: 'We’ve received your enquiry — J&C Accountants',
				text: `Dear ${e.name},\n\nThank you for contacting J&C Accountants. We have received your enquiry about ${service.toLowerCase()} and will reply within one working day.\n\nIf it’s urgent, please call us on ${site.phone.display} (${site.hours.label}).\n\nKind regards,\nJ&C Accountants\n${site.url}`
			},
			`${key}-ack`
		).catch((err) => console.warn('[enquiry] acknowledgement failed', err));

		return { ok: true };
	} catch (err) {
		console.error('[enquiry] delivery failed', err);
		return { ok: false, status: 502, message: `We couldn’t send your message. Please try again, or call ${site.phone.display}.` };
	}
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const wantsJson = request.headers.get('accept')?.includes('application/json');
	const fd = await request.formData();

	// Honeypot: bots fill every field. Pretend success so they don't adapt.
	if (String(fd.get('website') ?? '')) {
		if (wantsJson) return json({ ok: true });
		redirect(303, '/contact/thank-you');
	}

	// Pages are pre-rendered, so the key is created in the browser. Without JavaScript there is no
	// per-visit key; fall back to a fresh server key (no de-duplication, but nothing is lost).
	const key = request.headers.get('idempotency-key') || String(fd.get('idempotency_key') ?? '') || (wantsJson ? '' : crypto.randomUUID());
	if (!/^[\w-]{16,64}$/.test(key)) error(400, 'Missing or invalid idempotency key');

	const enquiry = fromFormData(fd);
	const errors = validate(enquiry);
	if (Object.keys(errors).length) {
		if (wantsJson) return json({ ok: false, errors }, { status: 422 });
		redirect(303, '/contact?error=validation#enquiry');
	}

	for (const [k, v] of processed) if (Date.now() - v.at > DAY) processed.delete(k);

	let entry = processed.get(key);
	if (!entry) {
		if (limited(getClientAddress())) {
			const message = `Too many enquiries from this connection. Please call ${site.phone.display}.`;
			if (wantsJson) return json({ ok: false, message }, { status: 429 });
			error(429, message);
		}
		entry = { at: Date.now(), result: deliver(enquiry, key) };
		processed.set(key, entry);
	}
	const result = await entry.result;
	// Allow a genuine retry with the same key if delivery failed
	if (!result.ok) processed.delete(key);

	if (wantsJson) return json(result, { status: result.ok ? 200 : result.status });
	if (!result.ok) error(result.status, result.message);
	redirect(303, '/contact/thank-you');
};
