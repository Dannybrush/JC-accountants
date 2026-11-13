<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { addressOneLine, site } from '$lib/site';
	import { analyticsEnabled, consent, resetConsent } from '$lib/state/consent.svelte';
	import { toast } from '$lib/state/toasts.svelte';
	import { breadcrumbs } from '$lib/schema';

	const crumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Privacy & cookies', href: '/privacy' }
	];
	const updated = '8 November 2026';

	const toc = [
		['who', 'Who we are'],
		['collect', 'What we collect'],
		['use', 'How we use it'],
		['share', 'Who we share it with'],
		['keep', 'How long we keep it'],
		['rights', 'Your rights'],
		['cookies', 'Cookies'],
		['contact', 'Contact & complaints']
	];

	let ready = $state(false);
	$effect(() => {
		ready = true;
	});

	function reset() {
		const previous = consent.analytics;
		resetConsent();
		toast('Cookie preferences reset', { undo: () => (consent.analytics = previous) });
	}
</script>

<Seo
	title="Privacy & Cookie Policy"
	description="How J&C Accountants collects, uses and protects your personal data, your rights under UK GDPR, and how we use cookies on this website."
	schema={[breadcrumbs(crumbs)]}
/>

<PageHero {crumbs} eyebrow="Legal" title="Privacy & cookie policy" lede="How we collect, use and protect your personal information. Last updated {updated}." />

<section class="section">
	<div class="container layout">
		<nav aria-label="On this page" class="toc">
			<h2>On this page</h2>
			<ol>
				{#each toc as [id, label] (id)}<li><a href="#{id}">{label}</a></li>{/each}
			</ol>
		</nav>

		<article class="prose">
			<h2 id="who">Who we are</h2>
			<p>
				This website is operated by {site.legalName} (“J&C”, “we”, “us”), a company registered in England and Wales with company number
				<span class="tnum">{site.companyNumber}</span>. Our registered office is {addressOneLine}. We are the data controller for personal
				information collected through this website.
			</p>
			<!-- TODO: add ICO registration number, e.g. "We are registered with the Information Commissioner’s Office under number ZA000000." -->

			<h2 id="collect">What we collect</h2>
			<ul>
				<li><strong>Enquiries:</strong> your name, email address, phone number (if given), the service you are interested in and your message.</li>
				<li><strong>Analytics (only with your consent):</strong> pages visited, approximate location (country/city), device and browser type, and how you arrived at the site. IP addresses are not stored by Google Analytics 4.</li>
				<li><strong>Technical data:</strong> our hosting provider keeps short-lived server logs, including IP addresses, for security and to prevent abuse.</li>
			</ul>
			<p>Please do not send us bank details, your Unique Taxpayer Reference or other sensitive information through the website form.</p>

			<h2 id="use">How we use it, and our lawful basis</h2>
			<ul>
				<li><strong>Responding to enquiries</strong> — legitimate interests, or steps prior to entering a contract at your request.</li>
				<li><strong>Improving the website</strong> through analytics — your consent, which you can withdraw at any time.</li>
				<li><strong>Keeping the site secure</strong> — legitimate interests.</li>
			</ul>
			<p>
				If you become a client, we process your information under our engagement letter and to meet our legal obligations, including
				anti-money laundering checks. A separate client privacy notice applies.
			</p>

			<h2 id="share">Who we share it with</h2>
			<p>We never sell your data. We use a small number of trusted processors to run this website:</p>
			<ul>
				<li><strong>Vercel Inc.</strong> — website hosting.</li>
				<li><strong>Resend</strong> — delivering enquiry emails to our inbox.</li>
				<li><strong>Google</strong> — Google Analytics (only with consent) and Google Maps (only if you choose to load the map).</li>
			</ul>
			<p>
				Some of these providers process data in the United States. Transfers are protected by the UK International Data Transfer Addendum,
				Standard Contractual Clauses or the UK–US Data Bridge, as applicable.
			</p>

			<h2 id="keep">How long we keep it</h2>
			<p>
				Enquiries that do not lead to an engagement are deleted within 12 months. Client records are kept for as long as required by law —
				usually six years after the end of the relevant tax year. Analytics data is retained for 14 months.
			</p>

			<h2 id="rights">Your rights</h2>
			<p>Under UK GDPR you have the right to:</p>
			<ul>
				<li>access the personal data we hold about you;</li>
				<li>ask us to correct or delete it;</li>
				<li>object to, or ask us to restrict, how we use it;</li>
				<li>receive it in a portable format; and</li>
				<li>withdraw consent at any time, where we rely on consent.</li>
			</ul>
			<p>To exercise any of these rights, contact us using the details below. We will respond within one month.</p>

			<h2 id="cookies">Cookies</h2>
			<p>
				<strong>Essential storage:</strong> we store your cookie choice and, if you start the enquiry form, an unsent draft in your
				browser’s local storage so it isn’t lost. These never leave your device.
			</p>
			<p>
				<strong>Analytics cookies</strong> (<code>_ga</code>, <code>_ga_*</code>), set by Google Analytics, are used only if you click
				“Allow analytics”. They expire after up to two years.
			</p>
			<p><strong>Google Maps</strong> may set its own cookies, but only after you choose to show the interactive map.</p>
			{#if ready && analyticsEnabled()}
				<p class="pref">
					Your current choice: <strong>{consent.analytics === 'granted' ? 'analytics allowed' : consent.analytics === 'denied' ? 'analytics declined' : 'not yet chosen'}</strong>.
					<button class="btn btn--ghost" onclick={reset}>Change cookie settings</button>
				</p>
			{/if}

			<h2 id="contact">Contact & complaints</h2>
			<p>
				Email <a href="mailto:{site.email}">{site.email}</a>, call <a href={site.phone.href} class="tnum">{site.phone.display}</a>, or write
				to us at {addressOneLine}.
			</p>
			<p>
				If you are unhappy with how we have handled your data, you can complain to the Information Commissioner’s Office at
				<a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener">ico.org.uk</a> or on 0303 123 1113. We would appreciate
				the chance to put things right first.
			</p>
		</article>
	</div>
</section>

<style>
	.layout {
		display: grid;
		grid-template-columns: 15rem 1fr;
		gap: clamp(2rem, 1rem + 4vw, 5rem);
		align-items: start;
	}
	.toc {
		position: sticky;
		top: calc(var(--header-h) + 1.5rem);
	}
	.toc h2 {
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted);
		margin-bottom: 0.75rem;
	}
	.toc ol {
		margin: 0;
		padding: 0;
		list-style: none;
		border-left: 1px solid var(--line-strong);
	}
	.toc a {
		display: flex;
		align-items: center;
		min-height: 40px;
		padding-left: 1rem;
		margin-left: -1px;
		border-left: 2px solid transparent;
		font-size: 0.93rem;
		color: var(--ink-2);
		text-decoration: none;
	}
	.toc a:hover {
		color: var(--brand);
		border-left-color: var(--brand);
	}
	.prose :global(h2:first-child) {
		margin-top: 0;
	}
	.prose h2 {
		scroll-margin-top: calc(var(--header-h) + 1.5rem);
	}
	code {
		font-size: 0.88em;
		padding: 0.1em 0.35em;
		border-radius: 4px;
		background: var(--cream);
	}
	.pref {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		border-radius: var(--r);
		background: var(--cream);
	}
	@media (max-width: 899px) {
		.layout {
			grid-template-columns: 1fr;
		}
		.toc {
			position: static;
		}
	}
</style>
