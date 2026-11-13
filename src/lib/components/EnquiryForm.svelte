<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { tick, untrack } from 'svelte';
	import AlertCircle from 'lucide-svelte/icons/circle-alert';
	import Clock from 'lucide-svelte/icons/clock';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import Lock from 'lucide-svelte/icons/lock';
	import { serviceOptions, validate, type Enquiry, type FieldErrors } from '$lib/enquiry';
	import { site } from '$lib/site';
	import { toast } from '$lib/state/toasts.svelte';
	import { trackEvent } from '$lib/state/consent.svelte';

	const DRAFT_KEY = 'jc-enquiry-draft';
	const empty = (): Enquiry => ({ name: '', email: '', phone: '', service: '', contactPreference: 'email', message: '' });

	let values = $state<Enquiry>(empty());
	let errors = $state<FieldErrors>({});
	let touched = $state<Partial<Record<keyof Enquiry, boolean>>>({});
	let status = $state<'idle' | 'submitting' | 'error'>('idle');
	let serverMessage = $state('');
	// One key per form instance: retries reuse it, so a flaky connection can never send twice
	let idempotencyKey = $state('');
	let form = $state<HTMLFormElement>();

	const hasDraft = $derived(Object.entries(values).some(([k, v]) => k !== 'contactPreference' && String(v).trim() !== ''));

	// Runs once on mount (untracked so typing doesn't re-run it)
	$effect(() => untrack(restore));

	function restore() {
		idempotencyKey = crypto.randomUUID();
		// Pre-select a service when arriving from a service page (/contact?service=…)
		const fromQuery = page.url.searchParams.get('service');
		try {
			const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? 'null');
			if (draft && typeof draft === 'object') {
				values = { ...empty(), ...draft };
				if (hasDraft) toast('We restored your unsent message.', { undo: () => clear(false) });
			}
		} catch {
			/* ignore */
		}
		if (fromQuery && serviceOptions.some((o) => o.value === fromQuery)) values.service = fromQuery;
		if (page.url.searchParams.get('error') === 'validation') serverMessage = 'Some details were missing. Please check the form and try again.';
	}

	// Save the draft as they type, so nothing is lost if they navigate away
	let saveTimer: ReturnType<typeof setTimeout>;
	let sent = false;
	$effect(() => {
		const snapshot = JSON.stringify(values);
		clearTimeout(saveTimer);
		if (sent) return;
		saveTimer = setTimeout(() => {
			try {
				if (hasDraft) localStorage.setItem(DRAFT_KEY, snapshot);
				else localStorage.removeItem(DRAFT_KEY);
			} catch {
				/* ignore */
			}
		}, 400);
	});

	// Re-validate touched fields live, but only after the first blur — no shouting while typing
	$effect(() => {
		const all = validate(values);
		errors = Object.fromEntries(Object.entries(all).filter(([k]) => touched[k as keyof Enquiry]));
	});

	function clear(withUndo = true) {
		const previous = { ...values };
		values = empty();
		touched = {};
		serverMessage = '';
		if (withUndo) toast('Form cleared', { undo: () => (values = previous) });
	}

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (status === 'submitting') return;
		const all = validate(values);
		touched = Object.fromEntries(Object.keys(values).map((k) => [k, true]));
		errors = all;
		if (Object.keys(all).length) {
			await tick();
			form?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
			return;
		}

		status = 'submitting';
		serverMessage = '';
		try {
			const res = await fetch('/api/enquiry', {
				method: 'POST',
				headers: { Accept: 'application/json', 'Idempotency-Key': idempotencyKey },
				body: new FormData(form)
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok || !data.ok) {
				if (data.errors) errors = data.errors;
				throw new Error(data.message ?? 'Something went wrong.');
			}
			// Stop any pending draft save from resurrecting the message we just sent
			sent = true;
			clearTimeout(saveTimer);
			try {
				localStorage.removeItem(DRAFT_KEY);
				sessionStorage.setItem('jc-enquiry-name', values.name.split(' ')[0]);
				sessionStorage.setItem('jc-enquiry-pref', values.contactPreference);
			} catch {
				/* ignore */
			}
			trackEvent('generate_lead', { service: values.service });
			await goto('/contact/thank-you');
		} catch (err) {
			status = 'error';
			serverMessage = err instanceof Error && err.message !== 'Failed to fetch' ? err.message : `We couldn’t reach our server. Please check your connection and try again, or call ${site.phone.display}.`;
		} finally {
			if (status === 'submitting') status = 'idle';
		}
	}

	const blur = (field: keyof Enquiry) => () => (touched[field] = true);
	const describe = (field: keyof Enquiry, hint?: boolean) => [hint ? `${field}-hint` : '', errors[field] ? `${field}-error` : ''].filter(Boolean).join(' ') || undefined;
</script>

<form bind:this={form} method="POST" action="/api/enquiry" onsubmit={submit} novalidate class="form smooth" aria-labelledby="enquiry-title">
	<div class="head">
		<h2 id="enquiry-title">Send us an enquiry</h2>
		<p class="promise"><Clock size={16} aria-hidden="true" /> {site.responsePromise.short}</p>
	</div>

	{#if serverMessage}
		<div class="alert" role="alert">
			<AlertCircle size={18} aria-hidden="true" />
			<p>{serverMessage}</p>
		</div>
	{/if}

	<input type="hidden" name="idempotency_key" value={idempotencyKey} />
	<!-- Honeypot: hidden from people and assistive tech; bots tend to fill it -->
	<div class="hp" aria-hidden="true">
		<label>Website <input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
	</div>

	<div class="row">
		<div class="field">
			<label for="name">Full name</label>
			<input id="name" name="name" type="text" autocomplete="name" required bind:value={values.name} onblur={blur('name')} aria-invalid={!!errors.name} aria-describedby={describe('name')} />
			{#if errors.name}<p class="error" id="name-error">{errors.name}</p>{/if}
		</div>
		<div class="field">
			<label for="email">Email address</label>
			<input id="email" name="email" type="email" inputmode="email" autocomplete="email" autocapitalize="off" spellcheck="false" required bind:value={values.email} onblur={blur('email')} aria-invalid={!!errors.email} aria-describedby={describe('email')} />
			{#if errors.email}<p class="error" id="email-error">{errors.email}</p>{/if}
		</div>
	</div>

	<div class="row">
		<div class="field">
			<label for="phone">Phone <span class="opt">(optional)</span></label>
			<input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" class="tnum" bind:value={values.phone} onblur={blur('phone')} aria-invalid={!!errors.phone} aria-describedby={describe('phone')} />
			{#if errors.phone}<p class="error" id="phone-error">{errors.phone}</p>{/if}
		</div>
		<div class="field">
			<label for="service">What do you need help with?</label>
			<select id="service" name="service" required bind:value={values.service} onblur={blur('service')} aria-invalid={!!errors.service} aria-describedby={describe('service')}>
				<option value="" disabled>Choose a service…</option>
				{#each serviceOptions as o (o.value)}<option value={o.value}>{o.label}</option>{/each}
			</select>
			{#if errors.service}<p class="error" id="service-error">{errors.service}</p>{/if}
		</div>
	</div>

	<fieldset class="field">
		<legend>How should we reply?</legend>
		<div class="segmented">
			<label><input type="radio" name="contactPreference" value="email" bind:group={values.contactPreference} /> <span>Email me</span></label>
			<label><input type="radio" name="contactPreference" value="phone" bind:group={values.contactPreference} /> <span>Call me</span></label>
		</div>
	</fieldset>

	<div class="field">
		<label for="message">Your message</label>
		<textarea id="message" name="message" rows="5" required maxlength="5000" bind:value={values.message} onblur={blur('message')} aria-invalid={!!errors.message} aria-describedby={describe('message', true)}></textarea>
		<p class="hint" id="message-hint">A sentence or two about your business and what you need is plenty. Please don’t include bank details or your UTR.</p>
		{#if errors.message}<p class="error" id="message-error">{errors.message}</p>{/if}
	</div>

	<div class="actions">
		<button type="submit" class="btn btn--primary btn--lg" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
			{#if status === 'submitting'}<LoaderCircle size={18} class="spin" aria-hidden="true" /> Sending…{:else}Send enquiry{/if}
		</button>
		{#if hasDraft}
			<button type="button" class="btn btn--ghost" onclick={() => clear()}>Clear</button>
		{/if}
	</div>

	<p class="privacy"><Lock size={14} aria-hidden="true" /> We use your details only to respond to your enquiry. See our <a href="/privacy">privacy policy</a>.</p>
</form>

<style>
	.form {
		--radius: var(--r-lg);
		display: grid;
		gap: 1.25rem;
		padding: clamp(1.5rem, 1rem + 2vw, 2.5rem);
		background: var(--surface);
		border: 1px solid var(--line);
		box-shadow: var(--shadow);
	}
	.head {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.5rem 1rem;
	}
	h2 {
		font-size: var(--step-2);
	}
	.promise {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.88rem;
		font-weight: 500;
		color: var(--success);
	}
	.row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
	}
	.field {
		display: grid;
		gap: 0.4rem;
		margin: 0;
		padding: 0;
		border: 0;
		min-width: 0;
	}
	label,
	legend {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--ink);
		padding: 0;
	}
	legend {
		margin-bottom: 0.4rem;
	}
	.opt {
		font-weight: 400;
		color: var(--muted);
	}
	input:not([type='radio']),
	select,
	textarea {
		width: 100%;
		min-height: var(--tap);
		padding: 0.7rem 0.9rem;
		border: 1px solid var(--line-strong);
		border-radius: 10px;
		background: var(--paper);
		/* 16px+ prevents iOS zooming into the field */
		font-size: max(16px, 1rem);
		transition:
			border-color 0.2s,
			box-shadow 0.2s,
			background-color 0.2s;
	}
	select {
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%236b6062' stroke-width='2'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.9rem center;
		padding-right: 2.5rem;
	}
	textarea {
		resize: vertical;
		min-height: 140px;
		line-height: 1.55;
	}
	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: var(--brand);
		background: var(--surface);
		box-shadow: 0 0 0 4px rgb(91 20 24 / 0.1);
	}
	[aria-invalid='true'] {
		border-color: #b3261e !important;
	}
	.error {
		display: flex;
		gap: 0.35rem;
		font-size: 0.85rem;
		color: #b3261e;
	}
	.hint {
		font-size: 0.82rem;
		color: var(--muted);
	}
	.segmented {
		display: inline-grid;
		grid-template-columns: 1fr 1fr;
		gap: 4px;
		padding: 4px;
		border-radius: 12px;
		background: var(--paper);
		border: 1px solid var(--line);
		max-width: 320px;
	}
	.segmented label {
		position: relative;
		display: grid;
		place-items: center;
		min-height: 44px;
		border-radius: 9px;
		font-weight: 500;
		cursor: pointer;
		transition:
			background-color 0.2s,
			color 0.2s;
	}
	.segmented input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}
	.segmented label:has(input:checked) {
		background: var(--brand);
		color: var(--cream);
		box-shadow: var(--shadow-sm);
	}
	.segmented label:has(input:focus-visible) {
		outline: 2px solid var(--focus);
		outline-offset: 2px;
	}
	.alert {
		display: flex;
		gap: 0.6rem;
		padding: 0.9rem 1rem;
		border-radius: 10px;
		background: #fbeceb;
		color: #8c1d18;
		font-size: 0.93rem;
	}
	.alert :global(svg) {
		flex: none;
		margin-top: 0.15rem;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}
	.actions .btn--primary {
		min-width: 200px;
	}
	.actions :global(.spin) {
		animation: spin 0.9s linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	button[disabled] {
		opacity: 0.8;
		cursor: progress;
	}
	.privacy {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.82rem;
		color: var(--muted);
	}
	.privacy a {
		color: var(--brand);
	}
	.hp {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
	@media (max-width: 599px) {
		.row {
			grid-template-columns: 1fr;
		}
		.actions .btn--primary {
			flex: 1;
		}
		.segmented {
			max-width: none;
		}
	}
</style>
